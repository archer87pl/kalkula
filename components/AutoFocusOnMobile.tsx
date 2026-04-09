"use client";

import { useEffect } from "react";

type AutoFocusOnMobileProps = {
  targetId: string;
  maxWidth?: number;
};

export default function AutoFocusOnMobile({
  targetId,
  maxWidth = 720
}: AutoFocusOnMobileProps) {
  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
    if (!media.matches) return;

    const focusTarget = document.getElementById(targetId);
    if (!(focusTarget instanceof HTMLElement)) return;

    // Wait one frame so layout is stable before scrolling/focusing.
    const rafId = window.requestAnimationFrame(() => {
      focusTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      focusTarget.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [maxWidth, targetId]);

  return null;
}
