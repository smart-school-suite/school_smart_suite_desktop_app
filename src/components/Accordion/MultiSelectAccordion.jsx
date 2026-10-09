import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Form from "react-bootstrap/Form";
import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "../input/search";

export function MultiSelectAccordion({
  label,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  items = [],
  selectedIds = [],
  onChange,
  isLoading = false,
  searchableKeys = [
    "name",
    "title",
    "subtitle",
    "first_name",
    "last_name",
    "email",
    "matricule",
  ],
  renderItem,
  intialState = false
}) {
  const [isOpen, setIsOpen] = useState(intialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredItems = useMemo(() => {
    if (!debouncedSearch.trim()) return items;
    const query = debouncedSearch.toLowerCase();

    return items.filter((item) => {
      return searchableKeys.some((key) => {
        const val = item[key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [items, debouncedSearch, searchableKeys]);

  const handleToggle = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="d-flex flex-column gap-1">
      {label && <span className="fw-medium">{label}</span>}

      <button
        type="button"
        className="border-none border outline-none px-2 py-2 rounded-3 bg-white w-100 text-start text-iron-600"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="text-truncate">
            {selectedIds.length > 0
              ? `${selectedIds.length} Selected`
              : placeholder}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="d-flex align-items-center"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="card rounded-3 border p-2 d-flex flex-column gap-3 shadow-sm bg-white mt-1">
              {/* Search Bar */}
              <SearchInput
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
                hotkey="Ctrl+K"
              />

              <div
                className="d-flex flex-column gap-2 scroll-bar-sm over-flow-x-hidden over-flow-y-auto "
                style={{ maxHeight: "240px" }}
              >
                {isLoading ? (
                  <div className="text-center py-3 text-muted font-size-xs">
                    Loading...
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src="./sss-maskot/404.png"
                      alt="sss-timetable-maskot"
                      style={{
                        height: "200px",
                        width: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ) : (
                  filteredItems.map((item) => {
                    const isChecked = selectedIds.includes(item.id);

                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        onClick={() => handleToggle(item.id)}
                        className={`d-flex flex-row align-items-center gap-2 p-2 rounded-2 cursor-pointer transition-all ${
                          isChecked ? "bg-light" : ""
                        }`}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        <Form.Check
                          type="checkbox"
                          id={`checkbox-${item.id}`}
                          checked={isChecked}
                          onChange={() => {}}
                          onClick={(e) => e.stopPropagation()}
                        />

                        {renderItem ? (
                          renderItem(item, isChecked)
                        ) : (
                          <div className="d-flex flex-column text-truncate">
                            <span className="fw-medium text-truncate">
                              {item.title || item.name}
                            </span>
                            {item.subtitle && (
                              <span className="text-iron-400 fw-light font-size-xs">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
