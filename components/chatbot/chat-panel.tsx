"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { chatNodes, chatbot, type ChatOption } from "@/lib/chatbot";
import { whatsappUrl } from "@/lib/content";

type Entry = { id: number; from: "bot" | "user"; text: string };

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function nodeEntries(nodeId: string, startId: number): Entry[] {
  return chatNodes[nodeId].messages.map((text, index) => ({ id: startId + index, from: "bot", text }));
}

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [entries, setEntries] = useState<Entry[]>(() => nodeEntries(chatbot.startNode, 0));
  const [nodeId, setNodeId] = useState<string>(chatbot.startNode);
  const [typing, setTyping] = useState(false);

  const nextId = useRef(entries.length);
  const timer = useRef<number | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const options = typing ? [] : (chatNodes[nodeId]?.options ?? []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    const element = scrollRef.current;
    element?.scrollTo({ top: element.scrollHeight, behavior: prefersReducedMotion() ? "instant" : "smooth" });
  }, [entries, typing, open]);

  useEffect(() => {
    if (!open || typing) return;
    optionsRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
  }, [open, typing, nodeId]);

  function go(target: string, userLabel: string) {
    const destination = chatNodes[target] ? target : chatbot.startNode;
    setEntries((previous) => [...previous, { id: nextId.current++, from: "user", text: userLabel }]);
    setTyping(true);

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const replies = nodeEntries(destination, nextId.current);
      nextId.current += replies.length;
      setEntries((previous) => [...previous, ...replies]);
      setNodeId(destination);
      setTyping(false);
    }, prefersReducedMotion() ? 0 : 600);
  }

  function renderOption(option: ChatOption) {
    if ("next" in option) {
      return <button type="button" onClick={() => go(option.next, option.label)} className="chat-option">{option.label}</button>;
    }
    if ("whatsapp" in option) {
      return (
        <a href={whatsappUrl(option.whatsapp)} target="_blank" rel="noopener noreferrer" className="chat-option chat-option-whatsapp">
          <Icon name="phone" />{option.label}
        </a>
      );
    }
    const isAnchor = option.href.startsWith("#");
    return (
      <a
        href={option.href}
        onClick={isAnchor ? onClose : undefined}
        {...(option.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="chat-option"
      >
        <span aria-hidden="true">{isAnchor ? "↓" : option.href.startsWith("mailto:") ? "✉" : "↗"}</span>
        {option.label}
      </a>
    );
  }

  return (
    <div
      id="chatbot-panel"
      role="dialog"
      aria-labelledby="chatbot-title"
      hidden={!open}
      onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}
      className="chat-panel"
    >
      <div className="chat-panel-head">
        <span className="chat-panel-avatar"><Icon name="bot" /></span>
        <div className="chat-panel-heading">
          <h2 id="chatbot-title">{chatbot.name}</h2>
          <p>{chatbot.status}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Tutup asisten" className="chat-panel-close">
          <Icon name="close" />
        </button>
      </div>

      <div ref={scrollRef} className="chat-panel-scroll">
        <div role="log" aria-label="Percakapan" className="chat-messages">
          {entries.map((entry) => (
            <p key={entry.id} className={`chat-message chat-message-${entry.from}`}>
              {entry.from === "user" && <span className="sr-only">Anda: </span>}
              {entry.text}
            </p>
          ))}
          {typing && (
            <p className="chat-typing">
              <span className="sr-only">{chatbot.name} sedang mengetik</span>
              {[0, 150, 300].map((delay) => <span key={delay} aria-hidden="true" style={{ animationDelay: `${delay}ms` }} />)}
            </p>
          )}
        </div>
        {options.length > 0 && (
          <div ref={optionsRef} role="group" aria-label="Pilihan pertanyaan" className="chat-options">
            {options.map((option) => <Fragment key={option.label}>{renderOption(option)}</Fragment>)}
          </div>
        )}
      </div>

      <div className="chat-panel-foot">
        <button type="button" onClick={() => go(chatbot.startNode, chatbot.restartLabel)} disabled={typing || nodeId === chatbot.startNode} className="chat-footer-action">
          <Icon name="restart" />{chatbot.restartLabel}
        </button>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="chat-footer-action chat-footer-human">
          <Icon name="phone" />{chatbot.humanLabel}
        </a>
      </div>
    </div>
  );
}
