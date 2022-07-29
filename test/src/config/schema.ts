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
    default: "http://localhost:8000/api/", // *.vcap.me resolves to 127.0.0.1 so it can be used for testing subdomain requests to localhost
    env: "localApiProxyUrl",
  },
});
