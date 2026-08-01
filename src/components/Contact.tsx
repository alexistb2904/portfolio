"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteBrand } from "@/config/brand";
import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EMAIL = "alexistb2904@gmail.com";
type SubmissionState = "idle" | "sending" | "success" | "error" | "rate_limited";

export function Contact() {
	const { copy } = useLanguage();
	const root = useRef<HTMLElement>(null);
	const [copied, setCopied] = useState(false);
	const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

	useEffect(() => {
		if (!copied) return;
		const timeout = window.setTimeout(() => setCopied(false), 2400);
		return () => window.clearTimeout(timeout);
	}, [copied]);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!root.current) return;

			const title = root.current.querySelectorAll(".contact-title span");
			const copyItems = root.current.querySelectorAll(".contact-copy > *");
			gsap.set(title, { yPercent: 115 });
			gsap.set(copyItems, { y: 34, autoAlpha: 0 });

			ScrollTrigger.create({
				trigger: ".contact-title",
				start: "top 80%",
				once: true,
				onEnter: () =>
					gsap.to(title, {
						yPercent: 0,
						duration: 1.05,
						stagger: 0.12,
						ease: "power4.out",
					}),
			});
			ScrollTrigger.create({
				trigger: ".contact-copy",
				start: "top 80%",
				once: true,
				onEnter: () =>
					gsap.to(copyItems, {
						y: 0,
						autoAlpha: 1,
						duration: 0.75,
						stagger: 0.08,
						ease: "power3.out",
					}),
			});
		},
		{ scope: root }
	);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
		} catch {
			const textarea = document.createElement("textarea");
			textarea.value = EMAIL;
			textarea.style.position = "fixed";
			textarea.style.opacity = "0";
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			textarea.remove();
		}
		setCopied(true);
	};

	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		setSubmissionState("sending");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(Object.fromEntries(formData)),
			});
			if (response.status === 429) {
				setSubmissionState("rate_limited");
				return;
			}
			if (!response.ok) throw new Error("Contact request failed");
			form.reset();
			setSubmissionState("success");
		} catch {
			setSubmissionState("error");
		}
	};

	const formCopy = copy.contact.form;
	const feedback =
		submissionState === "success" ? formCopy.success : submissionState === "rate_limited" ? formCopy.rateLimited : submissionState === "error" ? formCopy.error : null;

	return (
		<section ref={root} id="contact" className="contact-section" aria-labelledby="contact-title" data-cursor-tone="ink">
			<div className="page-shell contact-shell">
				<div className="section-cue section-cue-rose">
					<span>{copy.contact.index}</span>
					<p>{copy.contact.label}</p>
				</div>

				<p className="contact-eyebrow">
					<i aria-hidden="true" />
					{copy.contact.eyebrow}
				</p>
				<h2 id="contact-title" className="contact-title">
					<span>{copy.contact.titleA}</span>
					<span>{copy.contact.titleB}</span>
				</h2>

				<div className="contact-copy">
					<div className="contact-direct">
						<p>{copy.contact.body}</p>
						<div className="contact-actions">
							<a href={`mailto:${EMAIL}`} data-cursor-label="SEND">
								<span>{copy.contact.email}</span>
								<strong>{EMAIL}</strong>
								<ArrowUpRight aria-hidden="true" />
							</a>
							<button type="button" onClick={copyEmail} aria-live="polite">
								{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
								{copied ? copy.contact.copied : copy.contact.copy}
							</button>
						</div>
					</div>

					<form className="contact-form" onSubmit={submitForm} aria-describedby="contact-form-feedback">
						<div className="contact-form-row">
							<label>
								<span>{formCopy.firstName}</span>
								<input name="firstName" autoComplete="given-name" placeholder={formCopy.firstNamePlaceholder} required maxLength={80} />
							</label>
							<label>
								<span>{formCopy.lastName}</span>
								<input name="lastName" autoComplete="family-name" placeholder={formCopy.lastNamePlaceholder} required maxLength={80} />
							</label>
						</div>
						<label>
							<span>{formCopy.email}</span>
							<input name="email" type="email" autoComplete="email" placeholder={formCopy.emailPlaceholder} required maxLength={254} />
						</label>
						<label>
							<span>{formCopy.message}</span>
							<textarea name="message" rows={5} placeholder={formCopy.messagePlaceholder} required maxLength={3000} />
						</label>
						<label className="contact-honeypot" aria-hidden="true">
							Website
							<input name="website" tabIndex={-1} autoComplete="off" />
						</label>
						<button className="contact-submit" type="submit" disabled={submissionState === "sending"}>
							{submissionState === "sending" ? formCopy.sending : formCopy.submit}
							<Send aria-hidden="true" />
						</button>
						<p
							id="contact-form-feedback"
							className={`contact-feedback${submissionState === "error" || submissionState === "rate_limited" ? " is-error" : ""}`}
							role="status"
							aria-live="polite">
							{feedback}
						</p>
					</form>
				</div>
			</div>

			<footer className="site-footer page-shell">
				<a className="footer-logo" href="#top" aria-label="Alexis Thierry-Bellefond — home">
					<img src={siteBrand.logoSrc} alt={siteBrand.logoAlt} />
				</a>
				<p>{copy.footer.line}</p>
				<div className="footer-links">
					<a href="https://github.com/alexistb2904" target="_blank" rel="noreferrer">
						GitHub <ArrowUpRight aria-hidden="true" />
					</a>
					<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noreferrer">
						LinkedIn <ArrowUpRight aria-hidden="true" />
					</a>
				</div>
				<div className="footer-bottom">
					<span>© {new Date().getFullYear()} Alexis Thierry-Bellefond</span>
					<span>{copy.footer.location}</span>
					<a href="#top">
						{copy.footer.backToTop} <ArrowUp aria-hidden="true" />
					</a>
				</div>
			</footer>
		</section>
	);
}
