// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const coverageFile = path.resolve(__dirname, '../coverage/coverage-summary.json');
const jestConfigFile = path.resolve(__dirname, '../jest.config.ts');

if (!fs.existsSync(coverageFile)) {
  console.error('🚨 No coverage report found! Run tests first: `npm run test -- --coverage`');
  process.exit(1);
}

const coverageData = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));

// Extract the current coverage percentages
const newThresholds = {
  branches: Math.floor(coverageData.total.branches.pct),
  functions: Math.floor(coverageData.total.functions.pct),
  lines: Math.floor(coverageData.total.lines.pct),
  statements: Math.floor(coverageData.total.statements.pct),
};

// Read Jest config
let jestConfig = fs.readFileSync(jestConfigFile, 'utf8');

// Find and parse the coverageThreshold section
const coverageThresholdRegex = /coverageThreshold:\s*{([^}]+)}/;
const match = jestConfig.match(coverageThresholdRegex);

if (match) {
  // Override only the specific values (branches, functions, lines, statements)
  const newThresholdsStr = `global: { branches: ${newThresholds.branches}, functions: ${newThresholds.functions}, lines: ${newThresholds.lines}, statements: ${newThresholds.statements} }`;

  // Update the coverageThreshold in the Jest config
  jestConfig = jestConfig.replace(coverageThresholdRegex, `coverageThreshold: { ${newThresholdsStr}`);
} else {
  console.error('🚨 coverageThreshold section not found in Jest config.');
  process.exit(1);
}

// Write back the updated Jest config
fs.writeFileSync(jestConfigFile, jestConfig, 'utf8');

console.log('✅ Jest coverage thresholds updated:', newThresholds);