import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useGetSchoolBranchDetails } from "../../hooks/schoolBranch/useGetSchoolBranchDetail";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import UpdateSchoolBranchName from "../../ModalContent/SchoolBranch/UpdateBranchName";
import UpdateSchoolBranchAbbreviation from "../../ModalContent/SchoolBranch/UpdateBranchAbbrevaition";
import UpdateSchoolBranchAddress from "../../ModalContent/SchoolBranch/UpdateBranchAddress";
import UpdateSchoolBranchState from "../../ModalContent/SchoolBranch/UpdateBranchState";
import UpdateSchoolBranchEmail from "../../ModalContent/SchoolBranch/UpdateBranchEmail";
import UpdateSchoolBranchContactTwo from "../../ModalContent/SchoolBranch/UpdateBranchContactTwo";
import UpdateSchoolBranchContactOne from "../../ModalContent/SchoolBranch/UpdateBranchContactOne";
import UpdateSchoolBranchWebsite from "../../ModalContent/SchoolBranch/UpdateBranchWebsite";
import UpdateSchoolBranchCity from "../../ModalContent/SchoolBranch/UpdateBranchCity";
function SchoolBranch() {
  const userData = useSelector((state) => state.auth.user);
  const { data:schoolBranch, isFetching } = useGetSchoolBranchDetails();
  if(isFetching){
    return <Pageloaderspinner />
  }
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
                <ModalButton
                  classname={"d-flex flex-row align-items-center justify-content-between pointer-cursor w-100"}
                  action={{ modalContent:UpdateSchoolBranchName }}
                >
                 <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">School Branch Name</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.name}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </ModalButton>
                <hr />
                <div >
                  <ModalButton
                    action={{ modalContent:UpdateSchoolBranchAbbreviation }}
                    classname={"d-flex flex-row w-100 align-items-center justify-content-between w-100"}
                   >
                    <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">School Branch Abbreviation</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.abbreviation}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                  </ModalButton>
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
                <ModalButton
                  classname={"d-flex flex-row align-items-center justify-content-between pointer-cursor w-100"}
                  action={{
                     modalContent:UpdateSchoolBranchAddress
                  }}
                 >
                   <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">Address</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.address === null
                        ? "Add School Branch Address"
                        : schoolBranch.data.address}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </ModalButton>
                <hr />
                <ModalButton
                  classname={"d-flex flex-row align-items-center justify-content-between pointer-cursor w-100"}
                  action={{ modalContent:UpdateSchoolBranchState }}
                >
                  <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">State/Region</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.state === null
                        ? "Add State Or Region"
                        : schoolBranch.data.state}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </ModalButton>
                <hr />
                <ModalButton
                 classname={"d-flex flex-row align-items-center justify-content-between pointer-cursor w-100"}
                 action={{ modalContent:UpdateSchoolBranchCity }}
                >
                  <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">City</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.city === null
                        ? "Add City"
                        : schoolBranch.data.city}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </ModalButton>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Postal Code</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.postal_code === null
                        ? "Add Postal Code"
                        : schoolBranch.data.postal_Code}
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
                  <ModalButton
                    classname={"d-flex flex-row align-items-center justify-content-between pointer-cursor w-100"}
                    action={{ modalContent:UpdateSchoolBranchContactOne }}
                  >
                    <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">
                      Contact Phone Number One
                    </span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.phone_one === null
                        ? "Add Phone Number"
                        : schoolBranch.data.phone_one}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                  </ModalButton>
                <hr />
                <ModalButton
                  classname="w-100 d-flex flex-row align-items-center justify-content-between w-100"
                  action={{ modalContent:UpdateSchoolBranchContactTwo }}
                >
                  <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">
                      Contact Phone Number Two
                    </span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.phone_two === null
                        ? "Add Phone Number"
                        : schoolBranch.data.phone_two}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </ModalButton>
                <hr />
                <div >
                  <ModalButton
                    classname="d-flex flex-row align-items-center justify-content-between pointer-cursor w-100"
                    action={{ modalContent:UpdateSchoolBranchEmail }}
                  >
                    <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">School E-mail</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.email === null
                        ? "Add E-mail"
                        : schoolBranch.data.email}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                  </ModalButton>
                </div>
                <hr />
                <div >
                  <ModalButton
                   classname="d-flex flex-row align-item-center justify-content-between pointer-cursor w-100"
                   action={{ modalContent:UpdateSchoolBranchWebsite }}
                  >
                    <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">Website</span>
                    <span className="gainsboro-color fw-light">
                      {schoolBranch.data.website === null
                        ? "Add Website"
                        : schoolBranch.data.website}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                  </ModalButton>
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
