function Pageloaderspinner() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center height-100 w-100 align-items-center">
        <div className="d-flex flex-row align-items-center justify-content-center place-items-center">
          <div>
            <div
              className="spinner-grow primary-color primary-background"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow primary-color primary-background"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow primary-color primary-background"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow primary-color primary-background"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow primary-color primary-background"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow primary-color primary-background"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pageloaderspinner;

export function SingleSpinner() {
  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
