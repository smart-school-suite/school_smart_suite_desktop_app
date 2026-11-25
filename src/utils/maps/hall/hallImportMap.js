import HallImportTrigger from "../../../importTrigger/Hall/HallImportTrigger";
import SpecialtyHallImportTrigger from "../../../importTrigger/Hall/SpecialtyHallImportTrigger";

/** The import each page of the Hall layout offers. */
export const HALL_IMPORT_TRIGGER_MAP = {
  "/hall": { component: HallImportTrigger },
  "/specialty-hall": { component: SpecialtyHallImportTrigger },
};
