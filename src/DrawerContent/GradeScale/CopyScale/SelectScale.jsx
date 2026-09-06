import { Dot, Scale, CircleCheck } from "lucide-react";
import SearchInput from "../../../components/input/search";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { useGetGradeScaleCategories } from "../../../hooks/gradeScale/useGetGradeScaleCategories";
import { Fragment, useState } from "react";
import { NotFoundError } from "../../../components/errors/Error";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  setCopyScaleValue,
  resetCopyScaleState,
} from "../../../Slices/academics/gradeScaleSlice";
function SelectScale({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    data: gradeScaleCategories,
    isLoading,
    error,
  } = useGetGradeScaleCategories();
  return (
    <>
      <div className="drawer-content px-2 font-size-sm pt-2 pb-5">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
                style={{ height: "2.5rem", width: "2.5rem" }}
              >
                <Scale size={16} />
              </div>
              <div className="d-flex flex-column">
                <small className="text-muted">Target Category</small>
                <div className="d-flex flex-row align-items-center gap-1 font-size-sm">
                  <span className="fw-semibold ">{drawerData.grade_title}</span>
                  <Dot size={16} />
                  <span className="fw-semibold text-capitalize">
                    {drawerData.exam_type}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-end fw-medium text-capitalize">{`step ${currentStep} of ${fullStep} completed`}</span>
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Search Scale</span>
            <SearchInput placeholder={"Search Scale"} />
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="fw-medium">Available Scales</span>
            {isLoading ? (
              <div className="d-flex flex-column gap-2 px-2">
                {[...Array(8)].map((_, index) => (
                  <Fragment key={index}>
                    <RectangleSkeleton height="20dvh" width="100%" />
                  </Fragment>
                ))}
              </div>
            ) : error ? (
              <>
                <NotFoundError
                  title={error?.response?.data?.errors?.title}
                  description={error?.response?.data?.errors?.description}
                ></NotFoundError>
              </>
            ) : (
              gradeScaleCategories.data
                .filter((cat) => cat.is_configured == true)
                .map((category) => (
                  <Fragment key={category.id}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`card p-2 rounded-4 transition-all
                   d-flex flex-column gap-3 pointer-cursor 
                  ${
                    selectedCategory?.id == category?.id
                      ? "shadow-fern-100-lg border-fern-300"
                      : "border-none border shadow-sm"
                  } `}
                      style={{ borderRadius: "0.8rem" }}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div className="d-flex flex-row justify-content-between align-items-center pe-2">
                        <div className="d-flex flex-column gap-5">
                          <div className="d-flex flex-column gap-1">
                            <div className="d-flex flex-row align-items-center gap-2">
                              <div
                                className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
                                style={{ height: "2.5rem", width: "2.5rem" }}
                              >
                                <Scale size={16} />
                              </div>
                              <div className="d-flex flex-column">
                                <small className="text-muted">Category</small>
                                <div className="d-flex flex-row align-items-center gap-1 font-size-sm">
                                  <span className="fw-semibold ">
                                    {category.grade_title}
                                  </span>
                                  <Dot size={16} />
                                  <span className="fw-semibold  text-capitalize">
                                    {category.exam_type}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center gap-1 text-muted">
                              <span>Max Score {category.max_score}</span>
                              <Dot />
                              <span>
                                {category?.passing_grade_count} Failing
                              </span>
                              <Dot />
                              <span>
                                {category?.failing_grade_count} Passing
                              </span>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                            {category?.grade_scale?.map((grade) => (
                              <Fragment>
                                <button className="border-none rounded-3 bg-none p-2 border">
                                  {grade?.grade?.letter_grade}
                                </button>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                        <div>
                          <AnimatePresence>
                            {selectedCategory?.id == category.id && (
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
                                <CircleCheck
                                  size={16}
                                  className="green-color"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  </Fragment>
                ))
            )}
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none p-2"
              onClick={() => {
                handleClose();
                dispatch(resetCopyScaleState());
              }}
            >
              cancel
            </button>
            {selectedCategory && (
              <button
                className="rouned primary-background text-white border-none px-3 py-2 rounded-3"
                onClick={() => {
                  nextStep();
                  dispatch(
                    setCopyScaleValue({
                      field: "source",
                      value: selectedCategory,
                    }),
                  );
                  dispatch(
                    setCopyScaleValue({
                      field: "target",
                      value: drawerData,
                    }),
                  );
                }}
              >
                Review Scale
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default SelectScale;
