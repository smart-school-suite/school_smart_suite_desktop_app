// Builds and validates the elections.participants payload from the
// election slice's participant audience state.

const ids = (list) => (list ?? []).map((item) => (typeof item === "object" ? item?.id : item)).filter(Boolean);

const hasCriteria = (group) =>
  (group?.individualIds ?? []).length > 0 ||
  Object.values(group?.criteria ?? {}).some((list) => (list ?? []).length > 0);

export const audienceToPayload = (audience) => {
  const targeting = audience?.targeting ?? {};
  const types = audience?.types ?? [];
  const schoolWide = types.includes("school_wide");
  const include = (type) => !schoolWide && types.includes(type);
  const criteriaBlock = (group) => ({
    individual_ids: group?.individualIds ?? [],
    department_ids: ids(group?.criteria?.departmentIds),
    specialty_ids: ids(group?.criteria?.specialtyIds),
    level_ids: ids(group?.criteria?.levelIds),
  });
  return {
    school_wide: schoolWide,
    student_audience: include("students") ? [criteriaBlock(targeting.students)] : [],
    teacher_audience: include("teachers") ? [criteriaBlock(targeting.teachers)] : [],
    admin_audience: include("schoolAdmins")
      ? [{ individual_ids: targeting.administrators?.individualIds ?? [] }]
      : [],
    exclude: audience?.exclude ?? {},
  };
};

export const participantsToPayload = (participants) => ({
  voters: audienceToPayload(participants?.voters),
  candidates: {
    ...audienceToPayload(participants?.candidates),
    must_be_voter: Boolean(participants?.mustBeVoter),
  },
});

const GROUP_NOUN = { voters: "voters", candidates: "candidates" };

/** First problem with a group's audience, or null. */
export const validateAudience = (audience, group) => {
  const noun = GROUP_NOUN[group] ?? "participants";
  const types = audience?.types ?? [];
  if (types.length === 0) {
    return {
      title: `Choose who can ${group === "voters" ? "vote" : "apply"}`,
      message: `Select at least one group of ${noun}, or make it school-wide.`,
    };
  }
  if (types.includes("school_wide")) return null;
  const { students, teachers, administrators } = audience.targeting;
  if (types.includes("students") && !hasCriteria(students)) {
    return { title: "Students not configured", message: `Configure which students are eligible ${noun}.` };
  }
  if (types.includes("teachers") && !hasCriteria(teachers)) {
    return { title: "Teachers not configured", message: `Configure which teachers are eligible ${noun}.` };
  }
  if (types.includes("schoolAdmins") && (administrators?.individualIds ?? []).length === 0) {
    return { title: "Administrators not selected", message: `Select the administrators who are eligible ${noun}.` };
  }
  return null;
};

/** Short human summary, e.g. ["Students · 2 specialties", "Teachers · all"]. */
export const describeAudience = (audience) => {
  const types = audience?.types ?? [];
  if (types.includes("school_wide")) return ["Everyone in the school"];
  const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;
  const criteria = (group) => {
    const parts = [];
    const c = group?.criteria ?? {};
    if (c.departmentIds?.length) parts.push(plural(c.departmentIds.length, "department"));
    if (c.specialtyIds?.length) parts.push(plural(c.specialtyIds.length, "specialty").replace("specialtys", "specialties"));
    if (c.levelIds?.length) parts.push(plural(c.levelIds.length, "level"));
    if (group?.individualIds?.length) parts.push(plural(group.individualIds.length, "individual"));
    return parts.join(", ") || "not configured";
  };
  const lines = [];
  if (types.includes("students")) lines.push(`Students · ${criteria(audience.targeting.students)}`);
  if (types.includes("teachers")) lines.push(`Teachers · ${criteria(audience.targeting.teachers)}`);
  if (types.includes("schoolAdmins")) {
    lines.push(`Administrators · ${plural(audience.targeting.administrators.individualIds.length, "administrator")}`);
  }
  const excluded = Object.values(audience?.exclude ?? {}).reduce((sum, list) => sum + (list?.length ?? 0), 0);
  if (excluded) lines.push(`${plural(excluded, "person")} excluded`.replace("persons", "people"));
  return lines;
};
