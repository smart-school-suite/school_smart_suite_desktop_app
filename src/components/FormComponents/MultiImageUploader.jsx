import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  GripVertical,
  ImagePlus,
  RotateCcw,
  Star,
  Trash2,
  TriangleAlert,
  UploadCloud,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const tokens = {
  blue: "#0EA7E9",
  blueTint: "#EAF7FD",
  ink: "#083049",
  inkSoft: "rgba(8,48,73,0.62)",
  inkFaint: "rgba(8,48,73,0.38)",
  border: "rgba(8,48,73,0.14)",
  red: "#D92D20",
  redTint: "#FEF3F2",
};

const spring = { type: "spring", stiffness: 420, damping: 32 };

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

const fileSignature = (file) => `${file.name}:${file.size}:${file.lastModified}`;

// Stable key for a picked File, so its position survives re-renders.
const fileKeys = new WeakMap();
let fileKeySeed = 0;
export const getFileKey = (file) => {
  if (!fileKeys.has(file)) {
    fileKeySeed += 1;
    fileKeys.set(file, `new-${fileKeySeed}`);
  }
  return fileKeys.get(file);
};
export const savedImageKey = (id) => `saved-${id}`;

/**
 * Saved and new images in display order. `order` is a list of item keys
 * (savedImageKey(id) / getFileKey(file)); items it does not mention follow in
 * their natural order (saved images first, then new files as picked).
 */
export function orderImageItems({
  order = [],
  existingImages = [],
  removeImageIds = [],
  images = [],
}) {
  const items = [
    ...existingImages.map((image) => ({
      key: savedImageKey(image.id),
      kind: "saved",
      image,
      isRemoved: removeImageIds.includes(image.id),
    })),
    ...images.map((file, index) => ({
      key: getFileKey(file),
      kind: "new",
      file,
      index,
      isRemoved: false,
    })),
  ];
  const byKey = new Map(items.map((item) => [item.key, item]));
  const ordered = order.map((key) => byKey.get(key)).filter(Boolean);
  const seen = new Set(ordered.map((item) => item.key));
  return [...ordered, ...items.filter((item) => !seen.has(item.key))];
}

// Request value for the API's image_order: saved ids and "new:N" (images[N]); the first is the cover.
export function toImageOrderPayload(items) {
  return items
    .filter((item) => !item.isRemoved)
    .map((item) => (item.kind === "saved" ? item.image.id : `new:${item.index}`));
}

// Object URL for a picked file, created and revoked with the component.
export function useFileUrl(file) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return undefined;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return url;
}

function FadeInImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <>
      {!loaded && !failed && (
        <motion.div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(90deg, #f1f4f6 25%, #e6ebef 50%, #f1f4f6 75%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["100% 0", "-100% 0"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      )}
      {failed ? (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "#f1f4f6", color: tokens.inkFaint }}
        >
          <ImagePlus size={20} />
        </div>
      ) : (
        src && (
          <motion.img
            src={src}
            alt={alt}
            draggable={false}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
          />
        )
      )}
    </>
  );
}

function TileButton({ label, onClick, children, danger = false }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="border-0 rounded-circle d-grid shadow-sm"
      style={{
        width: "1.9rem",
        height: "1.9rem",
        placeItems: "center",
        background: "rgba(255,255,255,0.95)",
        color: danger ? tokens.red : tokens.ink,
        cursor: "pointer",
      }}
    >
      {children}
    </motion.button>
  );
}

