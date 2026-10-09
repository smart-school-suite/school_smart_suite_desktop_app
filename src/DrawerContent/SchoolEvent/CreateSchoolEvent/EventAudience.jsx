import {
  TextAreaInput,
  TextInput,
} from "../../../components/FormComponents/InputComponents";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../../components/Dropdowns/Dropdowns";
import {
  nameSchema,
  textareaSchema,
} from "../../../ComponentConfig/YupValidationSchema";
import { useGetEventCategories } from "../../../hooks/eventCategory/useGetEventCategories";
import { useSelector, useDispatch } from "react-redux";
import {
  setEventContent,
  resetCreateEvent,
} from "../../../Slices/schoolEvent/schoolEventSlice";
import { useRef } from "react";
import { ShieldAlert, Info, TriangleAlert, CircleCheck, X } from "lucide-react";
import toast from "react-hot-toast";
import ToastWarning from "../../../components/Toast/ToastWarning";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import { allFieldsValid } from "../../../utils/functions";
import { useState } from "react";
import { useGetTags } from "../../../hooks/tag/useGetTags";
function EventAudience({ handleClose, currentStep, nextStep, fullStep }) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const contentRef = useRef();
  const tagRef = useRef();
  const categoryRef = useRef();
  const locationRef = useRef();
  const organizerRef = useRef();
  const dateRef = useRef();
  const [errors, setErrors] = useState(null);
  const moduleState = useSelector(
    (state) => state.schoolEvent.createSchoolEvent,
  );
  const { data: category, isLoading: isCategoryLoading } =
    useGetEventCategories();
  const { data: tags, isLoading: isTagLoading } = useGetTags();
  return (
    <>
      <div className="drawer-content px-2 pt-3 font-size-sm">
        <div className="d-flex flex-column gap-3">
            <span className="text-iron-400">Event Details</span>
            <div className="d-flex flex-column gap-1">
                <span>Event Title</span>
            </div>
        </div>
      </div>
    </>
  );
}
export default EventAudience;
