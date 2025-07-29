import { Icon } from "@iconify/react";
import TextDisplay from "../../components/TextComponents/TextDisplay";
import { useGetAnnouncementLabels } from "../../hooks/announcement/useGetAnnouncementLabels";
import { useGetAnnouncementTags } from "../../hooks/announcement/useGetAnnouncementTags";
import { useGetAnnouncementCategories } from "../../hooks/announcement/useGetAnnouncementCategories";
import { useGetTargetAudience } from "../../hooks/announcement/useGetTargetAudience";
import { useGetSchoolAdmins } from "../../hooks/schoolAdmin/useGetSchoolAdmins";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { MultiSelectDropdown } from "../../components/Dropdowns/AudienceDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setField, setTargetIds } from "../../Slices/Asynslices/AnnouncementSlice";
const steps = [
  { name: "Target Audience", component: CreateTargetAudience },
  { name: "Content", component: CreateContent },
  { name: "Schedule", component: CreateSchedule },
  { name: "Preview & Publish", component: AnnouncementPreview },
];
function CreateAnnouncement({ handleClose }) {
      const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const dispatch = useDispatch();
  const announcementState = useSelector(state => state.announcement);

  const CurrentStepComponent = steps[currentStepIndex].component;
  const currentStepName = steps[currentStepIndex].name;

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex]);

  const handlePreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const handleSubmitAnnouncement = useCallback(() => {
    console.log("Submitting Announcement:", announcementState);
    alert("Announcement Submitted! (Check console for data)");
    dispatch(resetAnnouncement());
    handleClose();
  }, [announcementState, dispatch, handleClose]);

  const stepVariants = {
    initial: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  return (
    <>
      <div className="w-100">
        <CreateTargetAudience handleClose={handleClose}/>
        <div className="form-navigation">
        {currentStepIndex > 0 && (
          <button
            className="font-size-sm border-none rounded-3 px-4 py-2 secondary-button"
            onClick={handlePreviousStep}
          >
            <Icon icon="ion:arrow-back" className="fs-6" /> Back
          </button>
        )}

        {currentStepIndex < steps.length - 1 ? (
          <button
            className="font-size-sm border-none rounded-3 px-4 py-2 primary-background text-white"
            onClick={handleNextStep}
          >
            Next
          </button>
        ) : (
          <button
            className="font-size-sm border-none rounded-3 px-4 py-2 primary-background text-white"
            onClick={handleSubmitAnnouncement}
          >
            Submit Announcement
          </button>
        )}
      </div>
        <div className="w-100 d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center w-100 justify-content-between mt-2">
            <div className="d-flex flex-column gap-2">
              <span className="font-size-sm fw-semibold">
                Step 2 of 4 Completed
              </span>
              <div className="d-flex flex-row align-items-center gap-2 font-size-sm pointer-cursor">
                <span><Icon icon="ion:arrow-back" className="fs-6"/></span>
                <span className="fw-semibold">Back</span>
              </div>
            </div>
            <button className="font-size-sm border-none rounded-3 px-4 py-2 primary-background text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateAnnouncement;

function CreateContent({ handleClose }) {
  const { data: tags, isFetching: isTagFetching } = useGetAnnouncementTags();
  const { data: labels, isFetching: isLabelFetching } =
    useGetAnnouncementLabels();
  const { data: category, isFetching: isCategoryFetching } =
    useGetAnnouncementCategories();
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="fw-semibold">Create Announcement Content</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div>
          <span>Announcement Tiltle</span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Announcement Title"
          />
        </div>
        <div>
          <span>Announcement Body</span>
          <textarea
            className="form-control"
            placeholder="Enter Announcement Body"
          ></textarea>
        </div>
        <div>
          <span>Announcement Category</span>
          <select className="form-control">
            <option selected>Select Category</option>
            {isCategoryFetching ? (
              <option>Category Loading..........</option>
            ) : (
              category.data.map((items) => <option>{items.name}</option>)
            )}
          </select>
        </div>
        <div>
          <span>Announcement Tag</span>
          <select className="form-control">
            <option selected>Select Tag</option>
            {isTagFetching ? (
              <option>Tag Loading..........</option>
            ) : (
              tags.data.map((items) => <option>{items.name}</option>)
            )}
          </select>
        </div>
        <div>
          <span>Announcement Label</span>
          <select className="form-control">
            <option selected>Select Labels</option>
            {isLabelFetching ? (
              <option>Labels Loading..........</option>
            ) : (
              labels.data.map((items) => <option>{items.name}</option>)
            )}
          </select>
        </div>
      </div>
    </>
  );
}

function CreateSchedule({ handleClose }) {
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="fw-semibold">Create Announcement Schedule</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="w-100 d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span>Publish Announcement Now</span>
              <span className="gainsboro-color fw-light font-size-sm">
                Announcement Will be published now
              </span>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="switchCheckDefault"
              />
            </div>
          </div>
          <span className="fw-semibold font-size-sm fw-">
            Or Schedule For Later
          </span>
          <div>
            <span>Select Publish Date</span>
            <div className="d-flex flex-row align-items-center gap-2 w-100">
              <input type="date" className="form-control w-50" />
              <input type="time" className="form-control w-50" />
            </div>
          </div>
          <div>
            <span>Select Expire Date</span>
            <div className="d-flex flex-row align-items-center w-100 gap-2">
              <input type="date" className="form-control w-50" />
              <input type="time" className="form-control w-50" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CreateTargetAudience({ handleClose }) {
  const dispatch = useDispatch();
  const {
    student_target_Ids,
    parent_target_Ids,
    school_admin_target_ids,
    teacher_target_ids,
  } = useSelector((state) => state.announcement);
  const { data: targetAudience, isFetching: isTargetAudienceFetching } =
    useGetTargetAudience();
  const { data: schoolAdmins, isFetching: isSchoolAdminFetching } =
    useGetSchoolAdmins();
  const { data: teachers, isFetching: isTeachersFetching } = useGetTeachers();
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="fw-semibold">Create Target Audience</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="my-2">
          {isTargetAudienceFetching ? (
            <SingleSpinner />
          ) : (
            <MultiSelectDropdown
              label="Select Student Audience"
              options={targetAudience.data.student_target}
              labelKey="title"
              valueKey="id"
              selectedValues={student_target_Ids}
              onSelectChange={(ids) => dispatch(setTargetIds({ targetType: 'student_target_Ids', ids }))}
              searchable={true}
              placeholder="Choose Student Audience"
            />
          )}
        </div>
        <div className="my-2">
          {isTargetAudienceFetching ? (
            <SingleSpinner />
          ) : (
            <MultiSelectDropdown
              label="Select Parent Audience"
              options={targetAudience.data.parent_target}
              labelKey="title"
              valueKey="id"
              selectedValues={parent_target_Ids}
              onSelectChange={(ids) => dispatch(setTargetIds({ targetType: 'parent_target_Ids', ids }))}
              placeholder="Select Parent"
              searchable
            />
          )}
        </div>
        <div className="my-2">
          {isSchoolAdminFetching ? (
            <SingleSpinner />
          ) : (
            <MultiSelectDropdown
              label="Select School Admin Audience"
              options={schoolAdmins.data}
              labelKey="name"
              valueKey="id"
              selectedValues={school_admin_target_ids}
              onSelectChange={(ids) => dispatch(setTargetIds({ targetType: 'school_admin_target_ids', ids }))}
              placeholder="Select School Admin Audience"
              searchable
            />
          )}
        </div>
        {isTeachersFetching ? (
          <SingleSpinner />
        ) : (
          <MultiSelectDropdown
            label="Select Teacher Audience"
            options={teachers.data}
            labelKey="name"
            valueKey="id"
            selectedValues={teacher_target_ids}
            onSelectChange={(ids) => dispatch(setTargetIds({ targetType: 'teacher_target_ids', ids }))}
            placeholder="Select Teacher Audience"
            searchable
          />
        )}

        <div className="my-3">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex flex-column w-75">
                <span className="font-size-sm fw-semibold">School Wide Announcement</span>
                <span className="fw-light gainsboro-color font-size-sm">By Selecting this the announcement will be published school wide</span>
              </div>
              <div>
               <input className="form-check-input" type="checkbox" value="" id="checkDefault" />
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

function AnnouncementPreview({ handleClose }){
     return(
        <>
        
        </>
     )
}
