import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DISCORD_USER_ID = "338637880039833610";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_MAX_MESSAGES = 2;
const RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000;

const rateLimitStore = globalThis as typeof globalThis & {
	contactAttemptsByIp?: Map<string, number[]>;
};
const contactAttemptsByIp = rateLimitStore.contactAttemptsByIp ?? new Map<string, number[]>();

rateLimitStore.contactAttemptsByIp = contactAttemptsByIp;

function text(value: unknown, maximumLength: number): string {
	return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

function getClientIp(request: Request) {
	const forwardedFor = request.headers.get("x-forwarded-for");

	return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function consumeContactAttempt(ip: string, now: number) {
	const windowStart = now - RATE_LIMIT_WINDOW_MS;
	const recentAttempts = (contactAttemptsByIp.get(ip) ?? []).filter((attempt) => attempt > windowStart);

	if (recentAttempts.length >= RATE_LIMIT_MAX_MESSAGES) {
		return {
			allowed: false,
			retryAfterSeconds: Math.max(1, Math.ceil((recentAttempts[0] + RATE_LIMIT_WINDOW_MS - now) / 1000)),
		};
	}

	recentAttempts.push(now);
	contactAttemptsByIp.set(ip, recentAttempts);

	return { allowed: true, retryAfterSeconds: 0 };
}

export async function POST(request: Request) {
	let body: Record<string, unknown>;

	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
	}

	const firstName = text(body.firstName, 80);
	const lastName = text(body.lastName, 80);
	const email = text(body.email, 254).toLowerCase();
	const message = text(body.message, 3000);
	const honeypot = text(body.website, 200);

	if (honeypot) {
		return NextResponse.json({ ok: true });
	}

	if (!firstName || !lastName || !message || !EMAIL_PATTERN.test(email)) {
		return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
	}

	const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

	if (!webhookUrl) {
		console.error("DISCORD_WEBHOOK_URL is not configured.");

		return NextResponse.json({ error: "Contact service unavailable." }, { status: 503 });
	}

	const rateLimit = consumeContactAttempt(getClientIp(request), Date.now());

	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: "Too many contact messages." },
			{
				status: 429,
				headers: { "Retry-After": rateLimit.retryAfterSeconds.toString() },
			}
		);
	}

	const fullName = `${firstName} ${lastName}`;
	const receivedAt = new Date();

	try {
		const discordResponse = await fetch(`${webhookUrl}?wait=true`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "Portfolio Contact",

				content: `<@${DISCORD_USER_ID}> Nouveau message reçu depuis ton portfolio.`,

				allowed_mentions: {
					parse: [],
					users: [DISCORD_USER_ID],
				},

				embeds: [
					{
						title: "📨 Nouveau message",
						description: message,
						color: 0xff4c00,

						fields: [
							{
								name: "Nom",
								value: fullName,
								inline: true,
							},
							{
								name: "Adresse e-mail",
								value: email,
								inline: true,
							},
						],

						footer: {
							text: "Formulaire de contact du portfolio",
						},

						timestamp: receivedAt.toISOString(),
					},
				],
			}),
			signal: AbortSignal.timeout(10_000),
		});

		if (!discordResponse.ok) {
			const discordError = await discordResponse.text().catch(() => "Unable to read Discord response.");

			console.error("Discord webhook rejected the message:", {
				status: discordResponse.status,
				response: discordError,
			});

			return NextResponse.json({ error: "Contact delivery failed." }, { status: 502 });
		}
	} catch (error) {
		if (error instanceof Error && error.name === "TimeoutError") {
			console.error("Discord webhook request timed out.");
		} else {
			console.error("Discord webhook request failed:", error);
		}

		return NextResponse.json({ error: "Contact delivery failed." }, { status: 502 });
	}

	return NextResponse.json({ ok: true, message: "Message sent successfully." }, { status: 200 });
}
