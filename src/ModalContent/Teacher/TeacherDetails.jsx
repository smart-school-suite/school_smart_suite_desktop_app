function TeacherDetails({ row_id }) {
    const { data:teacher_details, isLoading, error } = useFetchTeacherDetailsQuery({
       teacher_id:row_id
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
                    <img src="./images/portrait-six.jpg" alt="" />
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
                  <h5 className="fw-bold">{teacher_details.teacher_details[0].name}</h5>
                  <div className="d-flex flex-row my-1 gainsboro-color">
                    <span>Yaounde, Cameroon</span>
                  </div>
                  <div className="d-flex flex-row gap-2 mt-2 align-items-center">
                    <span className="font-size-sm fw-medium">
                      @Gilbert.Bernhard57
                    </span>
                    <div className="divider-pill"></div>
                    <span className="font-size-sm fw-medium">
                     { teacher_details.teacher_details[0].field_of_study }
                    </span>
                    <div className="divider-pill"></div>
                    <span className="font-size-sm gainsboro-color">
                      {teacher_details.teacher_details[0].employment_status}
                    </span>
                  </div>
                </div>
              </div>
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
              <p className="my-0">{teacher_details.teacher_details[0].email}</p>
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
              <Icon icon="ph:phone" />
            </button>
            <div className="border-bottom py-2 d-block" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].phone_one}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Contact one
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
              <Icon icon="ph:phone" />
            </button>
            <div className="border-bottom py-2 d-block" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].phone_two}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Contact two
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 my-2">
          <p className="fs-6 my-2">Address</p>
          <div className="d-flex align-items-center justify-content-between my-1">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="icon-park-outline:address-book" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].address}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Home Address
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 my-2">
          <p className="fs-6 my-2">Qualifacations</p>
          <div className="d-flex align-items-center justify-content-between my-1">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="carbon:education" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].highest_qualification}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Highest School Certificate
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
              <Icon icon="fluent-mdl2:calendar-year" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].field_of_study}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Field Of Study
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 my-2">
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
              <Icon icon="tabler:gender-male" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].cultural_background}</p>
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
          <div className="d-flex align-items-center justify-content-between my-1">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="solar:calendar-date-linear" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].religion}</p>
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
              <Icon icon="solar:calendar-date-linear" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].date_of_birth}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Date of Birth
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 my-2">
          <p className="fs-6 my-2">Work Details</p>
          <div className="d-flex align-items-center justify-content-between my-1">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="tabler:gender-male" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].employment_status}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Employment Status
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
              <Icon icon="solar:calendar-date-linear" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].hire_date}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Hire Date
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
              <Icon icon="solar:calendar-date-linear" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{Number(teacher_details.teacher_details[0].salary)} $</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Salary
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
              <Icon icon="solar:calendar-date-linear" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].highest_qualification}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Qualification
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
              <Icon icon="solar:calendar-date-linear" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{Number(teacher_details.teacher_details[0].years_experience)}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Years of Experience
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 my-2">
          <p className="fs-6 my-2">Emergency Contact Details</p>
          <div className="d-flex align-items-center justify-content-between my-1">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="carbon:education" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].emergency_contact_name}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Emergency Contact Name
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
              <Icon icon="fluent-mdl2:calendar-year" />
            </button>
            <div className="border-bottom py-2" style={{ width: "87%" }}>
              <p className="my-0">{teacher_details.teacher_details[0].emergency_contact_phone}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
               Emergency Contact Phone
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default TeacherDetails;