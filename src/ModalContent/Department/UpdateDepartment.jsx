function UpdateDepartment() {
    return (
      <>
        <div className="card w-100 border-none">
          <div className="my-1">
            <p className="my-0">Department Name</p>
            <input type="text" className="form-control" placeholder="Jhone Doe" />
          </div>
          <div className="my-1">
            <span className="my-0">Max Number of Students</span>
            <input type="number" className="form-control" placeholder="500" />
          </div>
          <div className="my-1">
            <span className="my-0">Date of Establishment</span>
            <input type="date" className="form-control" />
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
export default UpdateDepartment;
