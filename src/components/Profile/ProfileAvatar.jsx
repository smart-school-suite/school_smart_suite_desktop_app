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

export const getAvatarUrl = (schoolAdmin) => schoolAdmin?.current_avatar?.url ?? null;

export default function ProfileAvatar({ src, initials, size = "2.5rem", className = "", alt = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={`profile-avatar d-inline-grid place-items-center flex-shrink-0 rounded-circle overflow-hidden bg-primary-100 text-primary-600 fw-semibold ${className}`}
      style={{ width: size, height: size, fontSize: `calc(${size} * 0.36)` }}
    >
      {showImage ? (
        <img src={src} alt={alt} className="w-100 h-100 object-fit-cover" onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden={Boolean(alt)}>{initials || "?"}</span>
      )}
    </span>
  );
}
