import { useEffect, useState } from "react";
import { StageAdmin } from "src/constants/enumBE";
import { IPrimaryItem } from "src/services/UserPrimaryService.types";
import PrimaryDetail from "../primary/detail";

export const PrimaryPreview = () => {
  const [primaryDetail, setPrimaryDetail] = useState<IPrimaryItem>();

  useEffect(() => {
    const onLoadMessage = (message: MessageEvent<IPrimaryItem>) => {
      if (!message.data || !message.data.stage) return;
      setPrimaryDetail({
        ...message.data,
        stage:
          message.data.stage === StageAdmin.MARKETING_PERIOD
            ? StageAdmin.LAUNCH_DATE
            : message.data.stage,
      });
    };

    const onLoad = () => {
      console.log("onLoad", window.opener);
      window.opener.postMessage({ type: "REQUEST_DATA" }, "*");
    };

    window.addEventListener("message", onLoadMessage);
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("message", onLoadMessage);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return primaryDetail ? (
    <PrimaryDetail.Core
      isPlaceDemand={false}
      isPreview
      typeAccess="full"
      primaryDetail={primaryDetail}
      showAllInfor
    />
  ) : null;
};
