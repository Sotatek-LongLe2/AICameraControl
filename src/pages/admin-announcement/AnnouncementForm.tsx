import {
  Autocomplete,
  AutocompleteOption,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/joy";
import { RiSearchLine } from "@remixicon/react";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormItem from "src/components/common/form/FormItem";
import { SecondarySideEnum } from "src/constants/enumBE";
import { Message } from "src/constants/message";
import { ANNOUNCEMENT_TYPE } from "src/constants/options";
import { PAGES_ADMIN } from "src/constants/router";
import { AnnouncementService } from "src/services/AnnouncementService";
import { IResGetLinkTo } from "src/services/AnnouncementService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

const AnnouncementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    watch,
    reset,
    setValue,
    formState: { isValid },
  } = useFormContext();
  const [linkToOptions, setLinkToOptions] = useState<IResGetLinkTo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const setLoading = useAppStore((state) => state.setLoading);

  const announcementType = watch("type");

  const getLinkToOptions = useCallback(async () => {
    if (!announcementType) return;

    try {
      setLoading(true);
      const res = await AnnouncementService.getLinkTo({
        limit: 1000,
        page: 1,
        type: Number(announcementType),
      });
      if (res.data.statusCode === 200) {
        setLinkToOptions(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, [announcementType, setLoading]);

  const getAnnouncementDetail = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await AnnouncementService.getDetail(Number(id));
      if (res.data.statusCode === 200) {
        reset({
          type: res.data.data.type.toString(),
          companyId: res.data.data.secondaryId || res.data.data.primaryId,
          title: res.data.data.title,
        });
        setInputValue(res.data.data?.company || "");
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  }, [id, reset, setLoading]);

  useEffect(() => {
    getLinkToOptions();
  }, [getLinkToOptions]);

  useEffect(() => {
    getAnnouncementDetail();
  }, [getAnnouncementDetail]);

  return (
    <>
      <Grid container spacing={28}>
        <Grid mobile={12} laptop={"auto"}>
          <FormItem
            name="type"
            label="Announcement Type"
            labelStyle={{
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "Jost",
              mb: 8,
            }}
            rules={{ required: Message.REQUIRED }}
          >
            {(field) => (
              <FormControl>
                <RadioGroup
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("companyId", "");
                    setInputValue("");
                  }}
                >
                  {ANNOUNCEMENT_TYPE.map((item) => (
                    <Radio
                      key={item.label}
                      value={item.value}
                      sx={{
                        [`&.Mui-checked .MuiRadio-label .MuiTypography-root`]: {
                          color: colors["primary-main"],
                        },
                        [`.MuiTypography-root`]: {
                          color: colors["text-secondary"],
                        },
                      }}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 8 }}
                        >
                          <item.icon />
                          <Typography level="body1">{item.label}</Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={12} sx={{ p: 0 }}></Grid>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="companyId"
            label="Link To"
            labelStyle={{
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "Jost",
              mb: 8,
            }}
            rules={{ required: Message.REQUIRED }}
          >
            {({ value, onChange }) => (
              <Autocomplete
                options={linkToOptions}
                getOptionLabel={(option) =>
                  (option as IResGetLinkTo).companyName
                }
                isOptionEqualToValue={(option, value) =>
                  option.companyId === value.companyId
                }
                value={
                  linkToOptions.find((option) => option.companyId === value) ||
                  null
                }
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  if (event) {
                    setInputValue(newInputValue);
                  }
                }}
                onChange={(_, newValue) => {
                  onChange(
                    newValue ? (newValue as IResGetLinkTo).companyId : ""
                  );
                  setInputValue(
                    newValue ? (newValue as IResGetLinkTo).companyName : ""
                  );
                }}
                freeSolo
                startDecorator={
                  <RiSearchLine size={16} color={colors["text-primary"]} />
                }
                sx={{ background: "transparent", height: 42 }}
                disabled={!announcementType}
                renderOption={(props, option) => (
                  <AutocompleteOption
                    {...props}
                    key={
                      announcementType === "2"
                        ? `${option.companyId}-${option?.side}-${option?.firstName}-${option?.lastName}`
                        : option.companyId.toString()
                    }
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {announcementType === "2" && (
                        <Chip
                          sx={(theme) => ({
                            background:
                              option?.side === SecondarySideEnum.BUY
                                ? theme.color["primary-main"]
                                : theme.color["astra-pink"],
                            textTransform: "uppercase",
                          })}
                        >
                          {option?.side === SecondarySideEnum.BUY
                            ? "BUY"
                            : "SELL"}
                        </Chip>
                      )}
                      <Typography level="h5">{option.companyName}</Typography>
                      {announcementType === "2" && (
                        <Typography level="h5">
                          {" "}
                          - {option?.firstName} {option?.lastName}
                        </Typography>
                      )}
                    </Box>
                  </AutocompleteOption>
                )}
              />
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={12}>
          <FormItem
            name="title"
            label="Title"
            labelStyle={{
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "Jost",
              mb: 8,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 100,
                message: "This field cannot exceed 100 characters",
              },
              validate: (value) => value?.trim() !== "" || Message.REQUIRED,
            }}
          >
            {(field) => (
              <Input
                {...field}
                slotProps={{
                  input: {
                    maxLength: 100,
                  },
                }}
              />
            )}
          </FormItem>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mt: 48,
          gap: 16,
        }}
      >
        <Button
          variant="outlined"
          color="astra-pink"
          onClick={() => navigate(PAGES_ADMIN.ANNOUNCEMENTS.INDEX)}
          sx={{ flex: 1 }}
        >
          Discard
        </Button>
        <Button type="submit" sx={{ flex: 1 }} disabled={!isValid}>
          {id ? "Update Announcement" : "Publish Announcement"}
        </Button>
      </Box>
    </>
  );
};

export default AnnouncementForm;
