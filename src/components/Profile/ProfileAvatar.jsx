import { assetUrl } from "../../utils/assets";
import { useEffect, useState } from "react";

export const getInitials = (firstName, lastName, fallbackName) => {
  const parts = [firstName, lastName].filter(Boolean);
  const source = parts.length ? parts : String(fallbackName ?? "").trim().split(/\s+/);
  return source
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

export const getAvatarSources = (schoolAdmin) =>
  [assetUrl(schoolAdmin?.current_avatar?.object_key), schoolAdmin?.current_avatar?.url].filter(
    (source, index, sources) => Boolean(source) && sources.indexOf(source) === index,
  );


export default function ProfileAvatar({
  src,
  initials,
  size = "2.5rem",
  shape = "circle",
  fit = "cover",
  className = "",
  alt = "",
}) {
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);
  const sourceKey = sources.join("|");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setAttempt(0);
  }, [sourceKey]);

  const currentSource = sources[attempt];
  const showImage = Boolean(currentSource);

  return (
    <span
      className={`profile-avatar d-inline-grid place-items-center flex-shrink-0 overflow-hidden fw-semibold ${
        shape === "circle" ? "rounded-circle" : "profile-avatar--rounded"
      } ${showImage && fit === "contain" ? "white-bg" : "bg-primary-100 text-primary-600"} ${className}`}
      style={{ width: size, height: size, fontSize: `calc(${size} * 0.36)` }}
    >
      {showImage ? (
        <img
          key={currentSource}
          src={currentSource}
          alt={alt}
          className={`w-100 h-100 ${fit === "contain" ? "object-fit-contain" : "object-fit-cover"}`}
          onError={() => setAttempt((current) => current + 1)}
        />
      ) : (
        <span aria-hidden={Boolean(alt)}>{initials || "?"}</span>
      )}
    </span>
  );
}
