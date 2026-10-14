"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";
import {
  ADMIN_CONTENT_EVENT,
  ADMIN_CONTENT_KEY,
  adminSections,
  getDefaultAdminContent,
  type AdminContent,
} from "@/lib/admin-content";

const ADMIN_SESSION_KEY = "ibd-admin-unlocked";

export function AdminDashboard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<AdminContent>(getDefaultAdminContent);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsUnlocked(window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true");
      try {
        const saved = JSON.parse(window.localStorage.getItem(ADMIN_CONTENT_KEY) ?? "{}") as AdminContent;
        setContent({ ...getDefaultAdminContent(), ...saved });
      } catch {
        setContent(getDefaultAdminContent());
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== "1234") {
      setLoginError("Incorrect password.");
      return;
    }

    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    setLoginError("");
    setIsUnlocked(true);
  }

  function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem(ADMIN_CONTENT_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event(ADMIN_CONTENT_EVENT));
    setStatus("Changes saved in this browser.");
  }

  function resetContent() {
    const defaults = getDefaultAdminContent();
    setContent(defaults);
    window.localStorage.removeItem(ADMIN_CONTENT_KEY);
    window.dispatchEvent(new Event(ADMIN_CONTENT_EVENT));
    setStatus("Defaults restored.");
  }

  function uploadImage(key: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setContent((current) => ({ ...current, [key]: reader.result as string }));
        setStatus("Image loaded. Select Save changes to publish it in this browser.");
      }
    };
    reader.readAsDataURL(file);
  }

  if (!isUnlocked) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-md items-center px-6 py-20">
        <form onSubmit={handleLogin} className="w-full border border-stone-300 bg-white/70 p-8 dark:border-stone-700 dark:bg-black/40">
          <h1 className={`${eurostileExtended.className} text-2xl font-bold uppercase`}>Admin</h1>
          <label className={`${eurostileExtended.className} mt-8 block text-xs font-bold uppercase tracking-[0.08em]`}>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${eurostileRegular.className} mt-2 h-12 w-full border border-stone-300 bg-transparent px-4 outline-none focus:border-stone-950 dark:border-stone-700 dark:focus:border-white`}
              autoFocus
            />
          </label>
          {loginError ? <p className="mt-3 text-sm text-red-600">{loginError}</p> : null}
          <button type="submit" className={`${eurostileExtended.className} mt-6 h-12 bg-stone-950 px-6 text-sm font-bold uppercase text-white dark:bg-white dark:text-stone-950`}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={saveContent} className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className={`${eurostileExtended.className} text-3xl font-bold uppercase`}>Content Admin</h1>
          <p className={`${eurostileRegular.className} mt-3 text-stone-500`}>
            Edit site copy and image paths. Square product information remains managed in Square.
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={resetContent} className={`${eurostileExtended.className} h-11 border border-stone-400 px-4 text-xs font-bold uppercase`}>
            Reset
          </button>
          <button type="submit" className={`${eurostileExtended.className} h-11 bg-stone-950 px-5 text-xs font-bold uppercase text-white dark:bg-white dark:text-stone-950`}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {adminSections.map((section) => (
          <fieldset key={section.title} className="border border-stone-300 p-6 dark:border-stone-700">
            <legend className={`${eurostileExtended.className} px-3 text-lg font-bold uppercase`}>
              {section.title}
            </legend>
            <div className="grid gap-6 sm:grid-cols-2">
              {section.fields.map((field) => (
                <label key={field.key} className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>
                  {field.label}
                  {field.type === "textarea" ? (
                    <textarea
                      value={content[field.key] ?? ""}
                      onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))}
                      className={`${eurostileRegular.className} mt-2 min-h-32 w-full border border-stone-300 bg-white/60 px-4 py-3 text-base normal-case tracking-normal outline-none dark:border-stone-700 dark:bg-black/30`}
                    />
                  ) : (
                    <input
                      value={content[field.key] ?? ""}
                      onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))}
                      className={`${eurostileRegular.className} mt-2 h-12 w-full border border-stone-300 bg-white/60 px-4 text-base normal-case tracking-normal outline-none dark:border-stone-700 dark:bg-black/30`}
                    />
                  )}
                  {field.type === "image" ? (
                    <input type="file" accept="image/*" onChange={(event) => uploadImage(field.key, event)} className={`${eurostileRegular.className} mt-3 block w-full text-sm normal-case tracking-normal`} />
                  ) : null}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="sticky bottom-4 mt-10 flex items-center justify-between gap-4 bg-stone-950 px-5 py-4 text-white shadow-xl dark:bg-white dark:text-stone-950">
        <p className={`${eurostileRegular.className} text-sm`}>{status || "Unsaved changes stay in the form until you save."}</p>
        <button type="submit" className={`${eurostileExtended.className} shrink-0 text-xs font-bold uppercase`}>
          Save Changes
        </button>
      </div>
    </form>
  );
}
