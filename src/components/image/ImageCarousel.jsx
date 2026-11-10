import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, Star } from "lucide-react";
import { useFileUrl } from "../FormComponents/MultiImageUploader";

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;
const spring = { type: "spring", stiffness: 320, damping: 34, mass: 0.9 };

// A slide's image source: a URL, or an object URL for a picked File.
function useSlideSrc(slide) {
  const fileUrl = useFileUrl(slide?.file ?? null);
  return slide?.file ? fileUrl : slide?.src;
}

function SlideImage({ slide }) {
  const src = useSlideSrc(slide);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className="w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-1"
        style={{ background: "#F1F4F6", color: "rgba(8,48,73,0.38)" }}
      >
        <ImageIcon size={22} />
        {failed && <span style={{ fontSize: "0.72rem" }}>Image unavailable</span>}
      </div>
    );
  }

  return (
    <div className="position-relative w-100 h-100">
      {/* the same image, blurred, fills the frame so any aspect ratio fits cleanly */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        style={{
          filter: "blur(22px) saturate(1.2)",
          transform: "scale(1.35)",
          opacity: loaded ? 0.55 : 0,
          transition: "opacity 300ms ease",
        }}
      />
      <motion.img
        src={src}
        alt={slide?.alt ?? ""}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        initial={false}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="position-relative w-100 h-100"
        style={{ objectFit: "contain", userSelect: "none" }}
      />
    </div>
  );
}

// Loads the neighbouring slides in the background so navigation is instant.
function Preload({ slide }) {
  const src = useSlideSrc(slide);
  return src ? <img src={src} alt="" aria-hidden="true" className="d-none" /> : null;
}

function ArrowButton({ direction, onClick, visible }) {
  const Icon = direction < 0 ? ChevronLeft : ChevronRight;
  return (
    <motion.button
      type="button"
      aria-label={direction < 0 ? "Previous image" : "Next image"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : direction * -6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.18 }}
      tabIndex={-1}
      className="position-absolute top-50 border-0 rounded-circle d-grid shadow-sm"
      style={{
        [direction < 0 ? "left" : "right"]: 10,
        marginTop: "-1rem",
        width: "2rem",
        height: "2rem",
        placeItems: "center",
        background: "rgba(255,255,255,0.9)",
        color: "#083049",
        cursor: "pointer",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 2,
      }}
    >
      <Icon size={16} />
    </motion.button>
  );
}

/**
 * Minimal, interactive image carousel.
 *
 *   <ImageCarousel slides={[{ key, src | file, alt }]} />
 *
 * Swipe or drag, hover arrows, dots and the arrow keys move between slides;
 * the first slide is labelled as the cover.
 */
