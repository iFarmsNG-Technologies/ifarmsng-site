"use client";

import { useRef, useState } from "react";
import { inquiryOptions } from "@/data/content";

type Errors = Record<string, string>;
type Status = "idle" | "sending" | "done";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";
const ENDPOINT = `${API_BASE}/api/inquiries`;

export const SUCCESS_MESSAGE =
  "Thank you for contacting iFarmsNG. Your inquiry has been received. Our team will review your message and respond using the contact details you provided.";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <span id={`${id}-error`} className="field-error">{message}</span>;
}

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState<string>("");
  // One idempotency key per submission attempt; the server stores it once.
  const submissionId = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const invalid = (name: string) =>
    errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` }
      : {};

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const text = (k: string) => String(fd.get(k) ?? "");

    submissionId.current ??= crypto.randomUUID();
    setStatus("sending");
    setBanner("");
    setErrors({});

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: text("full_name"),
          company: text("company"),
          email: text("email"),
          phone: text("phone"),
          inquiry_type: text("inquiry_type"),
          subject: text("subject"),
          message: text("message"),
          consent: fd.get("consent") ? "on" : "",
          website: text("website"), // honeypot
          submission_id: submissionId.current,
        }),
      });

      if (res.ok) {
        submissionId.current = null;
        setStatus("done");
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }

      setStatus("idle");
      if (res.status === 422) {
        const data: { errors?: Errors } = await res.json().catch(() => ({}));
        const errs = data.errors ?? {};
        setErrors(errs);
        const first = Object.keys(errs)[0];
        if (first) {
          requestAnimationFrame(() =>
            form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(),
          );
        }
      } else if (res.status === 429) {
        setBanner("You have sent several messages in a short time. Please wait a few minutes and try again.");
      } else {
        setBanner("We could not save your inquiry just now. Nothing was sent. Please try again shortly.");
      }
    } catch {
      setStatus("idle");
      setBanner("We could not reach the server. Please check your connection and try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="contact-form form-success" role="status" tabIndex={-1} ref={doneRef}>
        <div className="note-icon" aria-hidden="true">✓</div>
        <h3>Inquiry received</h3>
        <p>{SUCCESS_MESSAGE}</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="contact-form" onSubmit={onSubmit} ref={formRef} noValidate>
      {banner && <p className="form-alert" role="alert">{banner}</p>}

      <div className="form-row">
        <label>
          Full name
          <input type="text" name="full_name" placeholder="Your full name" autoComplete="name"
            required maxLength={100} {...invalid("full_name")} />
          <FieldError id="full_name" message={errors.full_name} />
        </label>
        <label>
          Company / Organization
          <input type="text" name="company" placeholder="Organization name" autoComplete="organization"
            maxLength={150} {...invalid("company")} />
          <FieldError id="company" message={errors.company} />
        </label>
      </div>

      <div className="form-row">
        <label>
          Email address
          <input type="email" name="email" placeholder="you@example.com" autoComplete="email"
            required maxLength={254} {...invalid("email")} />
          <FieldError id="email" message={errors.email} />
        </label>
        <label>
          Phone number
          <input type="tel" name="phone" placeholder="+234 ..." autoComplete="tel"
            maxLength={30} {...invalid("phone")} />
          <FieldError id="phone" message={errors.phone} />
        </label>
      </div>

      <label>
        Inquiry type
        <select name="inquiry_type" required defaultValue="" {...invalid("inquiry_type")}>
          <option value="">Select an inquiry type</option>
          {inquiryOptions.map((o) => (
            <option key={o.label} value={o.value}>{o.label}</option>
          ))}
        </select>
        <FieldError id="inquiry_type" message={errors.inquiry_type} />
      </label>

      <label>
        Subject
        <input type="text" name="subject" placeholder="What is this about?"
          required maxLength={150} {...invalid("subject")} />
        <FieldError id="subject" message={errors.subject} />
      </label>

      <label>
        Message
        <textarea name="message" rows={5} placeholder="Tell us a little about your inquiry..."
          required maxLength={5000} {...invalid("message")}></textarea>
        <FieldError id="message" message={errors.message} />
      </label>

      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="consent-block">
        <label className="consent">
          <input type="checkbox" name="consent" required {...invalid("consent")} />
          <span>
            I agree that iFarmsNG may use the details I provide to respond to my inquiry, as described in
            the <a href="/privacy/" target="_blank" rel="noopener">Privacy Policy</a>.
          </span>
        </label>
        <FieldError id="consent" message={errors.consent} />
      </div>

      <div className="form-bottom">
        <button className="button button-dark" type="submit" disabled={sending}>
          {sending ? "Sending…" : <>Send Inquiry <span>↗</span></>}
        </button>
        <p className="form-status" aria-live="polite">
          {sending ? "Sending your inquiry…" : "Your inquiry will be sent securely to our team."}
        </p>
      </div>
    </form>
  );
}
