import { useState } from "react";
import { useFetchElectionsQuery } from "../../Slices/Asynslices/fetchSlice";
import toast from "react-hot-toast";
import { useCreateElectionRoleMutation } from "../../Slices/Asynslices/postSlice";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateElectionRole({ handleClose }) {
  const { data: electionRoles, isLoading, error } = useFetchElectionsQuery();
  const [formData, setFormData] = useState({
    title: "",
    election_id: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [createElectionRole] = useCreateElectionRoleMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    setIsCreating(true);
    try {
      await createElectionRole(formData).unwrap();
      setIsCreating(false);
      toast.success("Election Created Successfully");
      handleClose();
    } catch (error) {
      setIsCreating(false);
      toast.error("Opps Failed to Create Election");
    }
  };
  return (
    <>
      <div>
        <h5>Create Election Role</h5>
        <span className="font-size-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          expedita numquam dicta.
        </span>
        <div className="my-2">
          <label htmlFor="roleTitle">Role Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Role Tile"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="election">Selection ELection</label>
          <select
            className="form-select"
            name="election_id"
            onChange={(e) => handleInputChange("election_id", e.target.value)}
            value={formData.election_id}
          >
            {isLoading ? (
              <option value="">Loading</option>
            ) : (
              electionRoles.data.map((items) => {
                return <option value={items.id}>{items.title}</option>;
              })
            )}
          </select>
        </div>
        <div className="my-2">
          <label htmlFor="description">Role Description</label>
          <textarea
            className="form-control"
            placeholder="Enter Role Description"
            name="description"
            onChange={(e) => handleInputChange("description", e.target.value)}
            value={formData.description}
          ></textarea>
        </div>
        <div className="my-2 w-100">
          <button
            className="border-none rounded-3 p-2 font-size-sm primary-background w-100 text-white"
            onClick={() => {
              handleSubmit();
            }}
          >
            {isCreating ? <SingleSpinner /> : <>Create Role</>}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateElectionRole;
