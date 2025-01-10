import {
  Box,
  Button,
  Card,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalDialog,
} from "@mui/joy";

import { Grid, Typography } from "@mui/joy";

import { Stack } from "@mui/joy";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiEditLine,
  RiMoreLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import { AppLogo } from "src/components/base/AppLogo";
import AppTable, { IColumn } from "src/components/base/AppTable";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import {
  ANNOUNCEMENT_INFO,
  EVENT_TYPE_2_TYPE_ANNOUNCEMENT,
} from "src/constants/announcement";
import { PAGES_ADMIN } from "src/constants/router";
import { AnnouncementService } from "src/services/AnnouncementService";
import { IResAnnouncement } from "src/services/AnnouncementService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

const getColumns = (
  onRemoveAnnouncement: (announcement: IResAnnouncement) => void
): Array<IColumn<IResAnnouncement>> => [
  {
    title: "DATE",
    key: "createdAt",
    render: (value) => {
      const formatValue = dayjs(value?.toString()).format("DD/MM/YY");

      return (
        <Typography level="body1-500" variant="text-ellipsis">
          {formatValue}
        </Typography>
      );
    },
    headerProps: {
      style: {
        width: 90,
      },
    },
  },
  {
    title: "Title",
    key: "title",
    render: (_, rowData) => {
      const { icon: Icon } =
        ANNOUNCEMENT_INFO[
          rowData.type ?? EVENT_TYPE_2_TYPE_ANNOUNCEMENT[rowData.eventType]
        ];
      return (
        <TextWithTooltip
          text={
            <Box
              sx={{
                color: colors["text-primary"],
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box sx={{ display: "flex", flexShrink: 0 }}>
                <Icon />
              </Box>
              <Typography level="body1" variant="text-ellipsis">
                {rowData.title}
              </Typography>
            </Box>
          }
          tooltip={rowData.title}
        />
      );
    },
  },

  {
    title: "LINK TO",
    key: "companyName",
    headerProps: {
      style: {
        width: 415.5,
      },
    },
    render: (value, item) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
        <AppLogo src={item.logoUrl} size={38} />
        <Typography level="h5" variant="text-ellipsis">
          {String(value ?? "")}
        </Typography>
      </Box>
    ),
  },
  {
    title: "",
    key: "announcementId",
    render: (_, rowData) => (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "plain", color: "neutral" } }}
        >
          <RiMoreLine />
        </MenuButton>
        <Menu
          placement="bottom-end"
          sx={{
            minWidth: "160px",
            borderRadius: "6px",
            borderColor: colors.divider,
            bgcolor: colors.paper,
            boxShadow: `0px 6px 16px 0px ${colors["shadow-lg"]}`,
          }}
        >
          <MenuItem
            onClick={() =>
              window.navigate(
                `${generatePath(PAGES_ADMIN.ANNOUNCEMENTS.EDIT, {
                  id: rowData.announcementId.toString(),
                })}`
              )
            }
            sx={{
              padding: "8px 20px",
              "&&:hover": {
                color: colors["primary-main"],
                bgcolor: colors["primary-opacity-light"],
              },
            }}
          >
            <Box display="flex" alignItems="center" gap="8px">
              <RiEditLine />
              <Typography level="body1">Edit</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              onRemoveAnnouncement(rowData);
            }}
            sx={{
              padding: "8px 20px",
              color: colors["astra-pink"],
              "&&:hover": {
                color: colors["astra-pink"],
                backgroundColor: colors["error-opacity-light"],
              },
            }}
          >
            <Box display="flex" alignItems="center" gap="8px">
              <RiDeleteBinLine />
              <Typography level="body1">Remove</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Dropdown>
    ),
    headerProps: {
      style: {
        width: "55px",
        textAlign: "center",
      },
    },
  },
];
const AnnouncementsPage = () => {
  const isLoading = useAppStore((state) => state.loading);
  const setLoading = useAppStore((state) => state.setLoading);
  const [data, setData] = useState<IResAnnouncement[] | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const isDataLoading = useRef(false);

  //
  const [announcementRemove, setAnnouncementRemove] =
    useState<IResAnnouncement>();

  const loadAnnouncements = useCallback(
    async (currentPage?: number) => {
      if (isDataLoading.current) return;
      try {
        isDataLoading.current = true;
        setLoading(true);
        const { data } = await AnnouncementService.getList({
          page: currentPage || 1,
          limit: 100,
        });
        setData(data.data);
        // setNewListingArray((prevData) => [...prevData, ...data.data]);
        setHasMore(data.data.length >= 100);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
        isDataLoading.current = false;
      }
    },
    [setLoading]
  );

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, isLoading]);

  useEffect(() => {
    loadAnnouncements(page);
  }, [loadAnnouncements, page]);

  //
  const onRemoveAnnouncement = useCallback(async () => {
    if (!announcementRemove?.announcementId) return;

    try {
      setLoading(true);
      const res = await AnnouncementService.delete({
        id: announcementRemove.announcementId,
      });

      if (res.data.statusCode === 200) {
        await loadAnnouncements();
        toast.success("Announcement removed");
        setAnnouncementRemove(undefined);
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }, [loadAnnouncements, announcementRemove, setLoading]);

  return (
    <>
      <Stack height="calc(100vh - 51px)" gap={24}>
        <Grid
          container
          sx={{
            backgroundColor: "transparent",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h4">Announcements</Typography>
          <Grid container>
            <Button
              onClick={() => {
                window.navigate(PAGES_ADMIN.ANNOUNCEMENTS.CREATE);
              }}
              variant="solid"
              sx={{ height: "42px", pl: "20px" }}
              startDecorator={<RiAddLine />}
            >
              Add Announcement
            </Button>
          </Grid>
        </Grid>

        <Card>
          <AppTable
            columns={getColumns(setAnnouncementRemove)}
            data={data}
            loadMore={loadMore}
            stickyHeader
          />
        </Card>
      </Stack>

      <Modal
        open={!!announcementRemove}
        onClose={() => setAnnouncementRemove(undefined)}
      >
        <ModalDialog
          sx={{
            padding: "24px 32px",
            maxWidth: "575px",
            backgroundColor: colors["paper"],
            border: "none",
            borderRadius: "10px",
            gap: "24px",
          }}
        >
          <Typography level="h4">Please Confirm</Typography>
          <Typography
            level="body1"
            sx={{
              color: colors["text-primary"],
            }}
          >
            Do you wish to remove the “{announcementRemove?.title}” announcement
            ?
          </Typography>

          <Box
            gap="16px"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setAnnouncementRemove(undefined)}
            >
              Cancel
            </Button>
            <Button onClick={onRemoveAnnouncement} color="astra-pink">
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AnnouncementsPage;
