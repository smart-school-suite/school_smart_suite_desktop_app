import Emailsidebar from "../../components/Emailsidebar";
import { Icon } from "@iconify/react";
import CustomTooltip from "../../components/Tooltip";
import { Slate, Editable, withReact } from "slate-react";
import { useState, useCallback } from "react";
import  ImageUploader from "./Editor/Imageupload";
import { BlockButton } from "./Editor/Elementformatting";
import { Leaf } from "./Editor/Leafformatting";
import { Element } from "./Editor/Elementformatting";
import { createEditor } from "slate";
import { MarkButton } from "./Editor/Leafformatting";
import { FileUploader } from "./Editor/Fileupload";
function Composeemail() {
  const [editor] = useState(() => withReact(createEditor()));
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  return (
    <>
      <div>
        <div className="row">
          <Emailsidebar />
          <div className="col-lg-9">
            <div className="card pt-3 pb-3 px-2 border-none height-100 d-flex flex-column">
              <div className="d-flex flex-row justify-content-between">
                <h5 className="color-primary fw-semibold">Send Email</h5>
                <div className="d-flex flex-row align-items-center gap-3">
                  <CustomTooltip
                    tooltipText="Select Email Template"
                    placement="bottom"
                  >
                    <button className="border-none font-size-sm primary-background-50 color-primary rounded-2 d-flex gap-2 align-items-center p-2">
                      <span>Select Email Template</span>
                      <span>
                        <Icon icon="mi:chevron-down" />
                      </span>
                    </button>
                  </CustomTooltip>
                  <CustomTooltip tooltipText="Discard email" placement="bottom">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <span className="my-0">
                        <Icon
                          icon="tabler:trash"
                          className="fs-6 gainsboro-color"
                        />
                      </span>
                    </div>
                  </CustomTooltip>
                </div>
              </div>
              <div className=" fs-6 gainsboro-color d-flex flex-row gap-2 align-items-center mt-3">
                <span>To</span>
                <input
                  type="email"
                  className="border-none p-2 width-90 compose-email-input"
                  placeholder="Enter Reciepient Email"
                />
                <span>Cc Bcc</span>
              </div>
              <hr className="my-0" />
              <div className="gainsboro-color fs-6 d-flex flex-row gap-2 align-items-center mt-2">
                <span>Subject</span>
                <input
                  type="text"
                  className="border-none p-2 w-100 compose-email-input"
                  placeholder="Enter Email Subject"
                />
              </div>
              <hr className="my-0" />
              <div className="mt-2">
               
              </div>
              <div className="mt-auto">
                <div className="d-block">
                <Slate editor={editor} initialValue={initialValue}>
                  <Editable
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                    spellCheck
                    style={{  maxHeight:"70dvh", border:"none", overflowY:"scroll", height:"auto", outline:"none", caret:"#007BFF" }}
                  />
                  <Toolbar />
                </Slate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Composeemail;

// Toolbar containing the Bold button
const Toolbar = () => {
  return (
    <div className="d-flex flex-row justify-content-between mt-3">
      <div className="d-flex flex-row align-items-center">
      <ImageUploader></ImageUploader>
      <FileUploader></FileUploader>
      <MarkButton format="bold" icon="gravity-ui:bold" tooltipText="Bold Text"/>
      <MarkButton format="italic" icon="tabler:italic" tooltipText="Italic Text"></MarkButton>
      <MarkButton format="underline" icon="tabler:underline" tooltipText="Underline Text"></MarkButton>
      <MarkButton format="capitalize" icon="radix-icons:letter-case-capitalize" tooltipText="capitalize text"></MarkButton>
      <BlockButton format="heading-one" icon="icon-park-outline:h1"  tooltipText="heading One"/>
      <BlockButton format="heading-two" icon="icon-park-outline:h2" tooltipText="heading Two" />
      <BlockButton format="block-quote" icon="icon-park-outline:quote" tooltipText="Quotation"/>
      <BlockButton format="numbered-list" icon="f7:list-number" tooltipText="Numbered List"/>
      <BlockButton format="bulleted-list" icon="fe:list-bullet" tooltipText="Bullet List"/>
      <BlockButton format="left" icon="iconoir:align-left" tooltipText="Align left"/>
      <BlockButton format="center" icon="icons8:align-center" tooltipText="Align Center"/>
      <BlockButton format="right" icon="iconoir:align-right" tooltipText="Align Right"/>
      </div>
      <div>
      <button className="border-none d-flex gap-2 primary-background rounded-3 align-items-center px-3 font-size-sm py-2">
        <span>Send Email</span>
        <span><Icon icon="tabler:send"  className="fs-5"/></span>
      </button>
      </div>
    </div>
  );
};
