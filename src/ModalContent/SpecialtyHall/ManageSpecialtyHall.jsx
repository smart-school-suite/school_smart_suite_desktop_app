import { useSelector } from "react-redux";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState, useMemo, useEffect, Fragment } from "react";
import { useGetAssignableHalls } from "../../hooks/specialtyHall/useGetAssignableHalls";
import { useGetAssignedHalls } from "../../hooks/specialtyHall/useGetAssignedHalls";
import { useAssignSpecialtyHall } from "../../hooks/specialtyHall/useAssignSpecialtyHall";
import { useRemoveAssignedSpecialtyHall } from "../../hooks/specialtyHall/useRemoveAssignedSpecialtyHall";
function ManageSpecialtyHall({ handleClose, rowData }) {
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
    { key: "addablePreferences", label: "Assignable Hall" },
    { key: "removeablePreferences", label: "Removable Halls" },
    { key: "addedPreferences", label: "Assigned Halls" },
  ];
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span>Manage Specialty Hall Assignment</span>
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
          <AssignableHall specialtyId={rowData.id} />
        ) : toggle.removeablePreferences ? (
          <RemovableAssignedHall specialtyId={rowData.id} />
        ) : toggle.addedPreferences ? (
          <AssignedHall specialtyId={rowData.id} />
        ) : null}
      </div>
    </>
  );
}
export default ManageSpecialtyHall;

