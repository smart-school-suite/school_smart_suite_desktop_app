import { v4 as uuidv4 } from "uuid";
const QualificationInstance = {
  id: uuidv4(),
  mapping: {
    qualification: {
      value: "",
      error: null,
      source: "automatic",
    },

    field_of_study: {
      value: "",
      error: null,
      source: "automatic",
    },
    institution: {
      value: "",
      error: null,
      source: "automatic",
    },
    year: {
      value: "",
      error: null,
      source: "automatic",
    },
  },
};

const AllowedLevelInstance = {
  id: uuidv4(),
  mapping: {
    allowed_level: {
      value: "",
      error: null,
      source: "automatic",
    },
  },
};

export { QualificationInstance, AllowedLevelInstance }