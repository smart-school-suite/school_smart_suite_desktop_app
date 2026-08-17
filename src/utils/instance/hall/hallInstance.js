import { v4 as uuidv4 } from "uuid";
const hallTypeInstance = {
  id: uuidv4(),
  mapping: {
    type: {
      value: "",
      error: null,
      source: "automatic",
    },
  },
};

export { hallTypeInstance }