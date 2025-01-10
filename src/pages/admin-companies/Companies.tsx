import {
  Box,
  Card,
  IconButton,
  Option,
  Select,
  SelectStaticProps,
  Typography,
} from "@mui/joy";
import { RiCloseLine, RiUpload2Line, RiUploadLine } from "@remixicon/react";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import { AppSearchBox } from "src/components/base/AppSearchBox";
import AppTable, { IColumn } from "src/components/base/AppTable";
import { DragDropBox } from "src/components/common/DragDropBox";
import { MAX_FILE_SIZE } from "src/constants/common";
import { DateFormat } from "src/constants/enum";
import { number2USD } from "src/helpers/formatNumber";
import { CompanyService } from "src/services/CompanyService";
import {
  IAdminCompanyItem,
  ICountryItem,
  IIndustryItem,
} from "src/services/CompanyService.types";
import { chooseFile } from "src/utils/files";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";
import { useDebounceValue } from "usehooks-ts";
import { AppLogo } from "src/components/base/AppLogo";
import TextWithTooltip from "src/components/common/TextWithTooltip";

export type TErrorMessage = {
  discordToken: string;
};

export const CompaniesPage = () => {
  const setLoading = useAppStore((state) => state.setLoading);
  const [debouncedValue, updateDebounceValue] = useDebounceValue("", 500);
  const [listCountry, setListCountry] = useState<ICountryItem[]>([]);
  const [listIndustry, setListIndustry] = useState<IIndustryItem[]>([]);
  const [data, setData] = useState<IAdminCompanyItem[] | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const action: SelectStaticProps["action"] = useRef(null);

  const handleChangeAvatar = async (id: string) => {
    try {
      const expectedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const file = await chooseFile(expectedTypes);

      if (
        !file ||
        !expectedTypes.includes(file?.type ?? ``) ||
        (file && file?.size > 10 * 1024 * 1024)
      ) {
        toast.error("Upload logo failed");
        return;
      } else {
        setLoading(true);
        const res = await CompanyService.uploadLogo(id, file);
        if (res.data.statusCode === 200) {
          toast.success("Upload logo successfully");
          setData((prev) =>
            (prev || []).map((item) =>
              item.id === id
                ? {
                    ...item,
                    logoUrl: res.data.data.logoUrl,
                  }
                : item
            )
          );
        }
      }
    } catch (error) {
      toast.error("Upload logo failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDebounceValue(e.target.value);
  };

  const getListCountry = async () => {
    const { data } = await CompanyService.getListCountry({
      limit: 1000,
      page: 1,
    });
    setListCountry(data.data);
  };

  const getListIndustry = async () => {
    const { data } = await CompanyService.getListIndustry({
      limit: 1000,
      page: 1,
    });
    setListIndustry(data.data);
  };

  const getListCompany = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await CompanyService.getListCompany({
        limit: 1000,
        page: 1,
        country: selectedCountry || "",
        industry: selectedIndustry || "",
        search: debouncedValue || "",
      });
      setData(data.data);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  }, [debouncedValue, selectedCountry, selectedIndustry, setLoading]);

  useEffect(() => {
    getListCompany();
  }, [getListCompany]);

  useEffect(() => {
    getListCountry();
    getListIndustry();
  }, []);

  const columnsCompanies: Array<IColumn<IAdminCompanyItem>> = [
    {
      title: "COMPANY",
      key: "name",
      render: (_, rowData) => (
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              maxWidth: "100%",
            }}
          >
            {rowData.logoUrl ? (
              <Box
                sx={{ position: "relative" }}
                onClick={() => handleChangeAvatar(rowData.id)}
              >
                <AppLogo
                  src={rowData.logoUrl}
                  size={39}
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    opacity: 1,
                    transition: "opacity",
                    "&:hover + .bg-blue": {
                      backgroundColor: colors["primary-main"],
                    },
                    "&:hover": {
                      opacity: 0.2,
                    },
                  }}
                />
                <Box
                  className="bg-blue"
                  sx={{
                    border: `1px solid ${colors["border-secondary"]}`,
                    padding: "4px",
                    width: "39px",
                    height: "39px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <RiUpload2Line
                    size={20}
                    color={colors["border-icon-upload"]}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  backgroundColor: colors["primary-main"],
                  border: `1px solid ${colors["border-secondary"]}`,
                  padding: "4px",
                  width: "39px",
                  height: "39px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeAvatar(rowData.id)}
              >
                <RiUpload2Line size={20} color={colors["border-icon-upload"]} />
              </Box>
            )}
            <TextWithTooltip
              text={
                <Typography variant="text-ellipsis">
                  <Typography level="h5">{rowData.name}</Typography>{" "}
                  <Typography
                    level="body2"
                    sx={{ color: colors["text-secondary"] }}
                  >
                    {rowData.country}, {rowData.industry}
                  </Typography>
                </Typography>
              }
              tooltip={`${rowData.name}, ${rowData.country}, ${rowData.industry}`}
            />
          </Box>
        </Box>
      ),
    },
    {
      title: "LAST ROUND",
      key: "lastRound",
      headerProps: {
        style: { width: "160px", textAlign: "right" },
      },
      rowProps: { style: { textAlign: "right" } },
      render: (_, rowData) => (
        <Typography
          level="body1"
          sx={{
            color: colors["text-secondary"],
          }}
        >
          {rowData.lastRound}
        </Typography>
      ),
    },
    {
      title: "LRV",
      key: "lrv",
      headerProps: {
        style: { width: "140px", textAlign: "right" },
      },
      rowProps: { style: { textAlign: "right" } },

      render: (_, rowData) => (
        <Typography
          level="body1"
          sx={{
            color: colors["text-secondary"],
          }}
        >
          {rowData.lrv ? `$${number2USD(rowData.lrv)}` : ""}
        </Typography>
      ),
    },
    {
      title: "LRV DATE",
      key: "lrvDate",
      headerProps: {
        style: { width: "160px", textAlign: "right" },
      },
      rowProps: { style: { textAlign: "right" } },
      render: (_, rowData) => (
        <Typography level="body1" color={"text-primary"}>
          {rowData.lrvDate
            ? dayjs(rowData.lrvDate).format(DateFormat["MMM. D, YYYY"])
            : ""}
        </Typography>
      ),
    },
  ];

  const [files, setFiles] = useState<File[]>([]);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    let toastIdUploading: Id | undefined = "uploading";

    try {
      for (let i = 0; i < files.length; i++) {
        const fileSizeInMB = files[i].size / (1024 * 1024);
        if (
          files[i].type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          toast.error("The file type must be .xlsx");
          continue;
        }
        if (fileSizeInMB > MAX_FILE_SIZE) {
          continue;
        }

        toastIdUploading = toast.loading("Uploading", {
          autoClose: false,
          toastId: toastIdUploading,
        });

        await CompanyService.postImportPitchBook({ file: files[i] });

        toast.success("Company created");

        setFiles([]);
        await Promise.all([
          getListCompany(),
          getListCountry(),
          getListIndustry(),
        ]);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      toast.dismiss(toastIdUploading);
      setIsUploading(false);
    }
  };

  return (
    <Box>
      <DragDropBox
        accept={[".xlsx"]}
        disabled={isUploading}
        onFileUpload={handleFileUpload}
        sx={{
          height: "175px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <RiUploadLine size={42} />
        <Typography level="h5">
          {files.length > 0
            ? files.map((file) => file.name).join(", ")
            : "Drag and Drop the .xlsx file from Pitchbook here"}
        </Typography>
      </DragDropBox>

      <Box
        sx={{
          backgroundColor: colors["paper"],
          width: "100%",
          padding: "20px 12px",
          borderRadius: "6px",
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "12px",
        }}
      >
        <Box>
          <AppSearchBox onChange={handleChangeSearchKey} />
        </Box>
        <Select
          action={action}
          placeholder="Country"
          value={selectedCountry}
          {...(selectedCountry && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  setSelectedCountry(null);
                  action.current?.focusVisible();
                }}
              >
                <RiCloseLine />
              </IconButton>
            ),
            indicator: null,
          })}
          sx={{
            height: "42px",
          }}
        >
          {listCountry.length > 0 ? (
            listCountry.map((value) => (
              <Option
                key={value.country}
                value={value.country}
                onClick={() => {
                  setSelectedCountry(value.country);
                }}
                sx={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {value.country}
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
        <Select
          action={action}
          placeholder="Industry"
          value={selectedIndustry}
          {...(selectedIndustry && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  setSelectedIndustry(null);
                  action.current?.focusVisible();
                }}
              >
                <RiCloseLine />
              </IconButton>
            ),
            indicator: null,
          })}
          sx={{
            height: "42px",
          }}
        >
          {listIndustry.length > 0 ? (
            listIndustry.map((value) => (
              <Option
                key={value.industry}
                value={value.industry}
                onClick={() => {
                  setSelectedIndustry(value.industry);
                }}
                sx={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {value.industry}
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
      <Card sx={{ marginTop: "24px" }}>
        <AppTable
          stickyHeader
          columns={columnsCompanies}
          data={data}
          containerProps={{
            maxHeight: "calc(100vh - 175px - 42px - 42px - 96px)",
          }}
        />
      </Card>
    </Box>
  );
};
