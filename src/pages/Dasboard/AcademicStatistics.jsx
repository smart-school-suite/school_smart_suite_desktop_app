import AcademicCardStats from "../../components/AcademicDashboard/Card";
import SchoolAverageGpa from "../../components/AcademicDashboard/SchoolAverageGpa";
function AcademicStatistics() {
  return (
    <>
      <div>
        <div className="dashboard-content-box d-flex flex-column gap-3 px-2">
          <section>
            <SchoolAverageGpa />
          </section>
          <section>
            <AcademicCardStats />
          </section>
          <section>
            <div className="d-flex flex-row gap-3">
                <div
              className="d-flex flex-row gap-3"
              style={{ height: "40dvh", width:"45%" }}
            >
              <div className="bg-white rounded-4 w-100 h-100 p-3 d-flex flex-column">
                 <h1>Resit Success Rate</h1>
              </div>
            </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default AcademicStatistics;
