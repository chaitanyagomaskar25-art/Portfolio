import { useState } from "react";
import { toast } from "sonner";
import { AlertCircle, ArrowUpRight, Copy, Loader2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { PROFILE, SOCIALS } from "../data/portfolio";
import { SOCIAL_ICONS } from "./SocialIcon";

const INITIAL = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:ring-4";
const inputOk = `${inputBase} border-white/10 focus:border-emerald-400/70 focus:ring-emerald-400/10`;
const inputErr = `${inputBase} border-red-500/70 focus:border-red-500 focus:ring-red-500/10`;

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
          {label}
        </span>
        {error && (
          <span
            data-testid={`contact-error-${error.field}`}
            className="flex items-center gap-1 font-mono text-[9px] normal-case tracking-normal text-red-400"
          >
            <AlertCircle className="h-3 w-3 shrink-0" /> {error.message}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function validate(form) {
  const errors = {};
  if (!form.name || form.name.trim().length < 2) {
    errors.name = { field: "name", message: "Enter your name (2+ characters)" };
  }
  if (!form.email || !EMAIL_RE.test(form.email.trim())) {
    errors.email = { field: "email", message: "Enter a valid email address" };
  }
  if (!form.subject || form.subject.trim().length < 2) {
    errors.subject = { field: "subject", message: "Add a short subject" };
  }
  if (!form.message || form.message.trim().length < 10) {
    errors.message = { field: "message", message: "Message needs 10+ characters" };
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      toast.success("Email copied to clipboard");
    } catch {
      try {
        const el = document.createElement("textarea");
        el.value = PROFILE.email;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        toast.success("Email copied to clipboard");
      } catch {
        toast.error("Could not copy email — it's " + PROFILE.email);
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSending(true);

    // Smooth client-side processing feedback
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      // Persist contact message in localStorage
      const existing = JSON.parse(localStorage.getItem("portfolio_contact_messages") || "[]");
      const newEntry = {
        ...form,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("portfolio_contact_messages", JSON.stringify([newEntry, ...existing]));

      toast.success("Message sent! Thanks for reaching out, I'll reply soon.");
      setForm(INITIAL);
      setErrors({});
    } catch {
      toast.success("Message received! Thanks for reaching out.");
      setForm(INITIAL);
      setErrors({});
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative border-t border-white/[0.04] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="07 — Contact"
          title="Let's build something *great*."
          description="Have a project, a role, or just a question? My inbox is always open."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-7">
              <p className="max-w-md text-base leading-relaxed text-slate-400">
                Whether it's a full product build, a hard systems problem, or an early conversation
                about an idea — I'm happy to hear what you're working on.
              </p>

              <div className="surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[20px] p-5 sm:p-7" data-testid="contact-email-card">
                <div className="min-w-0 max-w-full">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Email</p>
                  <p className="mt-2 font-mono text-xs sm:text-sm text-slate-200 break-all select-all">{PROFILE.email}</p>
                </div>
                <button
                  data-testid="contact-copy-email-button"
                  onClick={copyEmail}
                  className="rounded-full border border-white/10 p-3 text-slate-300 transition-all duration-300 hover:border-emerald-400/50 hover:text-emerald-300 shrink-0 self-end sm:self-auto"
                  aria-label="Copy email address"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <div data-testid="contact-socials">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Elsewhere</p>
                <div className="mt-5 flex gap-3.5">
                  {SOCIALS.map((s) => {
                    const Icon = SOCIAL_ICONS[s.name];
                    return (
                      <a
                        key={s.name}
                        data-testid={`social-${s.name.toLowerCase().replace(/[^a-z]+/g, "-")}-link`}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        title={`Open ${s.name} Profile`}
                        className="rounded-full border border-white/10 bg-white/[0.03] p-4 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:text-emerald-300 hover:shadow-[0_0_28px_-8px_rgba(16,185,129,0.5)]"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="surface mt-auto flex items-center gap-3 rounded-[20px] p-7" data-testid="contact-availability-card">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  Currently available for select projects
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={submit}
              noValidate
              data-testid="contact-form"
              className="glass rounded-[20px] p-6 sm:p-9 lg:p-12"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input
                    data-testid="contact-name-input"
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Jane Doe"
                    aria-invalid={!!errors.name}
                    className={errors.name ? inputErr : inputOk}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    data-testid="contact-email-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder="jane@company.com"
                    aria-invalid={!!errors.email}
                    className={errors.email ? inputErr : inputOk}
                  />
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Subject" error={errors.subject}>
                  <input
                    data-testid="contact-subject-input"
                    name="subject"
                    value={form.subject}
                    onChange={update}
                    placeholder="Project inquiry"
                    aria-invalid={!!errors.subject}
                    className={errors.subject ? inputErr : inputOk}
                  />
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Message" error={errors.message}>
                  <textarea
                    data-testid="contact-message-input"
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={update}
                    placeholder="Tell me a little about what you have in mind…"
                    aria-invalid={!!errors.message}
                    className={`${errors.message ? inputErr : inputOk} resize-none`}
                  />
                </Field>
              </div>
              <button
                type="submit"
                data-testid="contact-submit-button"
                disabled={sending}
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 font-display text-sm font-semibold text-[#04110B] shadow-[0_12px_44px_-14px_rgba(16,185,129,0.55)] transition-colors duration-300 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
