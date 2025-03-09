function Details({ row_id }) {
    const {
      data: resit_details,
      isLoading,
      error,
    } = useFetchStudentResitDetailsQuery({
      resit_id: row_id,
    });
  
    if (isLoading) {
      return <Pageloaderspinner />;
    }
    return (
      <>
        <div className="w-100 mt-2">
          <p className="font-size-sm gainsboro-color my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum id
            excepturi cumque facere, asperiores
          </p>
          <span>Financial Detials</span>
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
                {formatNumber(Number(resit_details.resit_details[0].resit_fee))} ₣
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Resit Cost
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
              <p className="my-0">{resit_details.resit_details[0].paid_status}</p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Payment Status
              </p>
            </div>
          </div>
          <span>Course Details</span>
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
                {resit_details.resit_details[0].courses.course_title}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Course Title
              </p>
            </div>
          </div>
          <span>Exam Details</span>
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
                {resit_details.resit_details[0].exam.examtype.exam_name}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Exam Name
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }