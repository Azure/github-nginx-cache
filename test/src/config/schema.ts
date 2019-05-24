import convict from "convict";

export type Env = "test";

export const configSchema = convict({
  env: {
    doc: "The application environment.",
    format: ["test"],
    default: "test",
    env: "NODE_ENV",
  },
});
