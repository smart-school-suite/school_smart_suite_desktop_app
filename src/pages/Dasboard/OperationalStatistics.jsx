import OperationalDashboardCard from "../../components/OperationalDashboard/Card";
import StudentDropoutRate from "../../components/OperationalDashboard/StudentDropoutRate";
import StudentLevelDropoutRate from "../../components/OperationalDashboard/StudentLevelDropoutRate";
import StudentRegistrationLevelCard from "../../components/OperationalDashboard/StudentLevelRegistrationCard";
import StudentRegistrationCard from "../../components/OperationalDashboard/StudentRegistrationCard";
import TotalStudents from "../../components/OperationalDashboard/TotalStudent";
function OperationalStatistics() {
  return (
    <>
      <div>
        <div className="dashboard-content-box d-flex flex-column gap-3 px-2">
          <section>
            <TotalStudents />
          </section>
          <section>
            <OperationalDashboardCard />
          </section>
          <section>
            <div className="d-flex flex-row gap-3">
              <StudentRegistrationCard />
              <StudentRegistrationLevelCard />
            </div>
          </section>
          <section>
            <div className="d-flex flex-row w-100 gap-3">
              <StudentLevelDropoutRate />
              <StudentDropoutRate />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default OperationalStatistics;