function AssignableHall({ specialtyId }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data: assignableHalls,
    isLoading: isAssignableHallLoading,
    error: assignableHallError,
  } = useGetAssignableHalls(specialtyId);
  const { mutate: assignSpecialtyHall, isPending } =
    useAssignSpecialtyHall(specialtyId);
  const [selectedHallIds, setSelectedHallIds] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allHalls = useMemo(() => {
    return assignableHalls?.data || [];
  }, [assignableHalls]);

  const allOriginalHallIds = useMemo(() => {
    return allHalls.map((item) => item.id);
  }, [allHalls]);

  const filteredHalls = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allHalls;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allHalls.filter(
      (hall) =>
        hall.name.toLowerCase().includes(lowercasedSearchTerm) ||
        hall.capacity.toLowerCase().includes(lowercasedSearchTerm) ||
        hall.location.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allHalls, debouncedSearchTerm]);

  const areAllHallsSelected = useMemo(() => {
    if (allOriginalHallIds.length === 0) return false;
    return allOriginalHallIds.every((id) => selectedHallIds.has(id));
  }, [allOriginalHallIds, selectedHallIds]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedHallIds(new Set(allOriginalHallIds));
    } else {
      setSelectedHallIds(new Set());
    }
  };

  const handleSelectHall = (hallId, event) => {
    setSelectedHallIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        newSelected.add(hallId);
      } else {
        newSelected.delete(hallId);
      }
      return newSelected;
    });
  };

  const selectAllCheckboxRef = useMemo(() => {
    const ref = (element) => {
      if (element) {
        element.indeterminate =
          selectedHallIds.size > 0 && !areAllHallsSelected;
      }
    };
    return ref;
  }, [selectedHallIds, areAllHallsSelected]);

  return (
    <>
      {isAssignableHallLoading ? (
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
      ) : assignableHallError ? (
        <NotFoundError
          title={assignableHallError?.response?.data?.errors?.title}
          description={assignableHallError?.response?.data?.errors?.description}
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
                  checked={areAllHallsSelected}
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
              placeholder="Search Hall"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="modal-content-child pe-2">
            <div className="d-flex flex-column gap-3">
              {filteredHalls.length === 0 && !isLoading ? (
                <div className="text-center mt-4">
                  {debouncedSearchTerm
                    ? "No matching Halls found."
                    : "No Halls Found available."}
                </div>
              ) : (
                filteredHalls.map((item) => (
                  <Fragment key={item.id}>
                    <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex flex-column gap-2">
                          <span className="font-size-sm fw-semibold">
                            {item.name}
                          </span>

                          <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                            {item?.types?.map((items) => (
                              <Fragment key={items.id}>
                                <span
                                  className="pill-hall-state"
                                  style={{
                                    background: `${items.background_color}`,
                                    color: `${items.text_color}`,
                                  }}
                                >
                                  {items.name}
                                </span>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-item-center gap-4">
                          <div className="d-flex flex-row gap-1 align-items-center">
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="solar:chair-outline"
                                width="16"
                                height="16"
                              />
                            </span>
                            <span className="font-size-sm">
                              {item.capacity}
                            </span>
                          </div>
                          <div className="d-flex flex-row gap-1 align-items-center">
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="iconamoon:location-thin"
                                width="16"
                                height="16"
                              />
                            </span>
                            <span className="font-size-sm">
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className={`${
                            darkMode ? "dark-bg-light dark-mode-border" : null
                          } form-check-input`}
                          checked={selectedHallIds.has(item.id)}
                          onChange={(e) => handleSelectHall(item.id, e)}
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
              const formattedData = Array.from(selectedHallIds).map(
                (hallId) => ({
                  hall_id: hallId,
                })
              );

              assignSpecialtyHall({
                hallIds: formattedData,
                specialty_id: specialtyId,
              });
            }}
            disabled={isPending || selectedHallIds.size === 0}
          >
            {isPending ? <SingleSpinner /> : "Assign Hall To Specialty"}
          </button>
        </>
      )}
    </>
  );
}

function RemovableAssignedHall({ specialtyId }) {
  const {
    data: assignedHalls,
    isLoading: isAssignedHallLoading,
    error: assignedHallError,
  } = useGetAssignedHalls(specialtyId);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { mutate: removeAssignedHall, isPending } =
    useRemoveAssignedSpecialtyHall(specialtyId);
  const [selectedHallIds, setSelectedHallIds] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allHalls = useMemo(() => {
    return assignedHalls?.data || [];
  }, [assignedHalls]);

  const allOriginalHallIds = useMemo(() => {
    return allHalls.map((item) => item.id);
  }, [allHalls]);

  const filteredHalls = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allHalls;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allHalls.filter(
      (hall) =>
        hall.name.toLowerCase().includes(lowercasedSearchTerm) ||
        hall.location.toLowerCase().includes(lowercasedSearchTerm) ||
        hall.capacity.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allHalls, debouncedSearchTerm]);

  const areAllHallsSelected = useMemo(() => {
    if (allOriginalHallIds.length === 0) return false;
    return allOriginalHallIds.every((id) => selectedHallIds.has(id));
  }, [allOriginalHallIds, selectedHallIds]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedHallIds(new Set(allOriginalHallIds));
    } else {
      setSelectedHallIds(new Set());
    }
  };

  const handleSelectHall = (hallId, event) => {
    setSelectedHallIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        newSelected.add(hallId);
      } else {
        newSelected.delete(hallId);
      }
      return newSelected;
    });
  };

  const selectAllCheckboxRef = useMemo(() => {
    const ref = (element) => {
      if (element) {
        element.indeterminate =
          selectedHallIds.size > 0 && !areAllHallsSelected;
      }
    };
    return ref;
  }, [selectedHallIds, areAllHallsSelected]);

  return (
    <>
      {isAssignedHallLoading ? (
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
      ) : assignedHallError ? (
        <NotFoundError
          title={assignedHallError?.response?.data?.errors?.title}
          description={assignedHallError?.response?.data?.errors?.description}
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
                  checked={areAllHallsSelected}
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
              placeholder="Search Hall"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="modal-content-child pe-2">
            <div className="d-flex flex-column gap-3">
              {filteredHalls.length === 0 && !isLoading ? (
                <div className="text-center mt-4">
                  {debouncedSearchTerm
                    ? "No matching Halls found."
                    : "No Halls Found available."}
                </div>
              ) : (
                filteredHalls.map((item) => (
                  <Fragment key={item.id}>
                    <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex flex-column gap-2">
                          <span className="font-size-sm fw-semibold">
                            {item.name}
                          </span>

                          <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                            {item?.types?.map((items) => (
                              <Fragment key={items.id}>
                                <span
                                  className="pill-hall-state"
                                  style={{
                                    background: `${items.background_color}`,
                                    color: `${items.text_color}`,
                                  }}
                                >
                                  {items.name}
                                </span>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-item-center gap-4">
                          <div className="d-flex flex-row gap-1 align-items-center">
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="solar:chair-outline"
                                width="16"
                                height="16"
                              />
                            </span>
                            <span className="font-size-sm">
                              {item.capacity}
                            </span>
                          </div>
                          <div className="d-flex flex-row gap-1 align-items-center">
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="iconamoon:location-thin"
                                width="16"
                                height="16"
                              />
                            </span>
                            <span className="font-size-sm">
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className={`${
                            darkMode ? "dark-bg-light dark-mode-border" : null
                          } form-check-input`}
                          checked={selectedHallIds.has(item.id)}
                          onChange={(e) => handleSelectHall(item.id, e)}
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
              const formattedData = Array.from(selectedHallIds).map(
                (hallId) => ({
                  hall_id: hallId,
                })
              );
              removeAssignedHall({
                hallIds: formattedData,
                specialty_id: specialtyId,
              });
            }}
            disabled={isPending || selectedHallIds.size === 0}
          >
            {isPending ? <SingleSpinner /> : "Remove Assigned Hall"}
          </button>
        </>
      )}
    </>
  );
}

function AssignedHall({ specialtyId }) {
  const {
    data: assignedHall,
    isLoading: isAssignedHallLoading,
    error: assignedHallError,
  } = useGetAssignedHalls(specialtyId);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allHalls = useMemo(() => {
    return assignedHall?.data || [];
  }, [assignedHall]);

  const filteredHalls = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allHalls;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allHalls.filter(
      (hall) =>
        hall.name.toLowerCase().includes(lowercasedSearchTerm) ||
        hall.capacity.toLowerCase().includes(lowercasedSearchTerm) ||
        hall.location.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allHalls, debouncedSearchTerm]);

  return (
    <>
      {isAssignedHallLoading ? (
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
      ) : assignedHallError ? (
        <NotFoundError
          title={assignedHallError?.response?.data?.errors?.title}
          description={assignedHallError?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <>
          <div className="my-2">
            <input
              type="search"
              className={`${
                darkMode ? "dark-mode-input" : "null"
              } w-100 form-control font-size-sm`}
              placeholder="Search Hall"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="modal-content-child pe-2">
            {filteredHalls.length === 0 ? (
              <div className="text-center mt-4">
                {debouncedSearchTerm
                  ? "No matching Assigned Hall found."
                  : "No Halls Have Been Assigned to this specialty yet."}
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {filteredHalls.map((item) => (
                  <Fragment key={item.id}>
                    <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex flex-column gap-2">
                          <span className="font-size-sm fw-semibold">
                            {item.name}
                          </span>

                          <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                            {item?.types?.map((items) => (
                              <Fragment key={items.id}>
                                <span
                                  className="pill-hall-state"
                                  style={{
                                    background: `${items.background_color}`,
                                    color: `${items.text_color}`,
                                  }}
                                >
                                  {items.name}
                                </span>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-item-center gap-4">
                          <div className="d-flex flex-row gap-1 align-items-center">
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="solar:chair-outline"
                                width="16"
                                height="16"
                              />
                            </span>
                            <span className="font-size-sm">
                              {item.capacity}
                            </span>
                          </div>
                          <div className="d-flex flex-row gap-1 align-items-center">
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="iconamoon:location-thin"
                                width="16"
                                height="16"
                              />
                            </span>
                            <span className="font-size-sm">
                              {item.location}
                            </span>
                          </div>
                        </div>
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
