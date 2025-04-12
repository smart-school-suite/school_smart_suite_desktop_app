import { formatDuration } from "../../utils/functions";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddEventMutation } from "../../Slices/Asynslices/postSlice";
import { SingleSpinner } from "../../components/Spinners";
import { schoolEventCategories } from "../../data/data";
import { Icon } from "@iconify/react";
function CreateEvent({ handleClose }) {
    const [formData, setFormData] = useState({
      title: "",
      start_date: "",
      end_date: "",
      location: "",
      description: "",
      organizer: "",
      category: "",
      duration: "",
      hours: "",
      minutes: "",
      recipients:""
    });
    const [addEvent] = useAddEventMutation();
    const [isCreating, setIsCreating] = useState(false);
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
      setIsCreating(true);
      try {
        const formattedDuration = formatDuration(
          Number(formData.hours),
          Number(formData.minutes)
        );
  
        const eventData = {
          ...formData,
          duration: formattedDuration,
        };
      
        await addEvent(eventData).unwrap();
        setIsCreating(false);
        toast.success("Event Created successfully!");
        handleClose();
      } catch (error) {
        setIsCreating(false);
        toast.error("Failed to create Event. Try again.");
      }
    };
    return (
      <div>
          <div className="d-flex flex-row align-items-center">
                <div className="block">
                  <div className="d-flex flex-row align-items-center justify-content-between mb-3">
                    <h5 className="m-0">Create Event</h5>
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
              </div>
        <div className="my-1">
          <span>Event Title</span>
          <input
            type="text"
            className="form-control"
            placeholder="Christmass Party"
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div className="d-flex flex-row gap-2">
          <div className="my-1">
            <span>Start date</span>
            <input
              type="date"
              className="form-control"
              name="start_date"
              value={formData.start_date}
              onChange={(e) => handleInputChange("start_date", e.target.value)}
            />
          </div>
          <div className="my-1">
            <span>End Date</span>
            <input
              type="date"
              className="form-control"
              name="end_date"
              value={formData.end_date}
              onChange={(e) => handleInputChange("end_date", e.target.value)}
            />
          </div>
        </div>
        <div className="my-1">
          <span>Location</span>
          <input
            type="location"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>
  
        <div className="my-1">
          <span>Organizer Name</span>
          <input
            type="text"
            className="form-control"
            placeholder="Organizer's name"
            value={formData.organizer}
            onChange={(e) => handleInputChange("organizer", e.target.value)}
          />
        </div>
        <div className="my-1">
          <span>Category</span>
          <select
            name="category"
            className="form-select"
            onChange={(e) => handleInputChange("category", e.target.value)}
            value={formData.category}
          >
            {schoolEventCategories.map((items) => {
              return (
                <option value={items.name} key={items.id}>
                  {items.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="my-1">
          <span>Duration</span>
          <div className="d-flex flex-row gap-2">
            <input
              type="number"
              className="form-control"
              placeholder="hours"
              value={formData.hours}
              onChange={(e) => handleInputChange("hours", e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="minutes"
              value={formData.minutes}
              onChange={(e) => handleInputChange("minutes", e.target.value)}
            />
          </div>
        </div>
        <div className="my-1">
            <label htmlFor="recipients">Recipients</label>
            <select 
             name="recipients"
             onChange={(e) => handleInputChange("recipients", e.target.value)}
             value={formData.recipients}
             className="form-select"
             >
              <option selected>Select Recipients</option>
              <option value="schooladmins">School Admins</option>
              <option value="teachers">Teachers</option>
              <option value="students">Students</option>
             </select>
        </div>
        <div className="my-1">
          <span>Description</span>
          <textarea
            name=""
            id=""
            className="form-control"
            placeholder="Describe this interesting event"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          ></textarea>
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                handleSubmit();
              }}
            >
              {
                 isCreating ? <SingleSpinner /> :  "Create Event" 
              }
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default CreateEvent;