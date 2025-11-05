import { useGetLevels } from "../../../hooks/level/useGetLevels";
import { useGetSchoolBranchSettingDetails } from "../../../hooks/schoolBranchSetting/useGetSchoolBranchSettingDetail";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../../components/errors/Error";
import { Icon } from "@iconify/react";
import { NumberInput, TextInput } from "../../../components/FormComponents/InputComponents";
import { useEffect, useState } from "react";
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
     school_branch_setting_id:rowData.id,
     value:[]
  })
  useEffect(() => {
     if(level?.data){
         setFormData((prev) => ({...prev,
            value:level.data.map((items) => ({
                 level_id:items.id,
                 price:0
            }))
         }))
     }
  }, [isSettingDetailLoading, setFormData])
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
              {level.data.map((items) => (
                <tr key={items.id}>
                  <td className="font-size-sm">{items.name}</td>
                  <td>
                    <div>
                      <NumberInput 
                         
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
