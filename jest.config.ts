import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Handles CSS imports
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @/ to src folder
  },
  collectCoverage: true,
  // collectCoverageFrom: [
  // 'src/**/*.{js,ts,tsx}', // Include all JS, TS, and TSX files in src/
  //   '!src/**/*.d.ts', // Exclude TypeScript definition files
  //   '!src/**/*.test.{js,ts,tsx}', // Exclude test files
  //   '!src/**/index.{js,ts,tsx}', // Exclude index files if not needed
  // ],
  coverageThreshold: { global: { branches: 50, functions: 30, lines: 50, statements: 50 } },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
