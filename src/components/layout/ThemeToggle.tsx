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
      className="shrink-0 rounded-none border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-900"
    >
      <span className="dark:hidden">Dark mode</span>
      <span className="hidden dark:inline">Light mode</span>
    </button>
  );
}
