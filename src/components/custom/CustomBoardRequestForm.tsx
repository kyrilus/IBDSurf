"use client";

import { useState, type FormEvent } from "react";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

const IAN_EMAIL = "ian@ibdesigns.us";

const fieldClass = `${eurostileRegular.className} mt-2 w-full border border-stone-300 bg-white/70 px-4 py-3 text-base text-stone-950 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-950 dark:border-stone-700 dark:bg-black/40 dark:text-stone-50 dark:focus:border-white`;
const labelClass = `${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-600 dark:text-stone-300`;

export function CustomBoardRequestForm() {
  const [copyStatus, setCopyStatus] = useState("");

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const subject = `Custom Board Request${name ? ` — ${name}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${String(form.get("email") ?? "")}`,
      `Phone: ${String(form.get("phone") ?? "")}`,
      `Board type: ${String(form.get("boardType") ?? "")}`,
      `Preferred dimensions: ${String(form.get("dimensions") ?? "")}`,
      `Surfing experience: ${String(form.get("experience") ?? "")}`,
      "",
      "What I am looking for:",
      String(form.get("details") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${IAN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(IAN_EMAIL);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus(IAN_EMAIL);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:px-8">
      <form onSubmit={submitRequest} className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input className={fieldClass} type="text" name="name" autoComplete="name" required />
        </label>
        <label className={labelClass}>
          Email
          <input className={fieldClass} type="email" name="email" autoComplete="email" required />
        </label>
        <label className={labelClass}>
          Phone
          <input className={fieldClass} type="tel" name="phone" autoComplete="tel" />
        </label>
        <label className={labelClass}>
          Board Type
          <select className={fieldClass} name="boardType" defaultValue="">
            <option value="" disabled>Select a board type</option>
            <option>Shortboard</option>
            <option>Fish</option>
            <option>Mid Length</option>
            <option>Longboard</option>
            <option>Not Sure Yet</option>
          </select>
        </label>
        <label className={labelClass}>
          Preferred Dimensions
          <input
            className={fieldClass}
            type="text"
            name="dimensions"
            placeholder={'Example: 6\'0" × 19" × 2 1/2"'}
          />
        </label>
        <label className={labelClass}>
          Surfing Experience
          <select className={fieldClass} name="experience" defaultValue="">
            <option value="" disabled>Select your experience</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Professional</option>
          </select>
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Tell Ian What You&apos;re Looking For
          <textarea
            className={`${fieldClass} min-h-40 resize-y`}
            name="details"
            placeholder="Tell us about the waves you surf, your current board, and what you want this board to do."
            required
          />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className={`${eurostileExtended.className} inline-flex h-12 items-center justify-center bg-stone-950 px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200`}
          >
            Submit Request
          </button>
          <p className={`${eurostileRegular.className} mt-3 text-sm text-stone-500 dark:text-stone-400`}>
            This opens your email app with the request filled in for you to review and send.
          </p>
        </div>
      </form>

      <aside className="self-start border border-stone-300 bg-white/60 p-6 dark:border-stone-700 dark:bg-black/30">
        <h2 className={`${eurostileExtended.className} text-lg font-bold uppercase tracking-[0.08em] text-stone-950 dark:text-white`}>
          Email Ian Directly
        </h2>
        <p className={`${eurostileRegular.className} mt-4 text-base leading-7 text-stone-600 dark:text-stone-300`}>
          Prefer writing from your own inbox? Copy Ian&apos;s email or open a new message directly.
        </p>
        <a
          href={`mailto:${IAN_EMAIL}`}
          className={`${eurostileRegular.className} mt-5 block break-all text-lg text-stone-950 underline underline-offset-4 dark:text-white`}
        >
          {IAN_EMAIL}
        </a>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyEmail}
            className={`${eurostileExtended.className} h-11 border border-stone-950 px-4 text-xs font-bold uppercase tracking-[0.08em] text-stone-950 transition-colors hover:bg-stone-950 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-stone-950`}
          >
            Copy Email
          </button>
          <a
            href={`mailto:${IAN_EMAIL}`}
            className={`${eurostileExtended.className} inline-flex h-11 items-center bg-stone-950 px-4 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200`}
          >
            Email Ian
          </a>
        </div>
        <p className={`${eurostileRegular.className} mt-3 min-h-5 text-sm text-stone-500 dark:text-stone-400`} aria-live="polite">
          {copyStatus}
        </p>
      </aside>
    </div>
  );
}
