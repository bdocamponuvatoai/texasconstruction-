"use client";

import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { contact } from "@/config/site";
import {
  briefDownloadName,
  briefStages,
  briefTypes,
  defaultBriefType,
} from "@/content/brief";
import {
  briefMailto,
  briefText,
  readBrief,
  reviewRows,
  type Brief,
} from "@/lib/brief";
import { Arrow } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";

type Props = {
  /** Preselected "What are you considering?" option (from `?type=`). */
  presetType?: string;
  /** Project name the visitor came from (from `?project=`). */
  presetInspiration?: string;
};

const emptyBrief: Brief = {
  name: "",
  email: "",
  phone: "",
  location: "",
  type: defaultBriefType,
  stage: briefStages[0],
  details: "",
  inspiration: "",
};

/**
 * Two-step brief: the form, then a review with an email draft and a download.
 * Both steps stay mounted (toggled with `hidden`) so "Edit brief" returns to
 * the form with every value intact. Nothing is sent or stored.
 */
export function ProjectBrief({
  presetType = defaultBriefType,
  presetInspiration = "",
}: Props) {
  const [step, setStep] = useState<"form" | "review">("form");
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [inspiration, setInspiration] = useState(presetInspiration);
  const [downloaded, setDownloaded] = useState(false);
  const formHeading = useRef<HTMLHeadingElement>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);

  // Runs only after native constraint validation has passed.
  const review = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = readBrief(new FormData(e.currentTarget), inspiration);
    flushSync(() => {
      setBrief(next);
      setDownloaded(false);
      setStep("review");
    });
    reviewHeading.current?.focus();
  };

  const edit = () => {
    flushSync(() => setStep("form"));
    formHeading.current?.focus();
  };

  const download = () => {
    const url = URL.createObjectURL(
      new Blob([briefText(brief)], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = briefDownloadName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  };

  return (
    <>
      <form
        className="project-brief"
        onSubmit={review}
        hidden={step !== "form"}
      >
        <p className="label">01 / A LITTLE ABOUT YOUR VISION</p>
        <h2 ref={formHeading} tabIndex={-1}>
          Tell us what
          <br />
          you’re imagining.
        </h2>
        {inspiration && (
          <div className="inspiration-note">
            Inspired by {inspiration}
            <button
              type="button"
              onClick={() => setInspiration("")}
              aria-label="Remove project inspiration"
            >
              ×
            </button>
          </div>
        )}
        <fieldset>
          <legend>What are you considering?</legend>
          <div className="type-options">
            {briefTypes.map((t) => (
              <label key={t}>
                <input
                  type="radio"
                  name="type"
                  value={t}
                  defaultChecked={t === presetType}
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form-grid">
          <label>
            Your name <small>Required</small>
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="First and last name"
            />
          </label>
          <label>
            Email address <small>Required</small>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={180}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Phone number <small>Optional</small>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="Your contact number"
            />
          </label>
          <label>
            Project location <small>Required</small>
            <input
              name="location"
              autoComplete="address-level2"
              required
              maxLength={120}
              placeholder="City or neighborhood"
            />
          </label>
        </div>
        <label>
          Where are you in the process?
          <select name="stage" defaultValue={briefStages[0]}>
            {briefStages.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Tell us about your project <small>Required</small>
          <textarea
            name="details"
            required
            rows={4}
            maxLength={1600}
            placeholder="Your ideas, priorities, design team, or a timeframe you have in mind."
          />
        </label>
        <p className="form-note">
          Your details stay in this page until you choose to open an email draft
          or download them. Reviewing this brief does not submit an enquiry or
          book a consultation.
        </p>
        <button className="button" type="submit">
          Review project brief <Arrow diagonal />
        </button>
        <SmartLink href="/privacy/" className="form-privacy">
          Privacy & preview details
        </SmartLink>
      </form>

      <div className="brief-review" hidden={step !== "review"}>
        <p className="label">02 / YOUR PROJECT BRIEF</p>
        <h2 ref={reviewHeading} tabIndex={-1}>
          A good beginning.
        </h2>
        <p>Your brief is ready to review. Nothing has been sent yet.</p>
        <dl>
          {reviewRows(brief).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <a className="button" href={briefMailto(contact.email, brief)}>
          Open in my email app <Arrow diagonal />
        </a>
        <p className="form-note">
          This opens a draft addressed to {contact.email}. Review it and send it
          from your email app. If no email app is configured, download your
          brief and email it directly.
        </p>
        <div className="brief-actions">
          <button type="button" onClick={edit}>
            Edit brief
          </button>
          <button type="button" onClick={download}>
            Download a copy
          </button>
        </div>
        <p className="download-status" role="status">
          {downloaded ? "Your project brief download is ready." : ""}
        </p>
      </div>
    </>
  );
}
