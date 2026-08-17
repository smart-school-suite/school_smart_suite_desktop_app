import { v4 as uuidv4 } from "uuid";
const courseTypeInstance = {
  id: uuidv4(),
  mapping: {
    type: {
      value: "",
      error: null,
      source: "automatic",
    },
  },
};

export { courseTypeInstance }