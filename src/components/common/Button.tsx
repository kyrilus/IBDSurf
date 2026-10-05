import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-stone-950 text-stone-50 hover:bg-stone-800 dark:bg-stone-50 dark:text-stone-950 dark:hover:bg-stone-200",
  secondary:
    "border border-stone-300 bg-white text-stone-950 hover:border-stone-950 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-50 dark:hover:border-stone-50",
  ghost:
    "text-stone-700 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-stone-50",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex h-12 items-center justify-center rounded-none px-6 text-sm font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 dark:focus:ring-stone-50",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props) {
    const { href, ...linkProps } = props as LinkButtonProps;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
