import {
  Input,
  Select,
  Option,
  FormControl,
  RadioGroup,
  Radio,
  Typography,
  Box,
  Button,
  Grid,
} from "@mui/joy";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormItem from "src/components/common/form/FormItem";
import { SOURCE_OF_WEALTH, TYPE_OF_INVESTMENT } from "src/constants/dropdowns";
import { Message } from "src/constants/message";
import PAGES from "src/constants/router";
import { UserInformationService } from "src/services/UserInformationService";
import { FinanceFormData, IField } from "src/shared/types";
import { useAppStore } from "src/store/appStore";

const FINANCE_FIELDS: Array<IField<FinanceFormData>> = [
  {
    name: "occupation",
    label: "What is your current or most recent occupation?",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 200,
        message: "This field cannot exceed 100 characters",
      },
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
    name: "occupationIndustry",
    label: "What is your occupation industry?",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 100,
        message: "This field cannot exceed 100 characters",
      },
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
    name: "isLiabilities",
    label:
      "Does your current liquid portfolio plus regular income generally cover all your current and future liabilities?",
    rules: {
      required: Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 12,
    },
    renderItem: (field) => (
      <FormControl>
        <RadioGroup
          {...field}
          value={field.value || ""}
          orientation="horizontal"
        >
          <Radio value="1" label="Yes" />
          <Radio value="0" label="No" />
        </RadioGroup>
      </FormControl>
    ),
  },
  {
    name: "productKnowledge",
    label:
      "What type of investment products do you have knowledge and experience with ?",
    rules: {
      required: Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 12,
    },
    renderItem: (field) => (
      <Select
        value={field.value}
        onChange={(_, newValue) => field.onChange(newValue)}
        sx={{ background: "transparent", height: 42 }}
      >
        {TYPE_OF_INVESTMENT.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    ),
  },
  {
    name: "sourceOfWealth",
    label: "Please indicate the source of wealth to be invested in Astra",
    rules: {
      required: Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 12,
    },
    renderItem: (field) => (
      <Select
        value={field.value}
        onChange={(_, newValue) => field.onChange(newValue)}
        sx={{ background: "transparent", height: 42 }}
      >
        {SOURCE_OF_WEALTH.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    ),
  },
];

const defaultValues = {
  occupation: "",
  occupationIndustry: "",
  isLiabilities: "",
  productKnowledge: "",
  sourceOfWealth: "",
};

const FinanceForm = () => {
  const navigate = useNavigate();
  const { reset } = useFormContext<FinanceFormData>();
  const setLoading = useAppStore((state) => state.setLoading);

  useEffect(() => {
    const getStepDetail = async () => {
      try {
        setLoading(true);
        const res = await UserInformationService.getStepDetail(2);

        const financeData = res.data.data.finance as FinanceFormData;
        if (financeData) {
          const trimmedData = {
            ...financeData,
            occupation: financeData.occupation?.trim() ?? "",
            occupationIndustry: financeData.occupationIndustry?.trim() ?? "",
            isLiabilities: String(financeData.isLiabilities),
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
      Finance
    </Typography>
  );

  const Footer = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        mt: 24,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(PAGES.REGISTRATION.STEP_1)}
        startDecorator={<RiArrowLeftLine />}
      >
        Go Back
      </Button>
      <Button type="submit" variant="solid" endDecorator={<RiArrowRightLine />}>
        Continue
      </Button>
    </Box>
  );

  return (
    <>
      <Top />
      <Grid container spacing={16}>
        {FINANCE_FIELDS.map((field, index) => (
          <Grid
            key={index}
            mobile={field.size?.mobile}
            laptop={field.size?.laptop}
          >
            <FormItem name={field.name} label={field.label} rules={field.rules}>
              {(fieldProps) => field.renderItem(fieldProps)}
            </FormItem>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </>
  );
};

export default FinanceForm;
