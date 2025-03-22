function TuitionFeeDetails({ row_id }) {
    const {
      data: student_details,
      isLoading,
      error,
    } = useFetchStudentDetailsQuery({
      student_id: row_id,
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
          <span>Fee Debt</span>
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
                {formatNumber(
                  Number(student_details.student_details[0].specialty.school_fee)
                )}
                <span> ₣</span>
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Expected Tuition Fee to be paid
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
                {formatNumber(
                  Number(
                    student_details.student_details[0].specialty.school_fee
                  ) +
                    Number(
                      student_details.student_details[0].specialty
                        .registration_fee
                    ) -
                    Number(student_details.student_details[0].total_fee_debt)
                )}{" "}
                ₣{" "}
              </p>
              <p
                className="my-0 font-size-sm gainsboro-color"
                onClick={() => {
                  handleShow();
                }}
              >
                Amount Paid
              </p>
            </div>
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
              {formatNumber(
                Number(student_details.student_details[0].total_fee_debt)
              )}
              <span> ₣</span>
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Outstanding Debt
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
              {student_details.student_details[0].fee_status}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Fee Debt Status
            </p>
          </div>
        </div>
        <span>Student Details</span>
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
            <p className="my-0">{student_details.student_details[0].name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Fee Debt Status
            </p>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end my-2 w-100">
          <button className="border-none rounded-3  w-25 p-2 text-white primary-background text-white">
            Close
          </button>
        </div>
      </>
    );
  }
  export default TuitionFeeDetails;