import { BookOpen, Dot, Layers } from "lucide-react";
import { useState } from "react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";

function CourseAssignmentSummary({ course }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const levelsCount = course.levels?.length ?? 0;
  const specialtiesCount = course.specialties?.length ?? 0;
  const specialties = course.specialties ?? [];

  const description = course.description ?? "";
  const maxLength = 110;
  const isLongDescription = description.length > maxLength;
  const displayedDescription = isExpanded || !isLongDescription 
    ? description 
    : `${description.substring(0, maxLength)}...`;

  const specialtiesByLevel = specialties.reduce((acc, spec) => {
    const level = spec.level_name || "General";
    if (!acc[level]) acc[level] = [];
    acc[level].push(spec);
    return acc;
  }, {});

  return (
    <div className="card border-none border rounded-4 p-2 font-size-sm">
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "grid",
                  placeItems: "center",
                }}
                className="bg-iron-100 text-iron-500 rounded-2 border"
              >
                <BookOpen size={16} />
              </div>
              <div className="d-flex flex-column">
                <span className="text-iron-700 fw-medium">
                  {course.title}
                </span>
                <div className="d-flex flex-row align-items-center gap-1 text-iron-500 font-size-xs">
                  <span>{course.code}</span>
                  <Dot />
                  <span>{course.credit} credit</span>
                  <Dot />
                  <span className="text-capitalize">
                    {course.semester?.name ?? "—"}
                  </span>
                </div>
              </div>
            </div>
            <span
              style={{ width: "fit-content" }}
              className="bg-primary-50 text-primary-500 rounded-pill font-size-xs px-2 py-1"
            >
              {course.type_label ?? "Joint Course"}
            </span>
          </div>
          <div>
            <p className="ls-2 text-iron-500 fw-light p-0 m-0">
              {displayedDescription}
              {isLongDescription && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="btn btn-link p-0 ms-1 font-size-xs text-primary-500 text-decoration-none fw-medium"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </p>
          </div>
        </div>

        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />

        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center justify-content-between text-iron-500 font-size-xs">
            <span className="fw-medium d-flex align-items-center gap-1">
              <Layers size={13} /> Affected Scope
            </span>
            <span className="bg-iron-100 text-iron-700 px-2 py-0.5 rounded-pill fw-medium">
              {levelsCount} {levelsCount === 1 ? "Level" : "Levels"} • {specialtiesCount} {specialtiesCount === 1 ? "Specialty" : "Specialties"}
            </span>
          </div>

          <div 
            className="d-flex flex-column gap-2" 
            style={{ maxHeight: "240px", overflowY: "auto" }}
          >
            {Object.keys(specialtiesByLevel).length ? (
              Object.entries(specialtiesByLevel).map(([levelName, specs]) => (
                <div key={levelName} className="d-flex flex-column gap-1 bg-iron-50 p-2 rounded-2 border border-iron-100">
                  <div className="d-flex align-items-center justify-content-between border-bottom border-iron-200 pb-1 mb-1">
                    <span className="fw-semibold text-iron-700 font-size-xs">
                      {levelName}
                    </span>
                    <span className="text-iron-400 font-size-xs">
                      {specs.length} {specs.length === 1 ? "specialty" : "specialties"}
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-1">
                    {specs.map((spec) => (
                      <span 
                        key={spec.id} 
                        className="bg-white text-iron-700 border border-iron-200 px-2 py-0.5 rounded-pill font-size-xs"
                        title={spec.department_name}
                      >
                        {spec.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-iron-400">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseAssignmentSummary;