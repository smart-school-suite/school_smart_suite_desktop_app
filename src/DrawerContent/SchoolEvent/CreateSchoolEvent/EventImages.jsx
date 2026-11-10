import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ImagePlus, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { orderImageItems } from "../../../components/FormComponents/MultiImageUploader";
import { EventWizardHeader } from "../../../ModalContent/Events/CreateEvent";
import {
  markCreateEventDirty,
  toggleRemoveImage,
} from "../../../Slices/schoolEvent/schoolEventSlice";
import { formatISODate } from "../../../utils/functions";
import { EventImagesField, eventImageUrl, FilePreview } from "./EventContent";

// How the event card will look with the chosen cover image.
function CoverPreview({ cover, content }) {
  const reduceMotion = useReducedMotion();
  const startsAt = content?.start_date?.value;
  return (
    <div
      className="position-relative overflow-hidden rounded-4"
      style={{ height: "13rem", background: "#EAF7FD" }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {cover ? (
          <motion.div
            key={cover.key}
            className="position-absolute top-0 start-0 w-100 h-100"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
          >
            {cover.kind === "saved" ? (
              <img
                src={eventImageUrl(cover.image.object_key)}
                alt="Event cover"
                className="w-100 h-100 object-fit-cover"
              />
            ) : (
              <FilePreview file={cover.file} />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ color: "#0EA7E9" }}
          >
            <ImagePlus size={28} />
            <span className="font-size-sm">Your cover image will appear here</span>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="position-absolute start-0 end-0 bottom-0 p-3 d-flex flex-column gap-1 text-white"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,48,73,0) 0%, rgba(8,48,73,0.78) 100%)",
        }}
      >
        <span style={{ fontSize: "0.7rem", opacity: 0.85 }}>
          {content?.category?.value?.name ?? "Event"}
        </span>
        <span className="fw-semibold">
          {content?.title?.value || "Untitled event"}
        </span>
        <div
          className="d-flex flex-row align-items-center gap-3"
          style={{ fontSize: "0.72rem", opacity: 0.9 }}
        >
          {startsAt && (
            <span className="d-flex flex-row align-items-center gap-1">
              <CalendarDays size={12} />
              {formatISODate(startsAt.replace(" ", "T"))}
            </span>
          )}
          {content?.location?.value && (
            <span className="d-flex flex-row align-items-center gap-1">
              <MapPin size={12} />
              {content.location.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function EventImages({
  handleClose,
  currentStep,
  nextStep,
  previousStep,
  fullStep,
  images,
  setImages,
  imageOrder,
  setImageOrder,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const items = orderImageItems({
    order: imageOrder,
    existingImages: moduleState?.existingImages,
    removeImageIds: moduleState?.removeImageIds,
    images,
  });
  const cover = items.find((item) => !item.isRemoved);
  const hasImages = Boolean(cover);

  return (
    <>
      <EventWizardHeader
        handleClose={handleClose}
        images={images}
        imageOrder={imageOrder}
      />
      <div className="d-flex flex-row align-items-center justify-content-between font-size-sm px-2 pt-2">
        <div className="d-flex flex-column">
          <span className="fw-medium">Event Images</span>
          <p className="text-iron-400">
            Add photos that show what the event is about. They are optional.
          </p>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 fw-semibold text-capitalize">
          <span>step</span>
          <span>{currentStep}</span>
          <span>of</span>
          <span>{fullStep}</span>
          <span>Completed</span>
        </div>
      </div>
      <div
        className="drawer-content px-2 pt-2 font-size-sm"
        style={{ paddingBottom: "10rem" }}
      >
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column gap-1">
            <span className="text-iron-400">Cover Preview</span>
            <CoverPreview cover={cover} content={moduleState?.content} />
          </div>
          <EventImagesField
            existingImages={moduleState?.existingImages}
            removeImageIds={moduleState?.removeImageIds}
            onToggleRemove={(imageId) =>
              dispatch(toggleRemoveImage({ imageId }))
            }
            images={images}
            onImagesChange={(files) => {
              setImages(files);
              dispatch(markCreateEventDirty());
            }}
            order={imageOrder}
            onOrderChange={(order) => {
              setImageOrder(order);
              dispatch(markCreateEventDirty());
            }}
          />
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none cursor-pointer"
              onClick={() => previousStep()}
            >
              <span>Back To Content</span>
            </button>
            <motion.button
              layout
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 cursor-pointer"
              onClick={() => nextStep()}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={hasImages ? "next" : "skip"}
                  className="d-inline-block"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  {hasImages ? "Next" : "Skip For Now"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
export default EventImages;
