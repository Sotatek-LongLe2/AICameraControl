import { IUserInfo } from "src/shared/types/user";

export interface IReqLogin {
  email: string;
  password: string;
}

export interface IResLogin {
  message: string;
  statusCode: number;
  data: IUserInfo;
}

export interface IUnauthorizedResponse {
  message: string;
  statusCode: number;
}
export interface IReqChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

export interface IResChangePassword {
  message: string;
  statusCode: number;
}
