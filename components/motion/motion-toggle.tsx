"use client";

import { Icon } from "@/components/icon";
import { useMotion } from "./motion-provider";

export function MotionToggle() {
  const { paused, togglePaused } = useMotion();
  const label = paused ? "Aktifkan animasi" : "Jeda animasi";

  return (
    <button type="button" className="motion-control" onClick={togglePaused} title={label}>
      <Icon name={paused ? "play" : "pause"} />
      <span className="motion-label">{label}</span>
    </button>
  );
}
