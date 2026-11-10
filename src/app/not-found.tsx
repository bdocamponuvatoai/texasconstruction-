import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <main id="main" className="wrap error-page">
      <p className="label">404 / A SMALL DETOUR</p>
      <h1>
        Let’s find
        <br />a way home.
      </h1>
      <p>The page you’re looking for isn’t here.</p>
      <ButtonLink href="/" label="Back to the beginning" />
    </main>
  );
}
