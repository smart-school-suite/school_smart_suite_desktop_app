import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Icon } from "@iconify/react";

function CustomDropdown() {
  const search_able_data = [
    { name: "label one" },
    { name: "label two" },
    { name: "label three" },
    { name: "label four" },
    { name: "label five" },
    { name: "label six" },
  ];

  const [isToggled, setIsToggled] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(search_able_data);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const filtered = search_able_data.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(search_able_data);
      }
    }, 300); // Debounced search for 300ms

    return () => clearTimeout(timer);
  }, [searchTerm]); // Only run when searchTerm changes

  function toggleDropdown() {
    setIsToggled(prev => !prev);
    if (!isToggled && inputRef.current) {
      inputRef.current.focus();
    }
  }

  function selectItem(item) {
    setSelectedItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item); // Deselect item
      }
      return [...prev, item]; // Select item
    });
    setSearchTerm(""); // Clear search when selecting
    setIsToggled(false);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      setHighlightedIndex(prev => (prev < filteredData.length - 1 ? prev + 1 : 0));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredData.length - 1));
      e.preventDefault();
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      selectItem(filteredData[highlightedIndex].name);
    } else if (e.key === "Escape") {
      setIsToggled(false);
    }
  }

  return (
    <div className="w-100 z-1 position-relative">
      <div className="selected-box" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isToggled}>
        <div className="d-flex border border flex-row justify-content-between bg-white p-2 my-1 rounded-3 pointer-cursor">
          <span>{selectedItems.length > 0 ? selectedItems.join(", ") : "Select options"}</span>
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
        <div className="d-flex flex-column bg-white p-2 rounded-3 w-100 border z-3 position-absolute">
          <input
            ref={inputRef}
            type="text"
            className="p-2 rounded-3 my-2 white-smoke-bg form-control"
            placeholder="Search for anything"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="scrollable-box d-flex flex-column z-3">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className={`my-2 ms-1 dropdown-listitems p-2 font-size-md ${highlightedIndex === index ? 'color-primary' : ''}`}
                onClick={() => selectItem(item.name)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span>{item.name}</span>
                {selectedItems.includes(item.name) && <span className="selected-indicator">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default CustomDropdown;