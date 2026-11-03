import { Icon } from "@iconify/react";
import {
  DateRangeInput,
  NumberInput,
} from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetCurrentSystemAcademicYear } from "../../hooks/academicYear/useGetCurrentSystemAcademicYear";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useRef, useState } from "react";
import { useCreateSchoolAcademicYear } from "../../hooks/academicYear/useCreateSchoolAcademicYear";
import { allFieldsValid } from "../../utils/functions";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function UpdateAcademicYear({ handleClose, drawerData }){
     return (
        <>
        
        </>
     )
}
export default UpdateAcademicYear;