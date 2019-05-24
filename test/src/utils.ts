import Github from "@octokit/rest";

export interface NginxHeaders {
  "x-cached": "REVALIDATED" | "MISS" | "HIT";
}

export const getHeader = (
  response: Github.Response<unknown>,
  header: keyof (NginxHeaders & Github.Response<any>["headers"]),
) => {
  return ((response.headers as unknown) as NginxHeaders & Github.Response<any>["headers"])[header];
};

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
