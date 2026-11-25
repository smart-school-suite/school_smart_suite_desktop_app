// components/Network/NetworkStatusToast.jsx
import { RefreshCw, Wifi, WifiOff, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import useNetworkStatus from "../../hooks/network/useNetworkStatus";

const BACK_ONLINE_VISIBLE_MS = 3500;
const EXIT_ANIMATION_MS = 220;

const TONES = {
  offline: {
    icon: WifiOff,
    color: "#dc2626",
    tint: "#fef2f2",
    darkTint: "rgba(220, 38, 38, 0.15)",
    title: "You're offline",
    description:
      "Check your internet connection. We'll reconnect automatically when it's back.",
  },
  online: {
    icon: Wifi,
    color: "#16a34a",
    tint: "#ecfdf5",
    darkTint: "rgba(22, 163, 74, 0.15)",
    title: "Back online",
    description: "Your connection has been restored. You're all set.",
  },
};

/**
 * A small card pinned to the bottom centre of the window that says when the
 * app loses its internet connection, and briefly when it comes back.
 * It stays up for as long as the app is offline.
 */
function NetworkStatusToast() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { isOnline, isChecking, retry } = useNetworkStatus();
  // "offline" | "online" | null
  const [status, setStatus] = useState(isOnline ? null : "offline");
  const [leaving, setLeaving] = useState(false);
  const wasOnline = useRef(isOnline);
  const hideTimer = useRef(null);
  const exitTimer = useRef(null);

  const clearTimers = () => {
    clearTimeout(hideTimer.current);
    clearTimeout(exitTimer.current);
  };

  const dismiss = () => {
    clearTimers();
    setLeaving(true);
    exitTimer.current = setTimeout(() => {
      setStatus(null);
      setLeaving(false);
    }, EXIT_ANIMATION_MS);
  };

  useEffect(() => {
    if (wasOnline.current === isOnline) return;
    wasOnline.current = isOnline;
    clearTimers();
    setLeaving(false);
    if (!isOnline) {
      setStatus("offline");
      return;
    }
    setStatus("online");
    hideTimer.current = setTimeout(dismiss, BACK_ONLINE_VISIBLE_MS);
  }, [isOnline]);

  useEffect(() => clearTimers, []);

  if (!status) return null;

  const tone = TONES[status];
  const ToneIcon = tone.icon;
  const offline = status === "offline";

  return createPortal(
    <div className="network-toast-wrapper">
      <div
        role={offline ? "alert" : "status"}
        aria-live={offline ? "assertive" : "polite"}
        className={`network-toast ${leaving ? "network-toast-leave" : ""} ${
          darkMode
            ? "dark-bg-light dark-mode-border text-white"
            : "bg-white border"
        } shadow-sm`}
      >
        <span
          className="network-toast-icon"
          style={{
            color: tone.color,
            backgroundColor: darkMode ? tone.darkTint : tone.tint,
          }}
        >
          <ToneIcon size={18} strokeWidth={1.75} />
          {offline && (
            <span
              className="network-toast-pulse"
              style={{ borderColor: tone.color }}
            />
          )}
        </span>

        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <span className="fw-semibold font-size-sm">{tone.title}</span>
          <span
            className={`network-toast-small fw-light ${
              darkMode ? "dark-mode-text" : "text-muted"
            }`}
          >
            {offline && isChecking ? "Trying to reconnect…" : tone.description}
          </span>
        </div>

        {offline ? (
          <button
            type="button"
            className="network-toast-action primary-background text-white network-toast-small"
            onClick={retry}
            disabled={isChecking}
          >
            <RefreshCw
              size={14}
              strokeWidth={2}
              className={isChecking ? "network-toast-spin" : ""}
            />
            <span>{isChecking ? "Checking" : "Retry"}</span>
          </button>
        ) : (
          <button
            type="button"
            className={`network-toast-close ${darkMode ? "text-white" : ""}`}
            onClick={dismiss}
            aria-label="Dismiss"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default NetworkStatusToast;
