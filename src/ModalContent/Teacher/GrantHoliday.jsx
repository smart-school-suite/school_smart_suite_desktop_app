function HolidayGrant() {
  return (
    <>
      <div className="w-100">
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero natus unde, libero
        </p>
        <div className="my-2">
          <span>Start Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>
            End Date
            <span className="gainsboro-color font-size-sm">
              
              Expected Return Date
            </span>
          </span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>Notes</span>
          <textarea
            placeholder="Enter the reason"
            className="form-control"
          ></textarea>
        </div>
        <div className="my-2">
          <div className="w-100 border-top position-relative mt-4 py-2">
            <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
              <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
                Grant Holiday
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HolidayGrant;