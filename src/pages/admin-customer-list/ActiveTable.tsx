import {
  Box,
  Button,
  Card,
  Dropdown,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalDialog,
  Switch,
  Typography,
} from "@mui/joy";
import {
  RiDeleteBinLine,
  RiDownload2Line,
  RiEditLine,
  RiMoreLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import ComponentFilterUserCompany from "src/components/common/ComponentFilterUserCompany.tsx";
import TextWithTooltip from "src/components/common/TextWithTooltip.tsx";
import { PAGES_ADMIN } from "src/constants/router.ts";
import hexToRGBA from "src/helpers/hexToRGB.ts";
import { AdminUsersCustomersService } from "src/services/AdminUsersCustomersService.ts";
import { IAdminActiveItem } from "src/services/AdminUsersCustomersService.type.ts";
import { downloadFileFromBlob } from "src/utils/files.ts";
import AppTable, { IColumn } from "../../components/base/AppTable.tsx";
import { InviteStatus } from "../../constants/enumBE.ts";
import { useAppStore } from "../../store/appStore.ts";
import { colors } from "../../styles/colors.ts";
import { ITabUserCustomerProps } from "./index.tsx";

const columns = (
  setUserRemove: (user: IAdminActiveItem) => void,
  activeTab: number,
  handleDownloadDocs: (user: IAdminActiveItem) => void,
  onChangeVerifyUser: (user: IAdminActiveItem) => void
): Array<IColumn<IAdminActiveItem>> => [
  {
    title: "CREATED",
    key: "createdAt",
    render: (_, rowData) => (
      <Typography
        level="body1-500"
        variant="text-ellipsis"
        sx={{
          color: colors["text-primary"],
        }}
      >
        {rowData.createdAt}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "90px",
      },
    },
  },
  {
    title: "CUSTOMER",
    key: "firstName",
    render: (_, rowData) => (
      <TextWithTooltip
        text={
          <Typography
            level="body1-500"
            variant="text-ellipsis"
            sx={{
              color: colors["text-primary"],
              cursor: "pointer",
            }}
            onClick={() => {
              window.navigate(
                generatePath(PAGES_ADMIN.CUSTOMERS.VIEW, {
                  id: rowData.userId.toString(),
                })
              );
            }}
          >
            {rowData?.firstName} {rowData?.lastName}
            <Typography
              level="body1"
              sx={{
                color: hexToRGBA(colors["text-primary"], 0.8),
                ml: 8,
              }}
            >
              {rowData?.company}
            </Typography>
          </Typography>
        }
        tooltip={`${rowData.firstName} ${rowData.lastName} ${
          rowData.company ? ` - ${rowData.company}` : ""
        }`}
      />
    ),
  },
  {
    title: "Proof Documents",
    key: "adminVerify",
    render: (_, rowData) => (
      <Grid container>
        {rowData.createdBy !== null ? (
          <Typography
            level="body1-500"
            sx={{
              color: colors["text-primary"],
            }}
          >
            Off Astra
          </Typography>
        ) : rowData?.docs && rowData?.docs?.length > 0 ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            color={colors["primary-main"]}
            sx={{
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadDocs(rowData);
            }}
          >
            <Typography level="body1-500" mr={4}>
              Download Documents
            </Typography>
            <RiDownload2Line />
          </Box>
        ) : (
          <Typography
            level="body1-500"
            sx={{
              color: colors["text-primary"],
            }}
          >
            No document available
          </Typography>
        )}
      </Grid>
    ),
    headerProps: {
      style: {
        width: "275.67px",
      },
    },
  },
  {
    title: "Documents verified",
    key: "adminVerify",
    render: (_, rowData) => (
      <Switch
        endDecorator={
          <Typography level="body1" color="text-primary">
            {rowData.adminVerify || "Unverified"}
          </Typography>
        }
        size="md"
        onChange={() => {
          onChangeVerifyUser(rowData);
        }}
        variant={"solid"}
        checked={!!rowData.adminVerify}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    ),
    headerProps: {
      style: {
        width: "275.67px",
      },
    },
  },
  {
    title: "",
    key: "userId",
    render: (_, rowData) => (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "plain", color: "neutral" } }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <RiMoreLine />
        </MenuButton>
        <Menu
          sx={{
            minWidth: "160px",
            borderRadius: "6px",
            borderColor: colors.divider,
            bgcolor: colors.paper,
            boxShadow: `0px 6px 16px 0px ${colors["shadow-lg"]}`,
          }}
        >
          <MenuItem
            sx={{
              padding: "8px 20px",
              color: colors["text-primary"],
              "&&:hover": {
                color: colors["primary-main"],
                bgcolor: colors["primary-opacity-light"],
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.navigate(
                `${generatePath(PAGES_ADMIN.CUSTOMERS.EDIT, {
                  id: rowData.userId.toString(),
                })}?tab=${activeTab}`
              );
            }}
          >
            <Box display="flex" alignItems="center" gap="8px">
              <RiEditLine />
              <Typography level="body1">Edit </Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setUserRemove(rowData);
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

export default function ActiveTable({
  listUser,
  listCompany,
  activeTab,
  refetchDataFilter,
}: ITabUserCustomerProps & {
  refetchDataFilter: () => void;
}) {
  const setLoading = useAppStore((state) => state.setLoading);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [selectedCompany, setSelectedCompany] = useState<number>();
  const isLoading = useAppStore((state) => state.loading);
  const [activeArray, setActiveArray] = useState<IAdminActiveItem[] | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [userRemove, setUserRemove] = useState<IAdminActiveItem>();

  const loadInvitedList = useCallback(
    async (currentPage: number) => {
      try {
        setLoading(true);
        const res = await AdminUsersCustomersService.listInvited({
          page: currentPage,
          limit: 1000,
          status: InviteStatus.ACTIVE,
          customerFilter: selectedUser?.toString(),
          companyFilter: selectedCompany?.toString(),
        });
        const updatedData = res.data.data.map((item: IAdminActiveItem) => {
          const formattedCreatedAt = dayjs(item.createdAt).format("DD/MM/YY");
          return {
            ...item,
            createdAt: formattedCreatedAt,
          };
        });

        setActiveArray(updatedData);
        setHasMore(res.data.data.length >= 1000);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    },
    [selectedCompany, selectedUser, setLoading]
  );

  useEffect(() => {
    loadInvitedList(page);
  }, [loadInvitedList, page]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage(page + 1);
  }, [hasMore, isLoading, page]);

  const onRemoveUser = useCallback(async () => {
    if (!userRemove?.userId) return;

    try {
      setLoading(true);
      const res = await AdminUsersCustomersService.deleteUser({
        id: userRemove.userId,
      });

      if (res.data.statusCode === 200) {
        await Promise.all([loadInvitedList(1), refetchDataFilter()]);
        toast.success(`Account removed`);
        setUserRemove(undefined);
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }, [loadInvitedList, refetchDataFilter, setLoading, userRemove]);

  const onChangeVerifyUser = useCallback(
    async (item: IAdminActiveItem) => {
      try {
        setLoading(true);
        const res = await AdminUsersCustomersService.verifyUser({
          userId: item.userId,
          status: item.adminVerify !== null ? 0 : 1,
        });

        if (res.data.statusCode === 200) {
          await loadInvitedList(1);
        }
      } catch (e) {
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    },
    [loadInvitedList, setLoading]
  );

  const handleDownloadDocs = useCallback(
    async (item: IAdminActiveItem) => {
      try {
        setLoading(true);
        const response = await AdminUsersCustomersService.getDownloadDocs({
          userId: item.userId,
        });

        downloadFileFromBlob(response.data, `Astra document_${item.userId}`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to download the file");
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return (
    <Box display="flex" flexDirection="column">
      <ComponentFilterUserCompany
        listUser={listUser}
        listCompany={listCompany}
        setSelectedUser={setSelectedUser}
        setSelectedCompany={setSelectedCompany}
        showBuySell={false}
      />
      <Card
        sx={{
          mt: 24,
        }}
      >
        <AppTable
          columns={columns(
            setUserRemove,
            activeTab,
            handleDownloadDocs,
            onChangeVerifyUser
          )}
          data={activeArray}
          loadMore={loadMore}
          stickyHeader
          containerProps={{
            maxHeight: "calc(100vh - 175px - 82px)",
          }}
        />
      </Card>
      <Modal open={!!userRemove} onClose={() => setUserRemove(undefined)}>
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
            Do you wish to delete the account of ‘
            {userRemove?.company
              ? userRemove.company
              : `${userRemove?.firstName} ${userRemove?.lastName}`}
            ’?
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
              onClick={() => setUserRemove(undefined)}
            >
              Cancel
            </Button>
            <Button onClick={() => onRemoveUser()} color="astra-pink">
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
