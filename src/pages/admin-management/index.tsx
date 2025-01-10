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
  Stack,
  Typography,
} from "@mui/joy";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiEditLine,
  RiMoreLine,
} from "@remixicon/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppTable, { IColumn } from "src/components/base/AppTable";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { PAGES_ADMIN } from "src/constants/router";
import { AdminManagementService } from "src/services/AdminManagementService";
import { IResListAdminData } from "src/services/AdminManagementService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

const getColumns = (
  onRemoveAdmin: (admin: IResListAdminData) => void
): Array<IColumn<IResListAdminData>> => [
  {
    title: "NAME",
    key: "name",
    render: (_, rowData) => (
      <TextWithTooltip
        text={
          <Typography level="body1-500" variant="text-ellipsis">
            {rowData.firstName} {rowData.lastName}
          </Typography>
        }
        tooltip={`${rowData.firstName} ${rowData.lastName}`}
      />
    ),
  },
  {
    title: "EMAIL",
    key: "email",
    render: (value) => (
      <TextWithTooltip
        text={
          <Typography level="body1-500" variant="text-ellipsis">
            {value}
          </Typography>
        }
        tooltip={value}
      />
    ),
  },
  {
    title: "ACCESS",
    key: "role",
    render: (value) => (
      <Typography level="body1-500">
        {value === 1 ? "Admin" : "Super Admin"}
      </Typography>
    ),
  },

  {
    title: "",
    key: "id",
    render: (_, rowData) => (
      <>
        {rowData.role === 1 && (
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
                    `${PAGES_ADMIN.ADMIN_MANAGEMENT.EDIT}?adminId=${rowData.id}`
                  )
                }
                sx={{
                  padding: "8px 20px",
                  color: colors["text-primary"],
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
                onClick={() => onRemoveAdmin(rowData)}
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
                  <Typography
                    level="body1"
                    sx={{
                      color: colors["astra-pink"],
                    }}
                  >
                    Remove
                  </Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Dropdown>
        )}
      </>
    ),
    headerProps: {
      style: {
        width: "55px",
        textAlign: "center",
      },
    },
  },
];

const AdminManagementPage = () => {
  const isLoading = useAppStore((state) => state.loading);
  const setLoading = useAppStore((state) => state.setLoading);
  const [listAdmin, setListAdmin] = useState<IResListAdminData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [adminRemove, setAdminRemove] = useState<IResListAdminData>();

  const fetchListAdmin = useCallback(
    async (currentPage: number) => {
      try {
        setLoading(true);
        const res = await AdminManagementService.getListAdmin({
          page: currentPage || 1,
          limit: 1000,
        });
        if (res.data.statusCode === 200) {
          setListAdmin(res.data.data);
          setHasMore(res.data.data.length >= 1000);
        } else {
          throw res;
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  useEffect(() => {
    fetchListAdmin(page);
  }, [fetchListAdmin, page]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, isLoading]);

  const onRemoveAdmin = useCallback(async () => {
    if (!adminRemove?.id) return;

    try {
      setLoading(true);
      const res = await AdminManagementService.deleteAdmin({
        adminId: adminRemove.id,
      });

      if (res.data?.statusCode === 200) {
        await fetchListAdmin(page);
        setAdminRemove(undefined);
        toast.success("Account removed");
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }, [adminRemove, fetchListAdmin, page, setLoading]);

  return (
    <>
      <Stack height="calc(100vh - 88px)" overflow="hidden">
        <Grid
          container
          sx={{
            backgroundColor: "transparent",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h4" sx={{ mb: 28 }}>
            Admins
          </Typography>
          <Grid container>
            <Button
              onClick={() =>
                window.navigate(PAGES_ADMIN.ADMIN_MANAGEMENT.CREATE)
              }
              variant="solid"
              sx={{ height: "42px" }}
              startDecorator={<RiAddLine />}
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
        <Card sx={{ overflow: "auto" }}>
          <AppTable
            columns={getColumns(setAdminRemove)}
            data={listAdmin}
            loadMore={loadMore}
            stickyHeader
          />
        </Card>
      </Stack>
      <Modal open={!!adminRemove} onClose={() => setAdminRemove(undefined)}>
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
            Do you wish to delete the account of ‘{adminRemove?.firstName}{" "}
            {adminRemove?.lastName}’?
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
              onClick={() => setAdminRemove(undefined)}
            >
              Cancel
            </Button>
            <Button onClick={onRemoveAdmin} color="astra-pink">
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AdminManagementPage;
