import { useSelector } from "react-redux";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState, useMemo, useEffect, Fragment } from "react";
import { useGetAssignedTeacherCourses } from "../../hooks/teacherCourse/useGetAssignedTeacherCourse";
import { useGetAssignableTeacherCourses } from "../../hooks/teacherCourse/useGetAssignableTeacherCourses";
import { useAssignTeacherCourse } from "../../hooks/teacherCourse/useAssignTeacherCourse";
import { useRemoveAssignedTeacherCourse } from "../../hooks/teacherCourse/useRemoveTeacherAssignedCourse";
function ManageTeacherCoursePreference({ handleClose, rowData }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [toggle, setToggle] = useState({
    addablePreferences: true,
    removeablePreferences: false,
    addedPreferences: false,
  });

  const handleToggle = (activeTab) => {
    setToggle({
      addablePreferences: activeTab === "addablePreferences",
      removeablePreferences: activeTab === "removeablePreferences",
      addedPreferences: activeTab === "addedPreferences",
    });
  };

  const toggleOptions = [
    { key: "addablePreferences", label: "Addable Preferences" },
    { key: "removeablePreferences", label: "Removable Preferences" },
    { key: "addedPreferences", label: "Added Preferences" },
  ];
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span>Manage Teacher Course Preference</span>
          <span onClick={handleClose} style={{ cursor: "pointer" }}>
            <Icon icon="proicons:cancel" />
          </span>
        </div>
        <div
          className={`${
            darkMode
              ? "dark-bg-light dark-mode-border"
              : "primary-background-50"
          } d-flex gap-2 flex-row my-2 rounded-2`}
        >
          {toggleOptions.map((option) => (
            <button
              key={option.key}
              className={`permission-toggle ${
                toggle[option.key]
                  ? "permission-toggle-active rounded-2 font-size-sm"
                  : "border-none bg-transparent color-primary font-size-sm"
              }`}
              onClick={() => handleToggle(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {toggle.addablePreferences ? (
          <AddablePreferences teacherId={rowData.id} />
        ) : toggle.removeablePreferences ? (
          <RemovablePreferences teacherId={rowData.id} />
        ) : toggle.addedPreferences ? (
          <AddedPreferences teacherId={rowData.id} />
        ) : null}
      </div>
    </>
  );
}
export default ManageTeacherCoursePreference;

function AddablePreferences({ teacherId }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data: courseData,
    isLoading,
    error: courseError,
  } = useGetAssignableTeacherCourses(teacherId);
  const { mutate: addPreference, isPending } =
    useAssignTeacherCourse(teacherId);
  const [selectedCourseIds, setSelectedCourseIds] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allCourses = useMemo(() => {
    return courseData?.data || [];
  }, [courseData]);

  const allOriginalCourseIds = useMemo(() => {
    return allCourses.map((item) => item.id);
  }, [allCourses]);

  const filteredCourses = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allCourses;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allCourses.filter(
      (course) =>
        course.course_title.toLowerCase().includes(lowercasedSearchTerm) ||
        course.course_code.toLowerCase().includes(lowercasedSearchTerm) ||
        course.specialty_name.toLowerCase().includes(lowercasedSearchTerm) ||
        course.level_name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allCourses, debouncedSearchTerm]);

  const areAllCoursesSelected = useMemo(() => {
    if (allOriginalCourseIds.length === 0) return false;
    return allOriginalCourseIds.every((id) => selectedCourseIds.has(id));
  }, [allOriginalCourseIds, selectedCourseIds]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedCourseIds(new Set(allOriginalCourseIds));
    } else {
      setSelectedCourseIds(new Set());
    }
  };

  const handleSelectCourse = (courseId, event) => {
    setSelectedCourseIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        newSelected.add(courseId);
      } else {
        newSelected.delete(courseId);
      }
      return newSelected;
    });
  };

  const selectAllCheckboxRef = useMemo(() => {
    const ref = (element) => {
      if (element) {
        element.indeterminate =
          selectedCourseIds.size > 0 && !areAllCoursesSelected;
      }
    };
    return ref;
  }, [selectedCourseIds, areAllCoursesSelected]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column gap-2 modal-content-child px-2">
          <div className="d-flex flex-column">
            <RectangleSkeleton width="100%" height="5dvh" />
          </div>
          {[...Array(20)].map((_, index) => (
            <div
              className="d-flex flex-row align-items-center justify-content-between w-100"
              key={index}
            >
              <div className="d-flex flex-column gap-1">
                <RectangleSkeleton width="50%" height="1dvh" />
                <RectangleSkeleton width="20%" height="1dvh" />
              </div>
              <div>
                <RectangleSkeleton width="20px" height="20px" />
              </div>
            </div>
          ))}
        </div>
      ) : courseError ? (
        <NotFoundError
          title={courseError?.response?.data?.errors?.title}
          description={courseError?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <>
          <div className="d-flex flex-row align-items-center justify-content-end">
            <div className="d-flex align-items-center gap-2">
              <span className="font-size-sm">Select All</span>
              <div>
                <input
                  type="checkbox"
                  className={`${
                    darkMode ? "dark-bg-light dark-mode-border" : null
                  } form-check-input`}
                  checked={areAllCoursesSelected}
                  onChange={handleSelectAll}
                  ref={selectAllCheckboxRef}
                />
              </div>
            </div>
          </div>
          <div className="my-2">
            <input
              type="search"
              className={`${
                darkMode ? "dark-mode-input" : "null"
              } w-100 form-control font-size-sm`}
              placeholder="Search Course"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="modal-content-child pe-2">
            <div className="d-flex flex-column gap-3">
              {filteredCourses.length === 0 && !isLoading ? (
                <div className="text-center mt-4">
                  {debouncedSearchTerm
                    ? "No matching Course found."
                    : "No Course Found available."}
                </div>
              ) : (
                filteredCourses.map((item) => (
                  <Fragment key={item.id}>
                    <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                      <div className="d-flex flex-column gap-1">
                        <span className="font-size-sm fw-semibold">
                          {item.course_title}, {item.credit} credit
                        </span>
                        <span className="font-size-sm fw-light">
                          {item.specialty_name},{item.level_name}
                        </span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className={`${
                            darkMode ? "dark-bg-light dark-mode-border" : null
                          } form-check-input`}
                          checked={selectedCourseIds.has(item.id)}
                          onChange={(e) => handleSelectCourse(item.id, e)}
                        />
                      </div>
                    </div>
                  </Fragment>
                ))
              )}
            </div>
          </div>
          <button
            className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white"
            onClick={() => {
              const formattedData = Array.from(selectedCourseIds).map(
                (courseId) => ({
                      course_id:courseId
                })
              );

              addPreference({
                courseIds: formattedData,
                teacher_id: teacherId,
              });
            }}
            disabled={isPending || selectedCourseIds.size === 0}
          >
            {isPending ? <SingleSpinner /> : "Add Course Preferences"}
          </button>
        </>
      )}
    </>
  );
}

