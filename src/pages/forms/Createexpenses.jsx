import Navbar from "../../components/Navbar";
import Greenbutton from "../../components/Buttons";
function Createexpenses(){
    return(
        <>
         <Navbar 
           path_one="/create-expense"
           lable_one="Create Expenses"
           path_two="/financial-analysis"
           lable_two="Financial Analysis"
        />
         <div className="d-flex flex-row align-items-end mt-4 justify-content-between w-100 px-2">
            <h5>Create New Expenses</h5>
            <div>
            <Greenbutton 
              lable="back"
              bg="green-bg"
            />
            </div>
         </div>
         <div className="card w-100 mt-3 rounded-4 py-2 px-3">
          <div className="heading my-1">
            <h4 className="text-center">Create New Expenses</h4>
          </div>
          <div className="my-1">
            <label>Expenses Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Department Name"
            />
          </div>
          <div className="d-flex flex-row gap-2 w-100">
            <div className="my-2 w-100">
              <label>Expenses Category</label>
              <input
                type="email"
                className="form-control"
                placeholder="select Category"
              />
            </div>
          </div>
          <div className="d-flex flex-row gap-2 w-100">
            <div className="my-2 w-100">
              <label>Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div className="d-flex flex-row gap-2 w-100">
            <div className="my-2 w-100">
              <label>Status</label>
              <input
                type="select"
                className="form-control"
                placeholder="Select Status"
              />
            </div>
          </div>
          <div className="mb-2 mt-3">
            <button className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background">
              Create Expenses
            </button>
          </div>
        </div>
        </>
    )
}
export default Createexpenses;