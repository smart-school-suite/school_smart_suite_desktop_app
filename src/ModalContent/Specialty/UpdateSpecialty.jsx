function UpdateSpecialty({ row_id, handleClose }) {
    return (
      <>
        <div className="card w-100 border-none">
          <div className="d-flex flex-row align-items-center">
            <div className="block">
              <h5>Update Specailty</h5>
              <span className="gainsboro-color font-size-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                harum nesciunt sunt
              </span>
            </div>
          </div>
          <div className="my-1">
            <SpecialtyTitleInput />
          </div>
          <div className="my-1">
            <RegistrationFeeInput />
          </div>
          <div className="my-1">
            <SchoolFeeInput />
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50">
              Update
            </button>
          </div>
        </div>
      </>
    );
  }
  export default UpdateSpecialty;