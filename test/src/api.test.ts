import { configuration } from "./config";

describe("API", () => {
  it("to work", async () => {
    expect(configuration.env).toEqual("test");
  });
});
