"use client";

export function ThemeToggle() {
  function toggleTheme() {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("ibd-theme", dark ? "dark" : "light");
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-stone-700 transition-colors hover:text-stone-400 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-stone-200 dark:hover:text-stone-500"
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 dark:hidden"
        aria-hidden="true"
      >
        <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="hidden h-6 w-6 dark:block"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
