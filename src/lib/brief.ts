// Framework-free helpers for the project brief: reading the form, the review
// list, and the email draft. The wording is part of the design; keep it intact.

export type Brief = {
  name: string;
  email: string;
  phone: string;
  location: string;
  type: string;
  stage: string;
  details: string;
  /** Project the visitor came from (`?project=`), or "". */
  inspiration: string;
};

const field = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
};

export function readBrief(data: FormData, inspiration: string): Brief {
  return {
    name: field(data, "name"),
    email: field(data, "email"),
    phone: field(data, "phone"),
    location: field(data, "location"),
    type: field(data, "type"),
    stage: field(data, "stage"),
    details: field(data, "details"),
    inspiration,
  };
}

const phoneOrDefault = (phone: string) => phone || "Not supplied";

/** Rows shown on the review step, in order. */
export function reviewRows(brief: Brief): [label: string, value: string][] {
  return [
    ["Name", brief.name],
    ["Email", brief.email],
    ["Phone", phoneOrDefault(brief.phone)],
    ["Location", brief.location],
    ["Project type", brief.type],
    ["Project stage", brief.stage],
    ...(brief.inspiration
      ? [["Inspiration", brief.inspiration] as [string, string]]
      : []),
    ["Your ideas", brief.details],
  ];
}

/** Plain-text brief used for both the email body and the download. */
export function briefText(brief: Brief): string {
  return `Hello Texas Construction Company,\n\nI’d like to discuss a project.\n\nName: ${brief.name}\nEmail: ${brief.email}\nPhone: ${phoneOrDefault(brief.phone)}\nLocation: ${brief.location}\nProject: ${brief.type}\nStage: ${brief.stage}${brief.inspiration ? `\nInspired by: ${brief.inspiration}` : ""}\n\nAbout the project:\n${brief.details}\n\nThank you,\n${brief.name}`;
}

export function briefMailto(to: string, brief: Brief): string {
  const subject = encodeURIComponent(`Project enquiry — ${brief.type}`);
  return `mailto:${to}?subject=${subject}&body=${encodeURIComponent(briefText(brief))}`;
}
