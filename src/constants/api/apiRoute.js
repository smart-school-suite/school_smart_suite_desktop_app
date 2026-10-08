export const API_BASE_URL = Object.freeze({
  DEV: "http://127.0.0.1:8000/api/v1/",
  STAGE: "https://staging-api.yourdomain.com/api/v1/",
  PROD: "https://api.yourdomain.com/api/v1/",
});

export const API_ENV = Object.freeze({
  DEV: "dev",
  STAGE: "stage",
  PROD: "prod",
});

export const API_ENV_LABEL = Object.freeze({
  [API_ENV.DEV]: "Development",
  [API_ENV.STAGE]: "Staging",
  [API_ENV.PROD]: "Production",
});

export const API_ENV_META = Object.freeze({
  [API_ENV.DEV]: {
    label: API_ENV_LABEL[API_ENV.DEV],
    baseUrl: API_BASE_URL.DEV,
    description: "Local development server for isolated testing and debugging",
    useCase: "Active feature development and unit/integration tests",
  },
  [API_ENV.STAGE]: {
    label: API_ENV_LABEL[API_ENV.STAGE],
    baseUrl: API_BASE_URL.STAGE,
    description: "Pre-production environment mimicking production configuration",
    useCase: "Quality assurance, integration testing, and client preview",
  },
  [API_ENV.PROD]: {
    label: API_ENV_LABEL[API_ENV.PROD],
    baseUrl: API_BASE_URL.PROD,
    description: "Live production environment serving end users",
    useCase: "Live application traffic and production data",
  },
});

export const DEFAULT_API_ENV = API_ENV.DEV;