import DateFilterPopOver from "../../ModalContent/Filter/DateFilterPopOver";
import NumberFilterPopOver from "../../ModalContent/Filter/NumberFilterPopOver";
import TextFilterPopOver from "../../ModalContent/Filter/TextFilterPopOver";

const filterPopOverMap = [
  {
    cellDataType: "number",
    component: NumberFilterPopOver,
  },
  {
    cellDataType: "text",
    component: TextFilterPopOver,
  },
  {
    cellDataType: "dateString",
    component: DateFilterPopOver,
  },
];

export default filterPopOverMap;
