export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="3.5" y="7.5" width="17" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="9.5" cy="15" r="1.55" fill="currentColor" />
      <circle cx="14.5" cy="15" r="1.55" fill="currentColor" />
      <path d="M20.5 12.5h6v7h-6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11 22.5v4M16 22.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 7.5V5.5h4v2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
