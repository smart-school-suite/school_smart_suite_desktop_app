function Greenbutton(props) {
  return (
    <>
      <button className="action-btn border-none justify-content-center fw-medium d-flex flex-row rounded-3 align-items-center green-bg text-white font-size-sm ">
        {props.lable}
      </button>
    </>
  );
}
export default Greenbutton;