function RemovablePreferences({ teacherId }) {
  const {
    data: teacherCourse,
    isLoading,
    error: teacherCourseError,
  } = useGetAssignedTeacherCourses(teacherId);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { mutate: removePreference, isPending } =
    useRemoveAssignedTeacherCourse(teacherId);
  const [selectedCourseIds, setSelectedCourseIds] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allCourses = useMemo(() => {
    return teacherCourse?.data || [];
  }, [teacherCourse]);

  const allOriginalCourseIds = useMemo(() => {
    return allCourses.map((item) => item.id);
  }, [allCourses]);

  const filteredCourses = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allCourses;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allCourses.filter(
      (course) =>
        course.course_title.toLowerCase().includes(lowercasedSearchTerm) ||
        course.course_code.toLowerCase().includes(lowercasedSearchTerm) ||
        course.specialty_name.toLowerCase().includes(lowercasedSearchTerm) ||
        course.level_name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allCourses, debouncedSearchTerm]);

  const areAllCoursesSelected = useMemo(() => {
    if (allOriginalCourseIds.length === 0) return false;
    return allOriginalCourseIds.every((id) => selectedCourseIds.has(id));
  }, [allOriginalCourseIds, selectedCourseIds]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedCourseIds(new Set(allOriginalCourseIds));
    } else {
      setSelectedCourseIds(new Set());
    }
  };

  const handleSelectCourse = (courseId, event) => {
    setSelectedCourseIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        newSelected.add(courseId);
      } else {
        newSelected.delete(courseId);
      }
      return newSelected;
    });
  };

  const selectAllCheckboxRef = useMemo(() => {
    const ref = (element) => {
      if (element) {
        element.indeterminate =
          selectedCourseIds.size > 0 && !areAllCoursesSelected;
      }
    };
    return ref;
  }, [selectedCourseIds, areAllCoursesSelected]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column gap-3 modal-content-child px-2">
          <div className="d-flex flex-column">
            <RectangleSkeleton width="100%" height="5dvh" />
          </div>
          {[...Array(20)].map((_, index) => (
            <div
              className="d-flex flex-row align-items-center justify-content-between w-100"
              key={index}
            >
              <div className="d-flex flex-column gap-1">
                <RectangleSkeleton width="50%" height="1dvh" />
                <RectangleSkeleton width="20%" height="1dvh" />
              </div>
              <div>
                <RectangleSkeleton width="20px" height="20px" />
              </div>
            </div>
          ))}
        </div>
      ) : teacherCourseError ? (
        <NotFoundError
          title={teacherCourseError?.response?.data?.errors?.title}
          description={teacherCourseError?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <>
          <div className="d-flex flex-row align-items-center justify-content-end">
            <div className="d-flex align-items-center gap-2">
              <span className="font-size-sm">Select All</span>
              <div>
                <input
                  type="checkbox"
                  className={`${
                    darkMode ? "dark-bg-light dark-mode-border" : null
                  } form-check-input`}
                  checked={areAllCoursesSelected}
                  onChange={handleSelectAll}
                  ref={selectAllCheckboxRef}
                />
              </div>
            </div>
          </div>
          <div className="my-2">
            <input
              type="search"
              className={`${
                darkMode ? "dark-mode-input" : "null"
              } w-100 form-control font-size-sm`}
              placeholder="Search Specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="modal-content-child pe-2">
            <div className="d-flex flex-column gap-3">
              {filteredCourses.length === 0 && !isLoading ? (
                <div className="text-center mt-4">
                  {debouncedSearchTerm
                    ? "No matching Courses found."
                    : "No Courses available."}
                </div>
              ) : (
                filteredCourses.map((item) => (
                  <Fragment key={item.id}>
                    <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                      <div className="d-flex flex-column gap-1">
                        <span className="font-size-sm fw-semibold">
                          {item.course_title}, {item.credit} credit
                        </span>
                        <span className="font-size-sm fw-light">
                          {item.specialty_name},{item.level_name}
                        </span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className={`${
                            darkMode ? "dark-bg-light dark-mode-border" : null
                          } form-check-input`}
                          checked={selectedCourseIds.has(item.id)}
                          onChange={(e) => handleSelectCourse(item.id, e)}
                        />
                      </div>
                    </div>
                  </Fragment>
                ))
              )}
            </div>
          </div>
          <button
            className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white"
            onClick={() => {
              const formattedData = Array.from(selectedCourseIds).map(
                (courseId) => ({
                  course_id: courseId,
                })
              );
              removePreference({
                courseIds: formattedData,
                teacher_id: teacherId,
              });
            }}
            disabled={isPending || selectedCourseIds.size === 0}
          >
            {isPending ? <SingleSpinner /> : "Remove Course Preferences"}
          </button>
        </>
      )}
    </>
  );
}

