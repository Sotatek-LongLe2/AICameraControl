import { Typography, TypographyProps } from "@mui/joy";
import dayjs from "dayjs";
import { memo, useState, useEffect, useMemo } from "react";
import { StageAdmin } from "src/constants/enumBE";

const getNonNegativeNumber = (num: number) => (num >= 0 ? num : 0);

interface CountDateProps extends TypographyProps {
  date?: Date | dayjs.Dayjs | null;
  currentStage?: StageAdmin;
  onEndStage?: (currentStage?: StageAdmin) => void;
}

export const CountDate = memo(
  ({ date, onEndStage, currentStage, ...props }: CountDateProps) => {
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
      const interval = setInterval(() => {
        setNow((prevNow) => {
          if (prevNow.isAfter(date)) {
            clearInterval(interval);
            onEndStage?.(currentStage);
          }
          return dayjs();
        });
      }, 1_000);

      return () => {
        clearInterval(interval);
      };
    }, [currentStage, date, onEndStage]);

    const diff = useMemo(() => {
      const dayjsDate = dayjs(date);

      const days = getNonNegativeNumber(dayjsDate.diff(now, "day"));

      const hours = getNonNegativeNumber(
        dayjsDate.diff(now.add(days, "days"), "hours")
      );

      const minutes = getNonNegativeNumber(
        dayjsDate.diff(now.add(days, "days").add(hours, "hours"), "minutes")
      );

      const seconds = getNonNegativeNumber(
        dayjsDate.diff(
          now.add(days, "days").add(hours, "hours").add(minutes, "minutes"),
          "seconds"
        )
      );

      return `${days}D ${hours}H ${minutes}M ${seconds}S`;
    }, [date, now]);

    if (!date) return;

    return (
      <Typography level="body1" fontWeight="500" {...props}>
        {diff}
      </Typography>
    );
  }
);
