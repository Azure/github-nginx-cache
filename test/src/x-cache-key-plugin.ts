import Octokit from "@octokit/rest";

export const xCacheKey: Octokit.Plugin = (octokit, options: { cacheKey?: string } & Octokit.Options) => {
  octokit.hook.wrap("request", async (request, requestOptions) => {
    const cacheKey: string | undefined = options.cacheKey || (requestOptions.request as any).cacheKey;

    const augmentedOptions = cacheKey
      ? {
          ...requestOptions,
          headers: { ...requestOptions.headers, "x-cache-key": cacheKey },
        }
      : requestOptions;

    const response = await request(augmentedOptions);

    return response;
  });
};
