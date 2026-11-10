type ArrowProps = {
  /** Up-right arrow (links that lead somewhere), instead of a right arrow. */
  diagonal?: boolean;
  /** Point left (previous/back). */
  left?: boolean;
};

export function Arrow({ diagonal = false, left = false }: ArrowProps) {
  return (
    <svg
      className={`arrow${left ? " arrow-left" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M3 12h17m-7-7 7 7-7 7"} />
    </svg>
  );
}

export function Cross() {
  return (
    <svg viewBox="0 0 24 24" className="cross" aria-hidden="true">
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
