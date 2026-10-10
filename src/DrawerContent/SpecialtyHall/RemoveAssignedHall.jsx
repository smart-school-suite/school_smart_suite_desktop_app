import { Icon } from "@iconify/react";
import { Dot } from "lucide-react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { NotFoundError } from "../../components/errors/Error";
import SearchInput from "../../components/input/search";
import { useGetAssignedHalls } from "../../hooks/specialtyHall/useGetAssignedHalls";
import { useRemoveAssignedSpecialtyHall } from "../../hooks/specialtyHall/useRemoveAssignedSpecialtyHall";
import { SpecialtyIcon } from "../../icons/Icons";

function RemoveAssignedHall({ drawerData, handleClose = () => {} }) {
  const specialtyId = drawerData?.id;

  const {
    data: assignedHalls,
    isLoading: isAssignedHallLoading,
    error: assignedHallError,
  } = useGetAssignedHalls(specialtyId);

  const { mutate: removeAssignedHall, isPending } =
    useRemoveAssignedSpecialtyHall(specialtyId);

  const [selectedHallIds, setSelectedHallIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allHalls = useMemo(() => {
    return Array.isArray(assignedHalls?.data) ? assignedHalls.data : [];
  }, [assignedHalls]);

  const allOriginalHallIds = useMemo(() => {
    return allHalls.map((item) => item?.id).filter(Boolean);
  }, [allHalls]);

  const filteredHalls = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allHalls;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase().trim();

    return allHalls.filter((hall) => {
      const nameMatch = (hall?.name ?? "")
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const capacityMatch = String(hall?.capacity ?? "")
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const locationMatch = (hall?.location ?? "")
        .toLowerCase()
        .includes(lowercasedSearchTerm);

      return nameMatch || capacityMatch || locationMatch;
    });
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
    if (!hallId) return;
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

  const selectAllCheckboxRef = useCallback(
    (element) => {
      if (element) {
        element.indeterminate =
          selectedHallIds.size > 0 && !areAllHallsSelected;
      }
    },
    [selectedHallIds.size, areAllHallsSelected]
  );

  const handleRemove = () => {
    if (selectedHallIds.size === 0 || !specialtyId) return;

    const formattedData = Array.from(selectedHallIds).map((hallId) => ({
      hall_id: hallId,
    }));

    removeAssignedHall({
      hallIds: formattedData,
      specialty_id: specialtyId,
    });
  };

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 mb-2">
        <div className="d-flex flex-row align-items-center gap-2 font-size-sm">
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              display: "grid",
              placeItems: "center",
            }}
            className="bg-primary-50 rounded-2 text-primary-500"
          >
            <SpecialtyIcon />
          </div>
          <div className="d-flex flex-column">
            <span>{drawerData?.specialty ?? "N/A"}</span>
            <div className="d-flex flex-row align-items-center gap-1 text-iron-400 fw-light">
              <span>{drawerData?.level ?? "-"}</span>
              <Dot />
              <span>{drawerData?.level_name ?? "-"}</span>
              <Dot />
              <span>{drawerData?.department ?? "-"}</span>
            </div>
          </div>
        </div>

        <SearchInput
          placeholder={"Search Hall............"}
          value={searchTerm}
          onChange={(val) => setSearchTerm(val ?? "")}
          hotkey="Ctrl+K"
        />
      </div>

      <div
        className="drawer-content pt-3 p-2"
        style={{ paddingBottom: "10rem" }}
      >
        <div className="d-flex flex-column gap-3 font-size-sm">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="text-iron-400 fw-light">Assigned Halls</span>
            <div className="d-flex align-items-center gap-2">
              <span className="font-size-sm">Select All</span>
              <div>
                <input
                  type="checkbox"
                  className={"form-check-input rounded-2"}
                  checked={areAllHallsSelected}
                  onChange={handleSelectAll}
                  ref={selectAllCheckboxRef}
                  style={{ width: 20, height: 20 }}
                  disabled={allOriginalHallIds.length === 0}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            {isAssignedHallLoading ? (
              <div className="d-flex flex-column gap-3">
                {[...Array(10)].map((_, index) => (
                  <div className="d-flex gap-2 flex-column" key={index}>
                    <RectangleSkeleton height="1dvh" width="10%" />
                    <div className="d-flex flex-row align-items-center gap-2">
                      <RectangleSkeleton height="1dvh" width="20%" />
                      <RectangleSkeleton height="1dvh" width="20%" />
                    </div>
                    <HorizontalDashedLine
                      dashed={false}
                      color="#ccc"
                      thickness={0.3}
                    />
                  </div>
                ))}
              </div>
            ) : assignedHallError ? (
              <NotFoundError
                title={
                  assignedHallError?.response?.data?.errors?.title ??
                  "An Error Occurred"
                }
                description={
                  assignedHallError?.response?.data?.errors?.description ??
                  "Unable to load assigned halls."
                }
              />
            ) : filteredHalls.length === 0 ? (
              <div className="py-4">
                {debouncedSearchTerm ? (
                  /* Case 1: Search returned no matches */
                  <div className="d-flex flex-column align-items-center gap-2 text-center my-3">
                    <img
                      src="/sss-maskot/404.png"
                      alt="No matching halls found"
                      style={{
                        height: "120px",
                        width: "120px",
                        objectFit: "contain",
                      }}
                    />
                    <span className="fw-semibold font-size-sm">
                      No matching halls found
                    </span>
                    <p className="text-muted font-size-sm mb-2">
                      No assigned halls found matching &quot;{debouncedSearchTerm}&quot;. Try checking for typos or searching by location or capacity.
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
                  /* Case 2: Endpoint returned 0 halls */
                  <div className="d-flex flex-column align-items-center gap-2 text-center my-3">
                    <img
                      src="/sss-maskot/404.png"
                      alt="No assigned halls"
                      style={{
                        height: "120px",
                        width: "120px",
                        objectFit: "contain",
                      }}
                    />
                    <span className="fw-semibold font-size-sm">
                      No Assigned Halls to Remove
                    </span>
                    <p className="text-muted font-size-sm mb-0">
                      There are currently no halls assigned to this specialty.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              filteredHalls.map((item) => (
                <Fragment key={item?.id}>
                  <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex flex-column gap-2">
                        <span className="font-size-sm fw-semibold">
                          {item?.name ?? "Unnamed Hall"}
                        </span>

                        <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                          {item?.types?.map((type) => (
                            <Fragment key={type?.id ?? type?.name}>
                              <span
                                className="pill-hall-state"
                                style={{
                                  background:
                                    type?.background_color ?? "#f0f0f0",
                                  color: type?.text_color ?? "#000000",
                                }}
                              >
                                {type?.name}
                              </span>
                            </Fragment>
                          ))}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center gap-2 text-iron-400">
                        <div className="d-flex flex-row gap-1 align-items-center">
                          <span style={{ lineHeight: 0 }}>
                            <Icon
                              icon="solar:chair-outline"
                              width="16"
                              height="16"
                            />
                          </span>
                          <span className="font-size-sm">
                            {item?.capacity ?? "N/A"}
                          </span>
                        </div>
                        <Dot />
                        <div className="d-flex flex-row gap-1 align-items-center">
                          <span style={{ lineHeight: 0 }}>
                            <Icon
                              icon="iconamoon:location-thin"
                              width="16"
                              height="16"
                            />
                          </span>
                          <span className="font-size-sm">
                            {item?.location ?? "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <input
                        style={{ width: 20, height: 20 }}
                        type="checkbox"
                        className="form-check-input rounded-2"
                        checked={selectedHallIds.has(item?.id)}
                        onChange={(e) => handleSelectHall(item?.id, e)}
                      />
                    </div>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.3}
                  />
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
              className="border-none bg-none"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="border-none rounded-3 bg-danger text-white font-size-sm px-3 py-2"
              onClick={handleRemove}
              disabled={isPending || selectedHallIds.size === 0}
            >
              {isPending ? <SingleSpinner /> : "Remove Selected Halls"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemoveAssignedHall;

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