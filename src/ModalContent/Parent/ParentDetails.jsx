function ParentDetails({ row_id }) {
    const {
      data: parent_details,
      error,
      isLoading,
    } = useFetchParentDetailsQuery({
      parent_id: row_id,
    });
  
    if (isLoading) {
      return <Pageloaderspinner />;
    }
    return (
      <>
        <div className="w-100">
          <div>
            <div className="card border-none pb-4 shadow-sm rounded-3 profile-section white-bg d-flex flex-column">
              <div className="top-section rounded-top-4 px-4">
                <div className="d-flex flex-row profile-picture-group z-5 justify-content-between align-items-center">
                  <div className="profile-img">
                    <img src="./images/protrait-one.jpg" alt="" />
                  </div>
                  <div>
                    <Icon
                      icon="mdi:dots-vertical"
                      className="fs-3 pointer-cursor"
                    />
                  </div>
                </div>
              </div>
              <div className="ms-2 mt-auto">
                <div className="d-block">
                  <h5 className="fw-bold">
                    {parent_details.parent_details[0].name}
                  </h5>
                  <div className="d-flex flex-row my-1 gainsboro-color">
                    <span>{parent_details.parent_details[0].occupation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="w-100 mt-2">
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
              <p className="my-0">{parent_details.parent_details[0].address}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                House Address
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
                {parent_details.parent_details[0].marital_status}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Relationship Status
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
              <p className="my-0">asdas</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Fee Payment Status
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
                {parent_details.parent_details[0].occupation}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Occupation
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
              <p className="my-0">{parent_details.parent_details[0].religion}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Religion
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
                {parent_details.parent_details[0].cultural_background}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
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
              <p className="my-0">{parent_details.parent_details[0].email}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Email
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
              <p className="my-0">{parent_details.parent_details[0].phone_one}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Contact One
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
              <p className="my-0">{parent_details.parent_details[0].phone_two}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Contact Two
              </p>
            </div>
          </div>
        </div>
  
        <div className="w-100 mt-2">
          <p className="fs-6 my-2">Children Details</p>
          <div className="d-flex flex-row gap-1 align-items-center">
            <span className="gainsboro-color font-size-sm">
              Number of students :
            </span>
            <span>{parent_details.parent_details[0].student.length}</span>
          </div>
          {parent_details.parent_details[0].student.map((items, index) => (
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
                      onClick={() => {
                        handleShow();
                      }}
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
                      onClick={() => {
                        handleShow();
                      }}
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
                      onClick={() => {
                        handleShow();
                      }}
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
              <p className="my-0">
                {
                  parent_details.parent_details[0]
                    .preferred_language_of_communication
                }
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
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
                {parent_details.parent_details[0].referral_source}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Referral Source
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
                {parent_details.parent_details[0].referral_source}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Referral Source
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
                {parent_details.parent_details[0].preferred_contact_method}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Preferred Contact Method
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default ParentDetails;