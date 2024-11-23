import { Transforms } from "slate";
import { useSlate } from "slate-react";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import CustomTooltip from "../../../components/Tooltip";

export const FileUploader = () => {
  const editor = useSlate();
  const fileInputRef = useRef(null);

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result; // Data URL for the file
        insertAttachment(editor, url, file.name, file.type); // Insert attachment into editor
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    // Trigger the file input click
    fileInputRef.current.click();
  };

  return (
    <div>
      <CustomTooltip tooltipText="Upload File">
      <button type="button" onClick={handleButtonClick}
       className="border-none transparent-bg fs-5"
      >
      <Icon icon="mdi:attachment-vertical" />
      </button>
      </CustomTooltip>
      <input
        type="file"
        style={{ display: "none" }} // Hide the file input
        ref={fileInputRef}
        onChange={uploadFile}
      />
    </div>
  );
};

const insertAttachment = (editor, url, filename) => {
  const attachment = {
    type: "attachment",
    url,
    filename,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, attachment);
};

export const AttachmentElement = ({ attributes, children, element }) => {
  const { fileType, filename, url } = element;

  return (
    <div {...attributes}>
      <a href={element.url} target="_blank" rel="noopener noreferrer">
        {element.filename}
      </a>
      {children}
    </div>
  );
};
