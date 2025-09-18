import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
function Security() {
   const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
   
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
