export const Regex = {
  NEWLINE: /\n/g,
  SPACE: /^(?!\s*$).+/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  EMAIL: /^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/,
  NUMBER: /^[\d.,]+$/,
};
