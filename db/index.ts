import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type D1DatabaseLike = Parameters<typeof drizzle>[0];

type CloudflareEnv = {
  DB?: D1DatabaseLike;
};

export function getDb(env?: CloudflareEnv) {
  if (!env?.DB) {
    throw new Error(
      "Database binding `DB` is unavailable in this deployment environment."
    );
  }

  return drizzle(env.DB, { schema });
}