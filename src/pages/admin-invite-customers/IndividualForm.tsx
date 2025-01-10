import { Box, Grid, Input, Option, Select, Typography } from "@mui/joy";
import { useFormContext } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import { AppDatePicker } from "src/components/base/AppDatePicker";
import FormItem from "src/components/common/form/FormItem";
import { COUNTRIES } from "src/constants/dropdowns";
import { Message } from "src/constants/message";

const IndividualForm = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Typography level="h4" sx={{ mb: 24 }}>
        Identity
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
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="passport"
            label="Passport / ID"
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
            name="nationality"
            label="Nationality"
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
            name="dateOfBirth"
            label="Date of Birth"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
            }}
          >
            {(field) => (
              <Box className="customDatePickerWidth">
                <AppDatePicker
                  {...field}
                  selected={field.value}
                  dateFormat="dd/MM/YYYY"
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
              </Box>
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="placeOfBirth"
            label="Place of Birth"
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
      </Grid>
      <Typography level="h4" sx={{ mb: 24 }}>
        Address / Contact
      </Typography>
      <Grid container spacing={20}>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="residential"
            label="Residential Address"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 200,
                message: "This field cannot exceed 10200 characters",
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
        <Grid mobile={12} laptop={6}>
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

        <Grid mobile={12} laptop={6}>
          <FormItem
            name="countryOfResidence"
            label="Country of residence"
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
      </Grid>
    </>
  );
};

export default IndividualForm;
