import { useNavigate } from "react-router-dom";
function Greenbutton(props) {
  const navigate = useNavigate();
  return (
    <>
      <button 
      className={`action-btn  border-none justify-content-center fw-medium d-flex flex-row rounded-3 align-items-center  text-white font-size-sm ${props.bg}`}
       onClick={() => {
         navigate(props.route)
       }}
      >
        {props.lable}
      </button>
    </>
  );
}
export default Greenbutton;
