import Github from "@octokit/rest";

import { configuration } from "./config";
import { xCacheKey } from "./x-cache-key-plugin";
import { delay, getHeader } from "./utils";

Github.plugin(xCacheKey);

describe("API", () => {
  const github = new Github({
    baseUrl: configuration.localApiProxyUrl,
  });

  it("should go to github", async () => {
    const a = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": Math.random() },
    } as any);
    expect(getHeader(a, "x-cached")).toMatchInlineSnapshot(`"MISS"`);
  });

  it("should HIT for immediate re-request", async () => {
    const key = Math.random();

    const a = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": key },
    } as any);

    expect(getHeader(a, "x-cached")).toMatchInlineSnapshot(`"MISS"`);

    const b = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": key },
    } as any);

    expect(getHeader(b, "x-cached")).toMatchInlineSnapshot(`"HIT"`);
  });

  it("should REVALIDATE after ~2 seconds", async () => {
    const key = Math.random();

    const a = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": key },
    } as any);

    expect(getHeader(a, "x-cached")).toMatchInlineSnapshot(`"MISS"`);

    await delay(2000);

    const b = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": key },
    } as any);

    expect(getHeader(b, "x-cached")).toMatchInlineSnapshot(`"REVALIDATED"`);
  });

  it("REVALIDATE should not affect API limit", async () => {
    const key = Math.random();

    const a = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": key },
    } as any);

    await delay(2000);

    const b = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": key },
    } as any);

    expect(getHeader(a, "x-ratelimit-remaining")).toEqual(getHeader(b, "x-ratelimit-remaining"));
  });

  it("requests with different x-cache-key should have different caches", async () => {
    const a = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": Math.random() },
    } as any);

    expect(getHeader(a, "x-cached")).toMatchInlineSnapshot(`"MISS"`);

    const b = await github.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": Math.random() },
    } as any);

    expect(getHeader(b, "x-cached")).toMatchInlineSnapshot(`"MISS"`);
  });
});
