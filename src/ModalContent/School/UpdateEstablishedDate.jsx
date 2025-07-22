import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateSchool } from "../../hooks/school/useUpdateSchool";
import { useState } from "react";
function UpdateEstablishedDate({ handleClose }) {
  const [formData, setFormData] = useState({
    established_year: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateEstablishedDate, isPending } = useUpdateSchool(
    handleClose,
    "Established Date"
  );
  const handleUpdateDate = () => {
    updateEstablishedDate({ updateData: formData });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update Established Date</h5>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
            nesciunt sunt
          </span>
        </div>
        <div className="my-1">
          <span>Established Date</span>
          <input
            type="date"
            name="established_year"
            className="form-control"
            onChange={(e) =>
              handleInputChange("established_year", e.target.value)
            }
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdateDate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update Established Date"}
        </button>
      </div>
    </>
  );
}
export default UpdateEstablishedDate;
