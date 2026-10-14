"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ADMIN_CONTENT_EVENT, ADMIN_CONTENT_KEY, type AdminContent } from "@/lib/admin-content";

function readContent(): AdminContent {
  try {
    return JSON.parse(window.localStorage.getItem(ADMIN_CONTENT_KEY) ?? "{}") as AdminContent;
  } catch {
    return {};
  }
}

function applyContent() {
  const content = readContent();

  document.querySelectorAll<HTMLElement>("[data-admin-text]").forEach((element) => {
    const key = element.dataset.adminText;
    if (key && content[key] !== undefined) element.textContent = content[key];
  });

  document.querySelectorAll<HTMLImageElement>("img[data-admin-image]").forEach((image) => {
    const key = image.dataset.adminImage;
    if (key && content[key]) {
      image.removeAttribute("srcset");
      image.src = content[key];
    }
  });
}

export function AdminContentRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(applyContent);
    window.addEventListener(ADMIN_CONTENT_EVENT, applyContent);
    window.addEventListener("storage", applyContent);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(ADMIN_CONTENT_EVENT, applyContent);
      window.removeEventListener("storage", applyContent);
    };
  }, [pathname]);

  return null;
}
