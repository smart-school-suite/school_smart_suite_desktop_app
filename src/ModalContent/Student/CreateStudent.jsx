import { useState } from "react";
import { useFetchSpecialtiesQuery } from "../../Slices/Asynslices/fetchSlice";
import { useFetchDepartmentsQuery } from "../../Slices/Asynslices/fetchSlice";
import { useFetchEducationLevelsQuery } from "../../Slices/Asynslices/fetchSlice";
import { useFetchStudentBatchQuery } from "../../Slices/Asynslices/fetchSlice";
import { useFetchParentsQuery } from "../../Slices/Asynslices/fetchSlice";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useAddStudentMutation } from "../../Slices/Asynslices/postSlice";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
function CreateStudent({ handleClose }) {
const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    specialty_id: "",
    department_id: "",
    student_batch_id: "",
    guadian_id:"",
    email: "",
  });
  const [addStudent] = useAddStudentMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSelect = (field) => (selectedValues) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [field]: selectedValues.id,
    }));
  };
  const { data: specialties, isLoading: isSpecialtiesLoading } =
    useFetchSpecialtiesQuery();
  const { data: departments, isLoading: isDepartmentLoading } =
    useFetchDepartmentsQuery();
  const { data: level, isLoading: isLevelLoading } =
    useFetchEducationLevelsQuery();
  const { data: studentBatch, isLoading: isStudentBatchLoading } =
    useFetchStudentBatchQuery();
  const { data: parents, isLoading: isParentsLoading } = useFetchParentsQuery();
  const handleCreateStudent = async () => { 
      setIsCreating(true);
       try{
           await addStudent(formData).unwrap();
           setIsCreating(false);
           handleClose();
           toast.custom(<ToastSuccess 
             title={"Process Successfull"}
             description={"Student Created Successfully"}
           />)
       }
       catch(e){
            setIsCreating(false);
            toast.custom(<ToastDanger 
              title={"Failed to create student"}
              description={"The process failed due to an error please try again"}
            />)
       }
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <h5 className="m-0">Create Student</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="block">
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
            nesciunt sunt
          </span>
        </div>
      </div>
      <div className="my-1">
        <div className="d-flex flex-row align-items-center gap-2 w-100">
          <div className="w-50">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Jhone"
              name="first_name"
              value={formData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
            />
          </div>
          <div className="w-50">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Doe"
                name="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="my-1">
        <label htmlFor="firstName">Full Names</label>
        <input 
          type="text"
          className="form-control"
          placeholder="Jhone Doe"
          name="name"
          value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}   
       />
      </div>
      <div className="my-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="example@gmail.com"
          name="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </div>
      <div className="my-1">
        <span>Student Batch</span>
        {isStudentBatchLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={studentBatch.data}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isStudentBatchLoading}
            direction="up"
            onSelect={handleSelect("student_batch_id")}
          />
        )}
      </div>
      <div className="my-1">
        <span>Level</span>
        {isLevelLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={level.data}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isLevelLoading}
            direction="up"
            onSelect={handleSelect("level_id")}
          />
        )}
      </div>
      <div className="my-1">
        <span>Department</span>
        {isDepartmentLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={departments.data}
            displayKey={["department_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "department_name"]}
            renameMapping={{ id: "id", department_name: "department_name" }}
            isLoading={isDepartmentLoading}
            direction="up"
            onSelect={handleSelect("department_id")}
          />
        )}
      </div>
      <div className="my-1">
        <span>Specialty</span>
        {isSpecialtiesLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={specialties.data}
            displayKey={["specialty_name", "level_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "specialty_name", "level_name"]}
            renameMapping={{ id: "id", specialty_name: "specialty_name" }}
            isLoading={isSpecialtiesLoading}
            direction="up"
            onSelect={handleSelect("specialty_id")}
          />
        )}
      </div>
      <div className="my-1">
        <span>Guardian</span>
        {isParentsLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={parents.data}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isParentsLoading}
            direction="up"
            onSelect={handleSelect("guadian_id")}
          />
        )}
      </div>
      <div className="my-1">
        <label htmlFor="FeePaymentFormat">Fee Payment Format</label>
        <select 
          name="payment_format" 
          className="form-select"
          onChange={(e) => handleInputChange("payment_format", e.target.value)}
          >
            <option selected>Select Fee Payment Format</option>
            <option value="installmental">installmental</option>
            <option value="one time">installmental</option>
        </select>
      </div>
      <div className="mt-3">
        <button 
          onClick={() => {
             handleCreateStudent();
          }}
          className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2">
            {
                isCreating ? <SingleSpinner /> : "Update Student"
            }
        </button>
      </div>
    </>
  );
}
export default CreateStudent;
