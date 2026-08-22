import { Drawer } from "../../components/drawer/Drawer";
import React, { useState } from 'react';
import CreateTeacher from "../../DrawerContent/Teacher/CreateTeacher";
function ExamTimetable() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg transition-all"
      >
        Open Settings
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Account Settings"
        placement="right"
      >
        <CreateTeacher />
      </Drawer>
    </div>
    </>
  );
}
export default ExamTimetable;
