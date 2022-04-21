import convict from "convict";
import convict_format_with_validator from "convict-format-with-validator";

export type Env = "test";

convict.addFormats(convict_format_with_validator);

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
