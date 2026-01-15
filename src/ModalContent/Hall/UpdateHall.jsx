import { Icon } from "@iconify/react";
import { useState, useCallback, Fragment, useEffect } from "react";
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
import {
  optionalValidateObject,
  hasNonEmptyValue,
} from "../../utils/functions";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetHallDetail } from "../../hooks/hall/useGetHallDetail";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useUpdateHall } from "../../hooks/hall/useUpdateHall";
function UpdateHall({ handleClose, rowData }) {
   const { id:hallId } = rowData;
  const {
    data: hallDetails,
    isLoading: isHallDetailLoading,
    error: hallDetailError,
  } = useGetHallDetail(hallId);
  const { data: hallTypes, isLoading: isHallTypeLoading } = useGetHallTypes();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
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

  useEffect(() => {
    if (hallDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        name: hallDetails.data.name || "",
        capacity: hallDetails.data.capacity || null,
        location: hallDetails.data.location || "",
        type: hallDetails?.data?.types?.map((items) => ({
          id: items.id,
        })),
      }));
    }
  }, [setFormData, isHallDetailLoading, rowData]);

  const handleStateChange = useCallback((field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  }, []);

  const { mutate:updateHall, isPending }  = useUpdateHall(handleClose, hallId);

  const handleUpdateHall = async () => {
    if (optionalValidateObject(isFieldValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing To Update"}
          description={
            "Please Ensure Atleast One Field Is Updated Before Submitting"
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
    updateHall({ hallId , updateData: payload });
  };
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Update Hall</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        {isHallDetailLoading ? (
          <div className="d-flex flex-column gap-2">
            {[...Array(4)].map((_, index) => (
              <Fragment key={index}>
                <RectangleSkeleton width="30%" height="1dvh" />
                <RectangleSkeleton width="100%" height="4dvh" />
              </Fragment>
            ))}
          </div>
        ) : hallDetailError ? (
          <NotFoundError
            title={hallDetailError?.response?.data?.errors?.title}
            description={hallDetailError?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <>
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
                    required: false,
                    messages: {
                      min: "Hall Name Must Be Atleast 3 Characters Long",
                      max: "Hall Name Must Not Exceed 150 Characters",
                    },
                  })}
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
                    required: false,
                    messages: {
                      min: "Hall Location Name Must Be Atleast 3 Characters Long",
                      max: "Hall Location Name Must Not Exceed 150 Characters",
                    },
                  })}
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
                    required: false,
                    messages: {
                      min: "Hall Capacity Must Be Atleast 1",
                      max: "Hall Capacity Must Not Exceed 5000",
                    },
                  })}
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
                  onError={(error) =>
                    handleStateChange("type", error, setError)
                  }
                  error={error.type}
                  optional={true}
                />
              </div>
            </div>
            <div>
              <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
                <button
                  className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
                  onClick={() => {
                    handleUpdateHall();
                  }}
                >
                  {isPending ? <SingleSpinner /> : "Update Hall"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default UpdateHall;
