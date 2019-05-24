// @ts-check

/** @type {jest.InitialOptions} */
const config = {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {},
  collectCoverage: false,
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  setupFiles: ["<rootDir>/jest-setup.ts"],
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  verbose: true,
  testEnvironment: "node",
};

module.exports = config;
