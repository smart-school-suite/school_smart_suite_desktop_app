import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
function Security() {
  return (
    <>
      <div className="pt-3">
        <span className="my-2 fw-semibold">Password Management</span>
        <div
          className="card border-none shadow-sm rounded-4 py-2 px-3 d-flex flex-column gap-2"
          style={{ fontSize: "0.87rem" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex align-items-center flex-row gap-2">
              <div className="d-flex flex-column">
                <span className=" fw-semibold my-0 text-start">
                  Change Password
                </span>
                <span className="gainsboro-color font-size-sm my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil explicabo soluta harum vitae incidunt, eum repudiandae
                </span>
              </div>
            </div>
            <div>
              <Icon
                icon="weui:arrow-filled"
                className=" gainsboro-color"
                width={20}
                height={20}
              />
            </div>
          </div>
          <hr />
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex align-items-center flex-row gap-2">
              <div className="d-block">
                <p className=" fw-semibold my-0">Password Strength</p>
                <p className="gainsboro-color font-size-sm my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil explicabo soluta harum vitae incidunt, eum repudiandae
                </p>
              </div>
            </div>
            <div>
              <Icon
                icon="weui:arrow-filled"
                className=" gainsboro-color"
                width={20}
                height={20}
              />
            </div>
          </div>
          <hr />
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex align-items-center flex-row gap-2">
              <div className="d-flex flex-column">
                <span className=" fw-semibold my-0">Two Step Verification</span>
                <span className="gainsboro-color font-size-sm my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil explicabo soluta harum vitae incidunt, eum repudiandae
                </span>
              </div>
            </div>
            <div>
              <Icon
                icon="weui:arrow-filled"
                className=" gainsboro-color"
                width={20}
                height={20}
              />
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
    await handleChangePasswordAuthUser(
      handleClose,
      authToken,
      apiKey,
      passwordCredentails
    );
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
          <div className="alert alert-danger">
            {authError.changeAuthPassword}
          </div>
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
