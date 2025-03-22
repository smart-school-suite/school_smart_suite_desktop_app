import { useCreateElectionMutation } from "../../Slices/Asynslices/postSlice";
import { SingleSpinner } from "../../components/Spinners";
import { useState } from "react";
import toast from "react-hot-toast";
function CreateElections(){
    const [formData, setFormData] = useState({ 
        title:"",
        election_start_date:"",
        election_end_date:"",
        starting_time:"",
        ending_time:"",
        description:"",
        school_year_start:"",
        school_year_end:""
     }); 
     const [isLoading, setIsLoading] = useState(false);
     
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      };
      const [createElections] = useCreateElectionMutation();
      const handleSubmit = async () => {
        setIsLoading(true);
        try {
          await createElections(formData).unwrap();
          setIsLoading(false);
          toast.success("Election Created Successfully");
          handleClose();
        } catch (error) {
          setIsLoading(false);
          toast.error("Opps Failed to Create Election");
        }
      };
    return(
        <>
        <div>
            <h5>Create Election</h5>
            <span className="font-size-sm">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus odit debitis facere ratione
            </span>
            <div className="my-2">
                <label htmlFor="electiontitle">Election Title</label>
                <input 
                 type="text" 
                 className="form-control"
                 placeholder="Enter Electioin Title"
                 name="title"
                 value={formData.title}
                 onChange={(e) => handleInputChange("title", e.target.value)}
                 />
            </div>
            <div className="my-2">
                <label htmlFor="electionStartDate">Election Start Date</label>
                <input 
                type="date" 
                className="form-control" 
                name="election_start_date"
                value={formData.election_start_date}
                onChange={(e) => handleInputChange("election_start_date", e.target.value)}
                />
            </div>
            <div className="my-2">
                <label htmlFor="electionEndDate">Election End Date</label>
                <input 
                type="date" 
                className="form-control w-100"
                name="election_end_date"
                value={formData.election_end_date}
                onChange={(e) => handleInputChange("election_end_date", e.target.value)}
                />
            </div>
            <div className="d-flex flex-row w-100 gap-2">
            <div className="my-2 w-50">
                <label htmlFor="electionStartingTime">Election End Time</label>
                <input 
                type="time" 
                className="form-control"
                name="starting_time"
                value={formData.starting_time}
                onChange={(e) => handleInputChange("starting_time", e.target.value)}
                />
            </div>
            <div className="my-2 w-50">
                <label htmlFor="electionStartingTime">Election Start Time</label>
                <input 
                type="time" 
                className="form-control w-100" 
                 name="ending_time"
                 value={formData.ending_time}
                 onChange={(e) => handleInputChange("ending_time", e.target.value)}
                />
            </div>
            </div>
            <div className="d-flex flex-row w-100 gap-2">
            <div className="my-2 w-50">
                <label htmlFor="schoolYearStart">School Year Start</label>
                <input 
                type="date" 
                className="form-control w-100"
                 placeholder="2020"
                 value={formData.school_year_start}
                 name="school_year_start"
                 onChange={(e) => handleInputChange("school_year_start", e.target.value)}
                  />
            </div>
            <div className="my-2 w-50">
                <label htmlFor="schoolYearEnd">School Year End</label>
                <input 
                type="date"
                 className="form-control w-100" 
                 placeholder="2020"
                 name="school_year_end"
                 onChange={(e) => handleInputChange("school_year_end", e.target.value)}
                 />
            </div>
            </div>
            <div className="my-2">
                <label htmlFor="description">Election Description</label>
                <textarea 
                 className="form-control"
                 placeholder="Enter Election Description"
                 name="description"
                 onChange={(e) => handleInputChange("description", e.target.value)}
                ></textarea>
            </div>
            <div className="mt-2">
                <button
                  
                  className="border-none rounded-3 p-2 w-100 primary-background text-white"
                  onClick={() => {
                     handleSubmit();
                  }}
                >
                    {
                        isLoading ? <SingleSpinner /> : <>Create Election</>
                    }
                </button>
            </div>
        </div>
        </>
    )
}
export default CreateElections;