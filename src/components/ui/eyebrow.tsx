/** Numbered section label: "01 / THE COMPANY". Plain labels stay plain <p>s. */
export function Eyebrow({ index, text }: { index: string; text: string }) {
  return (
    <p className="label">
      <span className="section-index">{`${index} /`}</span>
      {` ${text}`}
    </p>
  );
}
