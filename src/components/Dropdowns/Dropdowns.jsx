import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../Spinners/Spinners";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
const CustomDropdown = forwardRef(
  (
    {
      data,
      displayKey,
      valueKey,
      onSelect,
      direction = "down",
      isLoading = false,
      placeholder = "Select an option",
      onError,
      error,
      errorMessage = "Field Required",
      optional = false,
      dropdownWidth = "30vw", // NEW PROP
    },
    ref
  ) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isToggled, setIsToggled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const inputRef = useRef(null);

    // Floating UI positioning
    const {
      x,
      y,
      strategy,
      refs,
      update,
    } = useFloating({
      placement: direction === "up" ? "top-start" : "bottom-start",
      middleware: [offset(6), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    useImperativeHandle(ref, () => ({
      triggerValidation: () => {
        if (!optional && !selectedItem && onError) {
          onError(errorMessage);
          return false;
        }
        onError?.("");
        return true;
      },
      reset: () => {
        setSelectedItem(null);
        setSearchTerm("");
        onError?.("");
      },
    }));

    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (searchTerm) {
          const filtered = data.filter((item) =>
            item[displayKey[0]]
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
          setFilteredData(filtered);
        } else {
          setFilteredData(data);
        }
      }, 300);
      return () => clearTimeout(timer);
    }, [searchTerm, data, displayKey]);

    useEffect(() => {
      if (!isToggled) return;

      const handleClickOutside = (event) => {
        if (
          refs.floating.current &&
          refs.reference.current &&
          !refs.floating.current.contains(event.target) &&
          !refs.reference.current.contains(event.target)
        ) {
          setIsToggled(false);
          if (!optional && !selectedItem && onError) onError(errorMessage);
        }
      };

      document.addEventListener("pointerdown", handleClickOutside, true);
      return () =>
        document.removeEventListener("pointerdown", handleClickOutside, true);
    }, [isToggled, selectedItem, onError, errorMessage, optional, refs]);

    const toggleDropdown = useCallback(() => {
      setIsToggled((prev) => !prev);
      update();
    }, [update]);

    const handleSelect = useCallback(
      (item) => {
        setSelectedItem(item);
        setSearchTerm("");
        if (onError) onError("");
        setIsToggled(false);
        if (onSelect) {
          const selectedValues = valueKey.reduce((acc, key) => {
            acc[key] = item[key];
            return acc;
          }, {});
          onSelect(selectedValues);
        }
      },
      [onSelect, valueKey, onError]
    );

    return (
      <div className="input-container">
        <div className="dropdown-box z-1" ref={refs.setReference}>
          <div
            className="selected-box"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isToggled}
          >
            <div
              className={`${darkMode ? ' dark-mode-text dark-mode-border dark-bg-light' : 'bg-white border'} d-flex  flex-row justify-content-between rounded-2 pointer-cursor align-items-center
              ${
                error
                  ? "border-danger text-danger"
                  : selectedItem
                  ? "border-success text-success"
                  : ""
              }
            `}
              style={{ padding: "0.35rem" }}
            >
              <span className="text-overflow-elipse overflow-hidden my-0 text-start font-size-sm">
                {selectedItem ? selectedItem[displayKey[0]] : placeholder}
              </span>
              <span>
                <Icon
                  icon="heroicons:chevron-down-20-solid"
                  className={isToggled ? "rotate-180 transition-3s" : "transition-3s"}
                />
              </span>
            </div>
            {error && <span className="font-size-sm text-danger">{error}</span>}
            {!error && selectedItem && (
              <span className="font-size-sm text-success">Looks Good</span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isToggled && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: dropdownWidth, // controlled by prop
                zIndex: 9999,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={() => {
                    inputRef.current?.focus();
              }}
              className={`${darkMode ? 'dark-bg dark-mode-border' : 'bg-white border'} d-flex flex-column  p-2 rounded-3 shadow`}
            >
              <input
                ref={inputRef}
                type="text"
                className={`rounded-2 my-2 p-2 form-control font-size-sm ${darkMode ? 'dark-mode-input' : null}`}
                placeholder="Search for anything"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "0.5rem" }}
              />
              <div className="scrollable-dropdown d-flex flex-column">
                {isLoading ? (
                  <SingleSpinner />
                ) : filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <div
                      key={index}
                      className={`my-2 ms-1 dropdown-listitems p-2 font-size-md ${
                        highlightedIndex === index ? "color-primary" : ""
                      }`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <div className="d-flex flex-column">
                        <span className="my-0 font-size-sm">
                          {item[displayKey[0]]}
                        </span>
                        {displayKey[1] && (
                          <span className="my-0 font-size-sm gainsboro-color fw-light">
                            {item[displayKey[1]]}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results text-center">No results found</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default CustomDropdown;

export const MultiSelectDropdown = forwardRef(
  (
    {
      data,
      displayKey,
      valueKey,
      onSelect,
      direction = "down",
      isLoading = false,
      placeholder = "Select one or more options",
      onError,
      error,
      errorMessage = "Field Required",
      optional = false,
      dropdownWidth = "30vw",
    },
    ref
  ) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [isToggled, setIsToggled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const inputRef = useRef(null);

    const { x, y, strategy, refs, update } = useFloating({
      placement: direction === "up" ? "top-start" : "bottom-start",
      middleware: [offset(6), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    useImperativeHandle(ref, () => ({
      triggerValidation: () => {
        if (!optional && selectedItems.length === 0 && onError) {
          console.log("i ran");
          onError(errorMessage);
          console.log(error);
          return false;
        }
        onError?.("");
        return true;
      },
      reset: () => {
        setSelectedItems([]);
        setSearchTerm("");
        onError?.("");
      },
    }));

    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (searchTerm) {
          const filtered = data.filter((item) =>
            item[displayKey[0]]?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredData(filtered);
        } else {
          setFilteredData(data);
        }
      }, 300);
      return () => clearTimeout(timer);
    }, [searchTerm, data, displayKey]);

    useEffect(() => {
      if (!isToggled) return;

      const handleClickOutside = (event) => {
        if (
          refs.floating.current &&
          refs.reference.current &&
          !refs.floating.current.contains(event.target) &&
          !refs.reference.current.contains(event.target)
        ) {
          setIsToggled(false);
          if (!optional && selectedItems.length === 0 && onError) {
            onError(errorMessage);
          }
        }
      };

      document.addEventListener("pointerdown", handleClickOutside, true);
      return () =>
        document.removeEventListener("pointerdown", handleClickOutside, true);
    }, [isToggled, selectedItems, onError, errorMessage, optional, refs]);

    const toggleDropdown = useCallback(() => {
      setIsToggled((prev) => !prev);
      update();
    }, [update]);

    const handleSelect = useCallback(
      (item) => {
        const isAlreadySelected = selectedItems.some(
          (selected) => selected[valueKey[0]] === item[valueKey[0]]
        );

        let newSelectedItems;
        if (isAlreadySelected) {
          newSelectedItems = selectedItems.filter(
            (selected) => selected[valueKey[0]] !== item[valueKey[0]]
          );
        } else {
          newSelectedItems = [...selectedItems, item];
        }

        setSelectedItems(newSelectedItems);
        if (onError) onError("");

        const selectedValues = newSelectedItems.map((selected) =>
          valueKey.reduce((acc, key) => {
            acc[key] = selected[key];
            return acc;
          }, {})
        );

        if (onSelect) {
          onSelect(selectedValues);
        }
      },
      [onSelect, valueKey, onError, selectedItems]
    );

    const handleSelectAll = useCallback(() => {
        const allItemsAreSelected = selectedItems.length === data.length;
        let newSelectedItems;

        if (allItemsAreSelected) {
            newSelectedItems = [];
        } else {
            newSelectedItems = [...data];
        }

        setSelectedItems(newSelectedItems);
        if (onError) onError("");

        const selectedValues = newSelectedItems.map((selected) =>
            valueKey.reduce((acc, key) => {
                acc[key] = selected[key];
                return acc;
            }, {})
        );

        if (onSelect) {
            onSelect(selectedValues);
        }
    }, [data, onSelect, selectedItems, valueKey, onError]);

    const renderSelectedItems = () => {
      if (selectedItems.length === 0) {
        return <span className="text-overflow-elipse overflow-hidden my-0 text-start font-size-sm">{placeholder}</span>;
      }

      if (selectedItems.length === data.length) {
          return <span className="text-overflow-elipse overflow-hidden my-0 text-start font-size-sm">All selected</span>;
      }

      if (selectedItems.length <= 7) {
        return (
          <div className="d-flex flex-wrap gap-1">
            {selectedItems.map((item) => (
              <span key={item[valueKey[0]]} className="primary-background-50 color-primary font-size-xs my-0 px-2 py-1 rounded-2" style={{height:"50%"}}>
                {item[displayKey[0]]}
              </span>
            ))}
          </div>
        );
      }

      return (
        <span className="text-overflow-elipse overflow-hidden my-0 text-start font-size-sm">
          {selectedItems.length} selected
        </span>
      );
    };

    const isSelectAllChecked = selectedItems.length === data.length;

    return (
      <div className="input-container">
        <div className="dropdown-box z-1" ref={refs.setReference}>
          <div
            className="selected-box"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isToggled}
          >
            <div
              className={`${darkMode ? ' dark-mode-text dark-mode-border dark-bg-light' : 'bg-white border'} d-flex  flex-row justify-content-between rounded-2 pointer-cursor align-items-center
              ${
                error
                  ? "border-danger text-danger"
                  : selectedItems.length > 0
                  ? "border-success text-success"
                  : ""
              }
            `}
              style={{ padding: "0.35rem" }}
            >
              {renderSelectedItems()}
              <span>
                <Icon
                  icon="heroicons:chevron-down-20-solid"
                  className={isToggled ? "rotate-180 transition-3s" : "transition-3s"}
                />
              </span>
            </div>
            {error && <span className="font-size-sm text-danger">{error}</span>}
            {!error && selectedItems.length > 0 && (
              <span className="font-size-sm text-success">Looks Good</span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isToggled && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: dropdownWidth,
                zIndex: 9999,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={() => {
                inputRef.current?.focus();
              }}
              className={`${darkMode ? 'dark-bg dark-mode-border' : 'bg-white border'} d-flex flex-column  p-2 rounded-3 shadow`}
            >
              <input
                ref={inputRef}
                type="text"
                className={`rounded-2 my-2 p-2 form-control font-size-sm ${darkMode ? 'dark-mode-input' : null}`}
                placeholder="Search for anything"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "0.5rem" }}
              />
              <div className="scrollable-dropdown d-flex flex-column">
                {isLoading ? (
                  <SingleSpinner />
                ) : (
                  <>
                    <div className="px-2">
                      <div
                        className="my-2 py-2 font-size-md pointer-cursor d-flex align-items-center gap-2"
                        onClick={handleSelectAll}
                    >
                        <input
                            type="checkbox"
                            checked={isSelectAllChecked}
                            readOnly
                            className={`${darkMode ? 'dark-bg-light dark-mode-border' : null } form-check-input my-0`}
                        />
                        <span className="my-0 font-size-sm">Select All</span>
                    </div>
                    <hr />
                    </div>
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => {
                        const isSelected = selectedItems.some(
                          (selected) => selected[valueKey[0]] === item[valueKey[0]]
                        );
                        return (
                          <div
                            key={item[valueKey[0]]}
                            className={`my-2 ms-1 dropdown-listitems p-2 font-size-md pointer-cursor d-flex align-items-center gap-2 justify-content-between ${
                              highlightedIndex === index ? "color-primary" : ""
                            }`}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                          >
                            <div className="d-flex flex-column">
                              <span className="my-0 font-size-sm">
                                {item[displayKey[0]]}
                              </span>
                              {displayKey[1] && (
                                <span className="my-0 font-size-sm gainsboro-color fw-light">
                                  {item[displayKey[1]]}
                                </span>
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                              className={`${darkMode ? 'dark-bg-light dark-mode-border' : null } form-check-input my-0`}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-results text-center">No results found</div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
