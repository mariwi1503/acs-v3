"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";

export type PointerState = { x: number; y: number; active: boolean; overInteractive: boolean };

const IDLE_POINTER: PointerState = { x: -9999, y: -9999, active: false, overInteractive: false };

type MotionContextValue = {
  paused: boolean;
  togglePaused: () => void;
  /** Posisi kursor terkini; hanya dibaca per frame oleh canvas, bukan state React. */
  pointer: RefObject<Readonly<PointerState>>;
};

const MotionContext = createContext<MotionContextValue | null>(null);

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
  // Pilihan pengunjung berlaku sampai preferensi sistemnya berubah lagi.
  const [override, setOverride] = useState<{ reduced: boolean; paused: boolean } | null>(null);
  const paused = override && override.reduced === reduced ? override.paused : reduced;

  const togglePaused = useCallback(
    () => setOverride({ reduced, paused: !paused }),
    [reduced, paused],
  );

  const pointer = useRef<PointerState>({ ...IDLE_POINTER });

  // Lacak pointer (mouse/trackpad saja) untuk efek kursor & sorotan kartu.
  useEffect(() => {
    if (paused) {
      pointer.current = { ...IDLE_POINTER };
      return;
    }
    const fine = matchMedia("(pointer: fine)");
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !fine.matches) return;
      const target = e.target instanceof Element ? e.target : null;
      pointer.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
        overInteractive: !!target?.closest("a,button,summary"),
      };
      const card = target?.closest<HTMLElement>(".service-card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const onLeave = () => {
      pointer.current = { ...IDLE_POINTER };
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [paused]);

  useLayoutEffect(() => {
    document.body.classList.toggle("is-paused", paused);
    document.documentElement.style.scrollBehavior = paused ? "auto" : "";
  }, [paused]);

  // Animasi reveal hanya aktif jika JS jalan; tanpa JS konten tetap terlihat.
  useLayoutEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    document.body.classList.add("js-motion");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("seen");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      document.body.classList.remove("js-motion");
    };
  }, []);

  return (
    <MotionContext.Provider value={{ paused, togglePaused, pointer }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotion harus dipakai di dalam <MotionProvider>");
  return ctx;
}

/**
 * Loop requestAnimationFrame yang dibatasi ~30fps dan berhenti saat tab
 * tidak terlihat. `onFrame` menerima selisih waktu (ms) sejak frame terakhir.
 */
export function useFrameLoop(onFrame: (dt: number) => void, active: boolean) {
  const callback = useRef(onFrame);
  useEffect(() => {
    callback.current = onFrame;
  });

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = 0;

    const tick = (timestamp: number) => {
      raf = 0;
      if (document.hidden) return;
      const dt = Math.min(timestamp - last || 16.67, 50);
      if (dt >= 28) {
        last = timestamp;
        callback.current(dt);
      }
      schedule();
    };
    const schedule = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        last = 0;
        schedule();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    schedule();
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);
}

/** Menyesuaikan ukuran canvas dengan devicePixelRatio (dibatasi agar hemat). */
export function fitCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

/** Memanggil `fn` sekali sekarang dan setiap kali jendela di-resize (debounce 120ms). */
export function onDebouncedResize(fn: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const handler = () => {
    clearTimeout(timer);
    timer = setTimeout(fn, 120);
  };
  fn();
  window.addEventListener("resize", handler, { passive: true });
  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", handler);
  };
}
