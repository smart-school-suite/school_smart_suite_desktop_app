import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { CSSTransition } from "react-transition-group";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../Spinners/Spinners";

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
    },
    ref
  ) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isToggled, setIsToggled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

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

      const handleClickOutsideCapture = (event) => {
        const el = dropdownRef.current;
        if (!el) return;
        if (!el.contains(event.target)) {
          setIsToggled(false);
          if (!optional && !selectedItem && onError) onError(errorMessage);
        }
      };

      document.addEventListener("pointerdown", handleClickOutsideCapture, true);

      return () => {
        document.removeEventListener("pointerdown", handleClickOutsideCapture, true);
      };
    }, [isToggled, selectedItem, onError, errorMessage, optional]);

    const toggleDropdown = useCallback(() => {
      setIsToggled((prev) => !prev);
    }, []);

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
      <div className="input-container" ref={dropdownRef}>
        <div className="dropdown-box z-1 position-relative">
          <div
            className="selected-box"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isToggled}
          >
            <div
              className={`d-flex border flex-row justify-content-between bg-white rounded-2 pointer-cursor align-items-center
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

          <CSSTransition
            in={isToggled}
            timeout={300}
            classNames="dropdown"
            unmountOnExit
            onEntered={() => {
              inputRef.current?.focus();
            }}
          >
            <div
              className={`d-flex flex-column bg-white p-2 rounded-3 w-100 mt-4 border z-3 position-absolute ${
                direction === "up" ? "drop-up" : "drop-down"
              }`}
            >
              <>
                <input
                  ref={inputRef}
                  type="text"
                  className="rounded-2 my-2 white-smoke-bg form-control font-size-sm"
                  placeholder="Search for anything"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ padding: "0.5rem" }}
                />
                <div className="scrollable-box d-flex flex-column z-3">
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
              </>
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  }
);

export default CustomDropdown;
