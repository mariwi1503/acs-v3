"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { chatbot } from "@/lib/chatbot";

const loadPanel = () => import("./chat-panel").then((module) => module.ChatPanel);
const ChatPanel = dynamic(loadPanel, { ssr: false });

const TEASER_KEY = "acs-chat-teaser-seen";

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const teaserTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(TEASER_KEY) === "1") return;
    } catch {
      return;
    }
    teaserTimer.current = window.setTimeout(() => setTeaser(true), 10_000);
    return () => window.clearTimeout(teaserTimer.current);
  }, []);

  function dismissTeaser() {
    window.clearTimeout(teaserTimer.current);
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      // The greeting can reappear if session storage is unavailable.
    }
  }

  function toggle() {
    dismissTeaser();
    setLoaded(true);
    setOpen((value) => !value);
  }

  function close() {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  return (
    <>
      {loaded && <ChatPanel open={open} onClose={close} />}
      <div className={`chat-launcher${open ? " is-open" : ""}`}>
        {teaser && !open && (
          <div className="chat-teaser">
            {chatbot.teaser}
            <button type="button" onClick={dismissTeaser} aria-label="Tutup sapaan" className="chat-teaser-close">
              <Icon name="close" />
            </button>
          </div>
        )}
        <button
          ref={launcherRef}
          type="button"
          onClick={toggle}
          onPointerEnter={() => void loadPanel()}
          onFocus={() => void loadPanel()}
          aria-expanded={open}
          aria-controls={loaded ? "chatbot-panel" : undefined}
          aria-label={open ? "Tutup asisten" : chatbot.launcherLabel}
          className="chat-launcher-button"
        >
          {!loaded && <span className="chat-launcher-pulse" aria-hidden="true" />}
          <Icon name={open ? "close" : "bot"} />
        </button>
      </div>
    </>
  );
}
