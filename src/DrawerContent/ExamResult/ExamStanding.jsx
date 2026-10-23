import { Dot, FileText } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import SearchInput from "../../components/input/search";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetExamStanding } from "../../hooks/examResult/useGetExamStanding";

const GRID_COLUMNS = "2.5fr 1fr 1fr 1fr 1fr";

function ExamStanding({ drawerData, handleClose }) {
  const { id: examId } = drawerData;
  const { data: standings, isLoading, error } = useGetExamStanding(examId);

  // Client-side search state & debouncing
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const rawList = standings?.data || [];

  const filteredStandings = useMemo(() => {
    if (!debouncedSearchTerm) return rawList;

    return rawList.filter((s) => {
      const name = s?.student?.name?.toLowerCase() || "";
      const firstName = s?.student?.first_name?.toLowerCase() || "";
      const lastName = s?.student?.last_name?.toLowerCase() || "";
      const username = s?.student?.username?.toLowerCase() || "";

      return (
        name.includes(debouncedSearchTerm) ||
        firstName.includes(debouncedSearchTerm) ||
        lastName.includes(debouncedSearchTerm) ||
        username.includes(debouncedSearchTerm)
      );
    });
  }, [rawList, debouncedSearchTerm]);

  return (
    <>
      <div className="p-2 d-flex flex-column gap-3 font-size-sm">
        <div className="d-flex flex-row align-items-center gap-2">
          <div
            className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-50 color-primary"
            style={{ height: "2.5rem", width: "2.5rem", flexShrink: 0 }}
          >
            <FileText size={16} />
          </div>
          <div className="d-flex flex-column text-truncate">
            <span className="font-size-sm fw-semibold text-truncate">
              {drawerData?.exam_name} {drawerData?.school_year}
            </span>
            <div className="d-flex flex-row align-items-center gap-2 text-iron-500">
              <span className="text-truncate">
                {drawerData?.specialty_name}
              </span>
              <Dot size={12} style={{ flexShrink: 0 }} />
              <span className="text-truncate">{drawerData?.level_name}</span>
            </div>
          </div>
        </div>

        {/* Updated SearchInput handler to accept string directly */}
        <SearchInput
          placeholder={"Search Candidate............"}
          value={searchTerm}
          onChange={(val) => setSearchTerm(val ?? "")}
          hotkey="Ctrl+K"
        />

        {/* Table Header */}
        <div
          className="w-100 d-grid align-items-center py-2 px-2 text-iron-500 border rounded-2 bg-iron-100"
          style={{ gridTemplateColumns: GRID_COLUMNS, gap: "0.5rem" }}
        >
          <span className="fw-medium">Student</span>
          <span className="fw-medium text-center">Position</span>
          <span className="fw-medium text-center">GPA</span>
          <span className="fw-medium text-center">Average Score</span>
          <span className="fw-medium text-center">Total Credit</span>
        </div>
      </div>

      <div className="drawer-content font-size-sm">
        <div className="d-flex flex-column">
          {isLoading ? (
            <div className="d-flex flex-column gap-1 px-2">
              {[...Array(10)].map((_, index) => (
                <div className="d-flex flex-row align-items-center gap-2" key={index}>
                  {[...Array(4)].map((_, indx) => (
                    <Fragment key={indx}>
                      <RectangleSkeleton
                        width="25%"
                        height="2dvh"
                        speed={0.5}
                        key={index}
                      />
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            />
          ) : filteredStandings.length > 0 ? (
            /* Standings List */
            <div className="d-flex flex-column gap-3 px-2 mt-3">
              {filteredStandings.map((s) => (
                <Fragment key={s?.candidate_id}>
                  <div
                    className="d-grid align-items-center"
                    style={{ gridTemplateColumns: GRID_COLUMNS, gap: "0.5rem" }}
                  >
                    {/* Student Column */}
                    <div className="d-flex flex-row align-items-center gap-2 min-w-0">
                      <div
                        style={{
                          width: "2.4rem",
                          height: "2.4rem",
                          flexShrink: 0,
                        }}
                        className="rounded-circle primary-background-100 color-primary 
                                  d-flex align-items-center justify-content-center fw-semibold
                                  overflow-hidden"
                      >
                        {s.student?.profile_picture ? (
                          <img
                            src={s.student?.profile_picture}
                            alt={s.student?.username}
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : (
                          <span>
                            {getInitials(
                              s.student?.first_name,
                              s.student?.last_name,
                            )}
                          </span>
                        )}
                      </div>
                      <div className="d-flex flex-column text-truncate">
                        <span
                          className="fw-medium text-truncate"
                          title={s.student?.name}
                        >
                          {s.student?.name}
                        </span>
                        <div className="d-flex flex-row align-items-center gap-2 text-iron-400">
                          <span className="text-truncate">
                            @{s.student?.username}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Columns */}
                    <span className="text-center text-truncate">
                      {s?.position ?? "-"}
                    </span>
                    <span className="text-center text-truncate">
                      {s?.gpa ?? "-"}
                    </span>
                    <span className="text-center text-truncate">
                      {s?.average_score ?? "-"}
                    </span>
                    <span className="text-center text-truncate">
                      {s?.total_credits ?? "-"}
                    </span>
                  </div>

                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.4}
                  />
                </Fragment>
              ))}
            </div>
          ) : (
            /* Empty State / Fallbacks */
            <div className="py-4">
              {debouncedSearchTerm ? (
                /* Case 1: Search returned no matches */
                <div className="d-flex flex-column align-items-center gap-2 text-center my-3 px-3">
                  <img
                    src="/sss-maskot/404.png"
                    alt="No matching candidates found"
                    style={{
                      height: "120px",
                      width: "120px",
                      objectFit: "contain",
                    }}
                  />
                  <span className="fw-semibold font-size-sm">
                    No matching candidates found
                  </span>
                  <p className="text-muted font-size-sm mb-2">
                    No candidates found matching &quot;{debouncedSearchTerm}
                    &quot;. Try checking for typos or searching by full name or
                    username.
                  </p>
                  <button
                    type="button"
                    className="btn btn-link btn-sm text-decoration-none p-0"
                    onClick={() => {
                      setSearchTerm("");
                      setDebouncedSearchTerm("");
                    }}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                /* Case 2: Endpoint returned 0 candidates */
                <div className="d-flex flex-column align-items-center gap-2 text-center my-3 px-3">
                  <img
                    src="/sss-maskot/404.png"
                    alt="No standings available"
                    style={{
                      height: "120px",
                      width: "120px",
                      objectFit: "contain",
                    }}
                  />
                  <span className="fw-semibold font-size-sm">
                    No Exam Standings Available
                  </span>
                  <p className="text-muted font-size-sm mb-0">
                    There are currently no student standings available for this
                    exam.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.4} />
          <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
            <button
              className="border-none bg-none pointer"
              onClick={() => handleClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamStanding;

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) {
    return "";
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}
