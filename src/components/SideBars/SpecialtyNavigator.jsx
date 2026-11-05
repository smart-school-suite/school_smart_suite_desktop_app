import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useGetLevelSpecialties } from "../../hooks/specialty/useGetLevelSpecialties";
import "../../styles/constraintWizard.css";

const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.18, ease: "easeInOut" },
};

const matches = (specialty, levelName, query) => {
  if (!query) return true;
  const haystack = [specialty.specialty_name, levelName]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

// Level → specialty picker styled like the semester timetable sidebar.
function SpecialtyNavigator({ specialty, setSpecialty, title, description }) {
  const { data: levelSpecialties, isLoading, error } = useGetLevelSpecialties();
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState(() => new Set());

  const levels = levelSpecialties?.data ?? [];
  const normalisedQuery = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      levels
        .map((level) => ({
          ...level,
          specialties: level.specialties.filter((spec) =>
            matches(spec, level.level_name, normalisedQuery),
          ),
        }))
        .filter((level) => level.specialties.length > 0),
    [levels, normalisedQuery],
  );
  const totalSpecialties = levels.reduce(
    (sum, level) => sum + level.specialties.length,
    0,
  );

  const selected = useMemo(() => {
    for (const level of levels) {
      const spec = level.specialties.find((item) => item.id === specialty);
      if (spec) return { ...spec, level_id: level.level_id, level_name: level.level_name };
    }
    return null;
  }, [levels, specialty]);

  const toggleLevel = (id) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <aside className="ctl" aria-label="Specialties">
      <div className="ctl-top d-flex flex-column gap-1">
        <span className="fw-semibold">{title}</span>
        <span className="font-size-xs text-iron-500 text-truncate">
          {selected
            ? `${selected.specialty_name} · ${selected.level_name}`
            : description}
        </span>
      </div>

      <section className="ctl-group ctl-group--constraints">
        <div className="ctl-group__head" role="presentation">
          <span className="ctl-group__title">Specialties</span>
          {totalSpecialties > 0 && (
            <span className="ctl-group__count">{totalSpecialties}</span>
          )}
        </div>

        {totalSpecialties > 0 && (
          <div className="ctl-search">
            <Icon
              icon="lucide:search"
              width={14}
              height={14}
              className="ctl-search__icon"
            />
            <input
              type="search"
              className="ctl-search__input"
              placeholder="Find a specialty or level"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Escape" && setQuery("")}
              aria-label="Find a specialty"
            />
            {query && (
              <button
                type="button"
                className="ctl-search__clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <Icon icon="lucide:x" width={14} height={14} />
              </button>
            )}
          </div>
        )}

        <div className="ctl-scroll">
          {isLoading ? (
            [...Array(6)].map((_, index) => (
              <div key={index} className="ctl-skeleton" />
            ))
          ) : error ? (
            <p className="ctl-empty ctl-empty--error">
              {error?.response?.data?.errors?.description ??
                "Could not load specialties."}
            </p>
          ) : filtered.length === 0 ? (
            <p className="ctl-empty">
              {normalisedQuery
                ? `No specialties match “${query.trim()}”.`
                : "No specialties available."}
            </p>
          ) : (
            filtered.map((level) => {
              const isOpen =
                Boolean(normalisedQuery) || openIds.has(level.level_id);
              return (
                <div className="ctl-cat" key={level.level_id}>
                  <button
                    type="button"
                    className="ctl-cat__head"
                    onClick={() => toggleLevel(level.level_id)}
                    aria-expanded={isOpen}
                  >
                    <span className="ctl-cat__icon">
                      <Icon icon="lucide:graduation-cap" width={14} height={14} />
                    </span>
                    <span className="ctl-cat__name">{level.level_name}</span>
                    <span className="ctl-cat__count">
                      {level.specialties.length}
                    </span>
                    <Icon
                      icon="lucide:chevron-down"
                      width={14}
                      height={14}
                      className={`ctl-group__chev ${isOpen ? "is-open" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div className="ctl-cat__body" {...collapse}>
                        <ul className="ctl-cat__list">
                          {level.specialties.map((spec) => {
                            const isSelected = spec.id === specialty;
                            return (
                              <li key={spec.id}>
                                <button
                                  type="button"
                                  className={`ctl-item ${isSelected ? "is-active" : ""}`}
                                  aria-current={isSelected ? "true" : undefined}
                                  onClick={() => {
                                    setSpecialty(spec.id);
                                    // Keep the level open once a search is cleared
                                    setOpenIds((current) =>
                                      new Set(current).add(level.level_id),
                                    );
                                  }}
                                  title={spec.specialty_name}
                                >
                                  <span className="ctl-item__label">
                                    {spec.specialty_name}
                                  </span>
                                  {isSelected && (
                                    <span className="ctl-item__meta">
                                      <Icon icon="lucide:check" width={14} height={14} />
                                    </span>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </section>
    </aside>
  );
}

export default SpecialtyNavigator;
