import { ZoomIn, ZoomOut } from "lucide-react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

const VIEWPORT = 288;
const OUTPUT = 512;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve) => canvas.toBlob(resolve, type, quality));

const DEFAULT_OUTPUT = { type: "image/webp", fileName: "photo" };

const PhotoCropper = forwardRef(function PhotoCropper(
  { src, shape = "circle", fit = "cover", output = DEFAULT_OUTPUT },
  ref,
) {
  const imageRef = useRef(null);
  const dragRef = useRef(null);
  const [natural, setNatural] = useState(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const fitScale = fit === "contain" ? Math.min : Math.max;
  const baseScale = natural ? fitScale(VIEWPORT / natural.width, VIEWPORT / natural.height) : 1;
  const scale = baseScale * zoom;
  const displayWidth = natural ? natural.width * scale : VIEWPORT;
  const displayHeight = natural ? natural.height * scale : VIEWPORT;

  const clampOffset = useCallback(
    (next, nextZoom = zoom) => {
      if (!natural) return { x: 0, y: 0 };
      const nextScale = baseScale * nextZoom;
      const maxX = Math.max(0, (natural.width * nextScale - VIEWPORT) / 2);
      const maxY = Math.max(0, (natural.height * nextScale - VIEWPORT) / 2);
      return { x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) };
    },
    [natural, baseScale, zoom],
  );

  useEffect(() => {
    setNatural(null);
    setZoom(MIN_ZOOM);
    setOffset({ x: 0, y: 0 });
  }, [src]);

  const changeZoom = (nextZoom) => {
    const value = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
    setZoom(value);
    setOffset((current) => clampOffset(current, value));
  };

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, start: offset };
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    const { x, y, start } = dragRef.current;
    setOffset(clampOffset({ x: start.x + event.clientX - x, y: start.y + event.clientY - y }));
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleKeyDown = (event) => {
    const step = event.shiftKey ? 20 : 6;
    const moves = {
      ArrowLeft: { x: step, y: 0 },
      ArrowRight: { x: -step, y: 0 },
      ArrowUp: { x: 0, y: step },
      ArrowDown: { x: 0, y: -step },
    };
    if (moves[event.key]) {
      event.preventDefault();
      setOffset((current) => clampOffset({ x: current.x + moves[event.key].x, y: current.y + moves[event.key].y }));
    }
    if (event.key === "+" || event.key === "=") changeZoom(zoom + 0.1);
    if (event.key === "-") changeZoom(zoom - 0.1);
  };

  useImperativeHandle(ref, () => ({
    async exportImage() {
      const image = imageRef.current;
      if (!image || !natural) return null;
      const left = VIEWPORT / 2 + offset.x - displayWidth / 2;
      const top = VIEWPORT / 2 + offset.y - displayHeight / 2;
      const ratio = OUTPUT / VIEWPORT;
      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT;
      canvas.height = OUTPUT;
      const context = canvas.getContext("2d");
      context.imageSmoothingQuality = "high";
      const draw = (background) => {
        context.clearRect(0, 0, OUTPUT, OUTPUT);
        if (background) {
          context.fillStyle = background;
          context.fillRect(0, 0, OUTPUT, OUTPUT);
        }
        context.drawImage(image, left * ratio, top * ratio, displayWidth * ratio, displayHeight * ratio);
      };
      draw(null);
      if (output.type === "image/png") {
        const png = await canvasToBlob(canvas, "image/png");
        return png ? new File([png], `${output.fileName}.png`, { type: "image/png" }) : null;
      }
      const webp = await canvasToBlob(canvas, "image/webp", 0.9);
      if (webp && webp.type === "image/webp") return new File([webp], `${output.fileName}.webp`, { type: "image/webp" });
      draw("#ffffff");
      const jpeg = await canvasToBlob(canvas, "image/jpeg", 0.9);
      return jpeg ? new File([jpeg], `${output.fileName}.jpg`, { type: "image/jpeg" }) : null;
    },
  }));

  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <div
        className={`photo-cropper position-relative overflow-hidden rounded-3 ${shape === "circle" ? "bg-iron-900" : "photo-cropper--checker"}`}
        style={{ width: VIEWPORT, height: VIEWPORT }}
        role="application"
        aria-label="Drag to reposition the photo. Use the arrow keys to move it and plus or minus to zoom."
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={(event) => changeZoom(zoom - event.deltaY * 0.0015)}
        onKeyDown={handleKeyDown}
      >
        <img
          ref={imageRef}
          src={src}
          alt=""
          draggable={false}
          onLoad={(event) =>
            setNatural({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })
          }
          className="photo-cropper__image position-absolute"
          style={{
            width: displayWidth,
            height: displayHeight,
            left: VIEWPORT / 2 + offset.x - displayWidth / 2,
            top: VIEWPORT / 2 + offset.y - displayHeight / 2,
            opacity: natural ? 1 : 0,
          }}
        />
        <span
          className={`photo-cropper__mask position-absolute ${shape === "circle" ? "rounded-circle" : "photo-cropper__mask--rounded"}`}
          aria-hidden="true"
        />
      </div>
      <div className="d-flex align-items-center gap-2 w-100 px-3" style={{ maxWidth: VIEWPORT + 32 }}>
        <button
          type="button"
          className="photo-cropper__zoom-btn d-grid place-items-center border-0 rounded-circle text-iron-600 hover-bg-iron-100"
          onClick={() => changeZoom(zoom - 0.2)}
          aria-label="Zoom out"
        >
          <ZoomOut size={16} strokeWidth={1.75} />
        </button>
        <input
          type="range"
          className="form-range flex-grow-1"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.01}
          value={zoom}
          onChange={(event) => changeZoom(Number(event.target.value))}
          aria-label="Zoom"
        />
        <button
          type="button"
          className="photo-cropper__zoom-btn d-grid place-items-center border-0 rounded-circle text-iron-600 hover-bg-iron-100"
          onClick={() => changeZoom(zoom + 0.2)}
          aria-label="Zoom in"
        >
          <ZoomIn size={16} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
});

export default PhotoCropper;
