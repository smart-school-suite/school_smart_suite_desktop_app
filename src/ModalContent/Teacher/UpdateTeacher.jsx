function UpdateTeacher() {
    return (
      <>
        <div className="card w-100 border-none">
          <div className="my-2">
            <p className="my-0">Hire Date</p>
            <input type="date" className="form-control" />
          </div>
          <div className="my-2">
            <span className="my-0">Employment Status</span>
            <input type="text" className="form-control" placeholder="Part Time" />
          </div>
          <div className="my-2">
            <span className="my-0">Highest qualification</span>
            <input
              type="date"
              className="form-control"
              placeholder="Bachelors Degree"
            />
          </div>
          <div className="my-2">
            <span className="my-0">Field of study</span>
            <input
              type="text"
              className="form-control"
              placeholder="Software Engineering"
            />
          </div>
          <div className="my-2">
            <span className="my-0">Years experience</span>
            <input type="number" className="form-control" placeholder="5 years" />
          </div>
        </div>
        <div className="w-100 border-top position-relative mt-4 py-2">
          <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
            <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
              Update
            </button>
          </div>
        </div>
      </>
    );
  }
  export default UpdateTeacher;