import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Eye, ImageUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileAvatar from "./ProfileAvatar";

export default function ProfilePhotoMenu({
  photo,
  src,
  initials,
  name,
  size = "7rem",
  shape = "circle",
  fit = "cover",
  ringClassName = "",
  portal = false,
}) {
  const noun = photo.noun ?? "photo";
  const subject = noun === "photo" ? "profile photo" : "school logo";
  const roundClass = shape === "circle" ? "rounded-circle" : "profile-avatar--rounded";
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    transform: false,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: "menu" }),
  ]);

  const run = (action) => () => {
    setIsOpen(false);
    action();
  };

  const items = [
    photo.hasPhoto && {
      key: "view",
      label: `View ${noun}`,
      Icon: Eye,
      onClick: photo.openViewer,
    },
    {
      key: "upload",
      label: photo.hasPhoto ? `Change ${noun}` : `Upload ${noun}`,
      Icon: ImageUp,
      onClick: photo.openPicker,
    },
    photo.hasPhoto && {
      key: "remove",
      label: `Remove ${noun}`,
      Icon: Trash2,
      onClick: photo.requestRemove,
      danger: true,
    },
  ].filter(Boolean);

  return (
    <div className="position-relative d-inline-block">
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`profile-photo-trigger p-0 border-0 bg-transparent ${roundClass} ${ringClassName}`}
        aria-label={photo.hasPhoto ? `${subject.charAt(0).toUpperCase()}${subject.slice(1)} options` : `Add a ${subject}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <ProfileAvatar
          src={src}
          initials={initials}
          size={size}
          shape={shape}
          fit={fit}
          alt={name ? (noun === "photo" ? `${name}'s profile photo` : `${name} logo`) : ""}
        />
        <span
          className={`profile-photo-trigger__overlay position-absolute top-0 start-0 w-100 h-100 d-grid place-items-center text-white ${roundClass}`}
        >
          <Camera size={20} strokeWidth={1.75} />
        </span>
        <span className="profile-photo-trigger__badge position-absolute d-grid place-items-center rounded-circle text-white primary-background">
          <Camera size={14} strokeWidth={2} />
        </span>
      </button>

      <MenuLayer portal={portal}>
        <AnimatePresence>
          {isOpen && (
            <FloatingFocusManager context={context} modal={false}>
              <motion.div
                ref={refs.setFloating}
                style={{ ...floatingStyles, zIndex: 1100 }}
                {...getFloatingProps()}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className={`profile-photo-menu d-flex flex-column p-1 rounded-3 font-size-sm ${
                  darkMode ? "dark-bg profile-photo-menu--dark" : "white-bg"
                }`}
              >
                {items.map(({ key, label, Icon, onClick, danger }) => (
                  <button
                    key={key}
                    type="button"
                    role="menuitem"
                    onClick={run(onClick)}
                    className={`profile-photo-menu__item d-flex align-items-center gap-2 w-100 px-2 border-0 rounded-2 text-start lh-none ${
                      danger
                        ? "text-red-600 hover-bg-red-50"
                        : darkMode
                          ? "text-iron-200 hover-bg-iron-900"
                          : "text-iron-700 hover-bg-iron-100"
                    }`}
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.75}
                      className="flex-shrink-0"
                    />
                    <span>{label}</span>
                  </button>
                ))}
              </motion.div>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </MenuLayer>
    </div>
  );
}

function MenuLayer({ portal, children }) {
  return portal ? <FloatingPortal>{children}</FloatingPortal> : children;
}
