export interface IReqPostAdmin {
  email: string;
  password?: string;
  adminId?: number;
  firstName: string;
  lastName: string;
}

export interface IResPostAdmin {
  message: string;
  statusCode: number;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;
    status: number;
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
}

export interface IReqListAdmin {
  page: number;
  limit: number;
}

export interface IResListAdminData {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  status: number;
  password: string;
  forgotPasswordToken: string;
  scope: string;
  isChangePassword: number;
  verifiedBy: string;
  riskDisclosureSigned: number;
  type: number;
  expiredAt: string;
  updatedAt: string;
}

export interface IResListAdmin {
  message: string;
  statusCode: number;
  data: Array<IResListAdminData>;
}

export interface IResDeleteAdmin {
  message: string;
  statusCode: number;
  data: object;
}

export interface IResDetailAdmin {
  message: string;
  statusCode: number;
  data: IResListAdminData;
}
