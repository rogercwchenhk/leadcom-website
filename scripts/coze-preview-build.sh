#!/usr/bin/env bash
set -euo pipefail

# 静态网站无需构建步骤，只需验证静态文件存在
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

if [ ! -f "$PROJECT_DIR/index.html" ]; then
    echo "Error: index.html not found"
    exit 1
fi

echo "Static site build check passed"
