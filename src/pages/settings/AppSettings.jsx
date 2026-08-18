import { useGetSchoolBranchSetting } from "../../hooks/schoolBranchSetting/useGetSchoolBranchSetting";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { settinActionsConfig } from "../../ComponentConfig/SettingActionsConfig";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import SettingToggle from "../../components/Setting/SettingToggle";
function AppSettings() {
  const {
    data: schoolBranchSetting,
    isLoading,
    error,
  } = useGetSchoolBranchSetting();
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <main
        className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column pe-1 gap-2"
        style={{ maxHeight: "84dvh" }}
      >
          {isLoading ? (
            [...Array(6)].map((_, index) => (
              <div className="d-flex flex-column gap-1" key={index}>
                <RectangleSkeleton width="20%" height="1dvh" />
                <RectangleSkeleton width="100%" height="20dvh" />
              </div>
            ))
          ) : error ? (
            <NotFoundError
              title={error.response.data.errors.title}
              description={error.response.data.errors.description}
            ></NotFoundError>
          ) : (
            schoolBranchSetting.data.map((category) => (
              <div key={category.category_id} className="d-flex flex-column gap-2">
                <span style={{ fontSize: "0.87rem" }} className="fw-semibold">
                  {category.category_name}
                </span>
                <div
                  className={`${
                    darkMode ? "dark-bg gainsboro-color" : "white-bg"
                  } card border w-100 d-flex flex-column rounded-4 gap-2`}
                  style={{ fontSize: "0.87rem", padding:"0.75rem" }}
                >
                  {category.setting.map((setting, index) => {
                    const settingType = setting.data_type;
                    const settingActionConfig = settinActionsConfig.find(
                      (config) => config.key == setting.key,
                    );
                    return settingType == "boolean" ? (
                      <div
                        key={setting.id}
                        className="d-flex flex-column gap-2"
                      >
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <div className="d-flex flex-column gap-2">
                            <span className="fw-semibold font-size-sm">{setting.name}</span>
                            <span className="w-75 font-size-sm">
                              {setting.data_type == "boolean" ||
                              setting.data_type == "json"
                                ? setting.description
                                : setting.value}
                            </span>
                          </div>
                          <div className="pe-2">
                            {setting.data_type == "boolean" ? (
                              <SettingToggle setting={setting} />
                            ) : (
                              <Icon
                                icon="fa7-solid:chevron-right"
                                className="font-size-sm"
                              />
                            )}
                          </div>
                        </div>
                        {category.setting.length - 2 >= index && <hr />}
                      </div>
                    ) : (
                      <div>
                        <ModalButton
                          classname={`${
                            darkMode ? "gainsboro-color" : null
                          } d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                          action={{
                            modalContent: settingActionConfig?.modal,
                          }}
                          rowData={setting}
                          size={settingActionConfig?.modalSize}
                        >
                          <div className="d-flex flex-column text-start">
                            <span className="fw-semibold">{setting.name}</span>
                            <span className="w-75 font-size-sm">
                              {setting.data_type == "boolean" ||
                              setting.data_type == "json"
                                ? setting.description
                                : setting.value}
                            </span>
                          </div>
                          <div className="pe-2">
                            <Icon
                              icon="fa7-solid:chevron-right"
                              className="font-size-sm"
                            />
                          </div>
                        </ModalButton>
                        {category.setting.length - 2 >= index && <hr />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
      </main>
    </>
  );
}
export default AppSettings;
