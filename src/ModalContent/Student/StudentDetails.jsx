function StudentDetails({ row_id }){
  const { data: student_details, error, isLoading } = useFetchStudentDetailsQuery({
      student_id:row_id
  })

  if (isLoading) {
    return <Pageloaderspinner />;
  }
   return(
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
                <h5 className="fw-bold">{student_details.student_details[0].name}</h5>
                <div className="d-flex flex-row my-1 gainsboro-color">
                  <span>{student_details.student_details[0].specialty.specialty_name}</span>
                </div>
                <div className="d-flex flex-row gap-2 mt-2 align-items-center">
                  <span className="font-size-sm fw-medium">
                    @Gilbert.Bernhard57
                  </span>
                  <div className="divider-pill"></div>
                  <span className="font-size-sm fw-medium">
                    {student_details.student_details[0].level.name}
                  </span>
                  <div className="divider-pill"></div>
                  <span className="font-size-sm gainsboro-color">
                  {timeSince(student_details.student_details[0].last_login_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 mt-2">
        <p className="fs-6 my-2">Fee Status</p>
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
            <p className="my-0">{student_details.student_details[0].fee_status}</p>
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
            <p className="my-0">{student_details.student_details[0].DOB}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Date of Birth (DOB)
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
            <p className="my-0">{student_details.student_details[0].religion}</p>
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
            <Icon icon="ph:phone" />
          </button>
          <div className="border-bottom py-2 d-block" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].gender}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Gender
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
            <p className="my-0">{student_details.student_details[0].email}</p>
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
            <p className="my-0">{student_details.student_details[0].phone_one}</p>
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
            <p className="my-0">{student_details.student_details[0].phone_two}</p>
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

      <div className="academic-details">
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Academic Details</p>
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
            <p className="my-0">{student_details.student_details[0].specialty.specialty_name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Specialty
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
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
            <p className="my-0">{student_details.student_details[0].department.department_name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Department
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
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
            <p className="my-0">{student_details.student_details[0].level.name}, {student_details.student_details[0].level.level}</p>
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

      <div className="w-100 my-2">
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
            <p className="my-0">{student_details.student_details[0].student_batch.name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Student Batch
            </p>
          </div>
        </div>
      </div>
       
      <div className="w-100 my-2">
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
            <p className="my-0">{convertToReadableDate(student_details.student_details[0].student_batch.graduation_date)}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Latest Graduation Date
            </p>
          </div>
        </div>
      </div>
      </div>

      <div className="parent-details">
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Guardian/Parent Details</p>
        <p className="font-size-sm gainsboro-color my-2">Guardian One</p>
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
            <p className="my-0">{student_details.student_details[0].guardian_one.name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Name of Guardian One
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.email}</p>
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.address}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.phone_one}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.phone_two}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.relationship_to_student}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Relationship To Student
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.preferred_contact_method}</p>
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
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Guardian/Parent Details</p>
        <p className="font-size-sm gainsboro-color my-2">Guardian Two</p>
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
            <p className="my-0">{student_details.student_details[0].guardian_two.name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Name of Guardian One
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.email}</p>
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.address}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.phone_one}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.phone_two}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.relationship_to_student}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Relationship To Student
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
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.preferred_contact_method}</p>
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
      </div>
    </>
   )
}
export default StudentDetails;
