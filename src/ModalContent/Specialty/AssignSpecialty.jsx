function AssignSpecialty() {
    return (
      <>
        <div className="w-100">
          <p className="my-3 gainsboro-color" style={{ fontSize: "0.85rem" }}>
            This action cannot be undone. This will Permanently delete This
            account and remove this account data from our servers
          </p>
          <div className="my-2">
            <span>Assign HOD </span>
            <input
              type="text"
              className="form-control"
              placeholder="Select HOD Head of department"
            />
          </div>
          <div className="my-2">
            <span>Assign HOD </span>
            <input
              type="text"
              className="form-control"
              placeholder="Select HOD Head of department"
            />
          </div>
          <div className="my-2">
            <span>Assign HOD </span>
            <input
              type="text"
              className="form-control"
              placeholder="Select HOD Head of department"
            />
          </div>
          <div className="mt-4">
            <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
              <button className="border-none px-3 py-2 rounded-3 w-100 font-size-sm primary-background text-white">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default AssignSpecialty;