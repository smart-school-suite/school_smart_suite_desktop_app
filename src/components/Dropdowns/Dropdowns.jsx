import { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { Icon } from "@iconify/react";
function CustomDropdown({
  data,
  displayKey,
  valueKey,
  onSelect,
  direction = "down",
  placeholder = "Select an option"
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Update filteredData when the 'data' prop changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Filter logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const filtered = data.filter(item =>
          item[displayKey[0]]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, data, displayKey]);

  // Click outside to close logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToggled(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToggled]);

  const toggleDropdown = useCallback(() => {
    setIsToggled(prev => !prev);
    if (!isToggled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isToggled]);

  const handleSelect = useCallback((item) => {
    setSelectedItem(item);
    setSearchTerm("");
    setIsToggled(false);
    if (onSelect) {
      const selectedValues = valueKey.reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
      }, {});
      onSelect(selectedValues);
    }
  }, [onSelect, valueKey]);

  return (
    <div className="input-container" ref={dropdownRef}>
      <div className="dropdown-box z-1 position-relative">
        <div
          className="selected-box"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isToggled}
        >
          <div className="d-flex border border-success text-success flex-row justify-content-between bg-white rounded-2 pointer-cursor align-items-center" style={{ padding: "0.35rem" }}>
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
          <span className="font-size-sm text-success">Looks Good</span>
        </div>
        <CSSTransition
          in={isToggled}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div className={`d-flex flex-column bg-white p-2 rounded-3 w-100 mt-4 border z-3 position-absolute ${direction === "up" ? "drop-up" : "drop-down"}`}>
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
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <div
                      key={index}
                      className={`my-2 ms-1 dropdown-listitems p-2 font-size-md ${highlightedIndex === index ? "color-primary" : ""}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <div className="d-flex flex-column">
                        <span className="my-0 font-size-sm">{item[displayKey[0]]}</span>
                        {displayKey[1] && <span className="my-0 font-size-sm gainsboro-color fw-light">{item[displayKey[1]]}</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results tex-center">No results found</div>
                )}
              </div>
            </>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
export default CustomDropdown;

export function DropdownComponent(props) {
  const [isToggled, setIsToggeled] = useState(false);
  const toggleDropdown = () => {
    setIsToggeled((prevalue) => !prevalue);
  };
  return (
    <>
      <div className="dropdown-box z-1 position-relative">
        <div
          className="selected-box"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isToggled}
        >
          <div
            className="d-flex flex-row justify-content-between primary-background align-items-center px-2 text-white rounded-3 pointer-cursor"
            style={{
              width: "6vw",
              height: "2.2rem",
            }}
          >
            <span>Edit</span>
            <span>
              <Icon
                icon="heroicons:chevron-down-20-solid"
                className={
                  isToggled ? "rotate-180 transition-3s" : "transition-3s"
                }
              />
            </span>
          </div>
        </div>
        <CSSTransition
          in={isToggled}
          timeout={200}
          classNames="dropdown"
          unmountOnExit
        >
          <div className="d-flex flex-column bg-white p-2 rounded-3 w-100 border mt-3 z-3 position-absolute">
            <div className=" d-flex flex-column z-3">
              {
                 props.DropDownActions.map((items, index) => (
                  <p className="my-0 font-size-sm gainsboro-color"
                     key={index * 10000}
                     onClick={() => {
                       items.action
                     }}
                  >{items.lable}</p>
                 ))
              }
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}

