import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12H4m6-6-6 6 6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5 19 19M19 5 5 19" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3h3l1.5 5-2 1.5a15 15 0 0 0 6 6L16.5 13l5 1.5v3a3 3 0 0 1-3.3 3A17 17 0 0 1 3.5 6.3 3 3 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 8.5H17V5h-2.7C11.6 5 10 6.7 10 9v2H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V9c0-.4.2-.5.5-.5Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9v11M6 5.5v.01M10.5 20v-7a3.5 3.5 0 0 1 7 0v7M10.5 9v11" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.4m-7.6 6.8 7.6 4.4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function HammerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m14 4 6 6-3 3-6-6 3-3ZM11 7 4 14l6 6 7-7M3 21l4-4" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 20 6v6c0 5-3.4 8.2-8 9.5-4.6-1.3-8-4.5-8-9.5V6l8-3.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 10 4-4 3 1 3 3 3-2 5 3-3 5-3 2-3-2-2 1-2-2-3-2-2-1Z" />
      <path d="m10 7 4 4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}
