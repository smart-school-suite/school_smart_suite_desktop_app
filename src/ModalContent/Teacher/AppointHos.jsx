import { useFetchSpecialtiesQuery } from "../../Slices/Asynslices/fetchSlice";
import { useAssignHosMutation } from "../../Slices/Asynslices/postSlice";
import Pageloaderspinner from "../../components/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
function AppointHos({ handleClose, row_id: teacherId }) {
  const { data: specialty, isLoading, error } = useFetchSpecialtiesQuery();
  const [formData, setFormData] = useState({
    specialty_id: "",
    hosable_id: teacherId,
  });
  const [assignHos] = useAssignHosMutation();
  const handleAppointHos = async () => {
    try {
      await assignHos(formData).unwrap();
      toast.success("HOS Assigned Successfully");
      handleClose();
    } catch (e) {
      toast.error("Something went wrong trying to appoint HOS");
    }
  };

  const handleSpecialtySelect = (specialtyId) => {
    setFormData({
      ...formData,
      specialty_id: specialtyId,
    });
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Appoint Head of Specialty (HOS)</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <span className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
          sint reprehenderit tempora. Aliquid
        </span>
        <div
          style={{
            maxHeight: "55dvh",
            height: "auto",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            paddingTop: "0.75rem",
          }}
        >
          {specialty.data.map((item) => {
            return (
              <div
                key={item.id}
                className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2"
              >
                <div className="block">
                  <p className="m-0 fw-semibold">{item.specialty_name}</p>
                  <p className="m-0 fw-light">{item.level_name}, {item.level}</p>
                  <div className="d-block">
                  {
                     item.hos_name ? <span
                     className=" rounded-1 font-size-sm "
                     style={{
                       background: "#e3f5e3",
                       color: "#2d6830",
                       width: "auto",
                       maxWidth: "10rem",
                       padding: "0.2rem",
                     }}
                   >
                     <span>Specialty Assigned</span>
                   </span> : <span
                     className=" rounded-1 font-size-sm "
                     style={{
                       background: "#fffec1",
                       color: "#a66a02",
                       width: "auto",
                       maxWidth: "12rem",
                       padding: "0.2rem",
                     }}
                   >
                     <span>Specialty UnAssigned</span>
                   </span> 
                   }
                    {
                      item.hod_name ? <p className="m-0 fw-light">Specialty Assigned to: <span className="fw-semibold">{item.hod_name}</span> </p> : null
                    }
                  </div>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="specialty"
                    id={`specialty-${item.id}`}
                    value={item.id}
                    checked={formData.specialty_id === item.id}
                    onChange={() => handleSpecialtySelect(item.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <button
            className="border-none rounded-3 p-2 font-size-sm w-100 primary-background text-white"
            onClick={handleAppointHos}
            disabled={!formData.specialty_id}
          >
            Appoint HOS
          </button>
        </div>
      </div>
    </>
  );
}
export default AppointHos;
