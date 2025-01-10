import {
  RiLockLine,
  RiMoneyDollarCircleLine,
  RiRocket2Line,
  RiRocketLine,
} from "@remixicon/react";
import { ComponentType } from "react";
import { AnnouncementType, EventAnnouncementType } from "./enumBE";

export const EVENT_TYPE_2_TYPE_ANNOUNCEMENT: Record<
  EventAnnouncementType,
  AnnouncementType
> = {
  [EventAnnouncementType.GOING_LIVE]: AnnouncementType.BOOKS_OPEN_TODAY,
  [EventAnnouncementType.BOOK_OPEN]: AnnouncementType.BOOKS_OPEN_TODAY,
  [EventAnnouncementType.BOOK_CLOSE]: AnnouncementType.BOOKS_CLOSE_TODAY,
};

export const ANNOUNCEMENT_INFO: Record<
  AnnouncementType,
  { icon: ComponentType; title: string }
> = {
  [AnnouncementType.BOOKS_OPEN_TODAY]: {
    icon: RiRocket2Line,
    title: "Books open today",
  },
  [AnnouncementType.NEW_SECONDARY_ORDER]: {
    icon: RiRocketLine,
    title: "New Secondary Order",
  },
  [AnnouncementType.DEAL_COVERED]: {
    icon: RiMoneyDollarCircleLine,
    title: "Deal covered",
  },
  [AnnouncementType.BOOKS_CLOSE_TODAY]: {
    icon: RiLockLine,
    title: "Books close today",
  },
};
