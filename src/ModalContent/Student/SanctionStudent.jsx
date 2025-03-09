function SanctionStudent(){
  return(
    <>
        <div className="w-100">
      <p className="my-0 font-size-sm gainsboro-color">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo cum, incidunt omnis id assumenda culpa a 
        perspiciatis temporibus
      </p>
      <div className="my-2">
        <span>Reason For Sanction</span>
        <textarea className="form-control"
         placeholder="Enter Reason For Dismisale"
        ></textarea>
      </div>
      <div className="my-2">
        <span></span>
        <input type="check" className="form-control"/>
      </div>
      <div className="my-2">
        <span>Attach Any Document</span>
        <input type="text" className="form-control"/>
      </div>
      <div className="mt-4">
         <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm">
               Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white">
               Continue
            </button>
         </div>
       </div>
    </div>
    </>
  )
}
export default SanctionStudent;