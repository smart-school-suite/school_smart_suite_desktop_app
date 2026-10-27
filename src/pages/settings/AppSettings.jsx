import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import Switch from "../../components/input/Switch";
import CustomModal from "../../components/Modals/Modal";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSchoolBranchSetting } from "../../hooks/schoolBranchSetting/useGetSchoolBranchSetting";
import { useUpdateSetting } from "../../hooks/schoolBranchSetting/useUpdateSetting";
import { isLastElement } from "../../utils/functions";
import { settingMap } from "../../utils/maps/setting/settingMap";

function AppSettings() {
  const {
    data: schoolBranchSetting,
    isLoading,
    error,
  } = useGetSchoolBranchSetting();

  const currency = useSelector(
    (state) => state.auth.user?.schoolDetails?.school?.country?.currency ?? "",
  );

  const { mutate: updateSetting, isPending } = useUpdateSetting();

  const handleUpdateSetting = (payload) => {
    updateSetting({ payload });
  };

  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    component: null,
    size: "md",
    closeOnOutsideClick: true,
    closeOnEscape: true,
    payload: null,
  });

  const [drawerConfig, setDrawerConfig] = useState({
    component: null,
    placement: "right",
    title: "",
    closeOnOutsideClick: true,
    showHeader: true,
    payload: null,
  });

  // Modal handlers
  const handleCloseModal = () => {
    setShowModal(false);
    setModalConfig((prev) => ({ ...prev, component: null, payload: null }));
  };

  const handleShowModal = (Component, options = {}) => {
    const {
      size = "md",
      closeOnOutsideClick = true,
      closeOnEscape = true,
      payload = null,
    } = options;

    setModalConfig({
      component: Component,
      size,
      closeOnOutsideClick,
      closeOnEscape,
      payload,
    });
    setShowModal(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setDrawerConfig((prev) => ({ ...prev, component: null, payload: null }));
  };

  const handleShowDrawer = (Component, options = {}) => {
    const {
      title = "",
      placement = "right",
      closeOnOutsideClick = true,
      showHeader = true,
      payload = null,
    } = options;

    setDrawerConfig({
      component: Component,
      title,
      placement,
      closeOnOutsideClick,
      showHeader,
      payload,
    });
    setShowDrawer(true);
  };

  // Safely extract components for rendering in JSX
  const DrawerComponent = drawerConfig.component;
  const ModalComponent = modalConfig.component;

  return (
    <>
      <main
        className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column pe-1 gap-2"
        style={{ maxHeight: "84dvh", paddingBottom: "10rem" }}
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
            title={
              error?.response?.data?.errors?.title || "Error loading settings"
            }
            description={
              error?.response?.data?.errors?.description ||
              error?.message ||
              "Something went wrong while fetching school branch settings."
            }
          />
        ) : (
          schoolBranchSetting?.data?.map((category) => (
            <div
              key={category.category_id}
              className="d-flex flex-column gap-1 font-size-sm"
            >
              <span className="fw-semibold">{category.category_name}</span>
              <div className="bg-white card border w-100 d-flex flex-column rounded-4 gap-2 p-3 font-size-sm">
                {category?.setting?.map((setting, index) => {
                  const resolvedMap = resolveSetting(setting.key);
                  const isClickable = setting.data_type !== "boolean";
                  const handler =
                    resolvedMap?.editor === "modal"
                      ? handleShowModal
                      : resolvedMap?.editor === "drawer"
                        ? handleShowDrawer
                        : null;

                  const Component = resolvedMap?.component;
                  const config = resolveConfig(resolvedMap?.editor);
                  const unit = resolvedMap?.unit;
                  return (
                    <div
                      key={setting.id}
                      className={`d-flex flex-column gap-2 ${
                        isClickable && "cursor-pointer"
                      }`}
                      onClick={() => {
                        if (handler && Component) {
                          handler(Component, {
                            ...config,
                            payload: {
                              ...setting,
                              updateHandler: updateSetting,
                              isPending: isPending,
                            },
                          });
                        }
                      }}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-column gap-1">
                          <span className="fw-medium font-size-sm">
                            {setting.name}
                          </span>
                          {setting.data_type === "boolean" ||
                          setting.data_type === "json" ? (
                            <span className="w-75 font-size-sm text-iron-400">
                              {setting.description}
                            </span>
                          ) : (
                            <span className="w-75 font-size-sm text-iron-400">
                              {`${setting.value} ${unit ? ` ${currency ?? ""}` : ""}`}
                            </span>
                          )}
                        </div>
                        <div
                          className="pe-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {setting.data_type === "boolean" ? (
                            <Switch
                              checked={setting.value}
                              onChange={() => {
                                handleUpdateSetting({
                                  setting_id: setting?.id,
                                  value: !setting?.value,
                                });
                              }}
                              disabled={isPending}
                            />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </div>
                      </div>
                      {!isLastElement(index, category.setting) && (
                        <HorizontalDashedLine
                          color={"#ccc"}
                          dashed={false}
                          thickness={0.2}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </main>

      <Drawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        placement={drawerConfig.placement}
        title={drawerConfig.title}
        closeOnOutsideClick={drawerConfig.closeOnOutsideClick}
        showHeader={drawerConfig.showHeader}
      >
        {DrawerComponent && (
          <DrawerComponent
            handleClose={handleCloseDrawer}
            drawerData={drawerConfig.payload}
          />
        )}
      </Drawer>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalConfig.size}
        closeOnOutsideClick={modalConfig.closeOnOutsideClick}
        closeOnEscape={modalConfig.closeOnEscape}
        centered
      >
        {ModalComponent && (
          <ModalComponent
            rowData={modalConfig.payload}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}

export default AppSettings;

function resolveSetting(key) {
  return settingMap?.[key];
}

function resolveConfig(editor) {
  const modalConfig = {
    size: "md",
    closeOnOutsideClick: true,
    closeOnEscape: true,
  };
  const drawerConfig = {
    closeOnOutsideClick: true,
    showHeader: false,
  };
  return editor === "modal" ? modalConfig : drawerConfig;
}
