import React from 'react';

/* The bee on its own, monochrome, for badges and watermarks. Takes its colour
   from `currentColor` so it can sit on any surface. */
export const BeeGlyph: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = 'w-4 h-4',
  ...props
}) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true" focusable="false" {...props}>
    <ellipse cx="17" cy="27" rx="11" ry="6.4" transform="rotate(-22 17 27)" opacity="0.5" />
    <ellipse cx="47" cy="27" rx="11" ry="6.4" transform="rotate(22 47 27)" opacity="0.5" />
    <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none">
      <path d="M28.5 12.5c-1.8-1.6-3.6-2.2-5.4-1.9" />
      <path d="M35.5 12.5c1.8-1.6 3.6-2.2 5.4-1.9" />
    </g>
    <circle cx="32" cy="17.5" r="6" />
    <circle cx="32" cy="37" r="12.5" />
  </svg>
);

/* BEEHOSTER mark — a bee on a light badge with a crimson rim.
   Restyled from the original: the plum badge is now paper, the honeycomb ring
   and the power symbol the bee used to carry are gone, and the accent does the
   work through the rim, the wings and the abdomen stripes. Keeping the body in
   ink rather than crimson is what lets it still read as a bee at 20px, where a
   single-hue mark turns into a blob. Vectors, so it stays crisp from the
   header icon up to the footer lockup. */
export const BeehosterLogo: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = 'w-8 h-8',
  ...props
}) => {
  /* The mark renders several times per page (header, footer). Shared gradient
     and clip ids would all resolve to whichever copy the browser saw first,
     which is how the badge ended up painting empty in some places — so each
     instance gets its own. */
  const uid = React.useId().replace(/:/g, '');
  const badgeId = `bh-badge-${uid}`;
  const wingId = `bh-wing-${uid}`;
  const bodyClipId = `bh-body-${uid}`;

  return (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" {...props}>
    <defs>
      <linearGradient id={badgeId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FDF1F4" />
      </linearGradient>
      <linearGradient id={wingId} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F9A8C0" />
        <stop offset="100%" stopColor="#E11D48" />
      </linearGradient>
      <clipPath id={bodyClipId}>
        <circle cx="32" cy="37" r="12.5" />
      </clipPath>
    </defs>

    {/* Badge — solid plate first so the mark is never see-through against the
        frosted panels it sits on, gradient on top for depth. */}
    <rect x="3" y="3" width="58" height="58" rx="20" fill="#FFFFFF" />
    <rect x="3" y="3" width="58" height="58" rx="20" fill={`url(#${badgeId})`} stroke="#BE123C" strokeWidth="2.5" />

    {/* Wings — translucent so they read as wings rather than as two more
        solid shapes competing with the body. */}
    <g fill={`url(#${wingId})`} fillOpacity="0.5" stroke="#BE123C" strokeWidth="1.3">
      <ellipse cx="17" cy="27" rx="11" ry="6.4" transform="rotate(-22 17 27)" />
      <ellipse cx="47" cy="27" rx="11" ry="6.4" transform="rotate(22 47 27)" />
    </g>

    {/* Antennae */}
    <g stroke="#16150F" strokeWidth="1.9" strokeLinecap="round" fill="none">
      <path d="M28.5 12.5c-1.8-1.6-3.6-2.2-5.4-1.9" />
      <path d="M35.5 12.5c1.8-1.6 3.6-2.2 5.4-1.9" />
    </g>

    {/* Head */}
    <circle cx="32" cy="17.5" r="6" fill="#16150F" />

    {/* Body with two accent stripes, clipped to the abdomen */}
    <circle cx="32" cy="37" r="12.5" fill="#16150F" />
    <g clipPath={`url(#${bodyClipId})`}>
      <rect x="18" y="30.6" width="28" height="4.4" fill="#BE123C" />
      <rect x="18" y="39.2" width="28" height="4.4" fill="#BE123C" />
    </g>
  </svg>
  );
};
