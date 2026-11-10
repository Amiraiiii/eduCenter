'use client';

import React, { useRef, useEffect } from 'react';

interface Moon3DProps {
  className?: string;
}

export default function Moon3D({ className = '' }: Moon3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'high-performance' });
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader: Photorealistic Total Solar Eclipse with 3D Lunar Silhouette,
    // Soft Coronal Rays, Diamond Ring Glint, and Seamless Edge-Free Radial Decay
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform vec2 u_rot;

      // Hash & Noise functions
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 5; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + vec2(100.0);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Center coordinate system aspect-corrected
        vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
        float distFromCenter = length(st);

        // 3D Parallax offset between Lunar Disk and Background Sun Corona
        vec2 moonOffset = u_mouse * 0.02;
        vec2 pMoon = st - moonOffset;
        
        float moonRadius = 0.32;
        float rMoon = length(pMoon) / moonRadius;

        // Polar coordinates for coronal streamers
        float angle = atan(st.y, st.x);
        float rSun = distFromCenter / moonRadius;

        // 1. Dynamic Coronal Plasma Rays (Turbulent Magnetic Streamers)
        float streamerNoise = fbm(vec2(angle * 3.5 + u_time * 0.08, rSun * 2.2 - u_time * 0.15));
        float fineStreamers = noise(vec2(angle * 32.0 - u_time * 0.25, rSun * 6.0));
        
        // Coronal intensity falloff from the edge of the moon outward
        float coronaDist = max(0.0, rSun - 0.98);
        float innerRing = exp(-coronaDist * 36.0) * 2.5; // Intense rim flash
        float midCorona = exp(-coronaDist * 5.2) * (0.8 + streamerNoise * 0.65 + fineStreamers * 0.25);
        float outerGaze = exp(-coronaDist * 1.8) * (0.35 + streamerNoise * 0.4);

        // 2. Cursor Contact: Diamond Ring Glint tracking cursor angle
        float mouseAngle = atan(u_mouse.y, u_mouse.x);
        float angleDiff = cos(angle - mouseAngle);
        float glintFactor = pow(max(0.0, angleDiff), 16.0);
        float diamondRing = glintFactor * exp(-abs(rSun - 1.0) * 45.0) * 3.5;
        float glintStreak = pow(max(0.0, angleDiff), 64.0) * exp(-coronaDist * 2.5) * 2.0;

        // Total Corona brightness
        float coronaTotal = innerRing + midCorona + outerGaze + diamondRing + glintStreak;

        // 3. Cinematic Nebular Clouds / Cosmic Smoke
        vec2 cloudCoord = st * 3.2 + vec2(u_time * 0.02, -u_time * 0.015);
        float cloudNoise = fbm(cloudCoord);
        float cloudWisps = fbm(cloudCoord * 2.2 + vec2(1.5));
        float darkClouds = smoothstep(0.3, 0.75, cloudNoise * 0.7 + cloudWisps * 0.3);
        
        // Modulate corona through atmospheric cloud layers
        coronaTotal *= mix(0.7, 1.15, cloudNoise);
        coronaTotal -= darkClouds * 0.18 * exp(-coronaDist * 1.5);
        coronaTotal = max(0.0, coronaTotal);

        // Pure monochrome / silvery platinum color gradient
        vec3 coronaColor = vec3(coronaTotal) * vec3(0.96, 0.98, 1.0);

        // 4. The 3D Lunar Silhouette (Pitch Black Obstructing Body)
        vec4 finalColor = vec4(0.0);

        if (rMoon < 1.0) {
          // Inside Lunar Disk: pitch black obsidian core
          float z = sqrt(1.0 - rMoon * rMoon);
          float surfaceTexture = noise(pMoon * 40.0) * 0.012;
          float darkDepth = z * 0.015 + surfaceTexture;
          float edgeAA = smoothstep(1.0, 0.982, rMoon);
          finalColor = vec4(vec3(darkDepth), edgeAA);
        } else {
          // Outside the moon: Radiant Corona + Atmospheric haze
          float alpha = clamp(coronaTotal * 0.92, 0.0, 0.98);
          finalColor = vec4(coronaColor, alpha);
        }

        // Soft ambient cloud haze
        float ambientSmoke = darkClouds * 0.1 * smoothstep(0.2, 0.7, distFromCenter);
        finalColor += vec4(vec3(0.07, 0.08, 0.1) * ambientSmoke, ambientSmoke);

        // ─── CRITICAL: SEAMLESS RADIAL FADE (NO SQUARE BORDER) ───
        // Smoothly and completely attenuates everything to absolute 0 well before canvas borders
        float radialVignette = smoothstep(0.48, 0.22, distFromCenter);
        finalColor *= radialVignette;

        gl_FragColor = finalColor;
      }
    `;

    // Compile shader
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRot = gl.getUniformLocation(program, 'u_rot');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let animationFrameId: number;
    let startTime = performance.now();

    // Mouse coordinates with smooth damping
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let idleSpin = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1.5, Math.min(1.5, nx));
      targetMouseY = Math.max(-1.5, Math.min(1.5, ny));

      targetRotY = nx * 0.8;
      targetRotX = -ny * 0.6;
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      targetMouseX = nx;
      targetMouseY = ny;
      targetRotY = nx * 0.6;
      targetRotX = -ny * 0.45;
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = () => {
      resize();

      const elapsed = (performance.now() - startTime) / 1000;

      // Smooth lerp toward mouse targets
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      idleSpin += 0.0018;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY + idleSpin - currentRotY) * 0.05;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, currentMouseX, currentMouseY);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uRot, currentRotX, currentRotY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className={`relative pointer-events-none select-none flex items-center justify-center ${className}`}
      style={{
        maskImage: 'radial-gradient(circle at center, black 42%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 42%, transparent 72%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
