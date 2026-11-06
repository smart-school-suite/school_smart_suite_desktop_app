import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import SearchInput from "../../../components/input/search";
import { matchesTeacher } from "../../../utils/jointCourse/teacherAssignment";
import TeacherOption from "./TeacherOption";

const reveal = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.18, ease: "easeInOut" },
};

function TeacherPicker({ teachers, selectedId, onSelect, replacing }) {
  const [query, setQuery] = useState("");
  const [showIneligible, setShowIneligible] = useState(false);
  const trimmed = query.trim();

  const { eligible, ineligible } = useMemo(() => {
    const matching = teachers.filter((teacher) =>
      matchesTeacher(teacher, trimmed),
    );
    return {
      eligible: matching.filter((teacher) => teacher.eligible),
      ineligible: matching.filter((teacher) => !teacher.eligible),
    };
  }, [teachers, trimmed]);

  return (
    <section className="d-flex flex-column gap-3" aria-label="Choose a teacher">
      <div className="d-flex flex-column gap-1">
        <span className="fw-semibold">
          {replacing ? "Choose the new teacher" : "Choose a teacher"}
        </span>
        <span className="text-iron-500">
          Teachers who teach one of this course's specialties can be assigned.
          Heavier workloads are flagged but never blocked.
        </span>
      </div>

      <SearchInput
        value={query}
        onChange={(value) => setQuery(value)}
        placeholder={"Search by name or username"}
      />

      {eligible.length === 0 && ineligible.length === 0 ? (
        <div className="jca-empty jca-empty--compact">
          <span className="fw-medium">
            {trimmed
              ? `No teacher matches “${trimmed}”`
              : "No teachers in this school yet"}
          </span>
          {trimmed && (
            <button
              type="button"
              className="jca-link"
              onClick={() => setQuery("")}
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="d-flex flex-column gap-1">
            <span className="jca-group-label">
              Eligible <span className="jca-muted">{eligible.length}</span>
            </span>
            {eligible.length === 0 ? (
              <p className="jca-muted mb-0">
                {trimmed
                  ? "No eligible teacher matches this search."
                  : "No teacher has a teaching preference for this course's specialties yet. Add one from Teacher Specialty, then come back."}
              </p>
            ) : (
              <ul
                className="jca-options"
                role="radiogroup"
                aria-label="Eligible teachers"
              >
                {eligible.map((teacher) => (
                  <TeacherOption
                    key={teacher.id}
                    teacher={teacher}
                    selected={teacher.id === selectedId}
                    onSelect={onSelect}
                  />
                ))}
              </ul>
            )}
          </div>

          {ineligible.length > 0 && (
            <div className="d-flex flex-column gap-1">
              <button
                type="button"
                className="jca-group-toggle"
                onClick={() => setShowIneligible((value) => !value)}
                aria-expanded={showIneligible}
              >
                <span className="jca-group-label">
                  Not eligible{" "}
                  <span className="jca-muted">{ineligible.length}</span>
                </span>
                <Icon
                  icon="lucide:chevron-down"
                  width={14}
                  height={14}
                  className={`jca-chev ${showIneligible ? "is-open" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {showIneligible && (
                  <motion.ul
                    className="jca-options"
                    style={{ overflow: "hidden" }}
                    {...reveal}
                  >
                    {ineligible.map((teacher) => (
                      <TeacherOption
                        key={teacher.id}
                        teacher={teacher}
                        selected={false}
                        onSelect={onSelect}
                      />
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default TeacherPicker;
