'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // depth: 0.1 to 1.0
  vx: number;
  vy: number;
  size: number;
  type: 'shard' | 'asteroid' | 'dust';
  rotation: number;
  rotSpeed: number;
  points?: number[]; // for irregular asteroid polygon
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function CelestialCosmosField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    // Mouse coordinates with smooth lerp
    let mouse = { x: width * 0.5, y: height * 0.5 };
    let smoothMouse = { x: width * 0.5, y: height * 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = canvas.clientWidth * dpr;
      height = canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Spawn Asteroids, Star Shards & Cosmic Dust
    const PARTICLE_COUNT = 90;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const z = Math.random() * 0.9 + 0.1;
      const isAsteroid = Math.random() < 0.28;
      const isShard = !isAsteroid && Math.random() < 0.45;

      // Irregular polygon points for asteroids
      let points: number[] = [];
      if (isAsteroid) {
        const numSides = Math.floor(Math.random() * 3) + 5; // 5-7 sides
        for (let s = 0; s < numSides; s++) {
          const angle = (s / numSides) * Math.PI * 2;
          const dist = 0.65 + Math.random() * 0.7;
          points.push(Math.cos(angle) * dist, Math.sin(angle) * dist);
        }
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * 0.35 * z,
        vy: -0.15 - Math.random() * 0.4 * z, // gentle upward cosmic drift
        size: isAsteroid ? 3.5 + Math.random() * 6 * z : isShard ? 2.5 + Math.random() * 4 * z : 1 + Math.random() * 2 * z,
        type: isAsteroid ? 'asteroid' : isShard ? 'shard' : 'dust',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        points,
        alpha: 0.35 + Math.random() * 0.6,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars / micrometeorites
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }
    const meteors: ShootingStar[] = [];
    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * height * 0.4,
        length: 40 + Math.random() * 80,
        speed: 12 + Math.random() * 16,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        alpha: 0.9,
        active: true,
      });
    };

    let meteorTimer = 0;
    let time = 0;

    // Render Loop
    const render = () => {
      time += 0.016;
      meteorTimer += 0.016;
      if (meteorTimer > 2.8) {
        if (Math.random() < 0.65) spawnMeteor();
        meteorTimer = 0;
      }

      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;

      // Mouse smoothing
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.04;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.04;
      const mouseOffsetX = (smoothMouse.x / displayW - 0.5) * 40;
      const mouseOffsetY = (smoothMouse.y / displayH - 0.5) * 30;

      ctx.clearRect(0, 0, displayW, displayH);

      const centerX = displayW * 0.5 + mouseOffsetX * 0.15;
      const centerY = displayH * 0.5 + mouseOffsetY * 0.15;

      // ─── 1. Volumetric Ethereal Vertical Light Pillar ───
      const beamGrad = ctx.createLinearGradient(centerX, 0, centerX, displayH);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
      beamGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.16)');
      beamGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.22)');
      beamGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.12)');
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

      ctx.save();
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(centerX - 14, 0);
      ctx.lineTo(centerX + 14, 0);
      ctx.lineTo(centerX + 42, displayH);
      ctx.lineTo(centerX - 42, displayH);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ─── 2. Concentric Orbital Light Rings (From Reference Image) ───
      const ringRadii = [
        displayW * 0.14,
        displayW * 0.22,
        displayW * 0.32,
        displayW * 0.44,
        displayW * 0.56,
      ];

      ctx.save();
      ringRadii.forEach((r, idx) => {
        const ringAlpha = (0.04 + (idx % 2 === 0 ? 0.05 : 0.02)) * (1.0 - idx * 0.12);
        const rot = time * (idx % 2 === 0 ? 0.04 : -0.03);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rot);

        // Thin etched circular ring
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha})`;
        ctx.lineWidth = idx === 1 || idx === 3 ? 1.2 : 0.8;
        ctx.setLineDash(idx === 2 ? [8, 14, 2, 14] : idx === 4 ? [4, 20] : []);
        ctx.stroke();

        // Orbiting beacon sparks on ring
        if (idx === 1 || idx === 2 || idx === 3) {
          const beaconAngle = time * 0.25 * (idx % 2 === 0 ? 1 : -1) + idx * 2.1;
          const bx = Math.cos(beaconAngle) * r;
          const by = Math.sin(beaconAngle) * r;

          // Glowing diamond spark
          ctx.beginPath();
          ctx.arc(bx, by, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 8;
          ctx.fill();

          // Delicate 4-point cross on key beacon
          if (idx === 1) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(bx - 6, by);
            ctx.lineTo(bx + 6, by);
            ctx.moveTo(bx, by - 6);
            ctx.lineTo(bx, by + 6);
            ctx.stroke();
          }
        }
        ctx.restore();
      });
      ctx.restore();

      // ─── 3. Floating Asteroid Debris & Star Shards ───
      particles.forEach((p) => {
        // Update positions with subtle parallax
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Wrap around bounds
        if (p.y < -20) {
          p.y = displayH + 20;
          p.x = Math.random() * displayW;
        }
        if (p.x < -20) p.x = displayW + 20;
        if (p.x > displayW + 20) p.x = -20;

        // Parallax projection based on depth z
        const px = p.x + mouseOffsetX * (p.z * 0.8);
        const py = p.y + mouseOffsetY * (p.z * 0.8);

        const currentAlpha = p.alpha * (0.75 + Math.sin(time * 3.0 * p.twinkleSpeed + p.twinkleOffset) * 0.25);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.rotation);

        if (p.type === 'asteroid' && p.points) {
          // ─── Asteroid Rock: 3D faceted silhouette with lit rim highlight ───
          ctx.beginPath();
          ctx.moveTo(p.points[0] * p.size, p.points[1] * p.size);
          for (let i = 2; i < p.points.length; i += 2) {
            ctx.lineTo(p.points[i] * p.size, p.points[i + 1] * p.size);
          }
          ctx.closePath();

          // Dark charcoal body
          ctx.fillStyle = `rgba(16, 18, 24, ${currentAlpha * 0.9})`;
          ctx.fill();

          // Glowing silver edge highlight on lightward side
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (p.type === 'shard') {
          // ─── 4-Point Diamond Star Shard ───
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.5);
          ctx.quadraticCurveTo(0, 0, s * 1.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 1.5);
          ctx.quadraticCurveTo(0, 0, -s * 1.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 1.5);
          ctx.closePath();

          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = p.z > 0.6 ? 10 : 4;
          ctx.fill();
        } else {
          // ─── Cosmic Diamond Dust ───
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.8})`;
          ctx.fill();
        }

        ctx.restore();
      });

      // ─── 4. Shooting Stars / Micrometeorites ───
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.016;

        if (m.alpha <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        meteorGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        meteorGrad.addColorStop(1, `rgba(255, 255, 255, ${m.alpha * 0.85})`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Tip spark
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
