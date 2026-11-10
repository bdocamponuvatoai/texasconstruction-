import { recognition } from "@/content/recognition";
import { Arrow } from "@/components/ui/icon";

/** Press and awards. The home page shows three; the recognition page all, with descriptions. */
export function RecognitionList({ full = false }: { full?: boolean }) {
  return (
    <div className="recognition-list">
      {recognition.slice(0, full ? recognition.length : 3).map((r) => (
        <a key={r.title} href={r.url} target="_blank" rel="noreferrer">
          <span className="recognition-year">
            {r.year}
            <small>{r.type}</small>
          </span>
          <div>
            <span className="label">{r.publication}</span>
            <h3>{r.title}</h3>
            {full && <p>{r.description}</p>}
          </div>
          <Arrow diagonal />
        </a>
      ))}
    </div>
  );
}
