import { useSlate } from "slate-react";
import { Editor } from "slate";
import { Icon } from "@iconify/react";
import CustomTooltip from "../../../components/Tooltip";
export const MarkButton = ({ format, icon, tooltipText, placement }) => {
    const editor = useSlate();
  
    return (
      <CustomTooltip tooltipText={tooltipText}>
        <button
        onMouseDown={(event) => {
          event.preventDefault(); // Prevent the button from triggering a form submission or other default behavior
          toggleMark(editor, format); // Toggle the bold mark
        }}
        className="border-none transparent-bg fs-5"
      >
        <Icon icon={icon}></Icon>
      </button>
      </CustomTooltip>
    );
  };
  
  // Function to toggle the bold mark on selected text
  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format); // Check if the bold format is active
    if (isActive) {
      Editor.removeMark(editor, format); // Remove the bold mark
    } else {
      Editor.addMark(editor, format, true); // Add the bold mark
    }
  };
  
  // Function to check if a mark is active on the selected text
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor); // Get the current marks
    return marks ? marks[format] === true : false; // Return whether the specified mark is active
  };
  
  // Render the styled text based on marks
 export  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>; // Apply bold format
    }
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
    if (leaf.capitalize) {
      children = <span className="capitalize">{children}</span>;
    }
    return <span {...attributes}>{children}</span>; // Return the text wrapped in a span
  };
  
  