"use client";

import { useEffect, useRef, useState } from "react";
import { fitCanvas, onDebouncedResize, useFrameLoop, useMotion, type PointerState } from "./motion-provider";

/** Bola wireframe berputar di hero. Berhenti saat keluar layar atau animasi dijeda. */
export function HeroCore() {
  const { paused, pointer } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const state = useRef({ ctx: null as CanvasRenderingContext2D | null, width: 0, height: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () =>
      onDebouncedResize(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const s = state.current;
        const rect = canvas.getBoundingClientRect();
        s.width = rect.width;
        s.height = rect.height;
        s.ctx = fitCanvas(canvas, s.width, s.height);
        drawCore(s.ctx, s.width, s.height, paused ? 0 : s.time, pointer.current);
      }),
    [paused, pointer],
  );

  useFrameLoop((dt) => {
    const s = state.current;
    s.time += dt;
    drawCore(s.ctx, s.width, s.height, s.time, pointer.current);
  }, !paused && visible);

  return <canvas ref={canvasRef} className="core-canvas" aria-hidden="true" />;
}

function drawCore(
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number,
  t: number,
  pointer: PointerState,
) {
  if (!ctx || !width || !height) return;
  ctx.clearRect(0, 0, width, height);

  const r = Math.min(width * 0.37, height * 0.38);
  const centerX = width * 0.5;
  const centerY = height * 0.49;
  const px = pointer.active ? (pointer.x / Math.max(1, window.innerWidth) - 0.5) * 0.12 : 0;
  const py = pointer.active ? (pointer.y / Math.max(1, window.innerHeight) - 0.5) * 0.1 : 0;
  const angle = t * 0.000065 + px;
  const tilt = 0.24 + py;

  const project = (x: number, y: number, z: number) => {
    const ax = x * Math.cos(angle) + z * Math.sin(angle);
    const az = -x * Math.sin(angle) + z * Math.cos(angle);
    const ay = y * Math.cos(tilt) - az * Math.sin(tilt);
    const bz = y * Math.sin(tilt) + az * Math.cos(tilt);
    const perspective = 3.5 / (3.5 - bz);
    return { x: centerX + ax * r * perspective, y: centerY + ay * r * perspective, z: bz };
  };

  const halo = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r * 1.5);
  halo.addColorStop(0, "#1360c81c");
  halo.addColorStop(1, "#1360c800");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);

  // Garis lintang + titik node
  for (let lat = -4; lat <= 4; lat++) {
    const phi = (lat * Math.PI) / 11;
    let prev: ReturnType<typeof project> | null = null;
    for (let j = 0; j <= 64; j++) {
      const theta = (j * Math.PI) / 32;
      const p = project(Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta));
      if (prev) {
        ctx.strokeStyle = `rgba(66,148,255,${0.14 + (p.z + 1) * 0.16})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      if (j % 4 === 0) {
        ctx.fillStyle = `rgba(117,211,255,${0.23 + (p.z + 1) * 0.28})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.z > 0.3 ? 1.35 : 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      prev = p;
    }
  }

  // Garis bujur
  for (let lon = 0; lon < 16; lon++) {
    const theta = (lon * Math.PI) / 8;
    let prev: ReturnType<typeof project> | null = null;
    for (let j = 0; j <= 48; j++) {
      const phi = -Math.PI / 2 + (j * Math.PI) / 48;
      const p = project(Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta));
      if (prev) {
        ctx.strokeStyle = `rgba(50,133,249,${0.1 + (p.z + 1) * 0.12})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      prev = p;
    }
  }

  // Orbit dengan satelit
  for (let k = 0; k < 3; k++) {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-0.42 + k * 0.87);
    ctx.strokeStyle = k === 1 ? "#53b4ff4f" : "#348aff38";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 1.3, r * (0.48 + k * 0.12), 0, 0, Math.PI * 2);
    ctx.stroke();
    const a = t * 0.00035 + k * 2.1;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#63cfff";
    ctx.fillStyle = "#b0edff";
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r * 1.3, Math.sin(a) * r * (0.48 + k * 0.12), 2.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Garis penunjuk ke luar
  for (let k = 0; k < 5; k++) {
    const a = k * 1.256 - 0.7;
    const start = r * 1.03;
    const end = r * 1.3;
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(a) * start, centerY + Math.sin(a) * start);
    ctx.lineTo(centerX + Math.cos(a) * end, centerY + Math.sin(a) * end);
    ctx.lineTo(centerX + Math.cos(a) * end + (k % 2 ? 25 : -25), centerY + Math.sin(a) * end);
    ctx.strokeStyle = "#397ece40";
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }
}
