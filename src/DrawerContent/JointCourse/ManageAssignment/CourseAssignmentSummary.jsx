/** Read-only summary of the joint course being managed. */
function CourseAssignmentSummary({ course }) {
  const levels = (course.levels ?? []).map((level) => level.name).join(", ");
  const departments = (course.departments ?? []).map((department) => department.name);

  return (
    <section className="jca-course" aria-label="Course">
      <div className="d-flex flex-row align-items-baseline gap-2 min-w-0">
        <span className="jca-course__code">{course.code}</span>
        <span className="jca-course__title text-truncate">{course.title}</span>
      </div>
      <dl className="jca-facts">
        <div>
          <dt>Type</dt>
          <dd>{course.type_label ?? "Joint Course"}</dd>
        </div>
        <div>
          <dt>Level</dt>
          <dd>{levels || "—"}</dd>
        </div>
        <div>
          <dt>Semester</dt>
          <dd>{course.semester?.name ?? "—"}</dd>
        </div>
        <div className="jca-facts__wide">
          <dt>Departments</dt>
          <dd>
            {departments.length ? (
              <span className="d-flex flex-row flex-wrap gap-1">
                {departments.map((name) => (
                  <span key={name} className="jca-chip">
                    {name}
                  </span>
                ))}
              </span>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default CourseAssignmentSummary;
