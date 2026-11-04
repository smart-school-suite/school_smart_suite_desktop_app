import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useGetJointCourseTerms } from "../../hooks/jointCourseTimetable/useGetJointCourseTerms";

const termMeta = (term) =>
  term.joint_course_count === 0
    ? "No joint courses"
    : `${term.configured_count} of ${term.joint_course_count} joint courses set`;

// One dropdown for academic year + semester. Each option is a term from GET joint-course-timetable/terms.
function TermDropdown({ value, onChange }) {
  const { data, isLoading, error } = useGetJointCourseTerms();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const dismiss = useDismiss(context, { outsidePress: true, escapeKey: true });
  const role = useRole(context, { role: "listbox" });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role]);

  const terms = data?.data ?? [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return terms;
    return terms.filter((term) => term.label.toLowerCase().includes(q));
  }, [query, terms]);

  useEffect(() => {
    if (!value || !terms.length) return;
    const fresh = terms.find((term) => term.id === value.id);
    if (!fresh) onChange?.(null);
    else if (
      fresh.configured_count !== value.configured_count ||
      fresh.joint_course_count !== value.joint_course_count
    ) {
      onChange?.(fresh);
    }
  }, [data]);

  const handleSelect = (term) => {
    onChange?.(term);
    setQuery("");
    setOpen(false);
  };

  const borderColor = open
    ? "var(--primary-color-400)"
    : hovered
      ? "var(--iron-300)"
      : "var(--iron-200)";

  return (
    <div className="d-flex flex-column gap-2" style={{ width: "50%" }}>
      <motion.button
        ref={refs.setReference}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="outline-none w-100 px-2 py-1 bg-white font-size-sm d-flex flex-row align-items-center gap-2 rounded-3 text-start transition-all duration-200"
        style={{
          border: `1px solid ${borderColor}`,
          boxShadow: open
            ? "0 0 0 3px var(--primary-color-100)"
            : "0 1px 2px rgba(16, 24, 40, 0.04)",
        }}
        whileTap={{ scale: 0.995 }}
        {...getReferenceProps({
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
          onClick: () => setOpen((current) => !current),
        })}
      >
        <span
          className={`d-inline-flex align-items-center justify-content-center rounded-2 flex-shrink-0 ${
            open || value ? "bg-primary-50 color-primary" : "bg-iron-100 text-iron-500"
          }`}
          style={{ width: "2rem", height: "2rem" }}
        >
          <CalendarDays size={16} />
        </span>
        <span className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          {isLoading && !value ? (
            <span className="text-iron-500">Loading academic years…</span>
          ) : value ? (
            <>
              <span className="fw-medium text-truncate">{value.label}</span>
              <span className="font-size-xs text-iron-500 text-truncate">{termMeta(value)}</span>
            </>
          ) : (
            <>
              <span className="fw-medium text-iron-700">Select academic year and semester</span>
              <span className="font-size-xs text-iron-500">
                Choose which term's joint courses to schedule
              </span>
            </>
          )}
        </span>
        <motion.span
          className={`d-inline-flex flex-shrink-0 ${open ? "color-primary" : "text-iron-500"}`}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>

      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                zIndex: 9999,
                width: refs.reference.current?.offsetWidth ?? "auto",
              }}
              className="bg-white p-2 rounded-4 border shadow-sm d-flex flex-column gap-2"
              {...getFloatingProps()}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <input
                type="search"
                className="rounded-3 form-control font-size-sm"
                placeholder="Search academic year or semester"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoFocus
              />
              <div className="d-flex flex-column gap-1" style={{ maxHeight: "280px", overflowY: "auto" }}>
                {isLoading ? (
                  <span className="font-size-sm">Loading...</span>
                ) : error ? (
                  <span className="font-size-sm text-danger">Error loading academic years</span>
                ) : filtered.length === 0 ? (
                  <span className="font-size-sm">No academic years found</span>
                ) : (
                  filtered.map((term, index) => {
                    const isSelected = value?.id === term.id;
                    return (
                      <Fragment key={term.id}>
                        <button
                          type="button"
                          className={`border-none font-size-sm w-100 rounded-3 px-2 py-1 transition-all duration-200 ${
                            isSelected ? "bg-primary-50" : "transparent-bg hover-bg-iron-50"
                          }`}
                          onClick={() => handleSelect(term)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <div className="d-flex flex-row align-items-center justify-content-between w-100">
                            <div className="d-flex flex-column gap-1 align-items-start">
                              <span className="fw-semibold">{term.label}</span>
                              <span className="text-iron-500 font-size-xs">
                                {termMeta(term)}
                                {term.is_running ? " · in progress" : ""}
                              </span>
                            </div>
                            {isSelected && (
                              <span className="color-primary">
                                <Icon icon="iconamoon:check-bold" width="16" height="16" />
                              </span>
                            )}
                          </div>
                        </button>
                        {index !== filtered.length - 1 && <hr className="my-0 opacity-50" />}
                      </Fragment>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}

export default TermDropdown;
