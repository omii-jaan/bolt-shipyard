export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#0a0a12" stroke="rgba(255,255,255,0.08)" />
      <path
        d="M17 4L8 18h6l-1 10 9-14h-6l1-10z"
        fill="url(#logo-grad)"
      />
      <defs>
        <linearGradient id="logo-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#74c0ff" />
          <stop offset="1" stopColor="#ff6ba0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
