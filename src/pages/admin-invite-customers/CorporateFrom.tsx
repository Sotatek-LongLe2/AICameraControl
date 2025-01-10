import {
  FormControl,
  Grid,
  Input,
  Option,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/joy";
import { useFormContext } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import FormItem from "src/components/common/form/FormItem";
import { COUNTRIES } from "src/constants/dropdowns";
import { Message } from "src/constants/message";

const CorporateFrom = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Typography level="h4" sx={{ mb: 24 }}>
        Authorized Representative
      </Typography>
      <Grid container spacing={20} sx={{ mb: 14 }}>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="firstName"
            label="First Name"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 100,
                message: "This field cannot exceed 100 characters",
              },
            }}
          >
            {(field) => (
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
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="lastName"
            label="Last Name"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 100,
                message: "This field cannot exceed 100 characters",
              },
            }}
          >
            {(field) => (
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
            )}
          </FormItem>
        </Grid>

        <Grid mobile={12} laptop={4}>
          <FormItem
            name="capacity"
            label="Capacity"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 100,
                message: "This field cannot exceed 100 characters",
              },
            }}
          >
            {(field) => (
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
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="taxResidence"
            label="Tax residency"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{ required: Message.REQUIRED }}
          >
            {(field) => (
              <Select
                value={field.value}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                sx={{ background: "transparent", height: 42 }}
              >
                {COUNTRIES.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="phoneNumber"
            label="Phone Number"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 20,
                message: "This field cannot exceed 20 characters",
              },
            }}
          >
            {(field) => (
              <>
                <ReactPhoneInput
                  {...field}
                  country={"hk"}
                  inputClass={`customPhoneInput h42 ${
                    errors.phoneNumber && "error"
                  }`}
                  dropdownClass="customDropdown"
                  buttonClass={`customButton top12 ${
                    errors.phoneNumber && "error"
                  }`}
                  placeholder=""
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </>
            )}
          </FormItem>
        </Grid>
      </Grid>
      <Typography level="h4" sx={{ mb: 24 }}>
        Company Information
      </Typography>
      <Grid container spacing={20}>
        <Grid mobile={12} laptop={12}>
          <FormItem
            name="companyName"
            label="Registered Company Name"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 100,
                message: "This field cannot exceed 100 characters",
              },
            }}
          >
            {(field) => (
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
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="companyCountry"
            label="Country of Incorporation"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{ required: Message.REQUIRED }}
          >
            {(field) => (
              <Select
                value={field.value}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                sx={{ background: "transparent", height: 42 }}
              >
                {COUNTRIES.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="companyRegistrationNumber"
            label="Company Registration / Incorporation Number"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 100,
                message: "This field cannot exceed 100 characters",
              },
            }}
          >
            {(field) => (
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
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={12}>
          <FormItem
            name="companyRegisteredAddress"
            label="Registered Address"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 200,
                message: "This field cannot exceed 200 characters",
              },
            }}
          >
            {(field) => (
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
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={12}>
          <FormItem
            name="companyBusinessAddress"
            label="Business Address (if different than registered address)"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              // required: Message.REQUIRED,
              maxLength: {
                value: 200,
                message: "This field cannot exceed 200 characters",
              },
            }}
          >
            {(field) => (
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
            )}
          </FormItem>
        </Grid>

        <Grid mobile={12} laptop={12}>
          <FormItem
            name="isSfcLicensed"
            label="Is the corporation licensed by the Securities and Futures Commissions (SFC)?"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{ required: Message.REQUIRED }}
          >
            {(field) => (
              <FormControl>
                <RadioGroup
                  {...field}
                  value={field.value || ""}
                  orientation="horizontal"
                >
                  <Radio
                    value="1"
                    label="Yes"
                    slotProps={{
                      label: {
                        sx: {
                          fontSize: 15,
                          fontWeight: "400",
                        },
                      },
                    }}
                  />
                  <Radio
                    value="0"
                    label="No"
                    slotProps={{
                      label: {
                        sx: {
                          fontSize: 15,
                          fontWeight: "400",
                        },
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={12}>
          <FormItem
            name="isListedSub"
            label="Is the corporation listed/ a wholly-owned subsidiary of a listed company?"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{ required: Message.REQUIRED }}
          >
            {(field) => (
              <FormControl>
                <RadioGroup
                  {...field}
                  value={field.value || ""}
                  orientation="horizontal"
                >
                  <Radio
                    value="1"
                    label="Yes"
                    slotProps={{
                      label: {
                        sx: {
                          fontSize: 15,
                          fontWeight: "400",
                        },
                      },
                    }}
                  />
                  <Radio
                    value="0"
                    label="No"
                    slotProps={{
                      label: {
                        sx: {
                          fontSize: 15,
                          fontWeight: "400",
                        },
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            )}
          </FormItem>
        </Grid>
      </Grid>
    </>
  );
};

export default CorporateFrom;
