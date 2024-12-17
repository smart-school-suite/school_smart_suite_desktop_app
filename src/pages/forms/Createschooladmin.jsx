import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { AddressInput, CityInput, CulturalBackgroundInput, EmailInput, FieldOfStudyInput, FullNamesInput, PhoneNumberInput, ReligionInput, SalaryInput, YearsExperienceInput } from "../../components/formComponents";
import { CustomDropdownTwo } from "../../components/Dropdowns";
import DatePicker from "../../components/datePicker";
function Createschooladmin() {
    const navigate = useNavigate();
    const qualifications = [
      { code: "BACHELORS", name: "Bachelor's Degree" },
      { code: "MASTERS", name: "Master's Degree" },
      { code: "PHD", name: "Doctoral Degree (PhD)" },
      { code: "ASSOCIATE", name: "Associate Degree" },
      { code: "DIPLOMA", name: "Diploma" },
      { code: "CERTIFICATE", name: "Certificate" },
      { code: "HIGH_SCHOOL", name: "High School Diploma" },
      { code: "GCSE", name: "General Certificate of Secondary Education (GCSE)" },
      { code: "A_LEVEL", name: "Advanced Level (A-Level)" },
      { code: "HND", name: "Higher National Diploma (HND)" },
      { code: "APR", name:"Apprentiship" }
    ]
    const jobTypes = [
      { code: "FULL_TIME", name: "Full-time" },
      { code: "PART_TIME", name: "Part-time" },
      { code: "CONTRACT", name: "Contract" },
      { code: "TEMPORARY", name: "Temporary" },
      { code: "FREELANCE", name: "Freelance" },
      { code: "INTERN", name: "Internship" },
      { code: "REMOTE", name: "Remote" },
      { code: "ON_SITE", name: "On-site" },
      { code: "SHIFT", name: "Shift Work" },
      { code: "FLEXIBLE", name: "Flexible" },
      { code: "PER_DIEM", name: "Per Diem" },
      { code: "COMMISSION", name: "Commission-based" },
      { code: "SEASONAL", name: "Seasonal" },
      { code: "VOLUNTEER", name: "Volunteer" },
      { code: "CASUAL", name: "Casual" },
      { code: "TEMP_TO_PERM", name: "Temp-to-Perm" },
      { code: "REMOTE_PART_TIME", name: "Remote Part-time" },
      { code: "REMOTE_FULL_TIME", name: "Remote Full-time" },
      { code: "FIXED_TERM", name: "Fixed-term" },
      { code: "CONSULTANT", name: "Consultant" },
      { code: "OUTSOURCED", name: "Outsourced" },
      { code: "JOB_SHARING", name: "Job Sharing" }
    ];
    const sexOptions = [
      { code: "MALE", name: "Male" },
      { code: "FEMALE", name: "Female" },
      { code: "NON_BINARY", name: "Non-Binary" },
      { code: "TRANSGENDER_MALE", name: "Transgender Male" },
      { code: "TRANSGENDER_FEMALE", name: "Transgender Female" },
      { code: "GENDER_FLUID", name: "Gender Fluid" },
      { code: "AGENDER", name: "Agender" },
      { code: "BIGENDER", name: "Bigender" },
      { code: "TWO_SPIRIT", name: "Two-Spirit" },
      { code: "INTERSEX", name: "Intersex" },
      { code: "PREFER_NOT_TO_SAY", name: "Prefer not to say" }
    ];
  return (
    <>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center height-100 pt-1 pb-2">
        <div className="d-flex flex-row justify-content-between w-100  align-items-center mb-2">
                <div className="d-flex flex-row align-items-center gap-2">
                <div className="badge-input d-flex flex-row align-items-center justify-content-center">
                <Icon icon="clarity:administrator-line" className="fs-3 color-primary"/>
                </div>
                <p className="my-0 fs-6 fw-semibold">Create New Admin</p>
                </div>
                <div>
                    <button 
                    className="border-none rounded-2 px-4 font-size-sm p-2 d-flex flex-row gap-4 primary-background text-white"
                    onClick={() => {
                         navigate("/school-admins")
                    }}
                    >
                        <span>Back</span>
                    </button>
                </div>
        </div>
        <div className="card w-100 rounded-4 py-2 px-3">
          <div className="heading my-1">
            <h5 className="text-center">Create School Admin</h5>
          </div>
          <div className="my-1">
            <FullNamesInput />
          </div>
          <div className="d-flex flex-row gap-2 w-100">
            <div className="my-1 w-50">
             <EmailInput />
            </div>
            <div className="my-1 w-50">
              <PhoneNumberInput />
            </div>
          </div>
          <div className="d-flex flex-row gap-2 w-100">
            <div className="my-1 w-50">
              <SalaryInput />
            </div>
            <div className="my-1 w-50">
              <YearsExperienceInput />
            </div>
          </div>
          <div className="d-flex flex-row gap-2 w-100">
          <div className="my-1 w-50">
          <CustomDropdownTwo
             data={qualifications}
           displayKey={['name']}
           valueKey={['name']}
           onSelect={(selected) => console.log(selected)} 
           direction="up"
           lable="Highest Education"
          />
          </div>
          <div className="my-1 w-50">
            <FieldOfStudyInput />
          </div>
          </div>
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <DatePicker 
             lable={"Date of Birth"}
            />
          </div>
          <div className="my-1 w-50">
            <CustomDropdownTwo 
              data={sexOptions}
              displayKey={['name']}
              valueKey={['name']}
              lable={"Sex"}
              direction="up"
            />
          </div>
          </div>
          <div className="d-flex flex-row gap-2 align-items-center">
            <div className="my-1 w-50">
              <ReligionInput />
            </div>
            <div className="my-1 w-50">
              <CulturalBackgroundInput />
            </div>
          </div>
          <div className="d-flex flex-row gap-2 align-items-center">
          <div className="my-1 w-50">
           <AddressInput />
          </div>
          <div className="my-1 w-50">
            <CityInput />
          </div>
          </div>
          <div className="my-0">
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <DatePicker 
             lable={"Hire Date"}
            />
          </div>
          <div className="my-1 w-50">
            <CustomDropdownTwo 
              data={jobTypes}
              displayKey={['name']}
              valueKey={['name']}
              lable={"Job Type"}
              direction="up"
            />
          </div>
          </div>
          </div>
          <div className="my-2">
            <button className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background">
              Create School Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Createschooladmin;
