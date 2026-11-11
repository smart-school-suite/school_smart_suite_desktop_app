import { Icon } from "@iconify/react";

// Footer for TeacherCard: how many courses and specialties a teacher has.
export default function TeacherStats({ teacher }) {
  const stats = [
    { icon: "ion:book-outline", label: "Courses", value: teacher?.num_assigned_courses },
    {
      icon: "material-symbols:grid-on-outline",
      label: "Specialties",
      value: teacher?.num_assigned_specialties,
    },
  ];
  return (
    <>
      <div className="teacher-card__divider" />
      <div className="d-flex flex-row align-items-center justify-content-around font-size-xs text-iron-500">
        {stats.map((stat) => (
          <div key={stat.label} className="d-flex flex-row align-items-center gap-1">
            <Icon icon={stat.icon} width={14} height={14} />
            <span>
              <span className="fw-semibold text-iron-700">{stat.value ?? 0}</span>{" "}
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
