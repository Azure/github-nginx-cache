import Github from "@octokit/rest";

import { configuration } from "./config";
import { getHeader } from "./utils";
import { xCacheKey } from "./x-cache-key-plugin";

describe("xCacheKey", () => {
  it("requests with different x-cache-key should have different caches", async () => {
    const githubA = new (Github.plugin([xCacheKey]))({
      baseUrl: configuration.localApiProxyUrl,
      cacheKey: "a",
    });

    const a = await githubA.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      request: { cacheKey: Math.random() },
    } as any);

    expect(getHeader(a, "x-cached")).toMatchInlineSnapshot(`"MISS"`);

    const githubB = new Github({
      baseUrl: configuration.localApiProxyUrl,
      cacheKey: "a",
    });

    const b = await githubB.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": Math.random() },
    } as any);

    expect(getHeader(b, "x-cached")).toMatchInlineSnapshot(`"MISS"`);
  });

  it("requests with same x-cache-key should have different caches", async () => {
    const githubA = new Github({
      baseUrl: configuration.localApiProxyUrl,
      cacheKey: "a",
    });

    const a = await githubA.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": Math.random() },
    } as any);

    expect(getHeader(a, "x-cached")).toMatchInlineSnapshot(`"MISS"`);

    const githubB = new Github({
      baseUrl: configuration.localApiProxyUrl,
      cacheKey: "a",
    });

    const b = await githubB.repos.get({
      owner: "octocat",
      repo: "Hello-World",
      headers: { "x-cache-key": Math.random() },
    } as any);

    expect(getHeader(b, "x-cached")).toMatchInlineSnapshot(`"MISS"`);
  });
});
