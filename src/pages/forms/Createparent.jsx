import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  FieldOfStudyInput,
  AddressInput,
  CityInput,
  YearsExperienceInput,
  FullNamesInput,
  PhoneNumberInput,
  SalaryInput,
  CulturalBackgroundInput,
  ReligionInput,
  OccupationInput,
  PreferredLanguageInput,
  RelationshipToStudentInput,
} from "../../components/formComponents";
import { CustomDropdownTwo } from "../../components/Dropdowns";
import DatePicker from "../../components/datePicker";
function Createparent(){
      const referralSources = [
        { code: "FRIEND", name: "Friend or Family" },
        { code: "SOCIAL_MEDIA", name: "Social Media" },
        { code: "GOOGLE", name: "Google Search" },
        { code: "ADVERTISEMENT", name: "Advertisement" },
        { code: "EMAIL_CAMPAIGN", name: "Email Campaign" },
        { code: "BLOG", name: "Blog" },
        { code: "INFLUENCER", name: "Influencer" },
        { code: "WEBSITE", name: "Website" },
        { code: "REFERRAL_PROGRAM", name: "Referral Program" },
        { code: "SEO", name: "Search Engine Optimization (SEO)" },
        { code: "EVENT", name: "Event or Conference" },
        { code: "NETWORKING", name: "Networking" },
        { code: "PR", name: "Press or Media Coverage" },
        { code: "PARTNER", name: "Partner Organization" },
        { code: "PODCAST", name: "Podcast" },
        { code: "WEBINAR", name: "Webinar" },
        { code: "PRINT_MEDIA", name: "Print Media" },
        { code: "DIRECT_MAIL", name: "Direct Mail" },
        { code: "VIRAL_MARKETING", name: "Viral Marketing" },
        { code: "OTHER", name: "Other" },
        { code: "PREFER_NOT_TO_SAY", name: "Prefer Not to Say" }
      ];
      const contactMethods = [
        { code: "PHONE", name: "Phone Call" },
        { code: "SMS", name: "Text Message (SMS)" },
        { code: "EMAIL", name: "Email" },
        { code: "WHATSAPP", name: "WhatsApp" },
        { code: "FACEBOOK_MESSENGER", name: "Facebook Messenger" },
        { code: "INSTAGRAM", name: "Instagram Direct Message" },
        { code: "TELEGRAM", name: "Telegram" },
        { code: "SLACK", name: "Slack" },
        { code: "LINKEDIN", name: "LinkedIn Message" },
        { code: "ZOOM", name: "Zoom" },
        { code: "SKYPE", name: "Skype" },
        { code: "FACEBOOK", name: "Facebook" },
        { code: "VIBER", name: "Viber" },
        { code: "WECHAT", name: "WeChat" },
        { code: "MAIL", name: "Postal Mail" },
        { code: "PREFER_NOT_TO_SAY", name: "Prefer Not to Say" }
      ];
      const relationshipStatuses = [
        { code: "SINGLE", name: "Single" },
        { code: "IN_A_RELATIONSHIP", name: "In a Relationship" },
        { code: "MARRIED", name: "Married" },
        { code: "ENGAGED", name: "Engaged" },
        { code: "DIVORCED", name: "Divorced" },
        { code: "SEPARATED", name: "Separated" },
        { code: "WIDOWED", name: "Widowed" },
        { code: "COMPLICATED", name: "It's Complicated" },
        { code: "OPEN_RELATIONSHIP", name: "Open Relationship" },
        { code: "LONG_DISTANCE", name: "Long Distance Relationship" },
        { code: "POLYAMOROUS", name: "Polyamorous" },
        { code: "PREFER_NOT_TO_SAY", name: "Prefer Not to Say" }
      ];
      const cameroonLanguages = [
        { code: "ENGLISH", name: "English" },
        { code: "FRENCH", name: "French" },
        { code: "BAMILEKE", name: "Bamileke" },
        { code: "DUALA", name: "Douala" },
        { code: "FANG", name: "Fang" },
        { code: "BASAA", name: "Basa'a" },
        { code: "MUNGAKA", name: "Mungaka" },
        { code: "YEMBE", name: "Yembe" },
        { code: "BANYANG", name: "Banyang" },
        { code: "NTUMBA", name: "Ntumba" },
        { code: "MBENGA", name: "Mbenga" },
        { code: "BAMOUN", name: "Bamoun" },
        { code: "PIGEON", name: "Cameroonian Pidgin English" },
        { code: "MOKPWE", name: "Mokpwe" },
        { code: "MBOLO", name: "Mbole" },
        { code: "TIKAR", name: "Tikar" },
        { code: "ALEGHA", name: "Aleghe" },
        { code: "MADI", name: "Madi" },
        { code: "MOFO", name: "Mofo" },
        { code: "BASSA", name: "Bassa" },
        { code: "BESINGO", name: "Besingo" },
        { code: "FUSO", name: "Fuso" },
        { code: "BENDJUM", name: "Bendjum" },
        { code: "OTHER", name: "Other (Please Specify)" }
      ];
      
      const navigate = useNavigate();
    return(
        <>
       <div className="d-flex flex-row justify-content-between w-100  align-items-center my-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <div className="badge-input d-flex flex-row align-items-center justify-content-center">
            <Icon
              icon="clarity:administrator-line"
              className="fs-3 color-primary"
            />
          </div>
          <div>
          <p className="my-0 fs-6 fw-semibold">Add New Parent</p>
          <p className="gainsboro-color font-size-sm my-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam labore</p>
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
        <div className="heading my-1">
            <h5 className="text-center">Create Parent</h5>
          </div>
         <div className="my-1">
            <FullNamesInput />
         </div>
         <div className="d-flex flex-row gap-2 align-items-center">
         <div className="my-1 w-50">
            <AddressInput />
         </div>
         <div className="my-1 w-50">
            <EmailInput />
         </div>
         </div>
        <div className="w-100 d-flex flex-row align-items-center gap-2">
        <div className="my-1 w-50">
            <PhoneNumberInput />
         </div>
         <div className="my-1 w-50">
            <PhoneNumberInput />
         </div>
        </div>
         <div className="d-flex flex-row align-items-center gap-2">
         <div className="my-1 w-50">
         <CulturalBackgroundInput /> 
         </div>
         <div className="my-1 w-50">
            <ReligionInput />
         </div>
         </div>
         <div className="d-flex flex-row align-items-center gap-2">
         <div className="my-1 w-50">
         <OccupationInput />
         </div>
         <div className="my-1 w-50">
          <RelationshipToStudentInput />
         </div>
         </div>
        <div className="d-flex flex-row align-items-center gap-2">
        <div className="my-1 w-50">
           <CustomDropdownTwo 
            data={contactMethods}
            displayKey={['name']}
            valueKey={['name']}
            lable={"Preferred Contact Method"}
            direction="up"
           />
         </div>
         <div className="w-50">
            <PreferredLanguageInput />
         </div>
        </div>
         <div className="my-1">
            <CustomDropdownTwo 
              data={relationshipStatuses}
              displayKey={['name']}
              valueKey={['name']}
              lable={"Relationship Status"}
              direction="up"
            />
         </div>
         <div className="my-1">
            <CustomDropdownTwo 
              data={referralSources}
              displayKey={['name']}
              valueKey={['name']}
              lable={"Referal Source"}
              direction="up"
            />
         </div>
         <div className="my-2">
            <button className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background">
              Create Parent
            </button>
          </div>
        </div>
        </div>
        </>
    )
}
export default Createparent