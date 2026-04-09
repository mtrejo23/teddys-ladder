import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { Resend } from "resend";
import { RESEND_API_KEY } from "$env/static/private";

// --- Resend (module-level, not recreated per request) ---
const resend = new Resend(RESEND_API_KEY);

// --- Rate Limiting ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkLimit(key: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(key, { count: 1, resetAt: now + 60_000 });
        return false;
    }
    if (++entry.count > 5) return true;
    return false;
}

function isRateLimited(ip: string, email?: string): boolean {
    // Prune map if it grows too large
    if (rateLimitMap.size > 10_000) rateLimitMap.clear();
    const keys = [ip, email].filter(Boolean) as string[];
    return keys.some((key) => checkLimit(key));
}

// --- Schema ---
const isoDate = z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid date (YYYY-MM-DD)");

// HTML forms always submit empty strings for unfilled fields, so we
// transform "" -> undefined before applying optional validation.
const optionalDate = z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(
        z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid date (YYYY-MM-DD)")
            .optional(),
    );

const optionalShortStr = z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(z.string().max(100).optional());

const requiredShortStr = (msg: string) =>
    z.string().trim().min(1, msg).max(100);

const tourSchema = z
    .object({
        first_name: requiredShortStr("First name is required"),
        last_name: requiredShortStr("Last name is required"),
        email: z.string().trim().email("Invalid email address"),
        phone: z
            .string()
            .trim()
            .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be XXX-XXX-XXXX format"),
        contact_method: z.enum(["email", "phone", "text"]).default("email"),
        tour_date: isoDate,
        start_date: isoDate,
        child1_name: requiredShortStr("Child's name is required"),
        child1_dob: isoDate,
        child2_name: optionalShortStr,
        child2_dob: optionalDate,
        child3_name: optionalShortStr,
        child3_dob: optionalDate,
        comments: z.string().trim().max(1000).optional(),
    })
    .refine((d) => !d.child2_name || !!d.child2_dob, {
        message: "Child 2 birthdate is required if name is provided",
        path: ["child2_dob"],
    })
    .refine((d) => !d.child3_name || !!d.child3_dob, {
        message: "Child 3 birthdate is required if name is provided",
        path: ["child3_dob"],
    });

type TourForm = z.infer<typeof tourSchema>;

// --- Sanitization ---
const sanitizeStr = (value: unknown): string =>
    sanitizeHtml(String(value ?? "").trim(), {
        allowedTags: [],
        allowedAttributes: {},
    });

function sanitizeForm(data: TourForm): TourForm {
    return Object.fromEntries(
        Object.entries(data).map(([k, v]) => [
            k,
            typeof v === "string" ? sanitizeStr(v) : v,
        ]),
    ) as TourForm;
}

// --- Email Builder ---
function buildEmailHtml(clean: TourForm): string {
    const children = (
        [
            { name: clean.child1_name, dob: clean.child1_dob },
            { name: clean.child2_name, dob: clean.child2_dob },
            { name: clean.child3_name, dob: clean.child3_dob },
        ] as { name?: string; dob?: string }[]
    )
        .filter((c) => c.name)
        .map(
            (c, i) =>
                `<p><strong>Child ${i + 1}:</strong> ${c.name} (DOB: ${c.dob})</p>`,
        )
        .join("");

    return `
        <h2>New Tour Request</h2>
        <p><strong>Name:</strong> ${clean.first_name} ${clean.last_name}</p>
        <p><strong>Email:</strong> ${clean.email}</p>
        <p><strong>Phone:</strong> ${clean.phone}</p>
        <p><strong>Contact preference:</strong> ${clean.contact_method}</p>
        <p><strong>Tour date:</strong> ${clean.tour_date}</p>
        <p><strong>Start date:</strong> ${clean.start_date}</p>
        <hr>
        ${children}
        ${clean.comments ? `<hr><p><strong>Comments:</strong><br>${clean.comments}</p>` : ""}
    `;
}

// --- Handler ---
export const POST = async ({ request, getClientAddress }: RequestEvent) => {
    const data = await request.formData();

    // Honeypot
    if (data.get("website")) return json({ success: true });

    const raw = Object.fromEntries(data.entries()) as Record<string, string>;
    const parsed = tourSchema.safeParse(raw);

    if (!parsed.success) {
        return json(
            { errors: parsed.error.flatten().fieldErrors, values: raw },
            { status: 400 },
        );
    }

    // Rate limit after validation so we have a clean email to key on
    if (isRateLimited(getClientAddress(), parsed.data.email)) {
        return json(
            { error: "Too many submissions. Please try again in a minute." },
            { status: 429 },
        );
    }

    const clean = sanitizeForm(parsed.data);

    const { error } = await resend.emails.send({
        from: "Teddy's Ladder <onboarding@resend.dev>",
        to: "teddyladder@gmail.com",
        subject: `New Tour Request - ${clean.first_name} ${clean.last_name}`,
        html: buildEmailHtml(clean),
    });

    if (error) {
        console.error("Resend error:", error);
        return json({ error: "Failed to send email" }, { status: 500 });
    }

    return json({ success: true });
};
