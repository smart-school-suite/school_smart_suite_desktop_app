import { Icon } from "@iconify/react";
import { useCreateHall } from "../../hooks/hall/useCreateHall";
import { useRef, useState, useCallback } from "react";
import { useGetHallTypes } from "../../hooks/hall/useGetHallTypes";
import {
  NumberInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import { MultiSelectDropdown } from "../../components/Dropdowns/Dropdowns";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import {
  nameSchema,
  numberSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateHall({ handleClose }) {
  const { mutate: createHall, isPending } = useCreateHall(handleClose);
  const { data: hallTypes, isLoading: isHallTypeLoading } = useGetHallTypes();
  const nameRef = useRef();
  const locationRef = useRef();
  const capacityRef = useRef();
  const typeRef = useRef();

  const handlePrevalidation = async () => {
    const name = await nameRef.current.triggerValidation();
    const location = await locationRef.current.triggerValidation();
    const capacity = await capacityRef.current.triggerValidation();
    const type = await typeRef.current.triggerValidation();
    return {
      name,
      location,
      capacity,
      type,
    };
  };
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: 0,
    type: [],
  });
  const [isFieldValid, setFieldValid] = useState({
    name: null,
    location: null,
    capacity: null,
  });

  const [error, setError] = useState({
    type: null,
  });

  const handleStateChange = useCallback((field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    if (!allFieldsValid(isFieldValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }

    const payload = {
      name: formData.name,
      location: formData.location,
      capacity: formData.capacity,
      typeIds: formData.type.map((items) => ({
        type_id: items.id,
      })),
    };

    createHall(payload);
  };
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Create Hall</span>
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
          <div>
            <label htmlFor="courseTitle" className="font-size-sm">
              Hall Name
            </label>
            <TextInput
              placeholder={"e.g Amphitheater hall"}
              onChange={(value) =>
                handleStateChange("name", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("name", value, setFieldValid)
              }
              validationSchema={nameSchema({
                min: 3,
                max: 150,
                required: true,
                messages: {
                  required: "Hall Name Required",
                  min: "Hall Name Must Be Atleast 3 Characters Long",
                  max: "Hall Name Must Not Exceed 150 Characters",
                },
              })}
              ref={nameRef}
              value={formData.name}
            />
          </div>
          <div>
            <label htmlFor="hallLocation" className="font-size-sm">
              Hall Location
            </label>
            <TextInput
              placeholder={"e.g Block C"}
              onChange={(value) =>
                handleStateChange("location", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("location", value, setFieldValid)
              }
              validationSchema={nameSchema({
                min: 3,
                max: 150,
                required: true,
                messages: {
                  required: "Hall Location Required",
                  min: "Hall Location Name Must Be Atleast 3 Characters Long",
                  max: "Hall Location Name Must Not Exceed 150 Characters",
                },
              })}
              ref={locationRef}
              value={formData.location}
            />
          </div>
          <div>
            <label htmlFor="hallCapacity" className="font-size-sm">
              Hall Capacity
            </label>
            <NumberInput
              placeholder={"e.g 100"}
              onChange={(value) =>
                handleStateChange("capacity", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("capacity", value, setFieldValid)
              }
              validationSchema={numberSchema({
                min: 1,
                max: 5000,
                required: true,
                messages: {
                  required: "Hall Capacity Required",
                  min: "Hall Capacity Must Be Atleast 1",
                  max: "Hall Capacity Must Not Exceed 5000",
                },
              })}
              ref={capacityRef}
              value={formData.capacity}
            />
          </div>
          <div>
            <label htmlFor="hallType" className="font-size-sm">
              Hall Type
            </label>
            <MultiSelectDropdown
              data={hallTypes?.data || []}
              value={formData.type}
              displayKey={["name", "description"]}
              valueKey={["id"]}
              direction="up"
              isLoading={isHallTypeLoading}
              placeholder={"Select Hall Type"}
              errorMessage={"Hall Type Required"}
              onSelect={(value) =>
                handleStateChange("type", value, setFormData)
              }
              onError={(error) => handleStateChange("type", error, setError)}
              error={error.type}
              optional={false}
              ref={typeRef}
            />
          </div>
        </div>
        <div>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isPending ? <SingleSpinner /> : "Create Hall"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateHall;
