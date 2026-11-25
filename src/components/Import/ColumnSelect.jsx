import { Check, ChevronDown, CircleSlash } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "../../hooks/common/useDebounce";
import SearchInput from "../input/search";
import Popover from "../Popover/Popover";

/**
 * Pick which column of the file fills a field.
 *
 * Free columns come first and columns already used elsewhere are listed
 * after them, labelled with what they fill, so the usual choice is short
 * (Hick's law). Each column shows a value from the file, so people
 * recognise it rather than remember it.
 *
 *   <ColumnSelect value headers samples usage onChange label />
 */
export default function ColumnSelect({ value = "", headers = [], samples = {}, usage = {}, onChange, label }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 150);

  const { free, used } = useMemo(() => {
    const words = String(debouncedQuery ?? "").toLowerCase().split(/\s+/).filter(Boolean);
    const matches = (header) => {
      const text = `${header} ${samples[header] ?? ""}`.toLowerCase();
      return words.every((word) => text.includes(word));
    };
    const visible = headers.filter(matches);
    return {
      free: visible.filter((header) => header === value || !usage[header]?.length),
      used: visible.filter((header) => header !== value && usage[header]?.length),
    };
  }, [headers, samples, usage, value, debouncedQuery]);

  const trigger = (
    <span className="d-flex flex-row align-items-center justify-content-between gap-2 w-100 px-2 py-1">
      <span className="d-flex flex-column text-truncate" style={{ minWidth: 0 }}>
        <span className="text-truncate fw-medium">{value || "Choose a column"}</span>
        {value && samples[value] && (
          <span className="text-iron-500 text-truncate" style={{ fontSize: "0.7rem" }}>
            e.g. {samples[value]}
          </span>
        )}
      </span>
      <ChevronDown size={14} className="flex-shrink-0 text-iron-500" />
    </span>
  );

  return (
    <Popover
      trigger={trigger}
      triggerClassName={`import-select__trigger d-flex font-size-sm ${value ? "" : "import-select__trigger--empty"}`}
      ariaLabel={value ? `${label}: column ${value}. Change column` : `Choose the column for ${label}`}
      placement="bottom-end"
      portal={false}
    >
      {({ close }) => {
        const pick = (header) => {
          onChange?.(header);
          setQuery("");
          close();
        };
        return (
          <div className="d-flex flex-column gap-2" style={{ width: "17rem" }}>
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder={`Search ${headers.length} columns`}
              enableShortcut={false}
              autoFocus
              size="sm"
            />
            <div className="d-flex flex-column gap-1 scroll-bar-sm over-flow-y-auto" style={{ maxHeight: "16rem" }}>
              {value && (
                <button type="button" className="import-select__option d-flex flex-row align-items-center gap-2 text-iron-600" onClick={() => pick("")}>
                  <CircleSlash size={14} /> Don't import this field
                </button>
              )}
              {free.length === 0 && used.length === 0 && (
                <span className="text-iron-500 text-center py-3">
                  {headers.length === 0 ? "The file has no columns." : "No column matches your search."}
                </span>
              )}
              {free.map((header) => (
                <Option key={header} header={header} sample={samples[header]} selected={header === value} onPick={pick} />
              ))}
              {used.length > 0 && (
                <>
                  <span className="text-iron-500 fw-medium mt-1 px-1" style={{ fontSize: "0.7rem" }}>
                    Already used — choosing one uses it twice
                  </span>
                  {used.map((header) => (
                    <Option key={header} header={header} sample={samples[header]} usedFor={usage[header]} onPick={pick} />
                  ))}
                </>
              )}
            </div>
          </div>
        );
      }}
    </Popover>
  );
}

function Option({ header, sample, selected = false, usedFor, onPick }) {
  return (
    <button
      type="button"
      className={`import-select__option d-flex flex-row align-items-center gap-2 ${selected ? "import-select__option--selected" : ""}`}
      onClick={() => onPick(header)}
      aria-pressed={selected}
    >
      <span className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        <span className="fw-medium text-truncate">{header}</span>
        <span className="text-iron-500 text-truncate" style={{ fontSize: "0.7rem" }}>
          {usedFor?.length ? `Used for ${usedFor.join(", ")}` : sample ? `e.g. ${sample}` : "Empty in the first rows"}
        </span>
      </span>
      {selected && <Check size={14} className="flex-shrink-0" />}
    </button>
  );
}
