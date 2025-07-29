import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../Spinners/Spinners";
import { motion, AnimatePresence } from "framer-motion";

const DefaultDropdownItem = ({ item, labelKey, isSelected, onClick, onMouseEnter, className, ...props }) => (
  <div
    className={`dropdown-option ${className || ''} ${isSelected ? "dropdown-option-selected" : ""}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    role="option"
    aria-selected={isSelected}
    {...props}
  >
    <p>{item[labelKey]}</p>
  </div>
);

function Dropdown({
  options = [],
  labelKey,
  valueKey,
  onSelect, 
  onMultiSelect,
  direction = "down",
  label,
  placeholder = "Select an option",
  selectedValue,
  selectedValues = [],
  searchable = true,
  loading = false,
  error = null,
  noResultsMessage = "No results found",
  onSearchChange,
  children,
  isMultiSelect = false,
  renderItem,
  renderMenuHeader,
  renderMenuFooter,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const currentSelection = isMultiSelect ? selectedValues : selectedValue;

  const filteredOptions = useMemo(() => {
    if (!searchTerm) {
      return options;
    }
    if (!labelKey) {
      console.warn("Dropdown: `labelKey` prop is required for filtering.");
      return options;
    }
    return options.filter((item) =>
      item[labelKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options, labelKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToggled(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isToggled && searchInputRef.current && searchable) {
      searchInputRef.current.focus();
    }
  }, [isToggled, searchable]);

  const toggleDropdown = useCallback(() => {
    setIsToggled((prev) => !prev);
  }, []);

  const handleItemSelect = useCallback(
    (item) => {
      if (isMultiSelect) {
        const itemValue = item[valueKey];
        const newSelectedValues = selectedValues.includes(itemValue)
          ? selectedValues.filter((val) => val !== itemValue)
          : [...selectedValues, itemValue];
        onMultiSelect && onMultiSelect(newSelectedValues);
      } else {
        onSelect && onSelect(item[valueKey]);
        setIsToggled(false);
      }
      setSearchTerm("");
      setHighlightedIndex(-1); 
    },
    [isMultiSelect, selectedValues, onSelect, onMultiSelect, valueKey]
  );

  const handleSearchChange = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
      if (onSearchChange) {
        onSearchChange(e.target.value);
      }
      setHighlightedIndex(-1);
    },
    [onSearchChange]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!isToggled) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
            e.preventDefault();
            setIsToggled(true);
            return;
        }
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && highlightedIndex !== -1) {
        e.preventDefault();
        handleItemSelect(filteredOptions[highlightedIndex]);
      } else if (e.key === "Escape") {
        setIsToggled(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    },
    [isToggled, filteredOptions, highlightedIndex, handleItemSelect]
  );

  const displayValue = useMemo(() => {
    if (isMultiSelect) {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === options.length) return `All (${options.length}) selected`;
      return `${selectedValues.length} selected`;
    } else {
      const item = options.find((opt) => opt[valueKey] === selectedValue);
      return item ? item[labelKey] : placeholder;
    }
  }, [isMultiSelect, selectedValues, selectedValue, options, labelKey, valueKey, placeholder]);

  const menuRenderProps = useMemo(() => ({
    options: filteredOptions,
    handleItemSelect,
    isItemSelected: (item) => isMultiSelect ? selectedValues.includes(item[valueKey]) : selectedValue === item[valueKey],
    toggleDropdown,
    searchTerm,
    setSearchTerm,
    labelKey,
    valueKey,
    highlightedIndex,
    setHighlightedIndex,
    isMultiSelect,
    selectedValues,
    selectedValue,
    placeholder,
    noResultsMessage
  }), [
    filteredOptions, handleItemSelect, isMultiSelect, selectedValues, selectedValue,
    toggleDropdown, searchTerm, setSearchTerm, labelKey, valueKey,
    highlightedIndex, setHighlightedIndex, placeholder, noResultsMessage
  ]);


  const dropdownMenuVariants = {
    hidden: { opacity: 0, y: direction === "up" ? 0 : 0, pointerEvents: "none" },
    visible: { opacity: 1, y: 0, pointerEvents: "auto" }, 
  };

  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      {label && <label className="dropdown-label">{label}</label>}

      <div
        className="dropdown-trigger"
        onClick={toggleDropdown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isToggled}
        aria-controls="dropdown-menu-list"
        tabIndex={0}
      >
        {children ? (
          children(displayValue, isToggled, toggleDropdown)
        ) : (
          <div className="dropdown-selected-box">
            <span className="dropdown-selected-text">{displayValue}</span>
            <Icon
              icon="heroicons:chevron-down-20-solid"
              className={`dropdown-arrow ${isToggled ? "rotate-180" : ""}`}
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {isToggled && (
          <motion.div
            className={`dropdown-menu ${
              direction === "up" ? "drop-up" : "drop-down"
            }`}
            role="listbox"
            id="dropdown-menu-list"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownMenuVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {searchable && (
              <input
                ref={searchInputRef}
                type="text"
                className="dropdown-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                role="searchbox"
                aria-label="Search dropdown options"
              />
            )}

            {renderMenuHeader && renderMenuHeader(menuRenderProps)}

            <div className="dropdown-options-container">
              {loading ? (
                <div className="dropdown-message">
                  <SingleSpinner /> Loading...
                </div>
              ) : error ? (
                <div className="dropdown-message dropdown-error">
                  Error: {error}
                </div>
              ) : filteredOptions.length > 0 ? (
                filteredOptions.map((item, index) => {
                  const isSelected = isMultiSelect
                    ? selectedValues.includes(item[valueKey])
                    : selectedValue === item[valueKey];
                  const commonItemProps = {
                    key: item[valueKey] || index,
                    onClick: () => handleItemSelect(item),
                    onMouseEnter: () => setHighlightedIndex(index),
                    id: `dropdown-option-${index}`,
                    className: highlightedIndex === index ? "highlighted" : "",
                  };

                  return renderItem ? (
                    renderItem(item, isSelected, commonItemProps)
                  ) : (
                    <DefaultDropdownItem
                      item={item}
                      labelKey={labelKey}
                      isSelected={isSelected}
                      {...commonItemProps}
                    />
                  );
                })
              ) : (
                <div className="dropdown-message text-center">{noResultsMessage}</div>
              )}
            </div>

            {renderMenuFooter && renderMenuFooter(menuRenderProps)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;


export function MultiSelectDropdown({
  options = [],
  labelKey,
  valueKey,
  label,
  placeholder = "Select options...",
  selectedValues = [],
  onSelectChange, 
  searchable = true,
  loading = false,
  error = null,
  noResultsMessage = "No results found",
  direction = "down",
}) {
  const [isToggled, setIsToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const filteredOptions = useMemo(() => {
    if (!searchTerm) {
      return options;
    }
    if (!labelKey) {
      console.warn("MultiSelectDropdown: `labelKey` prop is required for filtering.");
      return options;
    }
    return options.filter((item) =>
      item[labelKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options, labelKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToggled(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    if (isToggled && searchInputRef.current && searchable) {
      searchInputRef.current.focus();
    }
  }, [isToggled, searchable]);

  const toggleDropdown = useCallback(() => {
    setIsToggled((prev) => !prev);
  }, []);

  const handleItemClick = useCallback(
    (item) => {
      const itemValue = item[valueKey];
      const newSelectedValues = selectedValues.includes(itemValue)
        ? selectedValues.filter((val) => val !== itemValue)
        : [...selectedValues, itemValue];
      onSelectChange && onSelectChange(newSelectedValues);
      setHighlightedIndex(-1); 
    },
    [selectedValues, onSelectChange, valueKey]
  );

  const handleSearchChange = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
      setHighlightedIndex(-1); 
    },
    []
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!isToggled) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
          e.preventDefault();
          setIsToggled(true);
          return;
        }
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && highlightedIndex !== -1) {
        e.preventDefault();
        handleItemClick(filteredOptions[highlightedIndex]);
      } else if (e.key === "Escape") {
        setIsToggled(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    },
    [isToggled, filteredOptions, highlightedIndex, handleItemClick]
  );

  const displayTriggerText = useMemo(() => {
    const selectedCount = selectedValues.length;
    const totalCount = options.length;

    if (selectedCount === 0) {
      return placeholder;
    } else if (selectedCount === totalCount) {
      return `All ${totalCount} selected`;
    } else {
      return `${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected`;
    }
  }, [selectedValues, options.length, placeholder]);

  const isAllSelected = selectedValues.length === options.length && options.length > 0;
  const isIndeterminate = selectedValues.length > 0 && selectedValues.length < options.length;

  const handleToggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      onSelectChange && onSelectChange([]); 
    } else {
      const allOptionValues = options.map(opt => opt[valueKey]);
      onSelectChange && onSelectChange(allOptionValues);
    }
  }, [isAllSelected, options, onSelectChange, valueKey]);


  const dropdownMenuVariants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 10 : -10,
      pointerEvents: "none",
    },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
    },
  };

  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      {label && <label className="dropdown-label">{label}</label>}

      {/* Dropdown Trigger */}
      <div
        className="dropdown-trigger"
        onClick={toggleDropdown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isToggled}
        aria-controls="multi-select-dropdown-list"
        tabIndex={0}
      >
        <div className="dropdown-selected-box">
          <span className="dropdown-selected-text">{displayTriggerText}</span>
          <Icon
            icon="heroicons:chevron-down-20-solid"
            className={`dropdown-arrow ${isToggled ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            className={`dropdown-menu ${
              direction === "up" ? "drop-up" : "drop-down"
            }`}
            role="listbox"
            id="multi-select-dropdown-list"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownMenuVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {searchable && (
              <input
                ref={searchInputRef}
                type="text"
                className="dropdown-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                role="searchbox"
                aria-label="Search dropdown options"
              />
            )}

            <div className="dropdown-multi-select-header">
              <label className="multi-select-all-label" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleToggleSelectAll}
                />
                <span>Select All</span>
              </label>
              <hr className="multi-select-separator" />
            </div>

            <div className="dropdown-options-container">
              {loading ? (
                <div className="dropdown-message">
                  <SingleSpinner /> Loading...
                </div>
              ) : error ? (
                <div className="dropdown-message dropdown-error">
                  Error: {error}
                </div>
              ) : filteredOptions.length > 0 ? (
                filteredOptions.map((item, index) => {
                  const isItemSelected = selectedValues.includes(item[valueKey]);
                  const commonItemProps = {
                    key: item[valueKey] || index,
                    onClick: () => handleItemClick(item),
                    onMouseEnter: () => setHighlightedIndex(index),
                    id: `multi-select-option-${index}`,
                    className: highlightedIndex === index ? "highlighted" : "",
                  };

                  return (
                    <div {...commonItemProps} className={`multi-select-item ${commonItemProps.className || ''} ${isItemSelected ? 'dropdown-option-selected' : ''}`}>
                      <label className="dropdown-multi-select-item-label">
                        <input
                          type="checkbox"
                          checked={isItemSelected}
                          readOnly
                        />
                        <span>{item[labelKey]}</span>
                      </label>
                    </div>
                  );
                })
              ) : (
                <div className="dropdown-message text-center">{noResultsMessage}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
