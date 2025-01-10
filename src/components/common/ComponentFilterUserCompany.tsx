import {
  Box,
  Grid,
  IconButton,
  Option,
  Select,
  SelectStaticProps,
} from "@mui/joy";
import { RiBuilding4Line, RiCloseLine, RiUserLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import AppButtonGroupBuySell from "src/components/base/AppButtonGroupBuySell.tsx";
import {
  IAdminCompanyItem,
  IAdminUserItem,
} from "src/services/AdminSecondaryService.types.ts";
import { colors } from "../../styles/colors.ts";

interface IComponentFilterUserCompanyProps {
  listUser: IAdminUserItem[];
  listCompany: IAdminCompanyItem[];
  activeSide?: number;
  handleSideChange?: (newValue: number) => void;
  setSelectedUser: (newValue: number | undefined) => void;
  setSelectedCompany: (newValue: number | undefined) => void;
  showBuySell?: boolean;
}

export default function ComponentFilterUserCompany({
  listUser,
  listCompany,
  activeSide,
  handleSideChange,
  setSelectedUser,
  setSelectedCompany,
  showBuySell,
}: IComponentFilterUserCompanyProps) {
  const [selectedUser, setSelectedUserState] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompanyState] = useState<number | null>(
    null
  );
  const action: SelectStaticProps["action"] = useRef(null);

  const handleSideChangeWithReset = (newValue: number) => {
    if (handleSideChange) {
      handleSideChange(newValue);
    }
    setSelectedUserState(null);
    setSelectedCompanyState(null);
    setSelectedUser(undefined);
    setSelectedCompany(undefined);
  };

  useEffect(() => {
    setSelectedUserState(null);
    setSelectedCompanyState(null);
  }, [listUser, listCompany]);

  return (
    <Box
      display="flex"
      gap={12}
      sx={{
        padding: "20px 12px 18px 12px",
        backgroundColor: colors.paper,
        borderRadius: "6px",
        alignItems: "center",
      }}
    >
      {showBuySell && handleSideChange && (
        <AppButtonGroupBuySell
          value={activeSide}
          onChange={(newValue) => handleSideChangeWithReset(newValue)}
        />
      )}

      <Grid columnSpacing="12px" container width={"100%"}>
        <Grid mobile={6}>
          <Box sx={{ width: "100%" }}>
            <Select
              action={action}
              value={selectedUser}
              onChange={(_e, newValue) => {
                if (newValue) {
                  setSelectedUserState(Number(newValue));
                  setSelectedUser(Number(newValue));
                }
              }}
              {...(selectedUser && {
                endDecorator: (
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    onClick={() => {
                      setSelectedUserState(null);
                      setSelectedUser(undefined);
                      action.current?.focusVisible();
                    }}
                  >
                    <RiCloseLine />
                  </IconButton>
                ),
                indicator: null,
              })}
              sx={{
                background: "transparent",
                width: "100%",
                height: "42px",
              }}
              slotProps={{
                listbox: {
                  placement: "bottom-start",
                  sx: { minWidth: 160 },
                },
              }}
              indicator={null}
              startDecorator={
                <RiUserLine size={16} color={colors["text-primary"]} />
              }
            >
              {listUser.length > 0 ? (
                listUser.map((user) => (
                  <Option
                    key={user.id}
                    value={user.id}
                    sx={{
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                      whiteSpace: "normal",
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </Option>
                ))
              ) : (
                <Option
                  value=""
                  sx={{
                    "&.MuiOption-highlighted:not([aria-selected='true'])": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  No data
                </Option>
              )}
            </Select>
          </Box>
        </Grid>
        <Grid mobile={6}>
          <Box sx={{ width: "100%" }}>
            <Select
              value={selectedCompany}
              onChange={(_e, newValue) => {
                if (newValue) {
                  setSelectedCompanyState(Number(newValue));
                  setSelectedCompany(Number(newValue));
                }
              }}
              sx={{
                background: "transparent",
                width: "100%",
                height: "42px",
              }}
              slotProps={{
                listbox: {
                  placement: "bottom-start",
                  sx: { minWidth: 160 },
                },
              }}
              indicator={null}
              startDecorator={
                <RiBuilding4Line size={16} color={colors["text-primary"]} />
              }
              {...(selectedCompany && {
                endDecorator: (
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    onClick={() => {
                      setSelectedCompanyState(null);
                      setSelectedCompany(undefined);
                      action.current?.focusVisible();
                    }}
                  >
                    <RiCloseLine />
                  </IconButton>
                ),
                indicator: null,
              })}
            >
              {listCompany.length > 0 ? (
                listCompany.map((company) => (
                  <Option
                    key={company.id}
                    value={company.id}
                    sx={{
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                      whiteSpace: "normal",
                    }}
                  >
                    {company.name}
                  </Option>
                ))
              ) : (
                <Option
                  value=""
                  sx={{
                    "&.MuiOption-highlighted:not([aria-selected='true'])": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  No data
                </Option>
              )}
            </Select>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
