import { Transforms } from "slate";
import { useSlate } from "slate-react";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import CustomTooltip from "../../../components/Tooltip";
const ImageUploader = () => {
  const editor = useSlate();
  const fileInputRef = useRef(null);

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result;
        insertImage(editor, url); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <CustomTooltip tooltipText="Upload Picture">
      <button type="button" onClick={handleButtonClick} 
      className="border-none transparent-bg fs-5">
        <Icon icon="mynaui:image" />
      </button>
      </CustomTooltip>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={uploadImage}
      />
    </div>
  );
};
export default ImageUploader;

const insertImage = (editor, url) => {
  const image = {
    type: "image",
    url,
    alt: "", 
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, image);
};

export const ImageElement = ({ attributes, children, element }) => {
  return (
    <div {...attributes}>
      <img
        src={element.url}
        alt={element.alt || ""}
        style={{ maxWidth: "100%" }}
      />
      {children}
    </div>
  );
};
