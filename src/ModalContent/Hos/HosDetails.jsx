import { useFetchHeadOfSpecialtyDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
function HosDetails({ handleClose, row_id: hosId }) {
  const { data: hosDetails, isLoading } = useFetchHeadOfSpecialtyDetailsQuery({
    hosId,
  });
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Head Of Specialty Details (HOS)</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <span className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
          sint reprehenderit tempora. Aliquid
        </span>
        <div className="w-100 mt-2">
          <span className="fs-6 my-2">HOS Details</span>
          <div className="d-flex align-items-center gap-2 my-1">
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
            <div className="width-90 border-bottom py-2">
              <p
                className="my-0 font-size-sm gainsboro-color"
              >
                Email
              </p>
              <p className="my-0">{hosDetails.data.hosable.email}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 my-1">
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
            <div className="width-90 border-bottom py-2">
              <p
                className="my-0 font-size-sm gainsboro-color"
              >
                First Name
              </p>
              <p className="my-0">{hosDetails.data.hosable.first_name}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 my-1">
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
            <div className=" py-2 width-90 border-bottom">
              <p
                className="my-0 font-size-sm gainsboro-color"
              >
                First Name
              </p>
              <p className="my-0">{hosDetails.data.hosable.last_name}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 my-1">
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
            <div className=" py-2 width-90 border-bottom">
              <p
                className="my-0 font-size-sm gainsboro-color"
              >
                First Name
              </p>
              <p className="my-0">{hosDetails.data.hosable.name}</p>
            </div>
          </div>
        </div>
        <div className="w-100 mt-2">
          <span className="fs-6 my-2">Specialty Details</span>
          <div className="d-flex align-items-center gap-2 my-1">
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
            <div className="width-90 border-bottom py-2">
              <p
                className="my-0 font-size-sm gainsboro-color"
              >
                Email
              </p>
              <p className="my-0">{hosDetails.data.specialty.specialty_name}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 my-1">
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
            <div className="width-90 border-bottom py-2">
              <p
                className="my-0 font-size-sm gainsboro-color"
              >
                First Name
              </p>
              <p className="my-0">{hosDetails.data.specialty.level.name}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 my-1">
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
            <div className=" py-2 width-90 border-bottom">
              <p
                className="my-0 font-size-sm gainsboro-color"
              >
                First Name
              </p>
              <p className="my-0">{hosDetails.data.specialty.level.level}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 my-1">
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
            <div className=" py-2 width-90">
              <p
                className="my-0 font-size-sm gainsboro-color"
              >
                First Name
              </p>
              <p className="my-0">{hosDetails.data.specialty.status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HosDetails;
