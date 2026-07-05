type TrustBadge = {
  title: string;
  subtitle: string;
  icon: "clock" | "video" | "check" | "shield";
};

const BADGES: TrustBadge[] = [
  {
    icon: "clock",
    title: "Fast offer path",
    subtitle: "Preliminary number in ~60 seconds",
  },
  {
    icon: "video",
    title: "Private validation",
    subtitle: "FaceTime or in-person only",
  },
  {
    icon: "check",
    title: "Certified check",
    subtitle: "Payment upon acceptance",
  },
  {
    icon: "shield",
    title: "No obligation",
    subtitle: "Jim Falk Lexus standards",
  },
];

function TrustIcon({ type }: { type: TrustBadge["icon"] }) {
  const className = "h-6 w-6 text-gold";

  switch (type) {
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "video":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M16 10l5-3v10l-5-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 12l2.5 2.5L16 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function TrustIconStrip() {
  return (
    <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {BADGES.map((badge) => (
        <div
          key={badge.title}
          className="flex flex-col items-center rounded-xl border border-white/5 bg-surface/80 px-4 py-5 text-center"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
            <TrustIcon type={badge.icon} />
          </div>
          <p className="text-sm font-semibold text-white">{badge.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">{badge.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
