import { configSchema } from "./schema";

configSchema.validate({ allowed: "strict" });

export const configuration = configSchema.getProperties();
