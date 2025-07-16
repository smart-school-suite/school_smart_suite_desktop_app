import { Icon } from "@iconify/react";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateParent } from "../../hooks/parent/useCreateParent";
function CreateParent({ handleClose }) {
  const { mutate:createParent, isPending } = useCreateParent(handleClose);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_one: "",
    address: "",
    occupation: "",
    relationship_to_student: "",
    preferred_language: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const guardianTypes = [
    "Mother",
    "Father",
    "Stepmother",
    "Stepfather",
    "Grandmother",
    "Grandfather",
    "Aunt",
    "Uncle",
    "Older Brother",
    "Older Sister",
    "Guardian (non-family)",
    "Foster Parent",
    "Adoptive Parent",
    "Older Cousin",
    "Legal Guardian",
    "Sibling (younger brother or sister)",
    "Family Friend",
    "Caretaker",
    "Single Parent",
    "Godparent",
  ];
  const handleCreateGuardian = async () => {
    createParent(formData)
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <h5 className="m-0">Create Guardian</h5>
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
        <div className="my-1">
          <label htmlFor="guardianName">Guardian Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@mail.com"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            placeholder="+237 6XX XXX XXX"
            name="phone_one"
            value={formData.phone_one}
            onChange={(e) => handleInputChange("phone_one", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="address">Address</label>
          <input
            type="address"
            className="form-control"
            placeholder="Biyem assi yaounde"
            name="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            className="form-control"
            name="occupation"
            placeholder="Teacher, Engineer, etc."
            value={formData.occupation}
            onChange={(e) => handleInputChange("occupation", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="relationshipToStudent">RelationShip To Student</label>
          <select
            name="relationship_to_student"
            className="form-select"
            value={formData.relationship_to_student}
            onChange={(e) =>
              handleInputChange("relationship_to_student", e.target.value)
            }
          >
            <option selected>Open to select relationship</option>
            {guardianTypes.map((items) => (
              <option value={items}>{items}</option>
            ))}
          </select>
        </div>
        <div className="my-1">
          <label htmlFor="preferredLanguage">
            Preferred Language of Communication
          </label>
          <select
            name="preferred_language"
            className="form-select"
            value={formData.preferred_language}
            onChange={(e) =>
              handleInputChange("preferred_language", e.target.value)
            }
          >
            <option selected>Open to select Language</option>
            <option value="english">English</option>
            <option value="french">French</option>
          </select>
        </div>
        <div className="mt-3">
          <button
            className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2"
            onClick={handleCreateGuardian}
          >
            {isPending ? <SingleSpinner /> : "Create Guardian"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateParent;
