import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState, useMemo, useEffect } from "react";
import { useAddTeacherSpecialtyPreference } from "../../hooks/teacher/useAddTeacherSpecialtyPreference";
import { useGetAvialableSpecialtyPreference } from "../../hooks/teacher/useGetAvailableSpecialtyPreference";
import { useGetTeacherSpecialtyPreference } from "../../hooks/teacher/useGetTeacherSpecialtyPreference";
import { useRemoveSpecialtyPreference } from "../../hooks/teacher/useRemoveSpecialtyPreference";
function Specialtypreference({ handleClose, rowData }) {
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
          <span>Manage Teacher Specialty Preferences</span>
          <span onClick={handleClose} style={{ cursor: "pointer" }}>
            <Icon icon="proicons:cancel" width="24" height="24" />
          </span>
        </div>
        <div className="d-flex gap-2 flex-row my-4">
          {toggleOptions.map((option) => (
            <button
              key={option.key}
              className={`permission-toggle ${
                toggle[option.key]
                  ? "permission-toggle-active"
                  : "permission-toggle-inactive"
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
export default Specialtypreference;

function AddablePreferences({ teacherId }) {
  const {
    data: specialtiesData,
    isFetching,
    error,
  } = useGetAvialableSpecialtyPreference(teacherId);
  const { mutate:addPreference, isPending } = useAddTeacherSpecialtyPreference(teacherId);
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allSpecialties = useMemo(() => {
    return specialtiesData?.data || [];
  }, [specialtiesData]);

  const allOriginalSpecialtyIds = useMemo(() => {
    return allSpecialties.map((item) => item.id);
  }, [allSpecialties]);

  const filteredSpecialties = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allSpecialties;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allSpecialties.filter(
      (specialty) =>
        specialty.specialty_name.toLowerCase().includes(lowercasedSearchTerm) ||
        specialty.level_name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allSpecialties, debouncedSearchTerm]);

  const areAllSpecialtiesSelected = useMemo(() => {
    if (allOriginalSpecialtyIds.length === 0) return false;
    return allOriginalSpecialtyIds.every((id) => selectedSpecialtyIds.has(id));
  }, [allOriginalSpecialtyIds, selectedSpecialtyIds]);

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

  const selectAllCheckboxRef = useMemo(() => {
    const ref = (element) => {
      if (element) {
        element.indeterminate =
          selectedSpecialtyIds.size > 0 && !areAllSpecialtiesSelected;
      }
    };
    return ref;
  }, [selectedSpecialtyIds, areAllSpecialtiesSelected]);

  if (isFetching) {
    return <SingleSpinner />;
  }

  if (error) {
    return (
      <div className="text-danger">
        Error loading specialties: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-end">
        <div className="d-flex align-items-center gap-2">
          <span className="font-size-sm">Select All</span>
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              checked={areAllSpecialtiesSelected}
              onChange={handleSelectAll}
              ref={selectAllCheckboxRef}
            />
          </div>
        </div>
      </div>
      <div>
        <input
          type="search"
          className="w-100 form-control my-2"
          placeholder="Search Specialty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="modal-content-child">
        <div className="d-flex flex-column gap-2">
          {filteredSpecialties.length === 0 && !isFetching ? (
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
                    className="form-check-input"
                    checked={selectedSpecialtyIds.has(item.id)}
                    onChange={(e) => handleSelectSpecialty(item.id, e)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <button
        className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white"
        onClick={() => {
          const formattedData = Array.from(selectedSpecialtyIds).map(specialtyId => ({
            specialty_id: specialtyId,
            teacher_id: teacherId,
          }));

          addPreference(formattedData);
        }}
        disabled={isPending || selectedSpecialtyIds.size === 0}
      >
        {isPending ? <SingleSpinner /> : "Add Preferences"}
      </button>
    </>
  );
}

function RemovablePreferences({ teacherId }) {
  const {
    data: specialtiesData,
    isFetching,
    error,
  } = useGetTeacherSpecialtyPreference(teacherId);
  const { mutate:removePreference, isPending } = useRemoveSpecialtyPreference(teacherId);
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allSpecialties = useMemo(() => {
    return specialtiesData?.data || [];
  }, [specialtiesData]);

  const allOriginalSpecialtyIds = useMemo(() => {
    return allSpecialties.map((item) => item.id);
  }, [allSpecialties]);

  const filteredSpecialties = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allSpecialties;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allSpecialties.filter(
      (specialty) =>
        specialty.specialty_name.toLowerCase().includes(lowercasedSearchTerm) ||
        specialty.level_name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allSpecialties, debouncedSearchTerm]);

  const areAllSpecialtiesSelected = useMemo(() => {
    if (allOriginalSpecialtyIds.length === 0) return false;
    return allOriginalSpecialtyIds.every((id) => selectedSpecialtyIds.has(id));
  }, [allOriginalSpecialtyIds, selectedSpecialtyIds]);

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

  const selectAllCheckboxRef = useMemo(() => {
    const ref = (element) => {
      if (element) {
        element.indeterminate =
          selectedSpecialtyIds.size > 0 && !areAllSpecialtiesSelected;
      }
    };
    return ref;
  }, [selectedSpecialtyIds, areAllSpecialtiesSelected]);

  if (isFetching) {
    return <SingleSpinner />;
  }

  if (error) {
    return (
      <div className="text-danger">
        Error loading specialties: {error.message}
      </div>
    );
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-end">
        <div className="d-flex align-items-center gap-2">
          <span className="font-size-sm">Select All</span>
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              checked={areAllSpecialtiesSelected}
              onChange={handleSelectAll}
              ref={selectAllCheckboxRef}
            />
          </div>
        </div>
      </div>
      <div>
        <input
          type="search"
          className="w-100 form-control my-2"
          placeholder="Search Specialty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="modal-content-child">
        <div className="d-flex flex-column gap-2">
          {filteredSpecialties.length === 0 && !isFetching ? (
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
                    className="form-check-input"
                    checked={selectedSpecialtyIds.has(item.id)}
                    onChange={(e) => handleSelectSpecialty(item.id, e)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <button
        className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white"
        onClick={() => {
          const formattedData = Array.from(selectedSpecialtyIds).map(preferenceId => ({
            preference_id:preferenceId ,
            teacher_id: teacherId,
          }));

          removePreference(formattedData);
        }}
        disabled={isPending || selectedSpecialtyIds.size === 0}
      >
        {isPending ? <SingleSpinner /> : "Remove Preferences"}
      </button>
    </>
  );
}

function AddedPreferences({ teacherId }) {
  const {
    data: specialtiesData,
    isFetching,
    error: fetchError,
  } = useGetTeacherSpecialtyPreference(teacherId);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allSpecialties = useMemo(() => {
    return specialtiesData?.data || [];
  }, [specialtiesData]);

  const filteredSpecialties = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allSpecialties;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allSpecialties.filter(
      (specialty) =>
        specialty.specialty_name.toLowerCase().includes(lowercasedSearchTerm) ||
        specialty.level_name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allSpecialties, debouncedSearchTerm]);

  if (isFetching) {
    return <SingleSpinner />;
  }

  if (fetchError) {
    return (
      <div className="text-danger">
        Error loading teacher preferences: {fetchError.message}
      </div>
    );
  }

  return (
    <>
      <div>
        <input
          type="search"
          className="w-100 form-control my-2"
          placeholder="Search Specialty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="modal-content-child">
        {filteredSpecialties.length === 0 ? (
          <div className="text-center mt-4">
            {debouncedSearchTerm
              ? "No matching added specialties found."
              : "No specialties added yet."}
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            {filteredSpecialties.map((item) => (
              <div className="d-flex flex-row w-100 align-items-center justify-content-between" key={item.id}>
                <div className="d-flex flex-column">
                  <span className="font-size-sm fw-semibold">
                    {item.specialty_name}
                  </span>
                  <span className="font-size-sm fw-light">
                    {item.level_name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
