import { InviteStatus } from "src/constants/enumBE";

export interface IReqForcePassword {
  password: string;
}

export interface IReqSaveInviteCode {
  firstName: string;
  lastName: string;
  email: string;
  registerBy: string;
}

export interface IReqSendInvitationCode {
  to: string;
}

export interface IResInvited {
  message: string;
  statusCode: number;
  data: {
    id: number;
    invitedId: number;
    firstName: string;
    lastName: string;
    email: string;
    code: string;
    status: InviteStatus;
    expiredAt: string;
    updatedAt: string;
    emailAdmin: string;
    adminName: string;
    emailSupport: string;
    supportName: string;
  };
}

export interface IResForcePassword {
  message: string;
  statusCode: number;
}

export interface IAdminActiveUserDto {
  userId: number;
  status: number;
}

export interface IAdminCompanyItem {
  id: number;
  logo: string;
  name: string;
  address: string;
  type: string;
  lastRound: string;
  lrv: string;
  lrvDate: string;
}
