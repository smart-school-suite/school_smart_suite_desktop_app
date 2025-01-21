import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  AddressInput,
  FullNamesInput,
  PhoneNumberInput,
} from "../../components/formComponents";
import { useAddParentMutation } from "../../Slices/Asynslices/postSlice";
import { useState } from "react";
import toast from "react-hot-toast";
function Createparent() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone_one: "",
    relationship_to_student: "",
    language_preference: "",
  });
  const [addParent] = useAddParentMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };
  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await addParent(formData).unwrap();
      toast.success("Parent  created successfully!");
      navigate("/parents")
    } catch (error) {
      toast.error("Failed to create Parent. Try again.");
    }
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-between w-100  align-items-center mt-4">
        <div className="d-flex flex-row align-items-center gap-2">
          <div className="badge-input d-flex flex-row align-items-center justify-content-center">
            <Icon
              icon="clarity:administrator-line"
              className="fs-3 color-primary"
            />
          </div>
          <div>
            <p className="my-0 fs-6 fw-semibold">Add New Parent</p>
            <p className="gainsboro-color font-size-sm my-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              labore
            </p>
          </div>
        </div>
        <div>
          <button
            className="border-none rounded-2 font-size-sm p-2 px-4 d-flex flex-row gap-4 primary-background text-white"
            onClick={() => {
              navigate("/parents");
            }}
          >
            <span>Back</span>
          </button>
        </div>
      </div>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center height-90 pt-1 pb-2">
        <div className="card w-100 rounded-4 py-2 px-3">
          <div className="my-1">
            <FullNamesInput 
              value={formData.name}
              onValidationChange={handleValidation}
              onChange={(value) => handleInputChange("name", value)}
            />
          </div>
          <div className="my-1 ">
            <EmailInput 
              value={formData.email}
              onValidationChange={handleValidation}
              onChange={(value) => handleInputChange("email", value)}
            />
          </div>
          <div className="my-1">
            <AddressInput 
              value={formData.address}
              onValidationChange={handleValidation}
              onChange={(value) => handleInputChange("address", value)}
            />
          </div>
          <div className="my-1">
            <span>Password</span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Strong Password"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>
          <div className="my-1">
            <span>Preferred Language</span>
            <input
              type="text"
              className="form-control"
              placeholder="English French Spannish"
              name="language_preference"
              value={formData.language_preference}
              onChange={(e) => handleInputChange("language_preference", e.target.value)}
            />
          </div>
          <div className="my-1">
            <span>Relationship to student</span>
            <input
              type="text"
              className="form-control"
              value={formData.relationship_to_student}
              name="relationship_to_student"
              onChange={(e) => handleInputChange("relationship_to_student", e.target.value)}
              placeholder="Mother father"
            />
          </div>
          <div className="w-100 d-flex flex-row align-items-center gap-2">
            <div className="my-1 w-100">
              <PhoneNumberInput 
                value={formData.phone_one}
                onValidationChange={handleValidation}
                onChange={(value) => handleInputChange("phone_one", value)}
              />
            </div>
          </div>
          <div className="my-2">
            <button 
              className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background"
               onClick={() => {
                 handleSubmit();
               }}
               disabled={!isValid}
              >
              Create Parent
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Createparent;
