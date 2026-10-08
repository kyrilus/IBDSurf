import Link from "next/link";

const navigationItems = [
  { href: "/surfboards", label: "Boards" },
  { href: "/custom", label: "Custom" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  return (
    <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-10">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-lg font-normal uppercase tracking-wide text-stone-700 transition-colors hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-50"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
