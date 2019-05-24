import convict from "convict";

export type Env = "test";

export const configSchema = convict({
  env: {
    doc: "The application environment.",
    format: ["test"],
    default: "test",
    env: "NODE_ENV",
  },
  localApiProxyUrl: {
    doc: "URL for caching api proxy",
    format: "url",
    default: "http://api.localhost:8000",
    env: "localApiProxyUrl",
  },
});
