import { Box, Button, Grid, Input, Option, Select, Typography } from "@mui/joy";
import { RiArrowRightLine } from "@remixicon/react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { AppDatePicker } from "src/components/base/AppDatePicker";
import AppSection from "src/components/base/AppSection";
import FormItem from "src/components/common/form/FormItem";
import { COUNTRIES } from "src/constants/dropdowns";
import { Message } from "src/constants/message";
import { UserInformationService } from "src/services/UserInformationService";
import { IField, PersonalDetailFormData } from "src/shared/types";
import { useAppStore } from "src/store/appStore";

const IDENTITY_FIELDS: Array<IField<PersonalDetailFormData>> = [
  {
    name: "firstName",
    label: "First Name",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 100,
        message: "This field cannot exceed 100 characters",
      },
      validate: (value) => value?.trim() !== "" || Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 6,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 100,
          },
        }}
      />
    ),
  },
  {
    name: "lastName",
    label: "Last Name",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 100,
        message: "This field cannot exceed 100 characters",
      },
      validate: (value) => value?.trim() !== "" || Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 6,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 100,
          },
        }}
      />
    ),
  },
  {
    name: "passport",
    label: "Passport / ID",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 100,
        message: "This field cannot exceed 100 characters",
      },
      validate: (value) => value?.trim() !== "" || Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 6,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 100,
          },
        }}
      />
    ),
  },
  {
    name: "national",
    label: "Nationality",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 100,
        message: "This field cannot exceed 100 characters",
      },
      validate: (value) => value?.trim() !== "" || Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 6,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 100,
          },
        }}
      />
    ),
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    rules: {
      required: Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 6,
    },
    renderItem: ({ ref, ...field }) => (
      <Box className="customDatePickerWidth">
        <AppDatePicker
          {...field}
          inputRef={ref}
          selected={field.value}
          dateFormat="dd/MM/YYYY"
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      </Box>
    ),
  },
  {
    name: "placeOfBirth",
    label: "Place of Birth",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 200,
        message: "This field cannot exceed 200 characters",
      },
      validate: (value) => value?.trim() !== "" || Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 6,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 200,
          },
        }}
      />
    ),
  },
];

const CONTACT_FIELDS: Array<IField<PersonalDetailFormData>> = [
  {
    name: "residential",
    label: "Residential Address",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 200,
        message: "This field cannot exceed 200 characters",
      },
      validate: (value) => value?.trim() !== "" || Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 12,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 200,
          },
        }}
      />
    ),
  },
  {
    name: "countryOfResidence",
    label: "Country of residence",
    size: {
      mobile: 12,
      laptop: 6,
    },
    rules: {
      required: Message.REQUIRED,
    },
    renderItem: (field) => (
      <Select
        value={field.value}
        onChange={(_, newValue) => field.onChange(newValue)}
        sx={{ background: "transparent", height: 42 }}
      >
        {COUNTRIES.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    ),
  },
  {
    name: "taxResidence",
    label: "Tax residency",
    size: {
      mobile: 12,
      laptop: 6,
    },
    rules: {
      required: Message.REQUIRED,
    },
    renderItem: (field) => (
      <Select
        value={field.value}
        onChange={(_, newValue) => field.onChange(newValue)}
        sx={{ background: "transparent", height: 42 }}
      >
        {COUNTRIES.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    ),
  },
];

const defaultValues = {
  passport: "",
  national: "",
  dateOfBirth: "",
  placeOfBirth: "",
  residential: "",
  countryOfResidence: "",
  taxResidence: "",
};

const PersonalDetailsForm = () => {
  const { reset } = useFormContext();
  const setLoading = useAppStore((state) => state.setLoading);

  useEffect(() => {
    const getStepDetail = async () => {
      try {
        setLoading(true);
        const res = await UserInformationService.getStepDetail(1);

        if (res.data.statusCode === 200) {
          const trimmedData = {
            ...res.data.data,
            firstName: (res.data.data?.firstName as string)?.trim() ?? "",
            lastName: (res.data.data?.lastName as string)?.trim() ?? "",
            passport: (res.data.data?.passport as string)?.trim() ?? "",
            national: (res.data.data?.national as string)?.trim() ?? "",
            placeOfBirth: (res.data.data?.placeOfBirth as string)?.trim() ?? "",
            residential: (res.data.data?.residential as string)?.trim() ?? "",
            countryOfResidence: res.data.data?.countryOfResidence ?? "",
            taxResidence: res.data.data?.taxResidence ?? "",
            dateOfBirth: res.data.data?.dateOfBirth
              ? dayjs(res.data.data?.dateOfBirth, "DD/MM/YYYY").toDate()
              : "",
          };
          reset(trimmedData);
        } else {
          reset(defaultValues);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    getStepDetail();
  }, [reset, setLoading]);

  const Top = () => (
    <Typography level="h4" sx={{ mb: 16 }}>
      Personal Details
    </Typography>
  );

  const Footer = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        mt: 24,
      }}
    >
      <Button type="submit" variant="solid" endDecorator={<RiArrowRightLine />}>
        Continue
      </Button>
    </Box>
  );

  return (
    <>
      <Top />
      <AppSection title="Identity">
        <Grid container spacing={16}>
          {IDENTITY_FIELDS.map((field, index) => (
            <Grid
              key={index}
              mobile={field.size?.mobile}
              laptop={field.size?.laptop}
            >
              <FormItem
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                {(fieldProps) => field.renderItem(fieldProps)}
              </FormItem>
            </Grid>
          ))}
        </Grid>
      </AppSection>
      <AppSection title="Address / Contact">
        <Grid container spacing={16}>
          {CONTACT_FIELDS.map((field, index) => (
            <Grid
              key={index}
              mobile={field.size?.mobile}
              laptop={field.size?.laptop}
            >
              <FormItem
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                {(fieldProps) => field.renderItem(fieldProps)}
              </FormItem>
            </Grid>
          ))}
        </Grid>
      </AppSection>
      <Footer />
    </>
  );
};

export default PersonalDetailsForm;
