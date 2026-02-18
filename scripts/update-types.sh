#!/usr/bin/env bash
set -e

mkdir -p include

npx supabase gen types \
  --lang=typescript \
  --project-id "$PROJECT_REF" \
  >include/database.ts
