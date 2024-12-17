import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Icon } from "@iconify/react";
import { DescriptionInput, EmailInput, EventTitleInput, FullNamesInput, PhoneNumberInput } from "../../../components/formComponents";
import DatePicker from "../../../components/datePicker";
function OperationalAnalysis() {
  const navBarOptions = {
    route_data: [
      {
        lable: "Financial Analysis",
        icon: null,
        route: "/",
      },
      {
        lable: "Operational Analysis",
        route: "/operational-analysis",
        icon: null,
      },
      {
        lable: "Academic Analysis",
        icon: null,
        route: "/academic-analysis",
      },
    ],
  };
  return (
    <>
      <Navbar options={navBarOptions} />
      <div className="container pt-3">
         <div className="d-flex flex-row justify-content-center w-100">
            <EmailInput />
         </div>
         <div className="w-50">
          <FullNamesInput />
         </div>
         <div className="my-2 w-50">
          <PhoneNumberInput />
         </div>
         <div className="my-2 w-50">
          <DescriptionInput />
         </div>
         <div className="my-2 w-50">
          <EventTitleInput />
         </div>
         <div className="my-2 w-50">
          <DatePicker />
         </div>
      </div>
     
    </>
  );
}
export default OperationalAnalysis;

