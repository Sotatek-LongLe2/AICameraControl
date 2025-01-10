import { Role, UserStatus } from "src/constants/enumBE";

export type IUserInfo = {
  id: number;
  name: string;
  email: string;
  access_token: string;
  role: Role;
  scope: string;
  status: UserStatus;
  isChangePass: number;
};
