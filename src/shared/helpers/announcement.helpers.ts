import { generatePath, createSearchParams } from "react-router-dom";
import PAGES from "src/constants/router";
import { IResAnnouncementDashboardItem } from "src/services/AnnouncementService.types";

export const getAnnouncementNavigationPath = (
  announcement: IResAnnouncementDashboardItem
) => {
  if (announcement.primaryId) {
    return generatePath(PAGES.PRIMARY.DETAIL, {
      companyID: String(announcement.primaryId),
    });
  }

  return {
    pathname: PAGES.SECONDARY_DETAIL,
    search: createSearchParams({
      companyId: String(announcement.companyId),
      side: String(announcement.side),
    }).toString(),
  };
};
