import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
function SchoolBranch() {
  const userData = useSelector((state) => state.auth.user);
  const schoolBranchData = userData.schoolDetails;
  return (
    <>

          <div className="d-flex flex-column justify-content-start gap-2 pt-3">
            <div>
              <span
                className="my-1 fw-semibold"
                style={{ fontSize: "0.87rem" }}
              >
                School Branch Details
              </span>
              <div
                className="card p-2 border-none rounded-4 w-100 d-flex flex-column gap-1"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">School Branch Name</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.name}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">School Branch Name</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.abbreviation}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span
                className="my-1 fw-semibold"
                style={{ fontSize: "0.87rem" }}
              >
                Location Details
              </span>
              <div
                className="card border-none p-2 rounded-4 w-100 d-flex flex-column gap-1"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Address</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.address === null
                        ? "Add School Branch Address"
                        : schoolBranchData}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">State/Region</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.state === null
                        ? "Add State Or Region"
                        : schoolBranchData.state}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">City</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.city === null
                        ? "Add City"
                        : schoolBranchData.city}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Postal Code</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.postal_code === null
                        ? "Add Postal Code"
                        : schoolBranchData.postal_Code}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span
                className="my-1 fw-semibold"
                style={{ fontSize: "0.87rem" }}
              >
                Contact Details
              </span>
              <div
                className="card border-none p-2 rounded-4 w-100 d-flex flex-column gap-1"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">
                      Contact Phone Number One
                    </span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.phone_one === null
                        ? "Add Phone Number"
                        : schoolBranchData.phone_one}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">
                      Contact Phone Number Two
                    </span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.phone_two === null
                        ? "Add Phone Number"
                        : schoolBranchData.phone_two}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">School E-mail</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.email === null
                        ? "Add E-mail"
                        : schoolBranchData.email}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-item-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Website</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranchData.website === null
                        ? "Add Website"
                        : schoolBranchData.website}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span
                className="my-1 fw-semibold text-danger"
                style={{ fontSize: "0.87rem" }}
              >
                Danger Zone
              </span>
              <div
                className="card p-2 border-danger rounded-4 w-100 d-flex flex-column gap-1"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold text-danger">
                      Delete School Branch
                    </span>
                    <span className="gainsboro-color text-danger">
                      Deleting this branch will remove all associated data.
                      Proceed with caution.
                    </span>
                  </div>
                  <div>
                    <button className="border-none rounded-3 bg-danger text-white p-2 font-size-sm">
                      Delete Branch
                    </button>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Suspend School Branch</span>
                    <span className="gainsboro-color fw-light">
                      Suspending this branch will disable its access but retain
                      its data
                    </span>
                  </div>
                  <div>
                    <button className="border-none rounded-3 bg-danger text-white p-2 font-size-sm">
                      Suspend School Branch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}
export default SchoolBranch;
