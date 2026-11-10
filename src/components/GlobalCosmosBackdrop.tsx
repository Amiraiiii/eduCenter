'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  baseY: number;
  z: number; // depth: 0.1 (far) to 1.0 (near)
  vx: number;
  vy: number;
  size: number;
  type: 'shard' | 'asteroid' | 'dust';
  rotation: number;
  rotSpeed: number;
  polygonPoints?: number[]; // for irregular asteroid
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  driftX: number;
  driftY: number;
  pulseSpeed: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export default function GlobalCosmosBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with smooth damping
    let mouse = { x: width * 0.5, y: height * 0.5 };
    let smoothMouse = { x: width * 0.5, y: height * 0.5 };

    // Scroll parallax tracking
    let scrollY = window.scrollY || 0;
    let smoothScrollY = scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // ─── 1. Procedural Nebula Mist Clouds (Туман) ───
    const NEBULA_COUNT = 5;
    const nebulae: NebulaCloud[] = [
      { x: width * 0.2, y: height * 0.25, radius: Math.min(width, height) * 0.45, alpha: 0.08, driftX: 0.02, driftY: 0.015, pulseSpeed: 0.008, phase: 0 },
      { x: width * 0.82, y: height * 0.4, radius: Math.min(width, height) * 0.5, alpha: 0.07, driftX: -0.018, driftY: 0.02, pulseSpeed: 0.006, phase: 2.1 },
      { x: width * 0.35, y: height * 0.75, radius: Math.min(width, height) * 0.55, alpha: 0.09, driftX: 0.015, driftY: -0.022, pulseSpeed: 0.009, phase: 4.2 },
      { x: width * 0.7, y: height * 0.85, radius: Math.min(width, height) * 0.4, alpha: 0.075, driftX: -0.02, driftY: -0.01, pulseSpeed: 0.007, phase: 1.5 },
      { x: width * 0.5, y: height * 0.5, radius: Math.min(width, height) * 0.65, alpha: 0.05, driftX: 0.01, driftY: 0.01, pulseSpeed: 0.005, phase: 3.3 },
    ];

    // ─── 2. Particles (Star Shards, Asteroids, Cosmic Dust) ───
    const PARTICLE_COUNT = 135;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const z = Math.random() * 0.88 + 0.12; // 0.12 to 1.0 depth
      const isAsteroid = Math.random() < 0.24;
      const isShard = !isAsteroid && Math.random() < 0.48;

      let polygonPoints: number[] = [];
      if (isAsteroid) {
        const numSides = Math.floor(Math.random() * 3) + 5; // 5 to 7 sides
        for (let s = 0; s < numSides; s++) {
          const angle = (s / numSides) * Math.PI * 2;
          const dist = 0.62 + Math.random() * 0.75;
          polygonPoints.push(Math.cos(angle) * dist, Math.sin(angle) * dist);
        }
      }

      const size = isAsteroid
        ? 3.2 + Math.random() * 6.5 * z
        : isShard
        ? 2.2 + Math.random() * 4.2 * z
        : 0.8 + Math.random() * 1.8 * z;

      const baseAlpha = isAsteroid
        ? 0.4 + Math.random() * 0.5
        : isShard
        ? 0.45 + Math.random() * 0.55
        : 0.25 + Math.random() * 0.45;

      const y = Math.random() * height;

      particles.push({
        x: Math.random() * width,
        y,
        baseY: y,
        z,
        vx: (Math.random() - 0.5) * 0.22 * z,
        vy: -0.08 - Math.random() * 0.25 * z, // gentle upward celestial drift
        size,
        type: isAsteroid ? 'asteroid' : isShard ? 'shard' : 'dust',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.018,
        polygonPoints,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.02 + Math.random() * 0.05,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // ─── 3. Shooting Stars / Micrometeorites ───
    const meteors: ShootingStar[] = [];
    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * height * 0.45,
        length: 50 + Math.random() * 90,
        speed: 14 + Math.random() * 18,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.35,
        alpha: 0.95,
        active: true,
      });
    };

    let meteorTimer = 0;
    let time = 0;

    // ─── Animation Loop ───
    const render = () => {
      time += 0.016;
      meteorTimer += 0.016;
      if (meteorTimer > 3.2) {
        if (Math.random() < 0.7) spawnMeteor();
        meteorTimer = 0;
      }

      const displayW = width;
      const displayH = height;

      // Mouse smoothing
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.04;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.04;
      const mouseOffsetX = (smoothMouse.x / displayW - 0.5) * 45;
      const mouseOffsetY = (smoothMouse.y / displayH - 0.5) * 35;

      // Scroll smoothing
      smoothScrollY += (scrollY - smoothScrollY) * 0.06;

      ctx.clearRect(0, 0, displayW, displayH);

      // ─── Draw 1: Volumetric Cosmic Mist / Fog (Туман) ───
      nebulae.forEach((neb) => {
        neb.phase += neb.pulseSpeed;
        const currentAlpha = neb.alpha * (0.8 + Math.sin(neb.phase) * 0.25);
        const curX = neb.x + Math.sin(time * neb.driftX) * 30 + mouseOffsetX * 0.08;
        const curY = neb.y + Math.cos(time * neb.driftY) * 25 + mouseOffsetY * 0.08 - (smoothScrollY * 0.04) % displayH;

        const grad = ctx.createRadialGradient(curX, curY, 0, curX, curY, neb.radius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
        grad.addColorStop(0.35, `rgba(200, 215, 235, ${currentAlpha * 0.55})`);
        grad.addColorStop(0.7, `rgba(148, 163, 184, ${currentAlpha * 0.2})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(curX, curY, neb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ─── Draw 2: Celestial Concentric Orbital Light Rings (Свечения и Кольца из Референса) ───
      const centerOrbitX = displayW * 0.5 + mouseOffsetX * 0.12;
      const centerOrbitY = displayH * 0.45 + mouseOffsetY * 0.12 - (smoothScrollY * 0.08) % (displayH * 1.5);

      const rings = [
        { r: displayW * 0.18, dash: [], speed: 0.03, alpha: 0.045 },
        { r: displayW * 0.28, dash: [6, 16], speed: -0.025, alpha: 0.06, beacon: true },
        { r: displayW * 0.42, dash: [10, 22, 2, 22], speed: 0.018, alpha: 0.04, beacon: true },
        { r: displayW * 0.58, dash: [4, 28], speed: -0.015, alpha: 0.035 },
      ];

      ctx.save();
      rings.forEach((ring, idx) => {
        const rot = time * ring.speed;
        ctx.save();
        ctx.translate(centerOrbitX, centerOrbitY);
        ctx.rotate(rot);

        ctx.beginPath();
        ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ring.alpha})`;
        ctx.lineWidth = idx === 1 ? 1.2 : 0.8;
        if (ring.dash.length > 0) ctx.setLineDash(ring.dash);
        ctx.stroke();

        // Orbiting glowing spark beacon
        if (ring.beacon) {
          const beaconAngle = time * 0.3 * (idx % 2 === 0 ? 1 : -1) + idx * 1.7;
          const bx = Math.cos(beaconAngle) * ring.r;
          const by = Math.sin(beaconAngle) * ring.r;

          ctx.beginPath();
          ctx.arc(bx, by, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.fill();

          // 4-point cross on active beacon
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(bx - 6, by);
          ctx.lineTo(bx + 6, by);
          ctx.moveTo(bx, by - 6);
          ctx.lineTo(bx, by + 6);
          ctx.stroke();
        }

        ctx.restore();
      });
      ctx.restore();

      // ─── Draw 3: Particles (Star Shards, 3D Asteroids, Diamond Dust) ───
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Wrap around bounds with scroll parallax
        if (p.y < -30) {
          p.y = displayH + 30;
          p.x = Math.random() * displayW;
        }
        if (p.y > displayH + 30) {
          p.y = -30;
          p.x = Math.random() * displayW;
        }
        if (p.x < -30) p.x = displayW + 30;
        if (p.x > displayW + 30) p.x = -30;

        // Parallax coordinates combining mouse offset + scroll depth
        const scrollParallax = (smoothScrollY * (p.z * 0.15)) % displayH;
        const px = p.x + mouseOffsetX * (p.z * 0.9);
        let py = p.y + mouseOffsetY * (p.z * 0.9) - scrollParallax;
        if (py < -30) py += displayH + 60;
        if (py > displayH + 30) py -= displayH + 60;

        const currentAlpha = p.baseAlpha * (0.75 + Math.sin(time * 3.0 * p.twinkleSpeed + p.twinkleOffset) * 0.25);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.rotation);

        if (p.type === 'asteroid' && p.polygonPoints) {
          // ─── 3D Shaded Asteroid Rock ───
          ctx.beginPath();
          ctx.moveTo(p.polygonPoints[0] * p.size, p.polygonPoints[1] * p.size);
          for (let i = 2; i < p.polygonPoints.length; i += 2) {
            ctx.lineTo(p.polygonPoints[i] * p.size, p.polygonPoints[i + 1] * p.size);
          }
          ctx.closePath();

          // Dark charcoal interior
          ctx.fillStyle = `rgba(15, 18, 25, ${currentAlpha * 0.92})`;
          ctx.fill();

          // Platinum illuminated rim edge
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.65})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();

          // Subtle faceted inner shadow line
          ctx.beginPath();
          ctx.moveTo(p.polygonPoints[0] * p.size * 0.3, p.polygonPoints[1] * p.size * 0.3);
          ctx.lineTo(p.polygonPoints[2] * p.size * 0.8, p.polygonPoints[3] * p.size * 0.8);
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else if (p.type === 'shard') {
          // ─── 4-Point Diamond Star Shard (Осколок Звезды) ───
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.6);
          ctx.quadraticCurveTo(0, 0, s * 1.6, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 1.6);
          ctx.quadraticCurveTo(0, 0, -s * 1.6, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 1.6);
          ctx.closePath();

          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = p.z > 0.6 ? 12 : 5;
          ctx.fill();
        } else {
          // ─── Cosmic Diamond Stardust ───
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
          ctx.fill();
        }

        ctx.restore();
      });

      // ─── Draw 4: Shooting Stars / Micrometeorites ───
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.018;

        if (m.alpha <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        meteorGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        meteorGrad.addColorStop(0.7, `rgba(255, 255, 255, ${m.alpha * 0.5})`);
        meteorGrad.addColorStop(1, `rgba(255, 255, 255, ${m.alpha * 0.95})`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Tip spark
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden select-none z-0"
      style={{ willChange: 'transform' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Subtle fine cinematic film noise for depth */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />
    </div>
  );
}
