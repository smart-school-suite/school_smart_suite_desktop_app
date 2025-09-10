import { useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useBulkAddTeacherSpecialtyPreference } from "../../hooks/teacher/useBulkAddTeacherSpecialtyPreference";

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

function BulkAddTeacherSpecialtyPreference({
  handleClose,
  bulkData,
  resetAll,
}) {
  const { data: specialtiesData, isLoading, error } = useGetSpecialties();
  const { mutate: bulkAddTeacherSpecialtyPreference, isPending } =
    useBulkAddTeacherSpecialtyPreference(handleClose, resetAll);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const selectAllCheckboxRef = useRef(null);

  const allSpecialties = useMemo(() => {
    return specialtiesData?.data || [];
  }, [specialtiesData]);

  const allOriginalSpecialtyIds = useMemo(() => {
    return allSpecialties.map((item) => item.id);
  }, [allSpecialties]);

  const filteredSpecialties = useMemo(() => {
    if (!debouncedSearchTerm) return allSpecialties;
    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();
    return allSpecialties.filter(
      (specialty) =>
        specialty.specialty_name.toLowerCase().includes(lowercasedSearchTerm) ||
        specialty.level_name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allSpecialties, debouncedSearchTerm]);

  const areAllSpecialtiesSelected = useMemo(() => {
    if (allOriginalSpecialtyIds.length === 0) return false;
    return allOriginalSpecialtyIds.every((id) =>
      selectedSpecialtyIds.has(id)
    );
  }, [allOriginalSpecialtyIds, selectedSpecialtyIds]);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate =
        selectedSpecialtyIds.size > 0 && !areAllSpecialtiesSelected;
    }
  }, [selectedSpecialtyIds, areAllSpecialtiesSelected]);


  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedSpecialtyIds(new Set(allOriginalSpecialtyIds));
    } else {
      setSelectedSpecialtyIds(new Set());
    }
  };

  const handleSelectSpecialty = (specialtyId, event) => {
    setSelectedSpecialtyIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        newSelected.add(specialtyId);
      } else {
        newSelected.delete(specialtyId);
      }
      return newSelected;
    });
  };

  if (isLoading) return <SingleSpinner />;

  if (error) {
    return (
      <div className="text-danger">
        Error loading specialties: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span>Add Teacher Specialty Preferences</span>
        <span
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        >
          <Icon icon="proicons:cancel" />
        </span>
      </div>

      {/* Select All */}
      <div className="d-flex flex-row align-items-center justify-content-end">
        <div className="d-flex align-items-center gap-2">
          <span className="font-size-sm">Select All</span>
          <div>
            <input
              type="checkbox"
              className={`${
                darkMode ? "dark-bg-light dark-mode-border" : ""
              } form-check-input`}
              checked={areAllSpecialtiesSelected}
              onChange={handleSelectAll}
              ref={selectAllCheckboxRef}
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="my-2">
        <input
          type="search"
          className={`${
            darkMode ? "dark-mode-input" : ""
          } w-100 form-control font-size-sm`}
          placeholder="Search Specialty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="modal-content-child">
        <div className="d-flex flex-column gap-2">
          {filteredSpecialties.length === 0 && !isLoading ? (
            <div className="text-center mt-4">
              {debouncedSearchTerm
                ? "No matching specialties found."
                : "No specialties available."}
            </div>
          ) : (
            filteredSpecialties.map((item) => (
              <div
                className="d-flex flex-row w-100 align-items-center justify-content-between"
                key={item.id}
              >
                <div className="d-flex flex-column">
                  <span className="font-size-sm fw-semibold">
                    {item.specialty_name}
                  </span>
                  <span className="font-size-sm fw-light">
                    {item.level_name}
                  </span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className={`${
                      darkMode ? "dark-bg-light dark-mode-border" : ""
                    } form-check-input`}
                    checked={selectedSpecialtyIds.has(item.id)}
                    onChange={(e) => {
                        handleSelectSpecialty(item.id, e)
                        e.stopPropagation();
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white"
        onClick={() => {
          const specialtyIds = Array.from(selectedSpecialtyIds).map((id) => ({
            specialty_id: id,
          }));
          const teacherIds = bulkData.map((t) => ({
            teacher_id: t.id,
          }));
          bulkAddTeacherSpecialtyPreference({ teacherIds, specialtyIds });
        }}
        disabled={isPending}
      >
        {isPending ? <SingleSpinner /> : "Add Specialty Preference"}
      </button>
    </>
  );
}
export default BulkAddTeacherSpecialtyPreference;

