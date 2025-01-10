import { Box, Typography } from "@mui/joy";
import { RiMoreLine } from "@remixicon/react";
import dayjs from "dayjs";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ANNOUNCEMENT_INFO,
  EVENT_TYPE_2_TYPE_ANNOUNCEMENT,
} from "src/constants/announcement";
import { AnnouncementType, EventEnum } from "src/constants/enumBE";
import { SITE_USER } from "src/constants/env";
import PAGES, { PAGES_ADMIN } from "src/constants/router";
import { AnnouncementService } from "src/services/AnnouncementService";
import { IResAnnouncementDashboardItem } from "src/services/AnnouncementService.types";
import { getAnnouncementNavigationPath } from "src/shared/helpers/announcement.helpers";
import { useDevice } from "src/shared/hooks/useDevice";
import { SocketContext } from "src/socket/SocketContext";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";
import TextWithTooltip from "../TextWithTooltip";

interface CardAnnouncementsProps {
  isShowTime?: boolean;
}

export const CardAnnouncements = ({ isShowTime }: CardAnnouncementsProps) => {
  const { deviceLaptop, deviceTablet } = useDevice();
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [dataAnnouncements, setDataAnnouncements] = useState<
    IResAnnouncementDashboardItem[]
  >([]);
  const socket = useContext(SocketContext);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      const res = await AnnouncementService.getListDashboard({
        page: 1,
        limit: 4,
      });
      if (res.data.statusCode === 200) {
        setDataAnnouncements(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleAnnouncementClick = useCallback(
    (announcement: IResAnnouncementDashboardItem) => {
      if (!SITE_USER) return;
      const path = getAnnouncementNavigationPath(announcement);
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    socket?.on(EventEnum.ANNOUNCEMENT_RELOAD, async () => {
      await fetchAnnouncements();
    });

    return () => {
      socket?.off(EventEnum.SIGN_DOCS_COMPLETE);
    };
  }, [fetchAnnouncements, socket]);

  return (
    <Box
      sx={{
        backgroundColor: colors["paper"],
        padding: 20,
        width: "100%",
        borderRadius: "6px",
        height: "312px",
        position: "relative",
      }}
    >
      <Box>
        <Typography level="h5">Launch Point Announcements</Typography>
        <Typography level="body2" color="text-secondary">
          Key Highlights
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 20,
        }}
      >
        {dataAnnouncements?.map((announcement, index) => {
          const { icon: Icon } =
            ANNOUNCEMENT_INFO[
              (announcement.type as AnnouncementType) ??
                EVENT_TYPE_2_TYPE_ANNOUNCEMENT[announcement.eventType]
            ];

          return (
            <React.Fragment key={index}>
              <Box
                onClick={() => {
                  if (announcement.isDeleted === 0) {
                    handleAnnouncementClick(announcement);
                  }
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: announcement.isDeleted ? "default" : "pointer",
                  borderBottom: `1px solid ${colors["divider"]}`,
                  padding: "10.5px 0",
                  "&:first-of-type": {
                    paddingTop: 0,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    maxWidth: deviceLaptop
                      ? "410px"
                      : deviceTablet
                      ? "290px"
                      : "100%",
                  }}
                >
                  <Box sx={{ display: "flex", flexShrink: 0 }}>
                    <Icon />
                  </Box>
                  <TextWithTooltip
                    text={
                      <Typography level="body1" variant="text-ellipsis">
                        {announcement.title}
                      </Typography>
                    }
                    tooltip={announcement.title}
                  />
                </Box>
                {isShowTime && (
                  <Typography
                    level="body2"
                    color="text-secondary"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {dayjs(announcement.createdAt).format("MMM D, h:mma")}
                  </Typography>
                )}
              </Box>
            </React.Fragment>
          );
        })}
        {dataAnnouncements.length > 0 && (
          <>
            <Box
              onClick={() =>
                navigate(
                  SITE_USER
                    ? PAGES.ANNOUNCEMENTS
                    : PAGES_ADMIN.ANNOUNCEMENTS.INDEX
                )
              }
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                position: "absolute",
                bottom: 18,
                left: 0,
                right: 0,
              }}
            >
              <RiMoreLine />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
