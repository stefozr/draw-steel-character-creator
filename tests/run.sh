#!/bin/bash
# Run all Draw Steel tests using Node.js built-in test runner
set -e

cd "$(dirname "$0")/.."

echo "=== Draw Steel Character Creator — Test Suite ==="
echo ""

node --test \
  tests/unit/*.test.js \
  tests/data-integrity/*.test.js \
  tests/matrix/*.test.js \
  tests/levelup/*.test.js
