import { ASSET_CDN_URL } from "@/constants/api";

const ABSOLUTE_URL = /^(https?:|data:|blob:)/i;

export const normalizeObjectKey = (objectKey) =>
  String(objectKey ?? "")
    .trim()
    .replace(/\\\//g, "/")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

export function assetUrl(objectKey) {
  if (!objectKey || typeof objectKey !== "string") return null;
  if (ABSOLUTE_URL.test(objectKey.trim())) return objectKey.trim();
  const key = normalizeObjectKey(objectKey);
  if (!key) return null;
  return `${ASSET_CDN_URL}/${key.split("/").map(encodeURIComponent).join("/")}`;
}