function ImageTile({
  src,
  alt,
  isCover,
  isNew,
  isRemoved,
  meta,
  onRemove,
  onRestore,
  onPreview,
  onMakeCover,
  reduceMotion,
  dragHandle,
  isLifted = false,
  isPlaceholder = false,
}) {
  const [hovered, setHovered] = useState(false);
  const showActions = (hovered || isLifted) && !isRemoved && !isPlaceholder;
  return (
    <motion.div
      initial={reduceMotion || isLifted ? false : { opacity: 0, scale: 0.85, y: 8 }}
      animate={{
        opacity: isPlaceholder ? 0.35 : 1,
        scale: isLifted && !reduceMotion ? 1.04 : 1,
        rotate: isLifted && !reduceMotion ? -1.5 : 0,
        y: 0,
      }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.8, transition: { duration: 0.18 } }
      }
      transition={spring}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => !isRemoved && onPreview()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // keys pressed on the tile's own buttons (e.g. the reorder grip) are theirs
        if (e.target !== e.currentTarget) return;
        if ((e.key === "Enter" || e.key === " ") && !isRemoved) {
          e.preventDefault();
          onPreview();
        }
        if ((e.key === "Delete" || e.key === "Backspace") && !isRemoved) {
          onRemove();
        }
      }}
      aria-label={`${alt}${isRemoved ? " (will be removed)" : ""}`}
      className="position-relative overflow-hidden rounded-4"
      style={{
        aspectRatio: "4 / 3",
        cursor: isLifted ? "grabbing" : isRemoved ? "default" : "zoom-in",
        boxShadow: isLifted
          ? "0 18px 40px rgba(8,48,73,0.28)"
          : hovered
            ? "0 8px 24px rgba(8,48,73,0.14)"
            : "0 1px 3px rgba(8,48,73,0.08)",
        border: isPlaceholder ? `2px dashed ${tokens.blue}` : "none",
        transition: "box-shadow 160ms ease",
        outline: "none",
      }}
    >
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100"
        animate={{
          scale: hovered && !isRemoved && !reduceMotion ? 1.05 : 1,
          filter: isRemoved ? "grayscale(1)" : "grayscale(0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <FadeInImage src={src} alt={alt} />
      </motion.div>

      <AnimatePresence>
        {showActions && (
          <motion.div
            key="shade"
            className="position-absolute top-0 start-0 w-100 h-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                "linear-gradient(180deg, rgba(8,48,73,0.35) 0%, rgba(8,48,73,0) 45%, rgba(8,48,73,0.45) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <div
        className="position-absolute d-flex flex-row gap-1"
        style={{ top: 8, left: 8 }}
      >
        <AnimatePresence>
          {isCover && !isRemoved && (
            <motion.span
              key="cover"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={spring}
              className="d-flex flex-row align-items-center gap-1 rounded-pill px-2 fw-semibold"
              style={{
                fontSize: "0.65rem",
                height: "1.3rem",
                background: tokens.blue,
                color: "#fff",
              }}
            >
              <Star size={10} fill="#fff" />
              Cover
            </motion.span>
          )}
          {isNew && !isRemoved && (
            <motion.span
              key="new"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={spring}
              className="d-flex align-items-center rounded-pill px-2 fw-semibold"
              style={{
                fontSize: "0.65rem",
                height: "1.3rem",
                background: "rgba(255,255,255,0.95)",
                color: tokens.ink,
              }}
            >
              New
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showActions && (
          <motion.div
            key="actions"
            className="position-absolute d-flex flex-row gap-1"
            style={{ top: 8, right: 8 }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={spring}
          >
            {!isCover && onMakeCover && (
              <TileButton label="Set as cover" onClick={onMakeCover}>
                <Star size={13} />
              </TileButton>
            )}
            <TileButton label="Preview image" onClick={onPreview}>
              <Expand size={13} />
            </TileButton>
            <TileButton label="Remove image" onClick={onRemove} danger>
              <Trash2 size={13} />
            </TileButton>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dragHandle && (showActions || dragHandle.isFocused) && (
          <motion.button
            key="grip"
            type="button"
            ref={dragHandle.ref}
            {...dragHandle.attributes}
            onKeyDown={dragHandle.onKeyDown}
            onClick={(e) => e.stopPropagation()}
            aria-label="Reorder image: press space, then use the arrow keys"
            title="Drag to reorder"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={spring}
            className="position-absolute border-0 rounded-circle d-grid shadow-sm"
            style={{
              right: 8,
              bottom: 8,
              width: "1.9rem",
              height: "1.9rem",
              placeItems: "center",
              background: "rgba(255,255,255,0.95)",
              color: tokens.ink,
              cursor: "grab",
              touchAction: "none",
            }}
          >
            <GripVertical size={13} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showActions && meta && (
          <motion.div
            key="meta"
            className="position-absolute text-white text-truncate"
            style={{ left: 10, right: 44, bottom: 14, fontSize: "0.7rem" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={spring}
          >
            {meta}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRemoved && (
          <motion.div
            key="removed"
            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-2"
            style={{ background: "rgba(255,255,255,0.72)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span
              className="fw-medium"
              style={{ fontSize: "0.72rem", color: tokens.ink }}
            >
              Will be removed
            </span>
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRestore();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-0 rounded-pill px-3 py-1 d-flex flex-row align-items-center gap-1 shadow-sm"
              style={{
                fontSize: "0.72rem",
                background: "#fff",
                color: tokens.blue,
                cursor: "pointer",
              }}
            >
              <RotateCcw size={12} />
              Undo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NewFileTile({ file, ...props }) {
  const url = useFileUrl(file);
  return (
    <ImageTile
      {...props}
      src={url}
      alt={file.name}
      meta={`${file.name} · ${formatSize(file.size)}`}
      isNew
    />
  );
}

// Grid cell that dnd-kit moves; the whole tile is draggable with the pointer.
function SortableTile({ id, disabled, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });
  const [isFocused, setIsFocused] = useState(false);
  const { onKeyDown, ...pointerListeners } = listeners ?? {};
  return (
    <div
      ref={setNodeRef}
      {...(disabled ? {} : pointerListeners)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      {children({
        isPlaceholder: isDragging,
        dragHandle: disabled
          ? null
          : { ref: setActivatorNodeRef, attributes, onKeyDown, isFocused },
      })}
    </div>
  );
}

function LightboxImage({ item }) {
  const fileUrl = useFileUrl(item?.file);
  const src = item?.file ? fileUrl : item?.url;
  if (!src) return null;
  return (
    <img
      src={src}
      alt={item?.label}
      draggable={false}
      className="rounded-4 shadow"
      style={{
        maxWidth: "86vw",
        maxHeight: "78vh",
        objectFit: "contain",
        userSelect: "none",
      }}
    />
  );
}

function Lightbox({ items, index, onIndexChange, onClose }) {
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const isOpen = index !== null && items[index];

  const go = useCallback(
    (step) => {
      if (index === null || items.length < 2) return;
      setDirection(step);
      onIndexChange((index + step + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isOpen, go, onClose]);

  const navButton = (step, Icon, label) => (
    <motion.button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        go(step);
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="border-0 rounded-circle d-grid position-absolute top-50 translate-middle-y"
      style={{
        [step > 0 ? "right" : "left"]: "2rem",
        width: "2.8rem",
        height: "2.8rem",
        placeItems: "center",
        background: "rgba(255,255,255,0.14)",
        color: "#fff",
        cursor: "pointer",
        backdropFilter: "blur(6px)",
      }}
    >
      <Icon size={20} />
    </motion.button>
  );

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            zIndex: 20000,
            background: "rgba(6,20,30,0.86)",
            backdropFilter: "blur(4px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            className="border-0 rounded-circle d-grid position-absolute"
            style={{
              top: "1.5rem",
              right: "1.5rem",
              width: "2.5rem",
              height: "2.5rem",
              placeItems: "center",
              background: "rgba(255,255,255,0.14)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </motion.button>

          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={items[index].key}
              custom={direction}
              onClick={(e) => e.stopPropagation()}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * 60, scale: 0.96 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * -60, scale: 0.96 }
              }
              transition={spring}
              drag={items.length > 1 && !reduceMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
            >
              <LightboxImage item={items[index]} />
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <>
              {navButton(-1, ChevronLeft, "Previous image")}
              {navButton(1, ChevronRight, "Next image")}
            </>
          )}

          <div
            className="position-absolute d-flex flex-column align-items-center gap-2"
            style={{ bottom: "1.5rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white font-size-sm">
              {items[index].label}
            </span>
            {items.length > 1 && (
              <div className="d-flex flex-row gap-2">
                {items.map((item, i) => (
                  <motion.button
                    type="button"
                    key={item.key}
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      onIndexChange(i);
                    }}
                    className="border-0 rounded-pill p-0"
                    animate={{
                      width: i === index ? 22 : 8,
                      opacity: i === index ? 1 : 0.45,
                    }}
                    transition={spring}
                    style={{ height: 8, background: "#fff", cursor: "pointer" }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Multi image picker with drag & drop, animated thumbnails, a full screen
 * preview and inline validation.
 *
 *  - existingImages: saved images ({ id, url }) that can be marked for removal
 *  - removeImageIds / onToggleRemove: which saved images are marked for removal
 *  - images / onImagesChange: newly picked File objects
 */
export default function MultiImageUploader({
  label = "Images",
  hint,
  existingImages = [],
  removeImageIds = [],
  onToggleRemove,
  images = [],
  onImagesChange,
  order = [],
  onOrderChange,
  maxFiles = 5,
  maxFileSize = 2 * 1024 * 1024,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  acceptLabel = "JPEG, PNG or WebP",
}) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const reduceMotion = useReducedMotion();
  const inputRef = useRef(null);
  const dragDepth = useRef(0);
  const keySeed = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [notices, setNotices] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(null);

  const [activeKey, setActiveKey] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const keptCount = existingImages.filter(
    (image) => !removeImageIds.includes(image.id),
  ).length;
  const usedCount = keptCount + images.length;
  const remaining = Math.max(0, maxFiles - usedCount);
  const isFull = remaining === 0;

  const pushNotices = (messages) => {
    if (!messages.length) return;
    const stamped = messages.map((message) => {
      keySeed.current += 1;
      return { id: `notice-${keySeed.current}`, message };
    });
    setNotices((prev) => [...prev, ...stamped].slice(-4));
  };

  useEffect(() => {
    if (!notices.length) return undefined;
    const timer = setTimeout(() => setNotices((prev) => prev.slice(1)), 5000);
    return () => clearTimeout(timer);
  }, [notices]);

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList ?? []);
    if (!incoming.length) return;
    const problems = [];
    const accepted = [];
    const known = new Set(images.map(fileSignature));
    let slots = remaining;

    incoming.forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        problems.push(`${file.name} is not a ${acceptLabel} image.`);
      } else if (file.size > maxFileSize) {
        problems.push(
          `${file.name} is ${formatSize(file.size)}. Images must be ${formatSize(maxFileSize)} or smaller.`,
        );
      } else if (known.has(fileSignature(file))) {
        problems.push(`${file.name} is already added.`);
      } else if (slots <= 0) {
        problems.push(
          `${file.name} was skipped. You can add up to ${maxFiles} images.`,
        );
      } else {
        known.add(fileSignature(file));
        accepted.push(file);
        slots -= 1;
      }
    });

    if (accepted.length) onImagesChange([...images, ...accepted]);
    pushNotices(problems);
  };

  const openPicker = () => {
    if (!isFull) inputRef.current?.click();
  };

  const dragHandlers = {
    onDragEnter: (e) => {
      e.preventDefault();
      dragDepth.current += 1;
      if (!isFull) setIsDragging(true);
    },
    onDragOver: (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = isFull ? "none" : "copy";
    },
    onDragLeave: (e) => {
      e.preventDefault();
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setIsDragging(false);
    },
    onDrop: (e) => {
      e.preventDefault();
      dragDepth.current = 0;
      setIsDragging(false);
      if (isFull) {
        pushNotices([`You can add up to ${maxFiles} images.`]);
        return;
      }
      addFiles(e.dataTransfer.files);
    },
  };

  // Tiles in display order. The first kept image is the cover.
  const tiles = orderImageItems({ order, existingImages, removeImageIds, images });
  const tileKeys = tiles.map((tile) => tile.key);
  const coverKey = tiles.find((tile) => !tile.isRemoved)?.key;
  const activeTile = tiles.find((tile) => tile.key === activeKey);

  const moveTile = (fromKey, toIndex) => {
    const keys = tileKeys.filter((key) => key !== fromKey);
    keys.splice(toIndex, 0, fromKey);
    onOrderChange?.(keys);
  };
  // The cover goes in front of every kept image.
  const makeCover = (key) => moveTile(key, 0);

  const handleDragEnd = ({ active, over }) => {
    setActiveKey(null);
    if (!over || active.id === over.id) return;
    moveTile(active.id, tileKeys.indexOf(over.id));
  };

  const renderTile = (tile, extra = {}) =>
    tile.kind === "saved" ? (
      <ImageTile
        src={tile.image.url}
        alt="Saved event image"
        isCover={tile.key === coverKey}
        isRemoved={tile.isRemoved}
        onRemove={() => onToggleRemove?.(tile.image.id)}
        onRestore={() => {
          if (isFull) {
            pushNotices([
              `Remove another image first. Only ${maxFiles} images are allowed.`,
            ]);
            return;
          }
          onToggleRemove?.(tile.image.id);
        }}
        onPreview={() => openPreview(tile.key)}
        onMakeCover={onOrderChange ? () => makeCover(tile.key) : undefined}
        reduceMotion={reduceMotion}
        {...extra}
      />
    ) : (
      <NewFileTile
        file={tile.file}
        isCover={tile.key === coverKey}
        onRemove={() =>
          onImagesChange(images.filter((_, i) => i !== tile.index))
        }
        onPreview={() => openPreview(tile.key)}
        onMakeCover={onOrderChange ? () => makeCover(tile.key) : undefined}
        reduceMotion={reduceMotion}
        {...extra}
      />
    );
  const previewItems = tiles
    .filter((tile) => !tile.isRemoved)
    .map((tile) =>
      tile.kind === "saved"
        ? { key: tile.key, url: tile.image.url, label: "Saved image" }
        : { key: tile.key, file: tile.file, label: tile.file.name },
    );
  const openPreview = (key) => {
    const index = previewItems.findIndex((item) => item.key === key);
    if (index !== -1) setPreviewIndex(index);
  };

  useEffect(() => {
    if (previewIndex !== null && previewIndex >= previewItems.length) {
      setPreviewIndex(previewItems.length ? previewItems.length - 1 : null);
    }
  }, [previewIndex, previewItems.length]);

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-row align-items-end justify-content-between gap-2">
        <div className="d-flex flex-column">
          <span className="fw-medium">{label}</span>
          <span className="text-iron-400" style={{ fontSize: "0.75rem" }}>
            {hint ??
              `${acceptLabel}, up to ${formatSize(maxFileSize)} each. The first image is the cover.`}
          </span>
        </div>
        <div
          className="d-flex flex-column align-items-end gap-1"
          style={{ minWidth: "5.5rem" }}
        >
          <span
            className="fw-semibold"
            style={{
              fontSize: "0.75rem",
              color: isFull ? tokens.blue : tokens.inkSoft,
            }}
          >
            <motion.span
              key={usedCount}
              initial={reduceMotion ? false : { y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="d-inline-block"
            >
              {usedCount}
            </motion.span>{" "}
            / {maxFiles}
          </span>
          <div
            className="w-100 rounded-pill overflow-hidden"
            style={{ height: 4, background: "rgba(8,48,73,0.08)" }}
          >
            <motion.div
              className="h-100 rounded-pill"
              style={{ background: tokens.blue }}
              initial={false}
              animate={{ width: `${(usedCount / maxFiles) * 100}%` }}
              transition={spring}
            />
          </div>
        </div>
      </div>

      <motion.div
        layout={!reduceMotion}
        role="button"
        tabIndex={isFull ? -1 : 0}
        aria-disabled={isFull}
        aria-label={
          isFull
            ? `Maximum of ${maxFiles} images reached`
            : "Add images: click to browse or drop files here"
        }
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        {...dragHandlers}
        animate={{
          scale: isDragging && !reduceMotion ? 1.015 : 1,
          backgroundColor: isDragging
            ? tokens.blueTint
            : darkMode
              ? "rgba(255,255,255,0.02)"
              : "#fbfcfd",
          borderColor: isDragging ? tokens.blue : tokens.border,
        }}
        whileHover={
          isFull || reduceMotion ? undefined : { borderColor: tokens.blue }
        }
        transition={spring}
        className="rounded-4 d-flex flex-row align-items-center gap-3 px-3"
        style={{
          border: "1.5px dashed",
          paddingTop: isFull ? "0.75rem" : "1.1rem",
          paddingBottom: isFull ? "0.75rem" : "1.1rem",
          cursor: isFull ? "not-allowed" : "pointer",
          opacity: isFull ? 0.7 : 1,
          outline: "none",
        }}
      >
        <motion.div
          className="rounded-3 d-grid flex-shrink-0"
          style={{
            width: "2.75rem",
            height: "2.75rem",
            placeItems: "center",
            background: tokens.blueTint,
            color: tokens.blue,
          }}
          animate={
            isDragging && !reduceMotion
              ? { y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.9 } }
              : { y: 0 }
          }
        >
          {isDragging ? <UploadCloud size={20} /> : <ImagePlus size={20} />}
        </motion.div>
        <div className="d-flex flex-column">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isFull ? "full" : isDragging ? "drop" : "idle"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="fw-medium"
              style={{ color: tokens.ink }}
            >
              {isFull ? (
                `Maximum of ${maxFiles} images reached`
              ) : isDragging ? (
                "Drop to add images"
              ) : (
                <>
                  <span style={{ color: tokens.blue }}>Click to browse</span> or
                  drag and drop images
                </>
              )}
            </motion.span>
          </AnimatePresence>
          <span className="text-iron-400" style={{ fontSize: "0.75rem" }}>
            {isFull
              ? "Remove an image to add another."
              : `You can add ${remaining} more ${remaining === 1 ? "image" : "images"}.`}
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          className="d-none"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </motion.div>

      <AnimatePresence initial={false}>
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            layout={!reduceMotion}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring}
            className="overflow-hidden"
          >
            <div
              className="d-flex flex-row align-items-center gap-2 rounded-3 px-2 py-1"
              style={{
                background: tokens.redTint,
                color: tokens.red,
                fontSize: "0.75rem",
              }}
            >
              <TriangleAlert size={13} className="flex-shrink-0" />
              <span className="flex-grow-1">{notice.message}</span>
              <button
                type="button"
                aria-label="Dismiss"
                className="border-0 bg-transparent p-0 d-grid"
                style={{ color: tokens.red, cursor: "pointer" }}
                onClick={() =>
                  setNotices((prev) => prev.filter((n) => n.id !== notice.id))
                }
              >
                <X size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {tiles.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={({ active }) => setActiveKey(active.id)}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveKey(null)}
        >
          <SortableContext items={tileKeys} strategy={rectSortingStrategy}>
            <div
              className="d-grid gap-2"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(8.5rem, 1fr))",
              }}
            >
              <AnimatePresence>
                {tiles.map((tile) => (
                  <SortableTile
                    key={tile.key}
                    id={tile.key}
                    disabled={!onOrderChange || tiles.length < 2}
                  >
                    {({ isPlaceholder, dragHandle }) =>
                      renderTile(tile, { isPlaceholder, dragHandle })
                    }
                  </SortableTile>
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
          {createPortal(
            <DragOverlay
              dropAnimation={
                reduceMotion ? null : { duration: 220, easing: "cubic-bezier(0.2, 0, 0, 1)" }
              }
              zIndex={20000}
            >
              {activeTile ? renderTile(activeTile, { isLifted: true }) : null}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      )}
      {tiles.length > 1 && onOrderChange && (
        <span className="text-iron-400" style={{ fontSize: "0.72rem" }}>
          Drag images to reorder them, or use the star to choose the cover.
        </span>
      )}

      <Lightbox
        items={previewItems}
        index={previewIndex}
        onIndexChange={setPreviewIndex}
        onClose={() => setPreviewIndex(null)}
      />
    </div>
  );
}
