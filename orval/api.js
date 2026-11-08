// Fetch openapi.json with curl, then run orval. Works on macOS, Linux and Windows 10+.
// Usage: npm run api -- <openapi-url>
import { execFileSync } from 'node:child_process';
import { generate } from 'orval';

const url = process.argv[2];
if (!url) {
  console.error('Usage: npm run api -- <openapi-url>');
  process.exit(1);
}

try {
  execFileSync('curl', ['-fsSLk', '-o', 'openapi.json', url], { stdio: 'inherit' });
} catch {
  process.exit(1);
}

// Uses the local orval package and orval.config.ts from the project root
await generate();
