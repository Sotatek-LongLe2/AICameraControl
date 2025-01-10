import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Typography } from "@mui/joy";
import { DateFormat } from "src/constants/enum";

interface CountdownProps {
  startTime: Date;
  endTime: Date;
  onFinishCountDown: () => void;
}

const Countdown: React.FC<CountdownProps> = ({
  startTime,
  endTime,
  onFinishCountDown,
}) => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    const start = dayjs(startTime);
    const end = dayjs(endTime);

    const updateCountdown = () => {
      const now = dayjs();

      // startTime > current time
      if (now.isBefore(start)) {
        setDisplayText(start.format(DateFormat["MMM. D [at] HH:mm"]));
      }
      // startTime <= current time < endTime
      else if (now.isAfter(start) && now.isBefore(end)) {
        const remaining = end.diff(now);
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setDisplayText(`${days}D ${hours}H ${minutes}M ${seconds}S`);
      }
      // current time >= endTime
      else {
        setDisplayText("");
        onFinishCountDown();
      }
    };
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [startTime, endTime, onFinishCountDown]);

  return <Typography level="body1-500">{displayText}</Typography>;
};

export default Countdown;
