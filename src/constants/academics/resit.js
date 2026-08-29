export const RESIT = Object.freeze({
  RESIT: "resit",
  NO_RESIT: "no_resit",
  HIGH_RESIT_POTENTIAL: "high_resit_potential",
  LOW_RESIT_POTENTIAL: "low_resit_potential",
});

export const RESIT_LABEL = Object.freeze({
  [RESIT.RESIT]: "Resit",
  [RESIT.NO_RESIT]: "No Resit",
  [RESIT.HIGH_RESIT_POTENTIAL]: "High Resit Potential",
  [RESIT.LOW_RESIT_POTENTIAL]: "Low Resit Potential",
});

export const RESIT_META = Object.freeze({
  [RESIT.RESIT]: {
    label: RESIT_LABEL[RESIT.RESIT],
    description: "Student is officially required to take a resit exam",
    useCase: "Active resit assignment tracking",
  },
  [RESIT.NO_RESIT]: {
    label: RESIT_LABEL[RESIT.NO_RESIT],
    description: "Passing grade achieved, no resit required",
    useCase: "Standard course completion status",
  },
  [RESIT.HIGH_RESIT_POTENTIAL]: {
    label: RESIT_LABEL[RESIT.HIGH_RESIT_POTENTIAL],
    description: "Performance close to the threshold, high risk of failing",
    useCase: "Early academic intervention and warnings",
  },
  [RESIT.LOW_RESIT_POTENTIAL]: {
    label: RESIT_LABEL[RESIT.LOW_RESIT_POTENTIAL],
    description: "Comfortable standing above the passing mark",
    useCase: "General student performance analytics",
  },
});

export const DEFAULT_RESIT = RESIT.NO_RESIT;