/**
 * Official Google brand assets as inline SVG components.
 * Used consistently across the site for Google reviews, ratings, and badges.
 *
 * Colors are Google's official brand palette:
 * - Blue:   #4285F4
 * - Green:  #34A853
 * - Yellow: #FBBC05  (also used for all review stars)
 * - Red:    #EA4335
 */

/**
 * The official 4-color Google "G" logo.
 * Use for Google review badges, rating buttons, and brand indicators.
 */
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

/**
 * A single Google-style review star.
 * Uses Google's official review star color (#FBBC05 — Google Yellow).
 * Filled 5-point star, same shape Google uses in its review displays.
 */
export function GoogleStar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="#FBBC05"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/**
 * A row of 5 Google yellow stars — convenience wrapper for the standard
 * "5-star rating" display Google shows next to review scores.
 */
export function GoogleStars({ className, starClassName }: { className?: string; starClassName?: string }) {
  return (
    <span className={className} role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <GoogleStar key={i} className={starClassName} />
      ))}
    </span>
  );
}
