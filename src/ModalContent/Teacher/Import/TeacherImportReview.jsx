import { Icon } from "@iconify/react";
import Table from "../../../components/Tables/Tables";
import { teacherImportColDefs } from "../../../utils/table/colDefs/teachers/teacherImportColdefs";
import { useRef } from "react";
function TeacherImportReview({
  handleClose,
  nextStep,
  previousStep,
  currentStep,
  fullStep,
}) {
  const tableRef = useRef();
  const mockData = [
    {
      email: "paul.nguemo@yahoo.fr",
      first_name: "Paul",
      last_name: "Nguemo",
      name: "Paul Nguemo",
      phone: "+237 699 123 456",
      gender: "Male",
      address: "Quartier Mvog-Mbi, Yaoundé, Cameroon",
    },
    {
      email: "marie.abena@gmail.com",
      first_name: "Marie",
      last_name: "Abena",
      name: "Marie Abena",
      phone: "+237 677 987 654",
      gender: "Female",
      address: "Rue de la Paix, Douala, Cameroon",
    },
    {
      email: "jean.kouadio@yahoo.com",
      first_name: "Jean",
      last_name: "Kouadio",
      name: "Jean Kouadio",
      phone: "+237 698 345 789",
      gender: "Male",
      address: "Bastos, Yaoundé, Cameroon",
    },
    {
      email: "esther.ngono@gmail.com",
      first_name: "Esther",
      last_name: "Ngono",
      name: "Esther Ngono",
      phone: "+237 655 234 567",
      gender: "Female",
      address: "Bonamoussadi, Douala, Cameroon",
    },
    {
      email: "michel.mbarga@outlook.com",
      first_name: "Michel",
      last_name: "Mbarga",
      name: "Michel Mbarga",
      phone: "+237 678 876 543",
      gender: "Male",
      address: "Mendong, Yaoundé, Cameroon",
    },
    {
      email: "francoise.ndongo@yahoo.fr",
      first_name: "Françoise",
      last_name: "Ndongo",
      name: "Françoise Ndongo",
      phone: "+237 699 456 789",
      gender: "Female",
      address: "Bonanjo, Douala, Cameroon",
    },
    {
      email: "joseph.biya@gmail.com",
      first_name: "Joseph",
      last_name: "Biya",
      name: "Joseph Biya",
      phone: "+237 676 543 210",
      gender: "Male",
      address: "Etoa-Meki, Yaoundé, Cameroon",
    },
    {
      email: "catherine.essomba@yahoo.com",
      first_name: "Catherine",
      last_name: "Essomba",
      name: "Catherine Essomba",
      phone: "+237 697 654 321",
      gender: "Female",
      address: "Akwa, Douala, Cameroon",
    },
  ];
  return (
    <>
      <div className="d-flex flex-column font-size-sm gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Import Teacher</span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClose && handleClose()}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>

        <div className="d-flex flex-row justify-content-end">
          <span>
            {currentStep} of {fullStep} completed
          </span>
        </div>

        <div>
          <span className="fw-medium">Review teacher data </span>
          <p className="text-muted m-0">
            Check your data and resolve any issues before importing.
          </p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex row align-items-center gap-2 align-items-center text-center">
            <span>rows</span>
            <span className="fw-bold">126 </span>
          </div>
          <div className="d-flex row align-items-center gap-2 align-items-center text-center">
            <span> Ready</span>
            <span className="fw-bold">118</span>
          </div>
          <div className="d-flex row align-items-center gap-2 align-items-center text-center">
            <span>rows</span>
            <span className="fw-bold">126 </span>
          </div>
          <div className="d-flex row align-items-center gap-2 align-items-center text-center">
            <span>Warnings</span>
            <span className="fw-bold">6 </span>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <button className="font-size-sm border-none border bg-transparent px-2 py-1 rounded-3">
                All 126
              </button>
              <button className="font-size-sm border-none border bg-transparent px-2 py-1 rounded-3">
                Ready 118
              </button>
              <button className="font-size-sm border-none border bg-transparent px-2 py-1 rounded-3">
                Warnings 6
              </button>
              <button className="font-size-sm border-none border bg-transparent px-2 py-1 rounded-3">
                Errors 2
              </button>
            </div>
            <input
              type="search"
              className="form-control font-size-sm w-50"
              placeholder="Search......."
            />
          </div>
          <div style={{ height: "48dvh" }}>
            <Table
              colDefs={teacherImportColDefs()}
              rowData={mockData}
              ref={tableRef}
            />
          </div>
        </div>
        <div className="mt-auto">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <button
              className="border-none bg-transparent d-flex flex-row align-items-center gap-2"
              onClick={() => previousStep()}
            >
              <span style={{ lineHeight: 0 }}>
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  width={16}
                  height={16}
                />
              </span>
              <span>Back</span>
            </button>
            <button
              className="border-none border primary-background font-size-sm text-white p-2 rounded-3"
              onClick={() => nextStep()}
            >
              Import 118 teachers
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default TeacherImportReview;
