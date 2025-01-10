import {
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export interface IField<T> {
  name: keyof T;
  label: string;
  rules?: RegisterOptions;
  size?: {
    mobile?: number;
    laptop?: number;
  };
  renderItem: (
    field: ControllerRenderProps<FieldValues, string>
  ) => React.ReactNode;
}

export interface PersonalDetailFormData {
  firstName: string;
  lastName: string;
  passport: string;
  national: string;
  dateOfBirth: string;
  placeOfBirth: string;
  residential: string;
  countryOfResidence: string;
  taxResidence: string;
}

export interface FinanceFormData {
  occupation: string;
  occupationIndustry: string;
  isLiabilities: string;
  productKnowledge: string;
  sourceOfWealth: string;
}

export interface EligibilityFormData extends Record<string, string> {
  question_1: string;
  question_2: string;
  question_3: string;
  question_4: string;
  question_5: string;
  question_6: string;
  question_7: string;
  question_8: string;
  question_9: string;
  question_10: string;
}

export interface RiskProfileFormData extends Record<string, string> {
  question_1: string;
  question_2: string;
  question_3: string;
  question_4: string;
  question_5: string;
  question_6: string;
  question_7: string;
  question_8: string;
}
