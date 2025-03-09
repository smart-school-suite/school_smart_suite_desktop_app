function UpdateStudent(){
    return(
      <>
        <div className="card w-100 border-none">
         <div className="my-1">
           <p className="my-0">Specialty</p>
           <input type="text" className="form-control" placeholder="Software Engineering" />
         </div>
         <div className="my-1">
           <span className="my-0">Department</span>
           <input
             type="text"
             className="form-control"
             placeholder="Department of Engineering"
           />
         </div>
         <div className="my-1">
           <span className="my-0">Level</span>
           <input
             type="text"
             className="form-control"
             placeholder="Level 400"
           />
         </div>
         <div className="my-1">
           <span className="my-0">Guardian One</span>
           <input
             type="text"
             className="form-control"
             placeholder="Select Parent"
           />
         </div>
         <div className="my-1">
           <span className="my-0">Guardian Two</span>
           <input
             type="text"
             className="form-control"
             placeholder="Select Parent"
           />
         </div>
         <div className="my-1">
           <span className="my-0">Student Batch</span>
           <input
             type="text"
             className="form-control"
             placeholder="Batch of great Archievement"
           />
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
    )
  }
  export default UpdateStudent;