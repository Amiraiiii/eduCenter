import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
}

const RAG_DATA_DIR = path.join(process.cwd(), 'rag-data');

// ─── Google Drive REST API Client (No heavy dependencies) ───
export async function POST(req: Request) {
  return handleSync(req);
}

export async function GET(req: Request) {
  return handleSync(req);
}

async function handleSync(req: Request) {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY || process.env.GEMINI_API_KEY;
    const syncToken = process.env.SYNC_SECRET_TOKEN;

    // Optional security check
    const url = new URL(req.url);
    const tokenParam = url.searchParams.get('token');
    const authHeader = req.headers.get('authorization');

    if (syncToken && tokenParam !== syncToken && authHeader !== `Bearer ${syncToken}`) {
      return NextResponse.json(
        { success: false, error: 'Доступ запрещен: неверный SYNC_SECRET_TOKEN' },
        { status: 401 }
      );
    }

    if (!folderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'GOOGLE_DRIVE_FOLDER_ID не указан в файле .env',
          instructions: [
            '1. Создайте папку на Google Диске и загрузите туда MD-файлы базы знаний (например: courses.md, faq.md).',
            '2. Нажмите «Поделиться» -> «Все, у кого есть ссылка могут просматривать».',
            '3. Скопируйте ID папки из адресной строки (после folders/...) в GOOGLE_DRIVE_FOLDER_ID в .env файле.',
          ],
        },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'API ключ (GOOGLE_DRIVE_API_KEY или GEMINI_API_KEY) не найден в .env',
        },
        { status: 400 }
      );
    }

    // 1. List all files inside the Google Drive folder
    const listUrl = `https://www.googleapis.com/drive/v3/files?q='${encodeURIComponent(
      folderId
    )}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,modifiedTime)&key=${apiKey}`;

    const listRes = await fetch(listUrl);
    if (!listRes.ok) {
      const errData = await listRes.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: `Ошибка Google Drive API (${listRes.status}): ${errData.error?.message || 'Не удалось получить список файлов папки'}`,
          hint: 'Убедитесь, что в Google Cloud Console включен "Google Drive API" для вашего API ключа, а доступ к папке открыт по ссылке.',
        },
        { status: listRes.status }
      );
    }

    const listData = await listRes.json();
    const files: DriveFile[] = listData.files || [];

    if (files.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Папка Google Диска пуста или в ней нет доступных файлов.',
        folderId,
        syncedCount: 0,
        files: [],
      });
    }

    // Ensure local rag-data directory exists
    if (!fs.existsSync(RAG_DATA_DIR)) {
      fs.mkdirSync(RAG_DATA_DIR, { recursive: true });
    }

    const syncedResults: { name: string; size: number; status: string }[] = [];

    // 2. Download or Export each file content
    for (const file of files) {
      try {
        let content = '';

        if (file.mimeType === 'application/vnd.google-apps.document') {
          // Export Google Doc as plain text / markdown
          const exportUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/plain&key=${apiKey}`;
          const exportRes = await fetch(exportUrl);
          if (exportRes.ok) {
            content = await exportRes.text();
          }
        } else {
          // Binary or text file (.md, .txt, etc.)
          const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${apiKey}`;
          const downloadRes = await fetch(downloadUrl);
          if (downloadRes.ok) {
            content = await downloadRes.text();
          }
        }

        if (content) {
          // Normalize file name: ensure .md extension
          let filename = file.name;
          if (!filename.endsWith('.md') && !filename.endsWith('.txt')) {
            filename += '.md';
          }

          const localPath = path.join(RAG_DATA_DIR, filename);
          fs.writeFileSync(localPath, content, 'utf8');

          syncedResults.push({
            name: filename,
            size: Buffer.byteLength(content, 'utf8'),
            status: 'synced',
          });
        }
      } catch (fileErr) {
        console.error(`Error syncing file ${file.name}:`, fileErr);
        syncedResults.push({
          name: file.name,
          size: 0,
          status: `error: ${fileErr instanceof Error ? fileErr.message : 'failed'}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Синхронизация с Google Диском успешно завершена. Загружено файлов: ${syncedResults.filter((r) => r.status === 'synced').length}.`,
      folderId,
      syncedAt: new Date().toISOString(),
      files: syncedResults,
    });
  } catch (error: unknown) {
    console.error('Fatal Google Drive sync error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Внутренняя ошибка синхронизации',
      },
      { status: 500 }
    );
  }
}
