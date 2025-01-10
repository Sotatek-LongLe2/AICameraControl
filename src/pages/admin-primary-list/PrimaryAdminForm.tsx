import { Box, Button, Grid, Option, Select, Stack, Typography } from "@mui/joy";
import {
  RiAddLine,
  RiCheckLine,
  RiDraggable,
  RiExternalLinkLine,
  RiUploadLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import {
  Controller,
  ControllerProps,
  FieldPath,
  SubmitErrorHandler,
  useForm,
  UseFormSetValue,
  useWatch,
  ValidateResult,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDatePicker } from "src/components/base/AppDatePicker";
import { AppFormWrapper } from "src/components/base/AppFormWrapper";
import { AppInput } from "src/components/base/AppInput";
import { AppInputController } from "src/components/base/AppInputController";
import { DragDropBox } from "src/components/common/DragDropBox";
import { FileItem, TFileItem } from "src/components/common/FileItem";
import { StrictModeDroppable } from "src/components/common/StrictModeDroppable";
import {
  PrimaryFundingRound,
  PrimaryStatus,
  StageAdmin,
} from "src/constants/enumBE";
import { Message } from "src/constants/message";
import { PAGES_ADMIN } from "src/constants/router";
import { AdminPrimaryService } from "src/services/AdminPrimaryService";
import { IDocument } from "src/services/AdminPrimaryService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";
import { v4 as uuidv4 } from "uuid";
import {
  validateBanner,
  validateDocument,
  validateLogo,
} from "./PrimaryAdminForm.utils";
import { AppInputNumber } from "src/components/base/AppInputNumber";
import { AppLexical } from "src/components/base/lexical/AppLexical";
import { MessageError } from "src/components/common/MessageError";
import { DateFormat } from "src/constants/enum";
import { getStatusFromDate } from "src/shared/primaryStatus";
import { isNullOrUndefined } from "src/shared/utils";
import { FUNDING_ROUNDs } from "../../constants/options";
import { IPrimaryDetail } from "../primary/detail";
import DragImageCrop from "src/components/DragImageCrop";

const getImageUrl = (image?: TFileItem) => {
  if (!image) return "";

  if ("fullPath" in image) return image.fullPath;

  const imageUrl = URL.createObjectURL(image);

  return imageUrl;
};

const getUndefinedOrDate = (date?: string | Date) =>
  date ? dayjs(date).toDate() : undefined;

const getDateParams = (date?: Date) =>
  date
    ? dayjs(date).utc().format(DateFormat["YYYY-MM-DD HH:mm:ss"])
    : undefined;

// File -> pass File; not change -> pass undefined;
const getFileParams = (file?: TFileItem) =>
  file instanceof File ? file : undefined;

const getRemoveFileParams = (file?: TFileItem) =>
  isNullOrUndefined(file) ? "" : undefined;

interface IDoc {
  draggableId: string;
  doc: File | IDocument;
}

interface IForm {
  id?: number;
  name: string;
  industry: string;
  placeHolderName: string;
  fundingRound?: PrimaryFundingRound;
  logo?: TFileItem;
  dealSize?: string;
  valuationPre: string;
  minimumSize: string;
  offerPrice: string;
  launchDate?: Date;
  booksOpen?: Date;
  booksClose?: Date;
  allocationStartDate?: Date;
  closingDate?: Date;
  banner?: TFileItem;
  croppedBanner?: File | null;
  placeholderBanner?: TFileItem;
  croppedPlaceholderBanner?: File | null;
  introduction?: string;
  solution?: string;
  dealTerms: ITerm[];
  docs: IDoc[];
  deleteDocsIdList: number[];
  status?: PrimaryStatus;
}

interface ITerm {
  id: string;
  name: string;
  value: string;
}

const DEFAULT_VALUE: IForm = {
  dealSize: undefined,
  industry: "",
  logo: undefined,
  name: "",
  placeHolderName: "",
  valuationPre: "",
  minimumSize: "",
  offerPrice: "",
  banner: undefined,
  placeholderBanner: undefined,
  introduction: undefined,
  solution: undefined,
  croppedBanner: undefined,
  croppedPlaceholderBanner: undefined,
  dealTerms: [],
  docs: [],
  deleteDocsIdList: [],
  status: PrimaryStatus.DRAFT,
};

export const PrimaryAdminForm = () => {
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    setError,
    reset,
    setFocus,
    clearErrors,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: { ...DEFAULT_VALUE },
  });

  const params = useParams();
  const id = Number(params.id) || 0;
  const setLoading = useAppStore((state) => state.setLoading);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDraft = useWatch({ control, name: "status" }) === PrimaryStatus.DRAFT;
  const isDraftRef = useRef<boolean>(false);
  const isPreviewRef = useRef<boolean>(false);
  const previewTabRef = useRef<Window>();
  const handleMessageRef = useRef<(event: MessageEvent) => void>();

  const formValue = watch();

  useEffect(() => {
    if (!id) {
      setValue("solution", "");
      setValue("introduction", "");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await AdminPrimaryService.getPrimaryById({
          primaryId: id,
        });

        reset({
          launchDate: getUndefinedOrDate(data.launchDate),
          booksOpen: getUndefinedOrDate(data.booksOpen),
          booksClose: getUndefinedOrDate(data.booksClose),
          allocationStartDate: getUndefinedOrDate(data.allocationStartDate),
          closingDate: getUndefinedOrDate(data.closeDate),
          dealSize: isNullOrUndefined(data.dealSize)
            ? undefined
            : Number(data.dealSize).toString(),
          dealTerms:
            data.dealTerms?.map((item) => ({ ...item, id: uuidv4() })) ??
            DEFAULT_VALUE.dealTerms,
          docs:
            data.docs.map((doc) => ({
              draggableId: uuidv4(),
              doc: { ...doc, filePath: doc.fileName },
            })) ?? [],
          fundingRound: data.fundingRound ?? undefined,
          industry: data.industry,
          introduction: data.introduction,
          minimumSize: data.minimumSize,
          name: data.name,
          offerPrice: data.offerPrice,
          placeHolderName: data.placeHolderName,
          solution: data.solution,
          valuationPre: data.valuationPre,
          id,
          deleteDocsIdList: [],
          banner: data.bannerUrl
            ? {
                fullPath: data.bannerUrl,
                filePath: data.bannerUrl?.split("/").at(-1),
              }
            : undefined,
          placeholderBanner: data.placeholderBannerUrl
            ? {
                fullPath: data.placeholderBannerUrl,
                filePath: data.placeholderBannerUrl.split("/").at(-1),
              }
            : undefined,
          logo: data.logoUrl
            ? {
                fullPath: data.logoUrl,
                filePath: data.logoUrl.split("/").at(-1),
              }
            : undefined,
          status: data.status,
          croppedBanner: undefined,
          croppedPlaceholderBanner: undefined,
        });
      } catch (e) {
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset, setLoading, setValue]);

  const handleChangeValue: UseFormSetValue<IForm> = useCallback(
    (...params) => {
      clearErrors(params[0]);
      setValue(...params);
    },
    [clearErrors, setValue]
  );

  const handlePreview = useCallback(() => {
    const previewItem: Partial<IPrimaryDetail> = {
      ...formValue,
      closeDate: formValue.closingDate,
      dealTerms: formValue.dealTerms.map((item, index) => ({
        ...item,
        index: index.toString(),
      })),
      docs: formValue.docs.map(({ doc }) => {
        if ("fullPath" in doc)
          return { filePath: doc.filePath, fullPath: doc.fullPath };

        return {
          filePath: doc.name,
          fullPath: getImageUrl(doc),
        };
      }),
      stage:
        getStatusFromDate({ ...formValue, closeDate: formValue.closingDate })
          .stage ?? StageAdmin.LAUNCH_DATE,
      bannerUrl: getImageUrl(formValue.croppedBanner ?? formValue.banner),
      logoUrl: getImageUrl(formValue.logo),
      placeholderBannerUrl: getImageUrl(
        formValue.croppedPlaceholderBanner ?? formValue.placeholderBanner
      ),
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "REQUEST_DATA") {
        event.source?.postMessage(previewItem, { targetOrigin: "*" });
      }
    };

    const previewWindow = window.open(PAGES_ADMIN.PRIMARY.PREVIEW);
    if (previewWindow) {
      previewTabRef.current = previewWindow;

      window.removeEventListener("message", handleMessage);
      window.addEventListener("message", handleMessage);
      handleMessageRef.current = handleMessage;
    }
  }, [formValue]);

  useEffect(() => {
    const onPageClose = () => {
      if (!previewTabRef.current || previewTabRef.current.closed) return;

      previewTabRef.current.close();
    };

    window.addEventListener("beforeunload", onPageClose);

    return () => {
      window.removeEventListener("beforeunload", onPageClose);

      if (handleMessageRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        window.removeEventListener("message", handleMessageRef.current);
    };
  }, []);

  const onSubmit = useCallback(
    async (data: IForm) => {
      const {
        launchDate,
        booksOpen,
        booksClose,
        allocationStartDate,
        closingDate,
        banner,
        placeholderBanner,
        logo,
        croppedBanner,
        croppedPlaceholderBanner,
        ...resData
      } = data;

      if (
        !isDraftRef.current &&
        (dayjs(launchDate).diff(booksOpen) >= 0 ||
          dayjs(booksOpen).diff(booksClose) >= 0 ||
          dayjs(booksClose).diff(allocationStartDate) >= 0 ||
          dayjs(allocationStartDate).diff(closingDate) >= 0)
      ) {
        setError(
          "allocationStartDate",
          {
            message: `Some of the dates you have selected are not in the correct order of Launch date >> Books Open >> Books Close >> Allocation Start Date >> Closing Date. Please check and select again`,
          },
          { shouldFocus: true }
        );
        return;
      }

      if (isPreviewRef.current) {
        handlePreview();
        return;
      }

      try {
        setLoading(true);
        delete resData.status;

        const res = await AdminPrimaryService.createPrimary({
          ...resData,
          isDraft: isDraftRef.current,
          dealTerms: data.dealTerms.map(({ name, value }, index) => ({
            name,
            value,
            index,
          })),
          launchDate: getDateParams(launchDate),
          booksOpen: getDateParams(booksOpen),
          booksClose: getDateParams(booksClose),
          allocationStartDate: getDateParams(allocationStartDate),
          closeDate: getDateParams(closingDate),
          docs: resData.docs.map(({ doc }) => doc),
          solution: resData.solution ?? "",
          banner: croppedBanner ?? getFileParams(banner),
          placeholderBanner:
            croppedPlaceholderBanner ?? getFileParams(placeholderBanner),
          logo: getFileParams(logo),

          // Remove image on draft mode
          bannerUrl: getRemoveFileParams(banner),
          placeholderBannerUrl: getRemoveFileParams(placeholderBanner),
          logoUrl: getRemoveFileParams(logo),
        });

        if (res.data.statusCode === 201) {
          if (!isDraftRef.current)
            toast.success(id ? "Primary Edited" : "Primary Created");
          window.navigate(-1);
          return;
        }
      } catch (e) {
        console.log(e);
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    },
    [handlePreview, id, setError, setLoading]
  );

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files as FileList);
    const message = await validateDocument(files);

    if (fileInputRef.current) fileInputRef.current.value = "";

    if (message) {
      setError("docs", { message });
      return;
    }

    handleChangeValue("docs", [
      ...formValue.docs,
      ...files.map((file) => ({ draggableId: uuidv4(), doc: file })),
    ]);
  };

  const onUploadLogo = async (files: File[]) => {
    const message = await validateLogo(files);

    if (message) {
      setError("logo", { message });
      return;
    }

    handleChangeValue("logo", files[0]);
  };

  const onUploadBanner = async (files: File[], field: keyof IForm) => {
    const message = await validateBanner(files);

    if (message) {
      setError(field, { message });
      return;
    }
    handleChangeValue(field, files[0]);
  };

  const onDragEnd = useCallback(<T,>(items: T[], result: DropResult) => {
    const { destination, source } = result;

    // Check if there is no destination
    if (!destination) {
      return items;
    }

    // If the destination and source positions are the same
    if (destination.index === source.index) {
      return items;
    }

    // Create a copy of items
    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, movedItem);

    // Create a copy of items
    return newItems;
  }, []);

  const ControllerWrapper = useCallback(
    <TName extends FieldPath<IForm> = FieldPath<IForm>>({
      rules,
      required,
      ...props
    }: ControllerProps<IForm, TName> & { required?: boolean }) => {
      return (
        <Controller
          rules={{
            validate: (value, formValues) => {
              if (isDraftRef.current) return;

              if (!required)
                return typeof rules?.validate === "function"
                  ? rules?.validate?.(value, formValues)
                  : (rules?.validate as ValidateResult);

              if (
                isNullOrUndefined(value) ||
                (typeof value === "string" && !value.trim())
              )
                return Message.REQUIRED;
            },
          }}
          {...props}
        />
      );
    },
    []
  );

  const onInvalid: SubmitErrorHandler<IForm> = useCallback(
    (errors) => {
      if (Object.keys(errors).length === 1 && errors.docs) {
        onSubmit(formValue);
      }
    },
    [formValue, onSubmit]
  );

  const urlLogo = useMemo(() => {
    return getImageUrl(formValue.logo);
  }, [formValue.logo]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      width={972}
      marginX="auto"
    >
      <Stack bgcolor={colors.paper} padding="20px" gap="28px">
        <Typography level="h4" fontWeight="500">
          {id ? "Edit Primary" : "Create Primary"}
        </Typography>

        <Stack gap="20px" className="Company Select">
          <Typography level="h5" sx={{ fontWeight: 500 }}>
            Company
          </Typography>

          <Box display="flex" gap="20px">
            <AppInputController
              name="name"
              required
              control={control}
              label="Name"
              wrapperProps={{ sx: { width: "100%" } }}
              slotProps={{
                input: {
                  maxLength: 100,
                },
              }}
            />

            <AppInputController
              name="industry"
              rules={{
                validate: (value) => {
                  if (isDraftRef.current) return;

                  if (!String(value).trim()) return Message.REQUIRED;
                },
              }}
              control={control}
              wrapperProps={{ sx: { width: "100%" } }}
              label="Industry"
              slotProps={{
                input: {
                  maxLength: 100,
                },
              }}
            />
          </Box>

          <Stack gap="8px">
            <AppInputController
              name="placeHolderName"
              rules={{
                validate: (value) => {
                  if (isDraftRef.current) return;

                  if (!String(value).trim()) return Message.REQUIRED;
                },
              }}
              control={control}
              wrapperProps={{ sx: { width: "50%" } }}
              label="Placeholder Name"
              slotProps={{
                input: {
                  maxLength: 100,
                },
              }}
            />

            <Typography level="body1">
              This placeholder name will show instead of the company name until
              the Launch Date.
            </Typography>
          </Stack>

          <Stack gap="20px">
            <Typography level="h5" sx={{ fontWeight: 500 }}>
              Logo
            </Typography>

            <Box display="flex" alignItems="center" gap="20px">
              <ControllerWrapper
                control={control}
                name="logo"
                required
                render={({ fieldState: { error } }) => (
                  <AppFormWrapper
                    error={error?.message || errors.logo?.message}
                    sx={{ ...(!formValue.logo && { flex: 1 }) }}
                  >
                    <DragDropBox
                      onFileUpload={onUploadLogo}
                      inputProps={{ multiple: false }}
                      sx={{
                        height: "202px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ...(formValue.logo && {
                          width: 73,
                          height: 73,
                          border: "none",
                        }),
                      }}
                      imageUrl={urlLogo}
                    >
                      {!formValue.logo && (
                        <Box>
                          <RiUploadLine size={42} />
                          <Typography
                            level="h5"
                            sx={{
                              whiteSpace: "break-spaces",
                              fontWeight: 500,
                            }}
                          >
                            Please upload a JPEG or PNG file{`\n`}300 * 300
                            pixels or superior
                          </Typography>
                        </Box>
                      )}
                    </DragDropBox>
                  </AppFormWrapper>
                )}
              />
              {formValue.logo && (
                <Button
                  variant="outlined"
                  color="error-main"
                  onClick={() => handleChangeValue("logo", undefined)}
                >
                  Remove
                </Button>
              )}
            </Box>
          </Stack>
        </Stack>

        <Stack gap="20px" className="Details">
          <Typography level="h5">Details</Typography>
          <Grid container columnSpacing="20px">
            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="fundingRound"
                required
                render={({ field, fieldState: { error } }) => (
                  <AppFormWrapper error={error?.message} label="Funding Round">
                    <Select
                      {...field}
                      onChange={(_, newValue) =>
                        !isNullOrUndefined(newValue) &&
                        handleChangeValue("fundingRound", newValue)
                      }
                    >
                      {FUNDING_ROUNDs.map((item, index) => (
                        <Option value={item.value} key={index}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </AppFormWrapper>
                )}
              />
            </Grid>

            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="dealSize"
                required
                render={({
                  field: { onChange, ...field },
                  fieldState: { error },
                }) => (
                  <AppInputNumber
                    {...field}
                    startDecorator="$"
                    onValueChange={(value) => onChange(value.floatValue)}
                    error={error?.message}
                    label="Deal Size"
                    maxLength={20}
                  />
                )}
              />
            </Grid>

            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="valuationPre"
                required
                render={({
                  field: { onChange, ...field },
                  fieldState: { error },
                }) => (
                  <AppInputNumber
                    {...field}
                    startDecorator="$"
                    onValueChange={(value) => onChange(value.floatValue)}
                    error={error?.message}
                    label="Valuation Pre"
                    maxLength={20}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing="20px">
            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="offerPrice"
                required
                render={({
                  field: { onChange, ...field },
                  fieldState: { error },
                }) => (
                  <AppInputNumber
                    {...field}
                    startDecorator="$"
                    onValueChange={(value) => onChange(value.floatValue)}
                    error={error?.message}
                    label="Offer Price"
                    maxLength={20}
                  />
                )}
              />
            </Grid>
            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="minimumSize"
                required
                render={({
                  field: { onChange, ...field },
                  fieldState: { error },
                }) => (
                  <AppInputNumber
                    {...field}
                    startDecorator="$"
                    onValueChange={(value) => onChange(value.floatValue)}
                    error={error?.message}
                    label="Minimum Size"
                    maxLength={20}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack gap="20px" className="Schedule">
          <Typography level="h5">Schedule</Typography>
          <Grid container columnSpacing="20px">
            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="launchDate"
                required
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error },
                }) => (
                  <AppFormWrapper error={error?.message} label="Launch date">
                    <AppDatePicker
                      inputRef={ref}
                      selected={value}
                      dateFormat={DateFormat["dd/MM/yyyy HH:mm"]}
                      showTimeSelect
                      {...field}
                    />
                  </AppFormWrapper>
                )}
              />
            </Grid>

            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="booksOpen"
                required
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error },
                }) => (
                  <AppFormWrapper error={error?.message} label="Books Open">
                    <AppDatePicker
                      inputRef={ref}
                      selected={value}
                      dateFormat={DateFormat["dd/MM/yyyy HH:mm"]}
                      showTimeSelect
                      {...field}
                    />
                  </AppFormWrapper>
                )}
              />
            </Grid>

            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="booksClose"
                required
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error },
                }) => (
                  <AppFormWrapper error={error?.message} label="Books Close">
                    <AppDatePicker
                      inputRef={ref}
                      selected={value}
                      dateFormat={DateFormat["dd/MM/yyyy HH:mm"]}
                      showTimeSelect
                      {...field}
                    />
                  </AppFormWrapper>
                )}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing="20px">
            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="allocationStartDate"
                required
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error },
                }) => (
                  <AppFormWrapper
                    error={error?.message}
                    label="Allocation start date"
                  >
                    <AppDatePicker
                      inputRef={ref}
                      selected={value}
                      dateFormat={DateFormat["dd/MM/yyyy HH:mm"]}
                      showTimeSelect
                      {...field}
                    />
                  </AppFormWrapper>
                )}
              />
            </Grid>
            <Grid mobile={4}>
              <ControllerWrapper
                control={control}
                name="closingDate"
                required
                render={({
                  field: { ref, value, ...field },
                  fieldState: { error },
                }) => (
                  <AppFormWrapper error={error?.message} label="Closing Date">
                    <AppDatePicker
                      inputRef={ref}
                      selected={value}
                      dateFormat={DateFormat["dd/MM/yyyy HH:mm"]}
                      showTimeSelect
                      {...field}
                    />
                  </AppFormWrapper>
                )}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack gap="20px" className="Banner Visual">
          <Typography level="h5">Banner Visual</Typography>

          <Box display="flex" alignItems="center" gap="20px">
            <ControllerWrapper
              control={control}
              name="banner"
              required
              render={({ fieldState: { error } }) => (
                <AppFormWrapper error={error?.message} sx={{ flex: 1 }}>
                  <DragImageCrop
                    onCroppedValueChange={(image) => {
                      handleChangeValue("croppedBanner", image ?? undefined);
                    }}
                    onChange={(image) => {
                      onUploadBanner(image ? [image] : [], "banner");
                    }}
                    value={formValue.banner}
                    aspect={809 / 202}
                    height={202}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box>
                      <RiUploadLine size={42} />
                      <Typography
                        level="h5"
                        sx={{
                          whiteSpace: "break-spaces",
                          fontWeight: 500,
                        }}
                      >
                        Please upload a JPEG file{"\n"}1140 * 300 pixels or
                        superior
                      </Typography>
                    </Box>
                  </DragImageCrop>
                </AppFormWrapper>
              )}
            />

            {formValue.banner && (
              <Button
                variant="outlined"
                color="error-main"
                onClick={() => handleChangeValue("banner", undefined)}
              >
                Remove
              </Button>
            )}
          </Box>
        </Stack>

        <Stack gap="20px" className="Placeholder Banner Visual">
          <Stack gap="8px">
            <Typography level="h5">Placeholder Banner Visual</Typography>
            <Typography level="body1">
              This placeholder banner visual will show instead of the banner
              visual until the Launch Date.
            </Typography>
          </Stack>
          <Box display="flex" alignItems="center" gap="20px">
            <ControllerWrapper
              control={control}
              name="placeholderBanner"
              required
              render={({ fieldState: { error } }) => (
                <AppFormWrapper
                  error={error?.message}
                  sx={{
                    flex: 1,
                  }}
                >
                  <DragImageCrop
                    onCroppedValueChange={(image) => {
                      handleChangeValue(
                        "croppedPlaceholderBanner",
                        image ?? undefined
                      );
                    }}
                    onChange={(image) => {
                      onUploadBanner(image ? [image] : [], "placeholderBanner");
                    }}
                    value={formValue.placeholderBanner}
                    aspect={809 / 202}
                    height={202}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box>
                      <RiUploadLine size={42} />
                      <Typography
                        level="h5"
                        sx={{
                          whiteSpace: "break-spaces",
                          fontWeight: 500,
                        }}
                      >
                        Please upload a JPEG file{"\n"}1140 * 300 pixels or
                        superior
                      </Typography>
                    </Box>
                  </DragImageCrop>
                </AppFormWrapper>
              )}
            />
            {formValue.placeholderBanner && (
              <Button
                variant="outlined"
                color="error-main"
                onClick={() =>
                  handleChangeValue("placeholderBanner", undefined)
                }
              >
                Remove
              </Button>
            )}
          </Box>
        </Stack>

        <Stack gap="20px" className="Introduction">
          <Stack gap="8px">
            <Typography level="h5">Introduction</Typography>
          </Stack>

          <ControllerWrapper
            control={control}
            name="introduction"
            required
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <AppFormWrapper error={error?.message}>
                <AppLexical
                  inputRef={ref}
                  onValueChange={(value) => {
                    handleChangeValue("introduction", value);
                  }}
                  value={field.value}
                  height={199}
                />
              </AppFormWrapper>
            )}
          />
        </Stack>

        <Stack gap="20px" className="Solution">
          <Stack gap="8px">
            <Typography level="h5">Solution</Typography>
          </Stack>

          <ControllerWrapper
            control={control}
            name="solution"
            required
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <AppFormWrapper error={error?.message}>
                <AppLexical
                  inputRef={ref}
                  onValueChange={(value) => {
                    handleChangeValue("solution", value);
                  }}
                  value={field.value}
                  height={199}
                />
              </AppFormWrapper>
            )}
          />
        </Stack>

        <Stack className="Deal Terms">
          <Box display="inline-flex" gap="20px" alignItems="center">
            <Typography level="h5">Deal Terms</Typography>
            <Button
              endDecorator={<RiAddLine size={16} />}
              variant="outlined"
              size="md"
              onClick={() => {
                if (
                  !formValue.dealTerms.some(
                    (term) => !term.name.trim() || !term.value.trim()
                  )
                ) {
                  formValue.dealTerms.push({
                    name: "",
                    value: "",
                    id: uuidv4(),
                  });
                }
                setValue("dealTerms", [...formValue.dealTerms]);

                setTimeout(() => {
                  setFocus(`dealTerms.${formValue.dealTerms.length - 1}.name`);
                });
              }}
            >
              Add Field
            </Button>
          </Box>

          <DragDropContext
            onDragEnd={(result) => {
              const newRecord = onDragEnd(formValue.dealTerms, result);
              setValue("dealTerms", newRecord);
            }}
          >
            <StrictModeDroppable droppableId="dropable_dealTerms">
              {(provided) => (
                <Stack
                  gap="4px"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {formValue.dealTerms.map((term, index) => (
                    <Draggable
                      key={term.id}
                      draggableId={term.id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          display="flex"
                          key={index}
                          gap="20px"
                          alignItems="flex-end"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Box height="42px" display="flex" alignItems="center">
                            <RiDraggable />
                          </Box>
                          <Controller
                            name={`dealTerms.${index}.name`}
                            control={control}
                            render={({ field }) => (
                              <AppInput
                                label="Field Name"
                                wrapperProps={{
                                  sx: { width: "297px" },
                                }}
                                slotProps={{
                                  input: {
                                    maxLength: 30,
                                  },
                                }}
                                {...field}
                              />
                            )}
                          />

                          <Controller
                            name={`dealTerms.${index}.value`}
                            control={control}
                            render={({ field }) => (
                              <AppInput
                                label="Field Value"
                                wrapperProps={{
                                  sx: { width: "297px" },
                                }}
                                slotProps={{
                                  input: {
                                    maxLength: 30,
                                  },
                                }}
                                {...field}
                              />
                            )}
                          />

                          <Button
                            variant="outlined"
                            color="error-main"
                            size="md"
                            onClick={() => {
                              formValue.dealTerms.splice(index, 1);

                              setValue("dealTerms", [...formValue.dealTerms]);
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </Stack>

        <Stack className="Data Room" gap="20px">
          <Box display="inline-flex" gap="20px" alignItems="center">
            <Typography level="h5">Data Room</Typography>
            <Button
              endDecorator={<RiAddLine size={16} />}
              variant="outlined"
              size="md"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              Add Documents
            </Button>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
            <MessageError>{errors.docs?.message}</MessageError>
          </Box>

          <DragDropContext
            onDragEnd={(result) => {
              const newRecord = onDragEnd(formValue.docs, result);
              setValue("docs", newRecord);
            }}
          >
            <StrictModeDroppable droppableId="dropable_docs">
              {(provided) => (
                <Stack
                  gap="4px"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {formValue.docs.map((docItem, index) => (
                    <Draggable
                      key={docItem.draggableId}
                      draggableId={docItem.draggableId}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          display="flex"
                          key={index}
                          gap="20px"
                          alignItems="flex-end"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FileItem
                            file={docItem.doc}
                            draggable
                            key={index}
                            onRemove={() => {
                              if ("id" in docItem.doc) {
                                setValue("deleteDocsIdList", [
                                  ...formValue.deleteDocsIdList,
                                  docItem.doc.id,
                                ]);
                              }
                              formValue.docs.splice(index, 1);

                              setValue("docs", [...formValue.docs]);
                            }}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </Stack>
        <Box display="flex" alignItems="flex-end" gap="16px" minHeight="62px">
          <Button
            fullWidth
            size="lg"
            color="astra-pink"
            variant="outlined"
            onClick={() => window.navigate(-1)}
          >
            Discard
          </Button>

          <Button
            endDecorator={<RiExternalLinkLine />}
            fullWidth
            size="lg"
            type="submit"
            color="secondary-main"
            onClick={() => {
              isPreviewRef.current = true;
              isDraftRef.current = false;
            }}
          >
            {isDraft ? "Preview Primary" : "View Primary"}
          </Button>
          {!id || formValue.status === PrimaryStatus.DRAFT ? (
            <Button
              variant="outlined"
              fullWidth
              size="lg"
              type="submit"
              onClick={() => {
                isPreviewRef.current = false;
                isDraftRef.current = true;
              }}
            >
              Save As Draft
            </Button>
          ) : null}
          <Button
            endDecorator={isDraft ? <RiCheckLine /> : undefined}
            fullWidth
            size="lg"
            type="submit"
            onClick={() => {
              isDraftRef.current = false;
              isPreviewRef.current = false;
            }}
          >
            {isDraft ? "Publish Primary" : "Save Changes"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
