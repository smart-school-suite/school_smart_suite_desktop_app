import DateFilterInput from "../../components/FilterInput/DateFilterInput";
import DateRangeFilterInput from "../../components/FilterInput/DateRangeFilterInput";
import NumberFilterInput from "../../components/FilterInput/NumberFilterInput";
import NumberRangeFilterInput from "../../components/FilterInput/NumberRangeFilterInput";
import TextFilterInput from "../../components/FilterInput/TextFilterInput";

const filterInputMap = [
  {
    con_1: "text",
    component: TextFilterInput,
  },
  {
    con_1: "dateString",
    component: DateFilterInput,
  },
  {
    con_1: "number",
    component: NumberFilterInput,
  },
  {
    con_1: "number",
    con_2: "between",
    component: NumberRangeFilterInput,
  },
  {
    con_1: "dateString",
    con_2: "between",
    component: DateRangeFilterInput,
  },
];

export default filterInputMap;
