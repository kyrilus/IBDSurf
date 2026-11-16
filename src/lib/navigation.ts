export function safeNavigationHref(href: string | null | undefined): string {
  if (!href) return "#";
  return /^(https?:|\/(?!\/)|#)/i.test(href) ? href : "#";
}
