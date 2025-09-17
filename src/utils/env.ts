import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url().nonempty("DATABASE_URL is required"),
  BETTER_AUTH_SECRET: z.string().nonempty("BETTER_AUTH_SECRET is required"),
  GOOGLE_CLIENT_ID: z.string().nonempty("GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().nonempty("GOOGLE_CLIENT_SECRET is required"),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .nonempty("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required"),
  STRIPE_SECRET_KEY: z.string().nonempty("STRIPE_SECRET_KEY is required"),
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .nonempty("STRIPE_WEBHOOK_SECRET is required"),
  NEXT_PUBLIC_APP_URL: z.url().nonempty("NEXT_PUBLIC_APP_URL is required"),
});

export const env = envSchema.parse(process.env);
