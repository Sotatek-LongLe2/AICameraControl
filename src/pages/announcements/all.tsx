import { Box, Divider, Link, Typography } from "@mui/joy";
import { RiArrowLeftLine } from "@remixicon/react";
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
import PAGES from "src/constants/router";
import { AnnouncementService } from "src/services/AnnouncementService";
import { IResAnnouncementDashboardItem } from "src/services/AnnouncementService.types";
import { getAnnouncementNavigationPath } from "src/shared/helpers/announcement.helpers";
import { useMedia } from "src/shared/hooks/useMedia";
import { SocketContext } from "src/socket/SocketContext";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

const AnnouncementsAllPage = () => {
  const { isMobile } = useMedia();
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
        limit: 1000,
      });
      if (res.data.statusCode === 200) {
        setDataAnnouncements(res.data.data);
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "column", laptop: "row" },
          justifyContent: { laptop: "center" },
        }}
      >
        <Box
          sx={{
            whiteSpace: "nowrap",
            marginTop: "8px",
            flex: 1,
          }}
        >
          <Link
            href={PAGES.DASHBOARD}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              color: theme.color["primary-main"],
              fontSize: 17,
              fontFamily: "Jost",
              fontWeight: 500,
              mb: isMobile ? 12 : 24,
            })}
          >
            <RiArrowLeftLine />
            Back To Dashboard
          </Link>
        </Box>
        <Box
          sx={{
            width: isMobile ? "100%" : "772px",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors["paper"],
              padding: 24,
              width: "100%",
              borderRadius: "6px",
              position: "relative",
            }}
          >
            <Box>
              <Typography level="h4">Astra Announcements</Typography>
            </Box>
            <Box
              sx={{
                mt: isMobile ? 20 : 24,
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
                        alignItems: "flex-start",
                        cursor: announcement.isDeleted ? "default" : "pointer",
                        gap: "24px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <Box sx={{ display: "flex", flexShrink: 0 }}>
                          <Icon />
                        </Box>
                        <Typography level="body1">
                          {announcement.title}
                        </Typography>
                      </Box>
                      <Typography
                        level="body2"
                        color="text-secondary"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {dayjs(announcement.createdAt).format("MMM D, h:mma")}
                      </Typography>
                    </Box>
                    {index < dataAnnouncements?.length - 1 && (
                      <Divider sx={{ my: 12 }} />
                    )}
                  </React.Fragment>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box flex={1} display={{ mobile: "none", laptop: "block" }} />
      </Box>
    </>
  );
};

export default AnnouncementsAllPage;
