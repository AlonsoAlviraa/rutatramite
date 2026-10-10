import type { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  wide?: boolean;
  as?: "div" | "article";
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function PageShell({ children, wide = false, as: Tag = "div", className = "", ...rest }: Props) {
  return (
    <Tag className={`page-shell mx-auto w-full min-w-0 px-4 py-10 ${wide ? "page-wide max-w-5xl" : "max-w-3xl"} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
