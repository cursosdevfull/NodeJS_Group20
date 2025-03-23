import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    APP_HOST: z.string().default("localhost"),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string().default("user"),
    DB_PASS: z.string().default("12345"),
    DB_NAME: z.string().default("db"),
    DB_SYNC: z.preprocess(
        (val) => val === "true" ? true : val === "false" ? false : val,
        z.boolean().default(false)
    ),
    DB_LOGG: z.preprocess(
        (val) => val === "true" ? true : val === "false" ? false : val,
        z.boolean().default(false)
    ),
    DB_POOL: z.coerce.number().default(10),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);