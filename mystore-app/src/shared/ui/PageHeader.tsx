import type { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function PageHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: PageHeaderProps) {
  return (
    <div className={joinClasses("mb-6", className)}>
      <h1 className={joinClasses("font-display text-2xl font-bold text-slate-800", titleClassName)}>
        {title}
      </h1>
      {subtitle && (
        <p className={joinClasses("text-sm text-slate-500 mt-1", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}