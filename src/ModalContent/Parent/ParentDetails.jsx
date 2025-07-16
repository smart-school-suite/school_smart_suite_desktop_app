import { useFetchParentDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
import Pageloaderspinner from "../../components/Spinners/Spinners";
function ParentDetails({ handleClose, row_id: guardianId }) {
  const { data: parentDetails, isLoading } = useFetchParentDetailsQuery({
    parent_id: guardianId,
  });

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100 mt-2">
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Guardian Details {guardianId}</h5>
              <span
                className="m-0"
                onClick={() => {
                  handleClose();
                }}
              >
                <Icon icon="charm:cross" width="22" height="22" />
              </span>
            </div>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              harum nesciunt sunt
            </span>
          </div>
        </div>
        <p className="fs-6 my-2">Personal Details</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{parentDetails.data[0].address}</p>
            <p className="my-0 font-size-sm gainsboro-color">House Address</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{parentDetails.data[0].occupation}</p>
            <p className="my-0 font-size-sm gainsboro-color">Occupation</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{parentDetails.data[0].cultural_background}</p>
            <p className="my-0 font-size-sm gainsboro-color">
              Cultural Background
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 mt-2">
        <p className="fs-6 my-2">Contact Info</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{parentDetails.data[0].email}</p>
            <p className="my-0 font-size-sm gainsboro-color">Email</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{parentDetails.data[0].phone_one}</p>
            <p className="my-0 font-size-sm gainsboro-color">Contact One</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{parentDetails.data[0].phone_two}</p>
            <p className="my-0 font-size-sm gainsboro-color">Contact Two</p>
          </div>
        </div>
      </div>

      <div className="w-100 mt-2">
        <p className="fs-6 my-2">Children Details</p>
        <div className="d-flex flex-row gap-1 align-items-center">
          <span className="gainsboro-color font-size-sm">
            Number of students :
          </span>
          <span>{parentDetails.data[0].student.length}</span>
        </div>
        {parentDetails.data[0].student.map((items, index) => (
          <>
            <div className="d-flex flex-column">
              <span className="gainsboro-color">Student {index + 1}</span>
              <div className="d-flex align-items-center justify-content-between my-1">
                <button
                  className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "2.5rem",
                  }}
                >
                  <Icon icon="clarity:email-line" />
                </button>
                <div className="border-bottom py-2" style={{ width: "87%" }}>
                  <p className="my-0">{items.name}</p>
                  <p
                    className="my-0 font-size-sm gainsboro-color"
                  >
                    Student Name
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between my-1">
                <button
                  className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "2.5rem",
                  }}
                >
                  <Icon icon="clarity:email-line" />
                </button>
                <div className="border-bottom py-2" style={{ width: "87%" }}>
                  <p className="my-0">{items.specialty.specialty_name}</p>
                  <p
                    className="my-0 font-size-sm gainsboro-color"
                  >
                    Specailty Name
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between my-1">
                <button
                  className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "2.5rem",
                  }}
                >
                  <Icon icon="clarity:email-line" />
                </button>
                <div className="border-bottom py-2" style={{ width: "87%" }}>
                  <p className="my-0">{items.level.name}</p>
                  <p
                    className="my-0 font-size-sm gainsboro-color"
                  >
                    Level
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="w-100 mt-2">
        <p className="fs-6 my-2">Others</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{parentDetails.data[0].preferred_language}</p>
            <p className="my-0 font-size-sm gainsboro-color">
              Preferred Language
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {parentDetails.data[0].preferred_contact_method}
            </p>
            <p className="my-0 font-size-sm gainsboro-color">
              Preferred Contact Method
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ParentDetails;
