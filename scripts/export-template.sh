#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_ROOT="$(cd "$REPO_ROOT/.." && pwd)/modeling-template"

EXTRA_EXCLUDES=(
  "dist/*"
  "todo/*"
  ".DS_Store"
  "ts-visualizer/node_modules/*"
  "ts-visualizer/docs/models/*"
  "python-model/Black-Scholes-Model/*"
  "ts-visualizer/src/models/BlackScholes.tsx"
)

should_skip() {
  local path="$1"
  for pattern in "${EXTRA_EXCLUDES[@]}"; do
    if [[ "$path" == $pattern ]]; then
      return 0
    fi
    if [[ "$pattern" == */* && "$path" == ${pattern%/*}/* ]]; then
      return 0
    fi
  done
  return 1
}

if [[ -e "$DEST_ROOT" ]]; then
  printf 'Destination %s already exists. Please remove or rename it.\n' "$DEST_ROOT" >&2
  exit 1
fi

mkdir -p "$DEST_ROOT"

while IFS= read -r -d '' path; do
  should_skip "$path" && continue
  src="$REPO_ROOT/$path"
  dest="$DEST_ROOT/$path"
  mkdir -p "$(dirname "$dest")"
  cp -a "$src" "$dest"
done < <(git -C "$REPO_ROOT" ls-files -co --exclude-standard -z)

printf 'Copied template files to %s\n' "$DEST_ROOT"