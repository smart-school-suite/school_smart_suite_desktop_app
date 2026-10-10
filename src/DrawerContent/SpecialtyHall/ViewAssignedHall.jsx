import { Icon } from "@iconify/react";
import { Dot } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import SearchInput from "../../components/input/search";
import { useGetAssignedHalls } from "../../hooks/specialtyHall/useGetAssignedHalls";
import { SpecialtyIcon } from "../../icons/Icons";

function ViewAssignedHall({ handleClose = () => {}, drawerData }) {
  const specialtyId = drawerData?.id;

  const {
    data: assignedHall,
    isLoading: isAssignedHallLoading,
    error: assignedHallError,
  } = useGetAssignedHalls(specialtyId);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allHalls = useMemo(() => {
    return Array.isArray(assignedHall?.data) ? assignedHall.data : [];
  }, [assignedHall]);

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
            <span className="text-iron-400 font-size-sm">
              Total: {filteredHalls.length}
            </span>
          </div>

          <div className="d-flex flex-column gap-2">
            {isAssignedHallLoading ? (
              <div className="d-flex flex-column gap-3">
                {[...Array(20)].map((_, index) => (
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
                      No assigned halls found matching &quot;
                      {debouncedSearchTerm}&quot;. Try checking for typos or
                      searching by location or capacity.
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
                  /* Case 2: Endpoint returned 0 assigned halls */
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
                      No Assigned Halls Found
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
          <div className="d-flex flex-row align-items-center justify-content-end p-2">
            <button
              type="button"
              className="border-none bg-none text-muted"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAssignedHall;

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
