import {
  TextAreaInput,
  TextInput,
} from "../../../components/FormComponents/InputComponents";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../../components/Dropdowns/Dropdowns";
import {
  nameSchema,
  textareaSchema,
} from "../../../ComponentConfig/YupValidationSchema";
import { useGetAnnouncementCategories } from "../../../hooks/announcement/useGetAnnouncementCategories";
import { useGetAnnouncementLabels } from "../../../hooks/announcement/useGetAnnouncementLabels";
import { useGetAnnouncementTags } from "../../../hooks/announcement/useGetAnnouncementTags";
import { useSelector, useDispatch } from "react-redux";
import { ShieldAlert, Info, TriangleAlert, CircleCheck, X } from "lucide-react";
import toast from "react-hot-toast";
import ToastWarning from "../../../components/Toast/ToastWarning";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import { allFieldsValid } from "../../../utils/functions";
import { useState } from "react";
import { useGetAnnouncementDetails } from "../../../hooks/announcement/useGetAnnouncementDetails";
import {
  setUpdateDraftContentInitial,
  resetUpdateDraftState,
  setAnnouncementContent,
} from "../../../Slices/announcement/draftAnnouncementSlice";
import { useEffect, Fragment, useRef } from "react";
import UpdateDraftDiscardWarning from "../../../ModalContent/Announcement/UpdateDraftDiscardWarning";
function DraftAnnouncementContent({
  handleClose,
  currentStep,
  nextStep,
  fullStep,
  drawerData,
}) {
  const { id: announcementId } = drawerData;
  const {
    data: announcementDetails,
    isLoading: isAnnouncementLoading,
    error: announcementError,
  } = useGetAnnouncementDetails(announcementId);
  const dispatch = useDispatch();
  const titleRef = useRef();
  const contentRef = useRef();
  const tagRef = useRef();
  const categoryRef = useRef();
  const initializedRef = useRef(null);
  const [errors, setErrors] = useState(null);
  const moduleState = useSelector(
    (state) => state.draftAnnouncement.updateDraftAnnouncement.draft.content,
  );
  const isDirty = useSelector(
    (state) => state.draftAnnouncement.updateDraftAnnouncement.isDirty,
  );
  const { data: category, isLoading: isCategoryLoading } =
    useGetAnnouncementCategories();
  const { data: tags, isLoading: isTagLoading } = useGetAnnouncementTags();
  const { data: labels, isLoading: isLabelLoading } =
    useGetAnnouncementLabels();

  useEffect(() => {
    if (
      !isAnnouncementLoading &&
      announcementDetails?.data &&
      !isTagLoading &&
      !isLabelLoading &&
      !isCategoryLoading &&
      initializedRef.current !== announcementId
    ) {
      initializedRef.current = announcementId;
      dispatch(
        setUpdateDraftContentInitial({
          announcement: announcementDetails.data,
        }),
      );
    }
  }, [
    isAnnouncementLoading,
    isTagLoading,
    isLabelLoading,
    isCategoryLoading,
    announcementDetails,
    announcementId,
    dispatch,
  ]);

  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    const content = await contentRef.current.triggerValidation();
    const tag = await tagRef.current.triggerValidation();
    const category = await categoryRef.current.triggerValidation();
    return {
      title,
      content,
      tag,
      category,
    };
  };

  const handleNext = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setErrors({
        title: "Invalid Fields",
        message:
          "Some Fields are invalid please ensure that all fields are valid before proceeding to the next step",
      });
      return;
    }
    if (!moduleState?.label?.value?.id) {
      setErrors({
        title: "Announcement Label Required",
        message:
          "Announcement Label Required, You must select atleast one label before proceeding to the next step",
      });
      return;
    }
    nextStep();
  };

  return (
    <>
      {isAnnouncementLoading ? (
        <div className="drawer-content px-2 pt-2">
          <div className="d-flex flex-column gap-2">
            {[...Array(8)].map((_, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-column gap-2">
                  <RectangleSkeleton height="1dvh" width="25%" />
                  <RectangleSkeleton height="4dvh" width="100%" />
                </div>
              </Fragment>
            ))}
          </div>
          <div className="d-flex flex-column gap-2">
            <RectangleSkeleton height="1dvh" width="25%" />
            <RectangleSkeleton height="8dvh" width="100%" />
          </div>
        </div>
      ) : announcementError ? (
        <div className="drawer-content px-2 pt-2">
          <NotFoundError
            title={announcementError?.response?.data?.errors?.title}
            description={announcementError?.response?.data?.errors?.description}
          />
        </div>
      ) : (
        <>
          <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
            <span className="fw-medium">Update Draft Announcement</span>
            {isDirty ? (
              <ModalButton
                action={{
                  modalContent: UpdateDraftDiscardWarning,
                }}
                size={"md"}
                rowData={{
                  handleCloseDrawer: handleClose,
                  announcement: drawerData,
                }}
                closeOnOutsideClick={false}
                closeOnEscape={false}
              >
                <button
                  className="bg-none border-none border rounded-circle"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={16} />
                </button>
              </ModalButton>
            ) : (
              <button
                className="bg-none border-none border rounded-circle"
                aria-label="Close drawer"
                onClick={() => {
                  handleClose();
                  dispatch(resetUpdateDraftState());
                }}
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm px-2 pt-2">
            <div className="d-flex flex-column">
              <span className="fw-medium">Announcement content</span>
              <p className="text-iron-400">
                Give your announcement a clear identity and message.
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
          {errors && (
            <div className="p-2">
              <div className="bg-red-50 text-red-800 font-size-sm rounded-2 px-2 py-1">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">{errors?.title}</span>
                  <button
                    className="bg-none border-none rounded-circle"
                    aria-label="Close drawer"
                    onClick={() => {
                      setErrors(null);
                    }}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <ul>
                  <li>
                    <p>{errors?.message}</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className="drawer-content px-2 pt-2 font-size-sm">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1">
                <span className="fw-medium">Category</span>
                <CustomDropdown
                  data={category?.data || []}
                  displayKey={["name"]}
                  valueKey={["id"]}
                  direction="up"
                  onSelect={(value) => {
                    dispatch(
                      setAnnouncementContent({
                        field: "category",
                        value:
                          category?.data?.find((g) => g.id === value.id) || {},
                      }),
                    );
                  }}
                  placeholder="Select Announcement Category"
                  error={moduleState?.category?.error}
                  isLoading={isCategoryLoading}
                  errorMessage="Announcement Category Required"
                  onError={(msg) =>
                    dispatch(
                      setAnnouncementContent({
                        field: "category",
                        error: msg,
                      }),
                    )
                  }
                  ref={categoryRef}
                  value={moduleState?.category?.value?.id}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <span className="fw-medium">Label</span>
                {isLabelLoading ? (
                  <div className="d-flex flex-row align-items-center gap-3">
                    {[...Array(3)].map((_, index) => (
                      <RectangleSkeleton
                        key={index}
                        className={"flex-fill"}
                        height="12dvh"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="d-flex flex-row align-items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`card border-none border p-2 d-flex flex-column flex-fill pointer-cursor
                             ${
                               moduleState?.label?.value?.id ==
                               labels?.data?.find((l) => l.name === "info").id
                                 ? "shadow-fern-100-lg border-fern-300"
                                 : "border-none border shadow-sm"
                             }
                            `}
                      style={{ height: "12dvh", borderRadius: "0.85rem" }}
                      onClick={() => {
                        dispatch(
                          setAnnouncementContent({
                            value: labels?.data?.find((l) => l.name === "info"),
                            field: "label",
                          }),
                        );
                      }}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center gap-2">
                          <Info size={16} />
                          <span className="fw-medium">Info </span>
                        </div>
                        <AnimatePresence>
                          {moduleState?.label?.value?.id ==
                            labels?.data?.find((l) => l.name === "info").id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <CircleCheck size={16} className="green-color" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <p className="mt-auto p-0 m-0 text-iron-400">
                        General Information
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`card border-none border p-2 d-flex flex-column flex-fill pointer-cursor
                             ${
                               moduleState?.label?.value?.id ==
                               labels?.data?.find((l) => l.name === "important")
                                 .id
                                 ? "shadow-fern-100-lg border-fern-300"
                                 : "border-none border shadow-sm"
                             }
                            `}
                      style={{ height: "12dvh", borderRadius: "0.85rem" }}
                      onClick={() => {
                        dispatch(
                          setAnnouncementContent({
                            value: labels?.data?.find(
                              (l) => l.name === "important",
                            ),
                            field: "label",
                          }),
                        );
                      }}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center gap-2">
                          <TriangleAlert size={16} />
                          <span className="fw-medium">Important</span>
                        </div>
                        <AnimatePresence>
                          {moduleState?.label?.value?.id ==
                            labels?.data?.find((l) => l.name === "important")
                              .id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <CircleCheck size={16} className="green-color" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="mt-auto p-0 m-0 text-iron-400">
                        Needs Attention
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`card border-none border p-2 d-flex flex-column flex-fill pointer-cursor
                             ${
                               moduleState?.label?.value?.id ==
                               labels?.data?.find((l) => l.name === "urgent").id
                                 ? "shadow-fern-100-lg border-fern-300"
                                 : "border-none border shadow-sm"
                             }
                            `}
                      style={{ height: "12dvh", borderRadius: "0.85rem" }}
                      onClick={() => {
                        dispatch(
                          setAnnouncementContent({
                            value: labels?.data?.find(
                              (l) => l.name === "urgent",
                            ),
                            field: "label",
                          }),
                        );
                      }}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center gap-2">
                          <ShieldAlert size={16} />
                          <span className="fw-medium">Urgent</span>
                        </div>
                        <AnimatePresence>
                          {moduleState?.label?.value?.id ==
                            labels?.data?.find((l) => l.name === "urgent")
                              .id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <CircleCheck size={16} className="green-color" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="mt-auto p-0 m-0 text-iron-400">
                        Requires Prompt Action
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
              <div className="d-flex flex-column gap-1">
                <span className="fw-medium">Tags</span>
                <MultiSelectDropdown
                  data={tags?.data || []}
                  displayKey={["name"]}
                  valueKey={["id"]}
                  direction="up"
                  isLoading={isTagLoading}
                  placeholder={"Select Tags"}
                  errorMessage={"Announcement Tags Required"}
                  onSelect={(selectedIds) => {
                    if (selectedIds.length > 5) {
                      toast.custom(
                        <ToastWarning
                          title={"Max Amount Reached"}
                          description={
                            "You can only select from 1 - 5 tags maximum"
                          }
                        />,
                      );
                      return;
                    }
                    dispatch(
                      setAnnouncementContent({
                        field: "tags",
                        value: tags?.data?.filter((t) =>
                          selectedIds.some((id) => id.id == t.id),
                        ),
                      }),
                    );
                  }}
                  onError={(error) =>
                    dispatch(
                      setAnnouncementContent({
                        field: "tags",
                        error: error,
                      }),
                    )
                  }
                  error={moduleState?.tags?.error}
                  ref={tagRef}
                  value={moduleState?.tags?.value}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="title" className="font-size-sm fw-medium">
                  Title
                </label>
                <TextInput
                  onChange={(value) =>
                    dispatch(
                      setAnnouncementContent({
                        field: "title",
                        value: value,
                      }),
                    )
                  }
                  onValidationChange={(value) =>
                    dispatch(
                      setAnnouncementContent({
                        field: "title",
                        isValid: value,
                      }),
                    )
                  }
                  validationSchema={nameSchema({
                    min: 3,
                    max: 200,
                    required: true,
                    messages: {
                      required: "Announcement Title Required",
                      min: "Announcement Title Must Be Atleast 3 Characters Long",
                      max: "Announcement Title Must Not Exceed 200 Characters",
                    },
                  })}
                  value={moduleState?.title?.value}
                  placeholder={"e.g Upcoming School Science Fair"}
                  ref={titleRef}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <span className="fw-medium">Content</span>
                <TextAreaInput
                  onChange={(value) =>
                    dispatch(
                      setAnnouncementContent({
                        field: "content",
                        value: value,
                      }),
                    )
                  }
                  onValidationChange={(value) =>
                    dispatch(
                      setAnnouncementContent({
                        field: "content",
                        isValid: value,
                      }),
                    )
                  }
                  value={moduleState?.content?.value}
                  placeholder={"Enter Announcement Content"}
                  validationSchema={textareaSchema({
                    min: 10,
                    max: 1000,
                    required: true,
                    messages: {
                      required: "Announcement Description Required",
                      min: "Announcement Description Must Be Atleast 10 Characters Long",
                      max: "Announcement Description Must Be Not Exceed 1000 Characters",
                    },
                  })}
                  ref={contentRef}
                />
              </div>
            </div>
          </div>
          <div className="drawer-footer font-size-sm">
            <div className="d-flex flex-column w-100">
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.5}
              />
              <div className="d-flex flex-row align-items-center justify-content-between p-2">
                {isDirty ? (
                  <ModalButton
                    action={{
                      modalContent: UpdateDraftDiscardWarning,
                    }}
                    size={"md"}
                    rowData={{
                      handleCloseDrawer: handleClose,
                      announcement: drawerData,
                    }}
                    closeOnOutsideClick={false}
                    closeOnEscape={false}
                  >
                    <button className="border-none bg-none">Cancel</button>
                  </ModalButton>
                ) : (
                  <button
                    className="border-none bg-none"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
                  onClick={() => handleNext()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default DraftAnnouncementContent;
