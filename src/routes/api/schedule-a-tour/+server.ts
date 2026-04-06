import { json, fail } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";

// --- Rate Limiting ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
        return false;
    }
    return ++entry.count > 5;
}

// --- Schema ---
const str = (min?: number, msg?: string) => {
    let s = z.string().trim();
    return min ? s.min(min, msg).max(50) : s.max(50).optional();
};

const tourSchema = z.object({
    first_name: str(1, "First name is required"),
    last_name: str(1, "Last name is required"),
    email: z.string().trim().email("Invalid email address"),
    phone: z
        .string()
        .trim()
        .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be XXX-XXX-XXXX format"),
    contact_method: z.enum(["email", "phone", "text"]),
    tour_date: z.string().trim().min(1, "Tour date is required"),
    start_date: z.string().trim().min(1, "Start date is required"),
    child1_name: str(1, "Child's name is required"),
    child1_dob: z.string().trim().min(1, "Child's birthdate is required"),
    child2_name: str(),
    child2_dob: z.string().trim().optional(),
    child3_name: str(),
    child3_dob: z.string().trim().optional(),
    comments: z.string().trim().max(1000).optional(),
});

type TourForm = z.infer<typeof tourSchema>;

const sanitize = (value: unknown): string =>
    sanitizeHtml(String(value ?? "").trim(), {
        allowedTags: [],
        allowedAttributes: {},
    });

export const POST = async ({ request, getClientAddress }: RequestEvent) => {
    if (isRateLimited(getClientAddress())) {
        return json(
            { error: "Too many submissions. Please try again in a minute." },
            { status: 429 },
        );
    }

    const data = await request.formData();

    if (data.get("website")) return json({ success: true });

    const raw = Object.fromEntries(data.entries()) as Record<string, string>;
    const parsed = tourSchema.safeParse(raw);

    if (!parsed.success) {
        return json(
            { errors: parsed.error.flatten().fieldErrors, values: raw },
            { status: 400 },
        );
    }

    const clean = Object.fromEntries(
        Object.entries(parsed.data).map(([k, v]) => [k, sanitize(v)]),
    ) as TourForm;

    console.log("Tour request received:", clean);

    return json({ success: true });
};
