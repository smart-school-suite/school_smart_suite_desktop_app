import { Icon } from "@iconify/react";
import { Navbarsettings } from "../../components/Navbar";
import { ModialButton } from "../actionButton";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
function Security() {
  return (
    <>
      <Navbarsettings />
      <div>
        <h5 className="my-2">Password Management</h5>
        <div className="card border-none shadow-sm rounded-4 py-2 px-3">
          <ModialButton
            classname={"bg-transparent border-none w-100"}
            action={{ modalContent: ChangePassword }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2 w-100">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                  <Icon
                    icon="material-symbols:lock-outline"
                    className="color-primary"
                  />
                </div>
                <div className="d-block">
                  <p className="fs-6 fw-bold my-0 text-start">Change Password</p>
                  <p className="gainsboro-color font-size-sm my-0">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nihil explicabo soluta harum vitae incidunt, eum repudiandae
                  </p>
                </div>
              </div>
              <div>
                <Icon
                  icon="weui:arrow-filled"
                  className="fs-4 gainsboro-color"
                />
              </div>
            </div>
          </ModialButton>
          <div className="d-flex flex-row align-items-center justify-content-between border-bottom  pb-3 my-2">
            <div className="d-flex align-items-center flex-row gap-2">
              <div className="security-badge">
                <Icon
                  icon="material-symbols:tv-options-input-settings-outline"
                  className="color-primary"
                />
              </div>
              <div className="d-block">
                <p className="fs-6 fw-bold my-0">Password Reset Options</p>
                <p className="gainsboro-color font-size-sm my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil explicabo soluta harum vitae incidunt, eum repudiandae
                </p>
              </div>
            </div>
            <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color" />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between  pb-2 my-2">
            <div className="d-flex align-items-center flex-row gap-2">
              <div className="security-badge">
                <Icon
                  icon="material-symbols:lock-outline"
                  className="color-primary"
                />
              </div>
              <div className="d-block">
                <p className="fs-6 fw-bold my-0">Password Strength Indicator</p>
                <p className="gainsboro-color font-size-sm my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil explicabo soluta harum vitae incidunt, eum repudiandae
                </p>
              </div>
            </div>
            <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color" />
            </div>
          </div>
        </div>
        <h5 className="my-2">Security Questions</h5>
        <div className="card border-none shadow-sm rounded-4 py-2 px-3">
          <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
            <div className="d-flex align-items-center flex-row gap-2">
              <div className="security-badge">
                <Icon
                  icon="fluent-mdl2:survey-questions"
                  className="color-primary"
                />
              </div>
              <div className="d-block">
                <p className="fs-6 fw-bold my-0">View Security Questions</p>
                <p className="gainsboro-color font-size-sm my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil explicabo soluta harum vitae incidunt, eum repudiandae
                </p>
              </div>
            </div>
            <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color" />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between  pb-2 my-2">
            <div className="d-flex align-items-center flex-row gap-2">
              <div className="security-badge">
                <Icon icon="mingcute:question-line" className="color-primary" />
              </div>
              <div className="d-block">
                <p className="fs-6 fw-bold my-0">
                  Set/ Change Security Questions
                </p>
                <p className="gainsboro-color font-size-sm my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil explicabo soluta harum vitae incidunt, eum repudiandae
                </p>
              </div>
            </div>
            <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Security;

function ChangePassword({ handleClose }) {
  const apiKey = useSelector((state) => state.auth.apiKey);
  const authToken = useSelector((state) => state.auth.token);
  const { handleChangePasswordAuthUser, authError, loading } = useAuth();
  const [passwordCredentails, setPasswordCredentails] = useState({
    current_password: "",
    new_password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleChangePasswordAuthUser(handleClose, authToken, apiKey, passwordCredentails);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordCredentails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-row">
          <div className="d-block">
            <h5>Change Password</h5>
            <p className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              deserun
            </p>
          </div>
        </div>
        {authError.changeAuthPassword && (
          <div className="alert alert-danger">{authError.changeAuthPassword}</div>
        )}
        <div className="mb-3">
          <span>Current Password</span>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Current Password"
            name="current_password"
            value={passwordCredentails.current_password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <span>New Password</span>
          <input
            type="password"
            className="form-control"
            placeholder="Enter New Password"
            name="new_password"
            value={passwordCredentails.new_password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              disabled={loading.changeAuthPassword}
            >
              {loading.changeAuthPassword ? "changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}