function AddedPreferences({ teacherId }) {
  const {
    data: teacherCourseData,
    isLoading,
    error: teacheCourseError,
  } = useGetAssignedTeacherCourses(teacherId);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allCourses = useMemo(() => {
    return teacherCourseData?.data || [];
  }, [teacherCourseData]);

  const filteredCourses = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allCourses;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allCourses.filter(
      (course) =>
        course.course_title.toLowerCase().includes(lowercasedSearchTerm) ||
        course.course_code.toLowerCase().includes(lowercasedSearchTerm) ||
        course.specialty_name.toLowerCase().includes(lowercasedSearchTerm) ||
        course.level_name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allCourses, debouncedSearchTerm]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column gap-3 modal-content-child px-2">
          <div className="d-flex flex-column">
            <RectangleSkeleton width="100%" height="5dvh" />
          </div>
          {[...Array(20)].map((_, index) => (
            <div
              className="d-flex flex-row align-items-center justify-content-between w-100"
              key={index}
            >
              <div className="d-flex flex-column gap-1">
                <RectangleSkeleton width="50%" height="1dvh" />
                <RectangleSkeleton width="20%" height="1dvh" />
              </div>
            </div>
          ))}
        </div>
      ) : teacheCourseError ? (
        <NotFoundError
          title={teacheCourseError?.response?.data?.errors?.title}
          description={teacheCourseError?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <>
          <div className="my-2">
            <input
              type="search"
              className={`${
                darkMode ? "dark-mode-input" : "null"
              } w-100 form-control font-size-sm`}
              placeholder="Search Specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="modal-content-child pe-2">
            {filteredCourses.length === 0 ? (
              <div className="text-center mt-4">
                {debouncedSearchTerm
                  ? "No matching Assigned Courses found."
                  : "No Courses Assigned added yet."}
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {filteredCourses.map((item) => (
                  <Fragment key={item.id}>
                    <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                      <div className="d-flex flex-column gap-1">
                        <span className="font-size-sm fw-semibold">
                          {item.course_title}, {item.credit} credit
                        </span>
                        <span className="font-size-sm fw-light">
                          {item.specialty_name},{item.level_name}
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
