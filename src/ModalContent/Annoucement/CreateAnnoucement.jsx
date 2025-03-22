 function CreateAnnoucement() {
    return (
      <>
        <div>
          <span className="font-size-lg">Create Annoucement</span>
          <div className="my-1">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Annoucement Title"
            />
          </div>
          <div className="my-1">
            <label htmlFor="title">Message</label>
            <textarea
              name=""
              id=""
              className="form-control"
              placeholder="Enter Annoucement Message"
            ></textarea>
          </div>
          <div className="my-1">
            <label htmlFor="Select Target">Select Target</label>
            <select name="" id="" className="form-select">
              <option value="">asdasdas</option>
              <option value="">asdasdas</option>
              <option value="">asdasdas</option>
              <option value="">asdasdas</option>
            </select>
          </div>
        </div>
      </>
    );
  }
 export default CreateAnnoucement; 