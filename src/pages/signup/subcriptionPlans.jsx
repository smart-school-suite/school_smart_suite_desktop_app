import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchPricingRatesQuery } from "../../Slices/Asynslices/fetchSlice";
import { setUserInput, setRates } from "../../Slices/Asynslices/subcriptionPricingSlice";
import Pageloaderspinner from "../../components/Spinners";
import NumberFlow from "@number-flow/react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { SingleSpinner } from "../../components/Spinners";
function SubcriptionPlan() {
	const dispatch = useDispatch();
  const navigate = useNavigate();
  const school_id = localStorage.getItem("SCHOOL_KEY")
	const { userInput, calculatedCost, ranges } = useSelector((state) => state.pricing);
  const { handleSubscription, loading, createError } = useAuth();
	const { data: rates, isLoading, isError, error } = useFetchPricingRatesQuery();
   
  const handleSubcription = async (billing_type) => {
    await handleSubscription(navigate, {
       school_id:school_id,
       rates_card_id:calculatedCost.activeRateId,
       billing_frequency:billing_type,
       num_students:Number(userInput.students)
    }); 
  }
	useEffect(() => {
	  if (rates) {
		dispatch(setRates(rates.rates)); 
	  }
	}, [rates, dispatch]);
  
	if (isLoading) return <Pageloaderspinner />;
	if (isError)
	  return (
		<div className="alert alert-warning">
		  Error: {error?.data?.message || "Failed to fetch rates"}
		</div>
	  );
  return (
    <>
      <div className="container">
        <h1 className="fw-bold text-center mt-4">
          Choose The Best Plan for you
        </h1>
        <div className="mt-5 d-flex flex-row justify-content-center">
			<div className="my-2 w-75">
				<span>Number of students</span>
				<input type="number" className="form-control w-100" 
				  placeholder="10, 20, 30"
                  min={ranges[0]?.min || 0}
                  max={ranges[ranges.length - 1]?.max || 100}
                  value={userInput.students}
                  onChange={(e) => dispatch(setUserInput({ students: +e.target.value }))}
				/>
			</div>

        </div>
        {createError.subscribe && (
              <div className="alert alert-danger">{createError.subscribe}</div>
            )}
        <div className="d-flex gap-3 mt-5 flex-row justify-content-center">
          <div className=" card p-3 rounded-4" style={{ width: "32%" }}>
            <h4 className="fw-semibold mb-4">Monthly Plan</h4>
            <span className="gainsboro-color font-size-sm mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus aliquid sequi, nemo distinctio
            </span>
            <h1 className="my-3 fw-bold" style={{ fontSize: "2.5rem" }}>
             ₣ <NumberFlow value={calculatedCost.monthlyCost.toFixed(2)} />/
              <span className="font-size-md gainsboro-color fw-medium">
                Month
              </span>
            </h1>
            <div className="d-flex flex-row align-items-center d-flex flex-row justify-content-between py-1 border-bottom align-items-center mb-2 mt-4 gap-2">
              <div className="d-flex flex-row gap-2">
                <span>
                  <Icon icon="ri:parent-line" />
                </span>
                <span>Max Number of Parents</span>
              </div>
              <span><NumberFlow value={userInput.students * 2} /></span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between py-1 d-flex flex-row border-bottom align-items-center mb-2 gap-2">
              <div className="d-flex flex-row gap-2">
                <span>
                  <Icon icon="hugeicons:teacher" />
                </span>
                <span>Max Number of Teachers</span>
              </div>
              <span>100</span>
            </div>
            <div className="d-flex flex-row align-items-center d-flex justify-content-between py-1 flex-row align-items-center mb-2 gap-2">
              <div className="d-flex flex-row gap-2">
                <span>
                  <Icon icon="ri:admin-line" />
                </span>
                <span>Max Number of Administrators</span>
              </div>
              <span>100</span>
            </div>
            <div className="w-100 mt-3">
              <button className="border-none p-2 w-100 rounded-3 primary-background text-white font-size-md"
               onClick={() => {
                handleSubcription("monthly");
               }}
               disabled={loading.subscribe}
              >
                {loading.subscribe ? <SingleSpinner /> : "Proceed To Checkout"}
              </button>
            </div>
          </div>
          <div className=" card p-3 rounded-4" style={{ width: "32%" }}>
            <h4 className="fw-semibold mb-4">Yearly Plan</h4>
            <span className="gainsboro-color font-size-sm mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus aliquid sequi, nemo distinctio
              {calculatedCost.activeRateId}
            </span>
            <h1 className="my-3 fw-bold" style={{ fontSize: "2.5rem" }}>
            ₣ <NumberFlow value={calculatedCost.yearlyCost.toFixed(2)}/>/
              <span className="font-size-md gainsboro-color fw-medium">
                Year
              </span>
            </h1>
            <div className="d-flex flex-row align-items-center d-flex flex-row justify-content-between py-1 border-bottom align-items-center mb-2 mt-4 gap-2">
              <div className="d-flex flex-row gap-2">
                <span>
                  <Icon icon="ri:parent-line" />
                </span>
                <span>Max Number of Parents</span>
              </div>
              <span><NumberFlow value={userInput.students * 2} /></span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between py-1 d-flex flex-row border-bottom align-items-center mb-2 gap-2">
              <div className="d-flex flex-row gap-2">
                <span>
                  <Icon icon="hugeicons:teacher" />
                </span>
                <span>Max Number of Teachers</span>
              </div>
              <span>100</span>
            </div>
            <div className="d-flex flex-row align-items-center d-flex justify-content-between py-1 flex-row align-items-center mb-2 gap-2">
              <div className="d-flex flex-row gap-2">
                <span>
                  <Icon icon="ri:admin-line" />
                </span>
                <span>Max Number of Administrators</span>
              </div>
              <span>100</span>
            </div>
            <div className="w-100 mt-3">
              <button className="border-none p-2 w-100 rounded-3 primary-background text-white font-size-md"
                onClick={() => {
                  handleSubcription("yearly");
                }}
                disabled={loading.subscribe}
              >
                {loading.subscribe ? <SingleSpinner /> : "Proceed To Checkout"}
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SubcriptionPlan;
