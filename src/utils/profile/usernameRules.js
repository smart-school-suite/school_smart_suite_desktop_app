export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;

export const normalizeUsername = (value) => String(value ?? "").trim().toLowerCase();

export const USERNAME_FORMAT_RULES = [
  {
    key: "length",
    label: `${USERNAME_MIN_LENGTH} to ${USERNAME_MAX_LENGTH} characters`,
    test: (value) => value.length >= USERNAME_MIN_LENGTH && value.length <= USERNAME_MAX_LENGTH,
  },
  {
    key: "characters",
    label: "Only lowercase letters, numbers, dots and underscores",
    test: (value) => /^[a-z0-9._]+$/.test(value),
  },
  {
    key: "edges",
    label: "Starts and ends with a letter or number",
    test: (value) => /^[a-z0-9](.*[a-z0-9])?$/.test(value),
  },
  {
    key: "separators",
    label: "No dots or underscores next to each other",
    test: (value) => value.length > 0 && !/[._]{2}/.test(value),
  },
];

export const checkUsernameFormat = (value) => {
  const username = normalizeUsername(value);
  const checks = USERNAME_FORMAT_RULES.map((rule) => ({
    key: rule.key,
    label: rule.label,
    passed: rule.test(username),
  }));
  return { username, checks, valid: checks.every((check) => check.passed) };
};
