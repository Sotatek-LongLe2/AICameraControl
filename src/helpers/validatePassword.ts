import { Regex } from "src/constants/regex";

export const validatePassword = (password: string) => {
  if (!Regex.PASSWORD.test(password)) {
    return "Passwords must contain at least 8 characters, capital letters, lowercase letters, numbers, special characters and no space";
  }
  if (/\s/.test(password)) {
    return "Passwords must not contain spaces";
  }
  return true;
};
