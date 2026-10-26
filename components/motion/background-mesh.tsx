"use client";

import { useEffect, useRef } from "react";
import { fitCanvas, onDebouncedResize, useFrameLoop, useMotion } from "./motion-provider";

type Point = { x: number; y: number; vx: number; vy: number; px: number; py: number };

/** Jaring partikel latar + cincin kursor yang mengikuti pointer (desktop saja). */
export function BackgroundMesh() {
  const { paused, pointer } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    ctx: null as CanvasRenderingContext2D | null,
    width: 0,
    height: 0,
    points: [] as Point[],
    smooth: { x: 0, y: 0 },
    wasActive: false,
  });

  useEffect(
    () =>
      onDebouncedResize(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const s = state.current;
        s.width = window.innerWidth;
        s.height = window.innerHeight;
        s.ctx = fitCanvas(canvas, s.width, s.height);
        const count = Math.min(90, Math.floor((s.width * s.height) / 12500));
        s.points = Array.from({ length: count }, () => {
          const x = Math.random() * s.width;
          const y = Math.random() * s.height;
          return { x, y, px: x, py: y, vx: (Math.random() - 0.5) * 0.24, vy: (Math.random() - 0.5) * 0.24 };
        });
      }),
    [],
  );

  useEffect(() => {
    if (!paused) return;
    const { ctx, width, height } = state.current;
    ctx?.clearRect(0, 0, width, height);
  }, [paused]);

  useFrameLoop((dt) => {
    const s = state.current;
    const p = pointer.current;
    if (s.ctx) drawMesh(s.ctx, s.points, s.width, s.height, dt, p.x, p.y, p.active);

    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!ring || !glow) return;
    // Kursor baru masuk: lompat langsung ke posisinya, jangan meluncur dari pojok.
    if (p.active && !s.wasActive) s.smooth = { x: p.x, y: p.y };
    s.wasActive = p.active;
    ring.style.opacity = glow.style.opacity = p.active ? "1" : "0";
    if (!p.active) return;
    ring.classList.toggle("hover", p.overInteractive);
    s.smooth.x += (p.x - s.smooth.x) * 0.2;
    s.smooth.y += (p.y - s.smooth.y) * 0.2;
    ring.style.left = `${s.smooth.x}px`;
    ring.style.top = `${s.smooth.y}px`;
    glow.style.left = `${p.x}px`;
    glow.style.top = `${p.y}px`;
  }, !paused);

  return (
    <>
      <canvas ref={canvasRef} className="bg-net" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

function drawMesh(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  width: number,
  height: number,
  dt: number,
  mouseX: number,
  mouseY: number,
  pointerActive: boolean,
) {
  ctx.clearRect(0, 0, width, height);
  const move = dt / 16.67;

  for (const p of points) {
    p.x = (p.x + p.vx * move + width) % width;
    p.y = (p.y + p.vy * move + height) % height;
    const dx = mouseX - p.x;
    const dy = mouseY - p.y;
    const d = Math.hypot(dx, dy);
    const pull = d < 220 ? 0.18 * (1 - d / 220) : 0;
    p.px = p.x + dx * pull;
    p.py = p.y + dy * pull;
  }

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const q = points[j];
      const d = Math.hypot(p.px - q.px, p.py - q.py);
      if (d < 160) {
        ctx.strokeStyle = `rgba(74,146,255,${0.5 * (1 - d / 160)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(q.px, q.py);
        ctx.stroke();
      }
    }

    const d = Math.hypot(mouseX - p.px, mouseY - p.py);
    const near = pointerActive && d < 220 ? 1 - d / 220 : 0;
    if (near) {
      ctx.strokeStyle = `rgba(110,196,255,${0.85 * near})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(p.px, p.py);
      ctx.stroke();
    }

    // Titik di dekat kursor membesar & lebih terang.
    ctx.fillStyle = near ? `rgba(150,215,255,${0.55 + 0.45 * near})` : "#6f9fdc99";
    ctx.beginPath();
    ctx.arc(p.px, p.py, 1.5 + near * 1.3, 0, Math.PI * 2);
    ctx.fill();
  }

  if (pointerActive) {
    ctx.fillStyle = "#9edcffcc";
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
}
