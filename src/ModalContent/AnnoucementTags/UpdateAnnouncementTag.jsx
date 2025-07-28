import { Icon } from "@iconify/react";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateAnnouncementTag } from "../../hooks/announcement/useUpdateAnnouncementTag";
function UpdateAnnouncementTag({ handleClose, rowData }) {
  const { id:tagId } = rowData
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateTag, isPending } = useUpdateAnnouncementTag();
  const handleSubmit = async () => {
    updateTag({ tagId, updateData:formData });
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Update Announcement Tag</h5>
              <span
                className="m-0"
                onClick={() => {
                  handleClose();
                }}
              >
                <Icon icon="charm:cross" width="22" height="22" />
              </span>
            </div>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              harum nesciunt sunt
            </span>
          </div>
        </div>
        <div className="my-1">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter Announcement Tag Name"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="mt-2">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={() => {
              handleSubmit();
            }}
          >
            {isPending ? <SingleSpinner /> : "Update Tag"}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateAnnouncementTag;
