"use client";

import { useEffect } from "react";

const CHUNK_RELOAD_KEY = "workbook_chunk_reload_attempted";
const CHUNK_RELOAD_TIMESTAMP_KEY = "workbook_chunk_reload_timestamp";
const CHUNK_RELOAD_COOLDOWN_MS = 30_000;

function looksLikeChunkError(value: unknown) {
  const message = String(value ?? "");

  return (
    message.includes("Failed to load chunk") ||
    message.includes("ChunkLoadError") ||
    message.includes("_next/static/chunks") ||
    message.includes("Loading chunk")
  );
}

export default function ChunkErrorRecovery() {
  useEffect(() => {
    // 현재 페이지가 정상적으로 hydrate된 경우에는 이전 복구 시도 기록을 정리한다.
    // 단, reload 직후 같은 오류가 반복되는 경우 무한 새로고침을 막기 위해
    // 아주 짧은 cooldown 동안은 기록을 유지한다.
    const now = Date.now();
    const lastReload = Number(
      sessionStorage.getItem(CHUNK_RELOAD_TIMESTAMP_KEY) ?? "0",
    );

    if (!Number.isFinite(lastReload) || now - lastReload > CHUNK_RELOAD_COOLDOWN_MS) {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY);
      sessionStorage.removeItem(CHUNK_RELOAD_TIMESTAMP_KEY);
    }

    const reloadOnce = () => {
      const alreadyAttempted =
        sessionStorage.getItem(CHUNK_RELOAD_KEY) === "true";

      if (alreadyAttempted) {
        return;
      }

      sessionStorage.setItem(CHUNK_RELOAD_KEY, "true");
      sessionStorage.setItem(
        CHUNK_RELOAD_TIMESTAMP_KEY,
        String(Date.now()),
      );

      window.location.reload();
    };

    const handleWindowError = (event: ErrorEvent) => {
      const message =
        event.error?.message ??
        event.message ??
        event.filename ??
        "";

      if (looksLikeChunkError(message)) {
        reloadOnce();
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason =
        event.reason?.message ??
        event.reason ??
        "";

      if (looksLikeChunkError(reason)) {
        reloadOnce();
      }
    };

    window.addEventListener("error", handleWindowError);
    window.addEventListener(
      "unhandledrejection",
      handleUnhandledRejection,
    );

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  return null;
}
