import {
  RiCloseLine,
  RiFileTransferLine,
  RiLockPasswordLine,
  RiRocket2Line,
  RiRocketLine,
  RiSurveyLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import { StageAdmin } from "src/constants/enumBE";

export const getInforPrimaryByStatus = (
  stage: StageAdmin,
  date: Date | dayjs.Dayjs
) => {
  let Icon = RiFileTransferLine;
  let status = "Allocation and Signing";

  switch (stage) {
    case StageAdmin.LAUNCH_DATE: {
      const dayjsDate = dayjs(date);
      Icon = RiRocketLine;
      status = `Going Live ${dayjsDate.format("MMM.DD")} at ${dayjsDate.format(
        "HH:mm"
      )}`;
      break;
    }

    case StageAdmin.MARKETING_PERIOD:
      Icon = RiSurveyLine;
      status = "Marketing Period";
      break;

    case StageAdmin.BOOKS_OPEN:
      Icon = RiRocket2Line;
      status = "Books Open";
      break;

    case StageAdmin.BOOKS_CLOSED:
      Icon = RiLockPasswordLine;
      status = "Books Closed";
      break;

    case StageAdmin.CLOSED:
      Icon = RiCloseLine;
      status = "Closed";
      break;
  }

  return {
    Icon,
    status,
  };
};

interface IGetStatusFromDate {
  allocationStartDate?: Date;
  booksClose?: Date;
  booksOpen?: Date;
  closeDate?: Date;
  launchDate?: Date;
}

export const getStatusFromDate = ({
  launchDate,
  booksOpen,
  booksClose,
  allocationStartDate,
  closeDate,
}: IGetStatusFromDate) => {
  const now = dayjs();
  let stage = StageAdmin.LAUNCH_DATE;
  let stageDate;

  switch (true) {
    case now.isBefore(launchDate): {
      stage = StageAdmin.LAUNCH_DATE;
      stageDate = launchDate;
      break;
    }
    case now.isBefore(booksOpen): {
      stage = StageAdmin.MARKETING_PERIOD;
      stageDate = booksOpen;
      break;
    }
    case now.isBefore(booksClose): {
      stage = StageAdmin.BOOKS_OPEN;
      stageDate = booksClose;
      break;
    }
    case now.isBefore(allocationStartDate): {
      stage = StageAdmin.BOOKS_CLOSED;
      stageDate = allocationStartDate;
      break;
    }
    case now.isBefore(closeDate): {
      stage = StageAdmin.ALLOCATION_SIGNING;
      stageDate = closeDate;
      break;
    }

    case now.isAfter(closeDate): {
      stage = StageAdmin.CLOSED;
      break;
    }
  }

  return {
    stage,
    stageDate: stageDate ?? now.toDate(),
  };
};
