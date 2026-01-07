import { useGetLevels } from "../../../hooks/level/useGetLevels";
import { useGetSchoolBranchSettingDetails } from "../../../hooks/schoolBranchSetting/useGetSchoolBranchSettingDetail";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../../components/errors/Error";
import { Icon } from "@iconify/react";
import { NumberInput } from "../../../components/FormComponents/InputComponents";
import { useEffect, useState } from "react";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
function UpdateLevelResitFee({ handleClose, rowData }) {
  const { id: schoolBranchSettingId } = rowData;
  const {
    data: level,
    isLoading: isLevelLoading,
    error: levelError,
  } = useGetLevels();
  const {
    data: settingDetails,
    isLoading: isSettingDetailLoading,
    error: settingDetailError,
  } = useGetSchoolBranchSettingDetails(schoolBranchSettingId);
  const [formData, setFormData] = useState({
    school_branch_setting_id: rowData.id,
    value: [],
  });
  const [isValid, setIsValid] = useState([]);
  const handleStateChange = (index, field, value, stateFn) => {
    stateFn((prevState) => {
      const updatedFormData = [...prevState["value"]];
      updatedFormData[index] = {
        ...prevState[index],
        [field]: value,
      };
      return updatedFormData;
    });
  };
  const handleIsValidChange = (index, field, value) => {
    setIsValid((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        isValid: {
          ...newItems[index].isValid,
          [field]: value,
        },
      };
      return newItems;
    });
  };
  useEffect(() => {
    if (level?.data && settingDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        value: level.data.map((items) => ({
          level_id: items.id,
          price: 0,
        })),
      }));
    }
  }, [isSettingDetailLoading, setFormData]);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span>Update Level Based Billing</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      {isSettingDetailLoading || isLevelLoading ? (
        <RectangleSkeleton height="70dvh" width="100%" />
      ) : settingDetailError || levelError ? (
        <NotFoundError
          title={
            settingDetailError?.response?.data?.errors?.title ||
            levelError?.response?.data?.errors?.title
          }
          description={
            settingDetailError?.response?.data?.errors?.description ||
            levelError?.response?.data?.errors?.description
          }
        ></NotFoundError>
      ) : (
        <div className=" grades-box rounded-3 card">
          <table className={`table-responsive table`}>
            <thead className="grades-thead">
              <tr>
                <th>Level</th>
                <th>Resit Fee</th>
              </tr>
            </thead>
            <tbody>
              {level.data.map((items, index) => (
                <tr key={items.id}>
                  <td className="font-size-sm">{items.name}</td>
                  <td>
                    <div>
                      <NumberInput
                        placeholder={"Enter Amount e.g 3000"}
                        validationSchema={numberSchema({
                          min: 1,
                          max: 100000,
                          required: false,
                          integerOnly: false,
                          messages: {
                            min: "Resit Fee Must Be Alteast 1 XAF",
                            max: "Resit Fee Must Not Exceed 100,000 XAF",
                          },
                        })}
                        step={"0.01"}
                        onChange={(value) =>
                          handleStateChange(index, price, value, setFormData)
                        }
                        onValidationChange={(value) =>
                          handleIsValidChange(index, value)
                        }
                        value={formData.value[index]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
export default UpdateLevelResitFee;