export default function ImageCarousel({
  slides = [],
  height = "13rem",
  showCoverBadge = true,
  emptyLabel = "No images",
  rounded = "rounded-4",
}) {
  const reduceMotion = useReducedMotion();
  const [[index, direction], setPage] = useState([0, 0]);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const isDragging = useRef(false);
  const count = slides.length;
  const hasMany = count > 1;
  const current = Math.min(index, Math.max(0, count - 1));

  // keep the index valid when slides are added, removed or reordered
  useEffect(() => {
    if (index > count - 1) setPage([Math.max(0, count - 1), 0]);
  }, [count, index]);

  const paginate = useCallback(
    (step) => {
      if (!hasMany) return;
      setPage(([i]) => [(i + step + count) % count, step]);
    },
    [count, hasMany],
  );

  const goTo = (target) => {
    if (target === current) return;
    setPage([target, target > current ? 1 : -1]);
  };

  if (!count) {
    return (
      <div
        className={`${rounded} d-flex flex-column align-items-center justify-content-center gap-1`}
        style={{ height, background: "#F1F4F6", color: "rgba(8,48,73,0.38)" }}
      >
        <ImageIcon size={22} />
        <span style={{ fontSize: "0.75rem" }}>{emptyLabel}</span>
      </div>
    );
  }

  const slide = slides[current];
  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0.6 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir >= 0 ? "-35%" : "35%", opacity: 0 }),
      };
  const showControls = hasMany && (hovered || focused);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Event images"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          paginate(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          paginate(-1);
        }
      }}
      // slides moving in and out sit outside the frame; never let them scroll it
      onScroll={(e) => {
        e.currentTarget.scrollLeft = 0;
        e.currentTarget.scrollTop = 0;
      }}
      className={`position-relative overflow-hidden ${rounded}`}
      style={{
        overflow: "clip",
        height,
        background: "#0B2233",
        outline: "none",
        boxShadow: focused ? "0 0 0 2px #0EA7E9" : "none",
        transition: "box-shadow 150ms ease",
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.key}
          role="group"
          aria-roledescription="slide"
          aria-label={`${current + 1} of ${count}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={reduceMotion ? { duration: 0.2 } : spring}
          drag={hasMany && !reduceMotion ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={(_, { offset, velocity }) => {
            isDragging.current = false;
            if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) {
              paginate(1);
            } else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) {
              paginate(-1);
            }
          }}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ cursor: hasMany ? "grab" : "default", touchAction: "pan-y" }}
          whileDrag={{ cursor: "grabbing" }}
        >
          <SlideImage slide={slide} />
        </motion.div>
      </AnimatePresence>

      {hasMany && (
        <>
          <Preload slide={slides[(current + 1) % count]} />
          <Preload slide={slides[(current - 1 + count) % count]} />
        </>
      )}

      {/* soft shade so the badges and dots stay readable on light images */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(8,48,73,0.28) 0%, rgba(8,48,73,0) 28%, rgba(8,48,73,0) 70%, rgba(8,48,73,0.38) 100%)",
        }}
      />

      <AnimatePresence>
        {showCoverBadge && current === 0 && (
          <motion.span
            key="cover"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="position-absolute d-flex flex-row align-items-center gap-1 rounded-pill px-2 fw-semibold text-white"
            style={{
              top: 10,
              left: 10,
              height: "1.35rem",
              fontSize: "0.66rem",
              background: "#0EA7E9",
              zIndex: 2,
            }}
          >
            <Star size={10} fill="#fff" />
            Cover
          </motion.span>
        )}
      </AnimatePresence>

      {hasMany && (
        <span
          className="position-absolute rounded-pill px-2 fw-medium text-white d-flex align-items-center"
          aria-live="polite"
          style={{
            top: 10,
            right: 10,
            height: "1.35rem",
            fontSize: "0.68rem",
            background: "rgba(8,48,73,0.55)",
            backdropFilter: "blur(6px)",
            zIndex: 2,
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={current}
              initial={{ y: direction >= 0 ? 8 : -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction >= 0 ? -8 : 8, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="d-inline-block"
            >
              {current + 1}
            </motion.span>
          </AnimatePresence>
          <span className="ms-1" style={{ opacity: 0.75 }}>
            / {count}
          </span>
        </span>
      )}

      {hasMany && (
        <>
          <ArrowButton direction={-1} onClick={() => paginate(-1)} visible={showControls} />
          <ArrowButton direction={1} onClick={() => paginate(1)} visible={showControls} />
          <div
            className="position-absolute start-50 translate-middle-x d-flex flex-row align-items-center gap-1"
            style={{ bottom: 10, zIndex: 2 }}
          >
            {slides.map((item, i) => (
              <motion.button
                key={item.key}
                type="button"
                tabIndex={-1}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === current}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                className="border-0 rounded-pill p-0"
                initial={false}
                animate={{
                  width: i === current ? 18 : 6,
                  opacity: i === current ? 1 : 0.55,
                }}
                whileHover={{ opacity: 1 }}
                transition={spring}
                style={{ height: 6, background: "#fff", cursor: "pointer" }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
