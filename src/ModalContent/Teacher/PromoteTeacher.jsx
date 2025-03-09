function PromoteTeacher() {
    return (
      <>
        <div>
          <p className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
            unde, libero
          </p>
          <div className="my-2">
            <div className="d-flex w-100 flex-row  gap-2 align-items-center">
              <div className="w-50">
                <span>Current Position</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="school buser"
                />
              </div>
              <div className="w-50">
                <span>New Position</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="school buser"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="w-100">
                <span>New Salary</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter new salary"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="w-100">
                <span>Select New Role</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Manager"
                />
              </div>
            </div>
            <div className="my-2">
              <div className="w-100">
                <span>
                  Congratulatory Message
                  <span className="font-size-sm gainsboro-color">Optional</span>
                </span>
                <div className="w-100">
                  <textarea
                    placeholder="Enter congratulatory message"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 border-top position-relative mt-4 py-2">
          <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
            <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
              Promote
            </button>
          </div>
        </div>
      </>
    );
  }
  export default PromoteTeacher;