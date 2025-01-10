import {
  AnnouncementType,
  EventAnnouncementType,
  SecondarySideEnum,
} from "src/constants/enumBE";

export interface IReqCreateOrUpdateAnnouncement {
  announcementId?: number;
  type: AnnouncementType;
  title: string;
  companyId: number;
}

export interface IResCreateOrUpdateAnnouncement {
  title: string;
  primaryId: number;
  type: number;
  id: number;
  secondaryId?: number;
  side?: SecondarySideEnum;
  company?: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface IResAnnouncement {
  announcementId: number;
  createdAt: Date;
  title: string;
  type: AnnouncementType;
  eventType: EventAnnouncementType;
  primaryId: number;
  secondaryId: null;
  logoUrl: string;
  name: string;
  logoUrlIOI: null;
  nameIOI: null;
  companyName: string;
}

export interface IResGetLinkTo {
  companyName: string;
  companyId: number;
  side?: SecondarySideEnum;
  firstName?: string;
  lastName?: string;
}

export type IResAnnouncementDashboardItem = {
  id: number;
  title: string;
  type: number;
  secondaryId: number;
  primaryId: number;
  eventType: EventAnnouncementType;
  createdAt: string;
  companyId: number;
  side: number;
  secondaryStatus: number;
  isDeleted?: number;
};

export interface IResGetAnnouncementDashboard {
  message: string;
  statusCode: number;
  data: IResAnnouncementDashboardItem[];
}
