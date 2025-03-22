import { useFetchSpecialtiesQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners";
import { Icon } from "@iconify/react";
import { useAddTeacherSpecialtyPreferenceMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
function AddSpecialtyPreference({ handleClose, row_id: teacherId }) {
  const { data: specialty, isLoading, error } = useFetchSpecialtiesQuery();
  const [addTeacherSpecialtyPreference, { isLoading: isAdding }] = useAddTeacherSpecialtyPreferenceMutation();
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const selectAllRef = useRef(null); // Ref for the select all checkbox

  const handlePermissionChange = (specialtId) => {
    setSelectedSpecialties((prevSelected) => {
      if (prevSelected.includes(specialtId)) {
        return prevSelected.filter((item) => item !== specialtId);
      } else {
        return [...prevSelected, specialtId];
      }
    });
  };
  
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allSpecialties = specialty.data.map((item) => item.id);
      setSelectedSpecialties(allSpecialties);
    } else {
      setSelectedSpecialties([]);
    }
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = false;
    }
  };

  const handleAddSpecialtyPreference = async () => {
    if(selectedSpecialties.length <= 0){
        toast.error("Please select at least one specialty to assign.");
        return
    }
    const specialtyPreferences = selectedSpecialties.map(id => ({ specialty_id: id }));
    try{
        await addTeacherSpecialtyPreference({
            specialtyPreference: specialtyPreferences,
            teacherId: teacherId,
          }).unwrap();
          handleClose();
          toast.success("Teacher Specialty preference Added Successfully");
    }
    catch(e){
        toast.error("Failed to add teacher specialty preference try again");
    }
  };

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        selectedSpecialties.length > 0 && selectedSpecialties.length < (specialty?.data?.length || 0);
    }
  }, [selectedSpecialties, specialty]);

  if (isLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <div>
      <div className="d-flex flex-row align-items-center">
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Add Specialty Preference</h5>
            <span onClick={handleClose}>
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum nesciunt sunt.
          </span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end">
        <div className="d-flex gap-2 me-3 mb-2">
          <span>Select All</span>
          <input
            type="checkbox"
            className="form-check-input"
            onChange={handleSelectAll}
            ref={selectAllRef}
            checked={selectedSpecialties.length === (specialty?.data?.length || 0)}
          />
        </div>
      </div>
      <div style={{ maxHeight: "65vh", height: "auto", overflowY: "scroll", scrollBehavior: "smooth" }}>
        {specialty?.data?.map((item) => {
          const isChecked = selectedSpecialties.includes(item.id);
          return (
            <div key={item.id} className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 mb-2">
              <div className="block">
                <p className="m-0 fw-medium">{item.specialty_name}</p>
                <span className="fw-light">{item.level_name}, {item.level}</span>
              </div>
              <input
                type="checkbox"
                className="form-check-input"
                checked={isChecked}
                onChange={() => handlePermissionChange(item.id)}
              />
            </div>
          );
        })}
      </div>
      <div className="d-flex flex-row align-items-center mt-3">
        <button
          className="border-none font-size-sm w-100 p-2 primary-background rounded-3 text-white"
          onClick={handleAddSpecialtyPreference}
        >
          {
             isAdding ? <SingleSpinner /> : <>Add Specialty Preference</>
          }
        </button>
      </div>
    </div>
  );
}

export default AddSpecialtyPreference;