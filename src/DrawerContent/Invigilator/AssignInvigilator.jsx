import { useGetPotInvigilators } from "../../hooks/invigilator/useGetPotInvigilator";
import { useAssignInvigilators } from "../../hooks/invigilator/useAssignInvigilator";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { Dot, FileText, Circle, X } from "lucide-react";
import SearchInput from "../../components/input/search";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  toggleInvigilator,
  resetAssignInvigilatorState,
} from "../../Slices/exam/examInvigilatorSlice";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function AssignInvigilator({ handleClose, drawerData }) {
  const { selectedExam } = drawerData;
  const { mutate: assignInvigilator, isPending } = useAssignInvigilators(
    selectedExam?.id,
  );
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.examInvigilator);
  const {
    data: potInvigs,
    isLoading,
    error,
  } = useGetPotInvigilators(selectedExam?.id);
  const handleAssignInvigilator = () => {
    const payload = {
      exam_id: selectedExam?.id,
      invigilators: moduleState?.assignInvigilator?.selectedInvigilator.map(
        (invig) => ({
          actorable_id: invig.actorable_id,
          actorable_type: invig.actorable_type,
        }),
      ),
    };
    assignInvigilator(payload);
  };
  return (
    <>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
          <span className="fw-medium">Assign Invigilator</span>
          <button
            className="bg-none border-none border rounded-circle"
            aria-label="Close drawer"
            onClick={() => {
              handleClose();
              dispatch(resetAssignInvigilatorState());
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
        <div className="d-flex flex-column gap-3 px-2">
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className="d-flex flex-row align-items-center justify-content-center gap-2 rounded-3 primary-background-100 color-primary"
              style={{ height: "2.5rem", width: "2.5rem" }}
            >
              <FileText size={16} />
            </div>
            <div className="d-flex flex-column">
              <small className="text-muted">Selected Exam</small>
              <div className="d-flex flex-row align-items-center gap-1 font-size-sm text-capitalize fw-semibold">
                <span>{selectedExam?.exam_name}</span>
                {selectedExam?.exam_type && <Dot size={16} />}
                <span>{selectedExam?.exam_type}</span>
                <Dot size={16} />
                <span>{selectedExam?.max_score}</span>
              </div>
            </div>
          </div>
          <SearchInput placeholder="Search Admin or Teacher" hotkey="Ctrl+T" />
        </div>
      </div>
      <div className="drawer-content px-2 pt-2 mt-2">
        {isLoading ? (
          [...Array(2)].map((_, index) => (
            <Fragment key={index}>
              <div className="d-flex flex-column gap-2">
                <RectangleSkeleton
                  width={"15%"}
                  height={"1rem"}
                  borderRadius={6}
                />
                <div className="d-flex flex-column gap-2">
                  {[...Array(6)].map((_, index) => (
                    <Fragment key={index}>
                      <RectangleSkeleton
                        borderRadius={6}
                        width={"100%"}
                        height={"18dvh"}
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          ))
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title || "Error"}
            description={
              error?.response?.data?.errors?.description ||
              "Something went wrong"
            }
          />
        ) : (
          Object.keys(potInvigs?.data).map((obj, index) => (
            <div className="d-flex flex-column gap-1" key={index}>
              <span className="text-capitalize fw-medium font-size-sm">
                {obj.replaceAll("_", " ")}
              </span>
              <div className="d-flex flex-column gap-3">
                {potInvigs?.data[obj].map((invig) => {
                  const isSelected =
                    moduleState?.assignInvigilator?.selectedInvigilator.some(
                      (item) =>
                        item.actorable_id === invig.actorable_id &&
                        item.actorable_type === invig.actorable_type,
                    );
                  return (
                    <Fragment key={invig?.actorable_id}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className={`card transition-all rounded-4 p-2 py-3 pointer-cursor ${
                          isSelected
                            ? "shadow-fern-100-lg border-fern-300"
                            : "border-none border shadow-sm"
                        }`}
                        onClick={() => {
                          dispatch(
                            toggleInvigilator({
                              invigilator: invig,
                            }),
                          );
                        }}
                      >
                        <div className="d-flex flex-row align-items-center gap-2">
                          <AnimatePresence mode="wait" initial={false}>
                            {isSelected ? (
                              <motion.div
                                key="selected-icon"
                                initial={{
                                  scale: 0,
                                  opacity: 0,
                                  rotate: -45,
                                }}
                                animate={{
                                  scale: 1,
                                  opacity: 1,
                                  rotate: 0,
                                }}
                                exit={{ scale: 0, opacity: 0, rotate: 45 }}
                                transition={{
                                  duration: 0.15,
                                  ease: "easeOut",
                                }}
                              >
                                <Icon
                                  icon="akar-icons:circle-check-fill"
                                  width={20}
                                  height={20}
                                  className="text-fern-400"
                                />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="unselected-icon"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.15,
                                  ease: "easeOut",
                                }}
                              >
                                <Circle size={20} style={{ color: "#ccc" }} />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="d-flex flex-row align-items-start gap-2">
                            <div className="d-flex flex-row align-items-center gap-2">
                              <div
                                style={{
                                  width: "2.5rem",
                                  height: "2.5rem",
                                  display: "grid",
                                  placeItems: "center",
                                  flexShrink: 0,
                                }}
                                className="rounded-circle"
                              >
                                <img
                                  src="./images/user.png"
                                  alt=""
                                  className="object-fit-cover w-100 h-100 rounded-circle"
                                />
                              </div>
                              <div className="d-flex flex-column">
                                <span
                                  className="font-size-sm fw-semibold"
                                  style={{ lineHeight: 1.2 }}
                                >
                                  {invig?.name}
                                </span>
                                <small className="fw-light text-muted">
                                  @{invig?.username}
                                </small>
                              </div>
                            </div>
                            <small
                              style={{
                                height: "1rem",
                                display: "grid",
                                alignItems: "center",
                                fontSize: "0.65rem",
                              }}
                              className="rounded-pill px-1 primary-background-100 color-primary text-capitalize"
                            >
                              {invig.actorable_type.replaceAll("_", " ")}
                            </small>
                          </div>
                        </div>
                      </motion.div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none"
              onClick={() => {
                handleClose();
                dispatch(resetAssignInvigilatorState());
              }}
              disabled={isPending}
            >
              Cancel
            </button>
            {moduleState?.assignInvigilator?.selectedInvigilator.length > 0 && (
              <button
                disabled={isPending}
                className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
                onClick={() => {
                  handleAssignInvigilator();
                }}
              >
                {isPending ? <SingleSpinner /> : `Assign ${moduleState?.assignInvigilator?.selectedInvigilator.length} Invigilator`}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AssignInvigilator;
