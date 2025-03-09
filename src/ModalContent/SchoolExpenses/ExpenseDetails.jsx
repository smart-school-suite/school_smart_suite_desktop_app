function ExpenseDetails({ row_id }) {
  const {
    data: expenses_details,
    isLoading,
    error,
  } = useFetchExpensesDetailsQuery({
    expense_id: row_id,
  });
  useEffect(() => {
    if (expenses_details) {
      console.table(expenses_details.expenses_details);
    }
    if (error) {
      console.error("Error fetching parents:", error);
    }
  }, [expenses_details, error]);

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
            <p className="my-0">{expenses_details.expenses_details[0].title}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Expenses Title
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
                Number(expenses_details.expenses_details[0].amount)
              )}
              $
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Amount
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
              {formatDate(expenses_details.expenses_details[0].date)}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Date of spending
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
              {expenses_details.expenses_details[0].description}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Descriptions
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
              {
                expenses_details.expenses_details[0].schoolexpensescategory
                  .names
              }
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Descriptions
            </p>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end my-2 w-100">
          <button className="border-none rounded-3  w-25 p-2 text-white primary-background text-white">
            Close
          </button>
        </div>
      </div>
    </>
  );
}
export default ExpenseDetails;
