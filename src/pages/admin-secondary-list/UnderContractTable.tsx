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
  Typography,
} from "@mui/joy";
import {
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiEditLine,
  RiMoreLine,
} from "@remixicon/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import { AppButtonStatusBuySell } from "src/components/base/AppButtonStatusBuySell.tsx";
import ComponentFilterUserCompany from "src/components/common/ComponentFilterUserCompany.tsx";
import TextWithTooltip from "src/components/common/TextWithTooltip.tsx";
import { SecondaryScreen, SecondaryType } from "src/constants/enumBE.ts";
import { PAGES_ADMIN } from "src/constants/router.ts";
import { AdminSecondaryService } from "src/services/AdminSecondaryService.ts";
import { IAdminSecondaryItem } from "src/services/AdminSecondaryService.types.ts";
import AppTable, { IColumn } from "../../components/base/AppTable.tsx";
import { useAppStore } from "../../store/appStore.ts";
import { colors } from "../../styles/colors.ts";
import { ITabSecondaryProps } from "./index.tsx";

export default function UnderContractTable({
  listUser,
  listCompany,
  handleTabChange,
  activeSide,
  activeTab,
  handleSideChange,
}: ITabSecondaryProps) {
  const setLoading = useAppStore((state) => state.setLoading);
  const isLoading = useAppStore((state) => state.loading);
  const [data, setData] = useState<IAdminSecondaryItem[] | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const isDataLoading = useRef(false);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [selectedCompany, setSelectedCompany] = useState<number>();
  const [secondaryRemove, setSecondaryRemove] = useState<IAdminSecondaryItem>();

  const handleUpdateNothingDoneSecondaryIOI = async (id: number) => {
    try {
      const res = await AdminSecondaryService.updateIOI({
        secondaryId: id,
        type: SecondaryType.NOTHING_DONE,
      });
      if (res.data.statusCode === 200 && handleTabChange) {
        handleTabChange(SecondaryScreen.ACCEPTING_BACKUP_OFFERS);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    }
  };

  const getColumns = (
    onRemoveSecondary: (secondary: IAdminSecondaryItem) => void
  ): Array<IColumn<IAdminSecondaryItem>> => [
    {
      title: "Id",
      key: "id",
      headerProps: {
        style: {
          width: "70px",
        },
      },
      render: (_, rowData) => (
        <Typography
          level="body1-500"
          sx={{
            color: colors["text-primary"],
          }}
        >
          #{rowData.id}
        </Typography>
      ),
    },
    {
      title: "Indication",
      key: "side",
      render: (_, rowData) => (
        <Box display={"flex"} gap={8}>
          <AppButtonStatusBuySell side={rowData.side} />
          <TextWithTooltip
            text={
              <Typography level="h5" variant="text-ellipsis">
                {rowData.companyName} - {rowData.firstName} {rowData.lastName}
              </Typography>
            }
            tooltip={`${rowData.companyName} - ${rowData.firstName} ${rowData.lastName}`}
          />
        </Box>
      ),
    },
    {
      title: "Match",
      key: "usernameMatched",
      headerProps: {
        style: {
          width: "192px",
        },
      },
      render: (_, rowData) => (
        <TextWithTooltip
          text={
            <Typography
              level="h5"
              sx={{
                color: colors["text-primary"],
              }}
            >
              {rowData.usernameMatched ?? ""}
            </Typography>
          }
          tooltip={`${rowData.usernameMatched}`}
        />
      ),
    },
    {
      title: "Backup",
      key: "usernameOrdered",
      headerProps: {
        style: {
          width: "192px",
        },
      },
      render: (_, rowData) => (
        <TextWithTooltip
          text={
            <Typography
              level="h5"
              sx={{
                color: colors["text-primary"],
              }}
            >
              {rowData.usernameOrdered ?? ""}
            </Typography>
          }
          tooltip={`${rowData.usernameOrdered}`}
        />
      ),
    },
    {
      title: "Assigned to",
      key: "adminName",
      headerProps: {
        style: {
          width: "192px",
        },
      },
      render: (_, rowData) => (
        <TextWithTooltip
          text={
            <Typography
              level="body1"
              sx={{
                color: colors["text-primary"],
              }}
            >
              {rowData.adminName ?? ""}
            </Typography>
          }
          tooltip={`${rowData.adminName}`}
        />
      ),
    },

    {
      title: "",
      key: "id",
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
              width: "191px",
              borderRadius: "6px",
              borderColor: colors.divider,
              bgcolor: colors.paper,
              boxShadow: `0px 6px 16px 0px ${colors["shadow-lg"]}`,
              padding: "8px 0",
            }}
          >
            <MenuItem
              onClick={() => {
                window.navigate(
                  generatePath(PAGES_ADMIN.SECONDARY.EXECUTION_DETAIL, {
                    id: (rowData.id ?? "").toString(),
                  }) + `?tab=${activeSide === 0 ? "buy" : "sell"}`
                );
              }}
              sx={{
                padding: "8px 20px",
                "&&:hover": {
                  color: colors["primary-main"],
                  bgcolor: colors["primary-opacity-light"],
                },
              }}
            >
              <Box display="flex" alignItems="center" gap="8px">
                <RiCheckLine />
                <Typography level="body1">Executed</Typography>
              </Box>
            </MenuItem>
            <MenuItem
              onClick={() => handleUpdateNothingDoneSecondaryIOI(rowData.id)}
              sx={{
                padding: "8px 20px",
                borderBottom: `1px solid ${colors.divider}`,
                "&&:hover": {
                  color: colors["primary-main"],
                  bgcolor: colors["primary-opacity-light"],
                },
              }}
            >
              <Box display="flex" alignItems="center" gap="8px">
                <RiCloseLine />
                <Typography level="body1">Nothing Done</Typography>
              </Box>
            </MenuItem>
            <MenuItem
              onClick={() =>
                window.navigate(
                  `${generatePath(PAGES_ADMIN.SECONDARY.EDIT, {
                    id: rowData.id.toString(),
                  })}?tab=${activeTab}&side=${activeSide}`
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
                onRemoveSecondary(rowData);
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

  const loadInvitedList = useCallback(
    async (currentPage?: number) => {
      if (isDataLoading.current) return;
      try {
        isDataLoading.current = true;
        setLoading(true);
        const { data } = await AdminSecondaryService.getSecondaryList({
          page: currentPage || 1,
          limit: 100,
          side: activeSide, // buy or sell
          screen: SecondaryScreen.UNDER_CONTRACT, // is tab new listings or accepting...
          customerFilter: selectedUser,
          companyFilter: selectedCompany,
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
    [activeSide, selectedCompany, selectedUser, setLoading]
  );

  useEffect(() => {
    loadInvitedList(page);
  }, [loadInvitedList, page]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, isLoading]);

  const onRemoveSecondary = useCallback(async () => {
    if (!secondaryRemove?.id) return;

    try {
      setLoading(true);
      const res = await AdminSecondaryService.deleteSecondary({
        secondaryId: secondaryRemove.id,
      });

      if (res.data.statusCode === 200) {
        await loadInvitedList();
        setSecondaryRemove(undefined);
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }, [loadInvitedList, secondaryRemove, setLoading]);

  return (
    <>
      <Box display="flex" flexDirection="column" height="100%" gap={24}>
        <ComponentFilterUserCompany
          listUser={listUser}
          listCompany={listCompany}
          activeSide={activeSide}
          handleSideChange={handleSideChange}
          setSelectedUser={setSelectedUser}
          setSelectedCompany={setSelectedCompany}
          showBuySell={true}
        />
        <Card>
          <AppTable
            columns={getColumns(setSecondaryRemove)}
            data={data}
            loadMore={loadMore}
            stickyHeader
            containerProps={{
              maxHeight: "calc(100vh - 278px)",
            }}
          />
        </Card>
      </Box>
      <Modal
        open={!!secondaryRemove}
        onClose={() => setSecondaryRemove(undefined)}
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
              wordWrap: "break-word",
            }}
          >
            You are about to remove Indication “{secondaryRemove?.companyName} -{" "}
            {secondaryRemove?.firstName} {secondaryRemove?.lastName}”. All
            information related to the Indication will also be removed.
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
              onClick={() => setSecondaryRemove(undefined)}
            >
              Cancel
            </Button>
            <Button onClick={onRemoveSecondary} color="astra-pink">
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
