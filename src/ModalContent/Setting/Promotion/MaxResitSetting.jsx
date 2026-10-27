import { X } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { NotFoundError } from "../../../components/errors/Error";
import Check from "../../../components/input/Check";
import SearchInput from "../../../components/input/search";
import { useGetLetterGrades } from "../../../hooks/letterGrade/useGetLetterGrades";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";
import { isLastElement } from "../../../utils/functions";

function AllowedLetterGradeSetting({ handleClose = () => {}, drawerData }) {
  const {
    data: letterGrades,
    isLoading: isLetterGradesLoading,
    error: letterGradesError,
  } = useGetLetterGrades();

  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);

  const initialSelectedIds = useMemo(() => {
    const raw = drawerData?.value;
    if (!raw) return [];

    let parsed = raw;
    if (typeof raw === "string") {
      try {
        parsed = JSON.parse(raw);
      } catch {
        return [];
      }
    }

    if (Array.isArray(parsed)) {
      return parsed
        .map((item) =>
          typeof item === "object" && item !== null ? item?.id : item,
        )
        .filter(Boolean);
    }

    return [];
  }, [drawerData?.value]);

  const [selectedGradeIds, setSelectedGradeIds] = useState(
    () => new Set(initialSelectedIds),
  );

  useEffect(() => {
    setSelectedGradeIds(new Set(initialSelectedIds));
  }, [initialSelectedIds]);

  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allGrades = useMemo(() => {
    return Array.isArray(letterGrades?.data)
      ? letterGrades.data
      : Array.isArray(letterGrades)
        ? letterGrades
        : [];
  }, [letterGrades]);

  const allOriginalGradeIds = useMemo(() => {
    return allGrades.map((item) => item?.id).filter(Boolean);
  }, [allGrades]);

  const filteredGrades = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allGrades;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase().trim();

    return allGrades.filter((grade) => {
      return (grade?.letter_grade ?? "")
        .toLowerCase()
        .includes(lowercasedSearchTerm);
    });
  }, [allGrades, debouncedSearchTerm]);

  const areAllGradesSelected = useMemo(() => {
    if (allOriginalGradeIds.length === 0) return false;
    return allOriginalGradeIds.every((id) => selectedGradeIds.has(id));
  }, [allOriginalGradeIds, selectedGradeIds]);

  const isIndeterminate = useMemo(() => {
    return selectedGradeIds.size > 0 && !areAllGradesSelected;
  }, [selectedGradeIds.size, areAllGradesSelected]);

  const handleSelectAll = (isChecked) => {
    setError(null);
    if (isChecked) {
      setSelectedGradeIds(new Set(allOriginalGradeIds));
    } else {
      setSelectedGradeIds(new Set());
    }
  };

  const handleSelectGrade = (gradeId, isChecked) => {
    setError(null);
    if (!gradeId) return;
    setSelectedGradeIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (isChecked) {
        newSelected.add(gradeId);
      } else {
        newSelected.delete(gradeId);
      }
      return newSelected;
    });
  };

  const handleSave = () => {
    setError(null);
    if (!drawerData?.id) return;

    // Check if nothing is selected
    if (selectedGradeIds.size === 0) {
      setError("Please select at least one letter grade before saving.");
      return;
    }

    // Check if current selection matches initial selection exactly
    const isUnchanged =
      initialSelectedIds.length === selectedGradeIds.size &&
      initialSelectedIds.every((id) => selectedGradeIds.has(id));

    if (isUnchanged) {
      setError(
        "You haven't made any changes yet. Please select different letter grades to update."
      );
      return;
    }

    const formattedGrades = Array.from(selectedGradeIds);
    updateSetting({
      payload: {
        setting_id: drawerData.id,
        value: formattedGrades,
      },
    });
  };

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 mb-2">
        <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 font-size-sm px-2">
          <span className="fw-medium">Allowed Letter Grades</span>
          <button
            type="button"
            className="bg-none border-none border rounded-circle"
            aria-label="Close drawer"
            onClick={handleClose}
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
        <div className="px-2">
          <SearchInput
            placeholder="Search Letter Grade..."
            value={searchTerm}
            onChange={(val) => setSearchTerm(val ?? "")}
            hotkey="Ctrl+K"
          />
        </div>
      </div>

      <div className="drawer-content pt-3" style={{ paddingBottom: "10rem" }}>
        <div className="d-flex flex-column gap-3 font-size-sm px-2">
          {error && (
            <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-2">
              <p className="m-0">{error}</p>
            </div>
          )}

          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="text-iron-400 fw-light">Grades</span>
            <div className="d-flex align-items-center gap-2">
              <span className="font-size-sm">Select All</span>
              <div>
                <Check
                  checked={areAllGradesSelected}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                  disabled={allOriginalGradeIds.length === 0}
                  size="1.25rem"
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            {isLetterGradesLoading ? (
              <div className="d-flex flex-column gap-3">
                {[...Array(6)].map((_, index) => (
                  <div className="d-flex gap-2 flex-column" key={index}>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <RectangleSkeleton height="2.5rem" width="2.5rem" />
                      <RectangleSkeleton height="1dvh" width="30%" />
                    </div>
                    <HorizontalDashedLine
                      dashed={false}
                      color="#ccc"
                      thickness={0.3}
                    />
                  </div>
                ))}
              </div>
            ) : letterGradesError ? (
              <NotFoundError
                title={
                  letterGradesError?.response?.data?.errors?.title ??
                  "An Error Occurred"
                }
                description={
                  letterGradesError?.response?.data?.errors?.description ??
                  "Unable to load letter grades."
                }
              />
            ) : filteredGrades.length === 0 ? (
              <div className="py-4">
                {debouncedSearchTerm ? (
                  <div className="d-flex flex-column align-items-center gap-2 text-center my-3">
                    <span className="fw-semibold font-size-sm">
                      No matching letter grades found
                    </span>
                    <p className="text-muted font-size-sm mb-2">
                      No grades found matching &quot;{debouncedSearchTerm}
                      &quot;.
                    </p>
                    <button
                      type="button"
                      className="btn btn-link btn-sm text-decoration-none p-0"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center gap-2 text-center my-3">
                    <span className="fw-semibold font-size-sm">
                      No Letter Grades Available
                    </span>
                    <p className="text-muted font-size-sm mb-0">
                      There are currently no letter grades configured in the
                      system.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              filteredGrades.map((item, index) => (
                <Fragment key={item?.id}>
                  <div className="d-flex flex-row w-100 align-items-center justify-content-between py-1">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <div
                        className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
                        style={{ height: "2.5rem", width: "2.5rem" }}
                      >
                        {item?.letter_grade ?? "-"}
                      </div>
                      <span className="font-size-sm fw-semibold">
                        Letter Grade {item?.letter_grade ?? ""}
                      </span>
                    </div>

                    <div>
                      <Check
                        checked={selectedGradeIds.has(item?.id)}
                        onChange={(isChecked) =>
                          handleSelectGrade(item?.id, isChecked)
                        }
                        size="1.25rem"
                      />
                    </div>
                  </div>
                  {!isLastElement(
                    index,
                    letterGrades?.data?.length ?? letterGrades?.length ?? 0,
                  ) && (
                    <HorizontalDashedLine
                      dashed={false}
                      color="#ccc"
                      thickness={0.2}
                    />
                  )}
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
              type="button"
              className="border-none bg-none p-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="border-none rounded-3 bg-primary-500 text-white font-size-sm px-3 py-2"
              onClick={handleSave}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllowedLetterGradeSetting;

function useDebounce(value, delay = 300) {
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