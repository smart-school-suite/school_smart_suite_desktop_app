#!/usr/bin/env node
/**
 * Sync app version from a Git tag (e.g. v1.4.0 → 1.4.0) into:
 * - package.json
 * - src-tauri/Cargo.toml
 * - src-tauri/tauri.conf.json
 *
 * Usage: node scripts/sync-version-from-tag.mjs [tag]
 * Tag defaults to GITHUB_REF_NAME when unset.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const rawTag = process.argv[2] || process.env.GITHUB_REF_NAME;
if (!rawTag) {
  console.error("Missing tag. Pass vX.Y.Z or set GITHUB_REF_NAME.");
  process.exit(1);
}

const version = rawTag.replace(/^v/i, "");
if (!/^\d+\.\d+\.\d+([.-][0-9A-Za-z.-]+)?$/.test(version)) {
  console.error(`Invalid version derived from tag "${rawTag}": ${version}`);
  process.exit(1);
}

function patchVersionField(relativePath) {
  const full = resolve(root, relativePath);
  const content = readFileSync(full, "utf8");
  let replaced = false;
  const next = content.replace(
    /("version"\s*:\s*")([^"]*)(")/,
    (_, start, _old, end) => {
      replaced = true;
      return `${start}${version}${end}`;
    }
  );
  if (!replaced) {
    throw new Error(`Could not find "version" field in ${relativePath}`);
  }
  writeFileSync(full, next);
}

function patchCargoToml(relativePath) {
  const full = resolve(root, relativePath);
  const content = readFileSync(full, "utf8");
  let replaced = false;
  const next = content.replace(/^version\s*=\s*"[^"]*"/m, () => {
    replaced = true;
    return `version = "${version}"`;
  });
  if (!replaced) {
    throw new Error(`Could not find version in ${relativePath}`);
  }
  writeFileSync(full, next);
}

patchVersionField("package.json");
patchVersionField("src-tauri/tauri.conf.json");
patchCargoToml("src-tauri/Cargo.toml");

console.log(`Synced version to ${version} from tag ${rawTag}`);
