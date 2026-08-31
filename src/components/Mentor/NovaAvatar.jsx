/**
 * Commander Nova's avatar — a warm, friendly illustrated portrait, not
 * photorealistic (appropriate for this app and for a 12-year-old
 * audience). Uses only the app's existing color tokens.
 *
 * size: pixel size for both width and height (default 96).
 */
export function NovaAvatar({ size = 96, className = '' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Commander Nova"
    >
      {/* Badge ring */}
      <circle cx="60" cy="60" r="58" fill="#131B2E" stroke="#22D3EE" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="52" fill="#0B1120" />

      {/* Uniform shoulders/collar */}
      <path
        d="M 24 108 C 24 88 40 78 60 78 C 80 78 96 88 96 108 L 96 112 L 24 112 Z"
        fill="#1C273D"
      />
      <path d="M 44 82 L 60 96 L 76 82 L 70 78 L 60 86 L 50 78 Z" fill="#22D3EE" />
      {/* Collar insignia star */}
      <path
        d="M 60 90 l 2.2 4.6 5.1 0.7 -3.7 3.6 0.9 5.1 -4.5 -2.4 -4.5 2.4 0.9 -5.1 -3.7 -3.6 5.1 -0.7 Z"
        fill="#F5A524"
      />

      {/* Neck */}
      <rect x="52" y="66" width="16" height="16" rx="4" fill="#7A4A2B" />

      {/* Head */}
      <ellipse cx="60" cy="50" rx="24" ry="26" fill="#8B5A2B" />

      {/* Short hair */}
      <path
        d="M 36 44 C 34 26 46 16 60 16 C 74 16 86 26 84 44 C 84 36 78 30 60 30 C 42 30 36 36 36 44 Z"
        fill="#1A1210"
      />
      <path d="M 36 44 C 36 40 38 37 40 35 L 40 46 C 38 46 37 45 36 44 Z" fill="#1A1210" />
      <path d="M 84 44 C 84 40 82 37 80 35 L 80 46 C 82 46 83 45 84 44 Z" fill="#1A1210" />

      {/* Ears */}
      <ellipse cx="35" cy="52" rx="4" ry="6" fill="#8B5A2B" />
      <ellipse cx="85" cy="52" rx="4" ry="6" fill="#8B5A2B" />

      {/* Eyebrows */}
      <path d="M 46 44 Q 51 41 56 44" stroke="#1A1210" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 64 44 Q 69 41 74 44" stroke="#1A1210" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="51" cy="50" rx="3.2" ry="3.6" fill="#1A1210" />
      <ellipse cx="69" cy="50" rx="3.2" ry="3.6" fill="#1A1210" />
      <circle cx="52" cy="48.8" r="0.9" fill="#fff" />
      <circle cx="70" cy="48.8" r="0.9" fill="#fff" />

      {/* Short beard/jaw shading */}
      <path
        d="M 40 56 C 42 66 50 74 60 74 C 70 74 78 66 80 56 C 78 62 70 68 60 68 C 50 68 42 62 40 56 Z"
        fill="#1A1210"
        opacity="0.55"
      />

      {/* Nose */}
      <path d="M 60 48 L 58 56 Q 60 58 62 56 Z" fill="#7A4A2B" opacity="0.6" />

      {/* Warm smile */}
      <path d="M 51 61 Q 60 67 69 61" stroke="#3A2214" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
