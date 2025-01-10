import { Step } from "src/constants/enumBE";

export interface IReqUpdatePhoneNumber {
  phoneCode: string;
  phoneNumber: string;
}

export interface IResUpdatePhoneNumber {
  message: string;
  statusCode: number;
  data: Record<string, never>;
}

export interface IReqVerifyPhoneNumber {
  code: string;
}

export interface IResVerifyPhoneNumber {
  message: string;
  statusCode: number;
  data: Record<string, never>;
}

export interface IResCurrentStep {
  message: string;
  statusCode: number;
  data: {
    phoneVerified: number;
    step: Step;
    riskDisclosureSigned: number;
  };
}

export interface IReqSaveIdentity {
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

export interface IReqSaveFinance {
  data: {
    occupation: string;
    occupationIndustry: string;
    isLiabilities: number;
    productKnowledge: string;
    sourceOfWealth: string;
  };
}

export interface IReqSaveEligibility {
  data: {
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
  };
}

export interface IReqSaveRiskProfile {
  data: {
    question_1: number;
    question_2: number;
    question_3: number;
    question_4: number;
    question_5: number;
    question_6: number;
    question_7: number;
    question_8: number;
  };
}

export interface IResStepResponse {
  message: string;
  statusCode: number;
  data: Record<string, never>;
}
