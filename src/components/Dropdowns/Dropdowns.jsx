import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../Spinners/Spinners";
import CleanArrayData from "../../utils/functions";
import { renameKeys } from "../../utils/functions";
function CustomDropdown({
  data,
  displayKey,
  valueKey,
  onSelect,
  isLoading,
  error,
  filter_array_keys,
  renameMapping,
  direction = "down"
}) {
  const cleaned_array_data = useMemo(() => {
    return renameKeys(CleanArrayData(data, filter_array_keys), renameMapping);
  }, [data, filter_array_keys, renameMapping]);

  const [isToggled, setIsToggled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(cleaned_array_data[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(cleaned_array_data);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const filtered = cleaned_array_data.filter(item =>
          item[displayKey[0]]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(cleaned_array_data);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, cleaned_array_data, displayKey]);

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
    <div className="dropdown-box z-1 position-relative">
      <div
        className="selected-box"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isToggled}
      >
        <div className="d-flex border flex-row justify-content-between bg-white p-2 my-1 rounded-3 pointer-cursor">
          <span className="text-overflow-elipse overflow-hidden my-0 text-start">
            {selectedItem ? selectedItem[displayKey[0]] : "Select option"}
          </span>
          <span>
            <Icon
              icon="heroicons:chevron-down-20-solid"
              className={isToggled ? "rotate-180 transition-3s" : "transition-3s"}
            />
          </span>
        </div>
      </div>
      <CSSTransition
        in={isToggled}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <div className={`d-flex flex-column bg-white p-2 rounded-3 w-100 mt-4 border z-3 position-absolute ${direction === "up" ? "drop-up" : "drop-down"}`}>
          {isLoading && <div className="loading-indicator"></div>}
          {error && <div className="error-message">Error: {error.message}</div>}
          {!isLoading && !error && (
            <>
              <input
                ref={inputRef}
                type="text"
                className="p-2 rounded-3 my-2 white-smoke-bg form-control"
                placeholder="Search for anything"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                        <span className="my-0 font-size-sm gainsboro-color fw-light">{item[displayKey[1]]}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results tex-center">No results found</div>
                )}
              </div>
            </>
          )}
        </div>
      </CSSTransition>
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


export function CustomDropdownTwo({
  data,
  displayKey,
  valueKey,
  onSelect,
  direction = "down",
  lable
}) {
  const cleaned_array_data = useMemo(() => {
    return data; 
  }, [data]);

  const [isToggled, setIsToggled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(cleaned_array_data[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(cleaned_array_data);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const filtered = cleaned_array_data.filter(item =>
          item[displayKey[0]]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(cleaned_array_data);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, cleaned_array_data, displayKey]);

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
    <div className="dropdown-box z-1 position-relative">
      <span>{lable}</span>
      <div
        className="selected-box"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isToggled}
      >
        <div className="d-flex border flex-row justify-content-between bg-white  rounded-3 pointer-cursor" style={{ padding:"0.45rem" }}>
          <span className="text-overflow-elipse overflow-hidden my-0 text-start" style={{ fontSize:"0.95rem" }}>
            {selectedItem ? selectedItem[displayKey[0]] : "Select option"}
          </span>
          <span>
            <Icon
              icon="heroicons:chevron-down-20-solid"
              className={isToggled ? "rotate-180 transition-3s" : "transition-3s"}
            />
          </span>
        </div>
      </div>
      <CSSTransition
        in={isToggled}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <div className={`d-flex flex-column bg-white p-2 rounded-3 w-100 border z-3 position-absolute ${direction === "up" ? "drop-up" : "drop-down"}`}>
          <input
            ref={inputRef}
            type="text"
            className="p-2 rounded-3 my-2 white-smoke-bg form-control"
            placeholder="Search for anything"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                  <div className="d-block">
                    <p className="my-0">{item[displayKey[0]]}</p>
                    <p className="my-0 font-size-sm gainsboro-color">{item[displayKey[1]]}</p>
                  </div>
                  {selectedItem === item && <span className="selected-indicator">✓</span>}
                </div>
              ))
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
