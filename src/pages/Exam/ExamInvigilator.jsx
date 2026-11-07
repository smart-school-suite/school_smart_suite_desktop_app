import { Icon } from "@iconify/react";
import { ArrowDown, ChevronDown, Mail, Phone, UserCheck } from "lucide-react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { NotFoundError } from "../../components/errors/Error";
import SearchInput from "../../components/input/search";
import JobPopOver from "../../components/Popover/JobPopover";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import ExamNavigator from "../../components/SideBars/ExamNavigator";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import AssignInvigilator from "../../DrawerContent/Invigilator/AssignInvigilator";
import { useGetAssignedInvigilators } from "../../hooks/invigilator/useGetAssignedInvigilators";
import { useRemoveInvigilator } from "../../hooks/invigilator/useRemoveInvigilator";
function ExamInvigilator() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const moduleState = useSelector((state) => state.examInvigilator);
  const { mutate: removeInvigilator, isPending } = useRemoveInvigilator(
    moduleState?.selectedExam?.id,
  );
  const {
    data: invigilators,
    isLoading,
    error,
  } = useGetAssignedInvigilators(moduleState?.selectedExam?.id);
  const handleRemoveInvigilator = (invigilatorId) => {
    removeInvigilator({
      exam_id: moduleState?.selectedExam?.id,
      invigilator_ids: [invigilatorId],
    });
  };
  return (
    <>
      <main className="main-container font-size-sm">
        <div className="d-flex flex-column gap-1 h-100">
          <div className="page-head page-head--bar">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`${
                  darkMode ? "dark-mode-active" : "light-mode-active"
                } d-flex justify-content-center align-items-center`}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                }}
              >
                <UserCheck size={16} />
              </div>
              <span className="fw-semibold font-size-sm">
                Manage Exam Invigilator
              </span>
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver />
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                }
              >
                <span style={{ lineHeight: "16px" }}>Actions</span>
                <ChevronDown size={16} />
              </ModalButton>
            </div>
          </div>
          <div
            className="d-flex flex-row align-items-stretch gap-2 flex-grow-1"
            style={{ minHeight: 0 }}
          >
            <ExamNavigator />
            <div
              className="d-flex flex-column gap-2 flex-grow-1"
              style={{ minWidth: 0, minHeight: 0 }}
            >
              {moduleState?.selectedExam ? (
                <div
                  className="d-flex flex-column gap-4 h-100"
                  style={{ minHeight: 0 }}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between w-100">
                    <div className="w-50">
                      <SearchInput
                        placeholder="Search Admin or Teacher"
                        hotkey="Ctrl+T"
                      />
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
                        <span>Export</span>
                        <ArrowDown size={16} />
                      </button>
                      <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
                        <span>Filter</span>
                        <Icon
                          icon="basil:filter-outline"
                          width={16}
                          height={16}
                        />
                      </button>
                      <DrawerTrigger
                        title="Assign Invigilator"
                        placement="right"
                        drawerChildren={AssignInvigilator}
                        drawerData={{ selectedExam: moduleState?.selectedExam }}
                        showHeader={false}
                      >
                        <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                          <span>Assign Invigilator</span>
                        </button>
                      </DrawerTrigger>
                    </div>
                  </div>
                  <div
                    className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pe-1"
                    style={{
                      flex: "1 1 auto",
                      minHeight: 0,
                      paddingBottom: "2rem",
                    }}
                  >
                    {isLoading ? (
                      [...Array(2)].map((_, index) => (
                        <Fragment key={index}>
                          <div className="d-flex flex-column gap-2">
                            <RectangleSkeleton
                              width={"15%"}
                              height={"1rem"}
                              borderRadius={6}
                            />
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                              }}
                              className="gap-2"
                            >
                              {[...Array(6)].map((_, index) => (
                                <Fragment key={index}>
                                  <RectangleSkeleton borderRadius={6} />
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
                    ) : Object.keys(invigilators?.data ?? {}).length > 0 ? (
                      Object.keys(invigilators?.data ?? {}).map((obj, index) => (
                        <Fragment key={index}>
                          <div className="d-flex flex-column gap-1">
                            <span className="font-size-sm fw-semibold text-capitalize">
                              {obj.replaceAll("_", " ")}
                            </span>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                              }}
                              className="gap-2"
                            >
                              {invigilators.data[obj].map((invig) => (
                                <Fragment key={invig.id}>
                                  <div className="card rounded-4 border-none border shadow-sm p-2 font-size-sm d-flex flex-column gap-4">
                                    <div className="d-flex flex-row justify-content-end">
                                      <small
                                        style={{
                                          height: "1rem",
                                          display: "grid",
                                          alignItems: "center",
                                          fontSize: "0.65rem",
                                        }}
                                        className="rounded-pill px-2 primary-background-100 color-primary text-capitalize"
                                      >
                                        {invig.actorable_type.replaceAll(
                                          "_",
                                          " ",
                                        )}
                                      </small>
                                    </div>
                                    <div className="d-flex flex-column gap-3">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <div className="d-flex flex-column align-items-center gap-4">
                                          <div
                                            style={{
                                              width: "4rem",
                                              height: "4rem",
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
                                          <div className="d-flex flex-column align-items-center">
                                            <span
                                              className="fw-semibold"
                                              style={{ lineHeight: 1 }}
                                            >
                                              {invig?.name}
                                            </span>
                                            <small style={{ color: "#888" }}>
                                              @{invig?.username}
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                      <HorizontalDashedLine
                                        dashed={false}
                                        color="#ccc"
                                        thickness={0.2}
                                      />
                                      <div className="d-flex flex-column text-muted gap-2">
                                        <div className="d-flex flex-row align-items-center gap-2">
                                          <Mail size={16} />
                                          <span>{invig?.email}</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center gap-2">
                                          <Phone size={16} />
                                          <span>{invig?.phone}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      className="bg-none border-none border p-2 font-size-sm w-100 rounded-3 mt-auto"
                                      disabled={isPending}
                                      onClick={() =>
                                        handleRemoveInvigilator(invig?.id)
                                      }
                                    >
                                      {isPending ? (
                                        <SingleSpinner />
                                      ) : (
                                        "Remove Assignment"
                                      )}
                                    </button>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        </Fragment>
                      ))
                    ) : (
                      <div className="d-flex flex-column align-items-center gap-2 text-center flex-grow-1">
                        <img
                          src="./sss-maskot/404.png"
                          alt="sss-timetable-maskot"
                          style={{
                            height: "250px",
                            width: "250px",
                            objectFit: "contain",
                          }}
                        />
                        <span className="fw-semibold font-size-sm">
                          No Invigilators Assigned
                        </span>
                        <p className="text-muted font-size-sm mb-0">
                          You will have to Assign invigilators for this exam
                          before managing them
                        </p>
                        <DrawerTrigger
                          title="Assign Invigilator"
                          placement="right"
                          drawerChildren={AssignInvigilator}
                          drawerData={{
                            selectedExam: moduleState?.selectedExam,
                          }}
                          showHeader={false}
                        >
                          <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                            <span>Assign Invigilator</span>
                          </button>
                        </DrawerTrigger>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center gap-2 text-center h-100">
                  <img
                    src="./sss-maskot/happy.png"
                    alt="sss-timetable-maskot"
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "contain",
                    }}
                  />
                  <span className="fw-semibold font-size-sm">
                    Ready To Manage Invigilator Assignment ?
                  </span>
                  <p className="text-muted font-size-sm mb-0">
                    Select an exam from the sidebar to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default ExamInvigilator;
