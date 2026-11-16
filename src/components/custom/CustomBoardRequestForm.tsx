"use client";

import type { CUSTOM_PAGE_QUERY_RESULT } from "@/sanity/types";
import { customFormDefaults, defaultBoardTypes, defaultExperienceLevels } from "@/data/custom-page";
import { customRequestBody, isCustomFormField, type CustomFormField } from "@/lib/custom-form";
import { useState, type FormEvent } from "react";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

const IAN_EMAIL = "ian@ibdesigns.us";

const fieldClass = `${eurostileRegular.className} mt-2 w-full border border-stone-300 bg-white/70 px-4 py-3 text-base text-stone-950 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-950 dark:border-stone-700 dark:bg-black/40 dark:text-stone-50 dark:focus:border-white`;
const labelClass = `${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-600 dark:text-stone-300`;

export function CustomBoardRequestForm({ content }: { content?: CUSTOM_PAGE_QUERY_RESULT }) {
  const copy = (key: keyof typeof customFormDefaults) => content?.formCopy?.[key] ?? customFormDefaults[key];
  const email = content?.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.contactEmail) ? content.contactEmail : IAN_EMAIL;
  const [copyStatus, setCopyStatus] = useState("");
  const defaultFields: CustomFormField[] = [
    {_key: "name", label: copy("nameLabel"), inputType: "text", required: true},
    {_key: "email", label: copy("emailLabel"), inputType: "email", required: true},
    {_key: "phone", label: copy("phoneLabel"), inputType: "tel"},
    {_key: "boardType", label: copy("boardTypeLabel"), inputType: "select", placeholder: copy("boardTypePlaceholder"), options: content?.boardTypes ?? defaultBoardTypes},
    {_key: "dimensions", label: copy("dimensionsLabel"), inputType: "text", placeholder: copy("dimensionsPlaceholder")},
    {_key: "experience", label: copy("experienceLabel"), inputType: "select", placeholder: copy("experiencePlaceholder"), options: content?.experienceLevels ?? defaultExperienceLevels},
    {_key: "details", label: copy("detailsLabel"), inputType: "textarea", placeholder: copy("detailsPlaceholder"), required: true, fullWidth: true},
  ];
  const fields = (content?.formFields ?? defaultFields).filter(isCustomFormField);


  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = "Custom Board Request";
    const body = customRequestBody(fields, form);

    window.location.assign(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus(copy("emailCopiedMessage"));
    } catch {
      setCopyStatus(email);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:px-8">
      <form onSubmit={submitRequest} className="grid gap-6 sm:grid-cols-2">
        {fields.map(field => (
          <label key={field._key} className={`${labelClass} ${field.fullWidth ? "sm:col-span-2" : ""}`}>
            {field.label}
            {field.inputType === "textarea" ? (
              <textarea className={`${fieldClass} min-h-40 resize-y`} name={`field-${field._key}`} placeholder={field.placeholder ?? undefined} required={field.required ?? false} />
            ) : field.inputType === "select" ? (
              <select className={fieldClass} name={`field-${field._key}`} defaultValue="" required={field.required ?? false}>
                <option value="" disabled={field.required ?? false}>{field.placeholder ?? "Select an option"}</option>
                {(field.options ?? []).map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : (
              <input className={fieldClass} type={field.inputType} name={`field-${field._key}`} placeholder={field.placeholder ?? undefined} required={field.required ?? false} />
            )}
          </label>
        ))}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className={`${eurostileExtended.className} inline-flex h-12 items-center justify-center bg-stone-950 px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200`}
          >
            {content?.submitLabel ?? copy("submitLabel")}
          </button>
          <p className={`${eurostileRegular.className} mt-3 text-sm text-stone-500 dark:text-stone-400`}>
            {content?.submitNote ?? copy("submitNote")}
          </p>
        </div>
      </form>

      <aside className="self-start border border-stone-300 bg-white/60 p-6 dark:border-stone-700 dark:bg-black/30">
        <h2 className={`${eurostileExtended.className} text-lg font-bold uppercase tracking-[0.08em] text-stone-950 dark:text-white`}>
          {copy("sidebarHeading")}
        </h2>
        <p className={`${eurostileRegular.className} mt-4 text-base leading-7 text-stone-600 dark:text-stone-300`}>
          {copy("sidebarDescription")}
        </p>
        <a
          href={`mailto:${email}`}
          className={`${eurostileRegular.className} mt-5 block break-all text-lg text-stone-950 underline underline-offset-4 dark:text-white`}
        >
          {email}
        </a>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyEmail}
            className={`${eurostileExtended.className} h-11 border border-stone-950 px-4 text-xs font-bold uppercase tracking-[0.08em] text-stone-950 transition-colors hover:bg-stone-950 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-stone-950`}
          >
            {copy("copyEmailLabel")}
          </button>
          <a
            href={`mailto:${email}`}
            className={`${eurostileExtended.className} inline-flex h-11 items-center bg-stone-950 px-4 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200`}
          >
            {copy("emailButtonLabel")}
          </a>
        </div>
        <p className={`${eurostileRegular.className} mt-3 min-h-5 text-sm text-stone-500 dark:text-stone-400`} aria-live="polite">
          {copyStatus}
        </p>
      </aside>
    </div>
  );
}
