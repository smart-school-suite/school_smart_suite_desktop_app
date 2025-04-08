import { useEffect, useState } from "react";
import Pageloaderspinner from "../../components/Spinners";
import { useFetchSpecialtiesQuery } from "../../Slices/Asynslices/fetchSlice";
import { useAssignGraduationDatesByBatchMutation } from "../../Slices/Asynslices/postSlice";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

function AssignGraduationDates({ handleClose, row_id: studentBatchId }) {
  const { data: specialties, isLoading: isSpecialtyLoading } =
    useFetchSpecialtiesQuery();
  const [formData, setFormData] = useState([]);
  const [assignGraduationDatesByBatch] =
    useAssignGraduationDatesByBatchMutation();
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    if (specialties?.data) {
      const gradeDatesData = specialties.data.map((item) => ({
        level_id: item.level_id,
        specialty_id: item.id,
        student_batch_id: studentBatchId,
        graduation_date: "",
      }));
      setFormData(gradeDatesData);
    }
  }, [specialties, studentBatchId]);

  const handleDateChange = (index, date) => {
    const updatedData = [...formData];
    updatedData[index].graduation_date = date;
    setFormData(updatedData);
  };

  const handleAssignGraduationDates = async () => {
    const formattedData = formData.filter(
      (item) => item.graduation_date !== "" && item.graduation_date != null
    );
    const graduationDates = {
      graduation_dates: formattedData,
    };
    setIsAssigning(true);
    try {
      await assignGraduationDatesByBatch(graduationDates).unwrap();
      setIsAssigning(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Dates Set Successfully"}
          description={"Graduation dates set successfully"}
        />
      );
    } catch (e) {
      setIsAssigning(false);
      toast.custom(
        <ToastDanger
          title={"Failed to set dates"}
          description={"Failed to set Graduation Dates Due to an error"}
        />
      );
    }
  };

  if (isSpecialtyLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Assign Graduation Dates By Student Batch</h5>
          <span className="m-0" onClick={handleClose}>
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modalContainer">
          <div className="block">
            {specialties.data.map((item, index) => (
              <div
                className="d-flex flex-row align-items-center justify-content-between border-bottom py-2"
                key={index}
              >
                <div>
                  <p className="m-0 fw-semibold">{item.specialty_name}</p>
                  <p className="m-0 fw-medium font-size-sm">
                    {item.level_name}, {item.level}
                  </p>
                </div>
                <div>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => handleDateChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="border-none primary-background text-white px-3 font-size-sm py-2 rounded-3 w-100 mt-2"
          onClick={handleAssignGraduationDates}
          disabled={isAssigning}
        >
          {isAssigning ? "Assigning..." : "Assign Graduation Dates"}
        </button>
      </div>
    </>
  );
}

export default AssignGraduationDates;
