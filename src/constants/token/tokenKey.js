export const TOKEN_KEY = Object.freeze({
  AUTH_TOKEN: "auth_token",
  OTP_TOKEN: "otp_token",
  PASSWORD_RESET_TOKEN: "password_reset_token"
});

export const TOKEN_KEY_LABEL = Object.freeze({
  [TOKEN_KEY.AUTH_TOKEN]: "Authentication Token",
  [TOKEN_KEY.OTP_TOKEN]: "OTP Token",
  [TOKEN_KEY.PASSWORD_RESET_TOKEN]: "Password Reset Token",
});

export const TOKEN_KEY_META = Object.freeze({
  [TOKEN_KEY.AUTH_TOKEN]: {
    label: TOKEN_KEY_LABEL[TOKEN_KEY.AUTH_TOKEN],
    description: "Laravel Sanctum API personal access token used to authenticate requests",
    useCase: "Stored in HTTP headers (Bearer) after successful authentication to maintain active session state",
  },
  [TOKEN_KEY.OTP_TOKEN]: {
    label: TOKEN_KEY_LABEL[TOKEN_KEY.OTP_TOKEN],
    description: "Temporary Sanctum token issued with restricted abilities specifically for OTP verification",
    useCase: "Short-lived token restricting API access solely to two-factor or OTP verification endpoints",
  },
  [TOKEN_KEY.PASSWORD_RESET_TOKEN]: {
    label: TOKEN_KEY_LABEL[TOKEN_KEY.PASSWORD_RESET_TOKEN],
    description: "Temporary Sanctum token issued with restricted abilities specifically for resetting a forgotten password",
    useCase: "Short-lived token restricting API access solely to password reset endpoints, typically consumed once and then revoked",
  },
});

export const DEFAULT_TOKEN_KEY = TOKEN_KEY.AUTH_TOKEN;