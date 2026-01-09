import TotalStudents from "../../components/OperationalDashboard/TotalStudent";
import OperationalDashboardCard from "../../components/OperationalDashboard/Card";
import StudentRegistrationCard from "../../components/OperationalDashboard/StudentRegistrationCard";
import StudentRegistrationLevelCard from "../../components/OperationalDashboard/StudentLevelRegistrationCard";
import StudentLevelDropoutRate from "../../components/OperationalDashboard/StudentLevelDropoutRate";
import StudentDropoutRate from "../../components/OperationalDashboard/StudentDropoutRate";
function OperationalStatistics() {
  const currentYear = new Date().getFullYear();
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
