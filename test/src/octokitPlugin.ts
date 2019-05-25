import Octokit from "@octokit/rest";

export const xCacheKey: Octokit.Plugin = (octokit, options: { cacheKey?: string } & Octokit.Options) => {
  octokit.hook.wrap("request", async (request, requestOptions) => {
    const augmentedOptions = options.cacheKey
      ? {
          ...requestOptions,
          headers: { ...requestOptions.headers, "x-cache-key": options.cacheKey },
        }
      : requestOptions;

    const response = await request(augmentedOptions);

    return response;
  });
};
