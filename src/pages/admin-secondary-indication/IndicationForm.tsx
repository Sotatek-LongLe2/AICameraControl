import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  Option,
  Radio,
  radioClasses,
  RadioGroup,
  Select,
  Typography,
} from "@mui/joy";
import { RiBuilding4Line, RiCloseLine, RiUserLine } from "@remixicon/react";
import { BigNumber } from "bignumber.js";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AppInputNumber } from "src/components/base/AppInputNumber";
import FormItem from "src/components/common/form/FormItem";
import {
  COUNTRIES,
  OWNERSHIP_STRUCTURE,
  SECURITY_TYPE,
} from "src/constants/dropdowns";
import { Message } from "src/constants/message";
import { formatNumber } from "src/helpers/formatNumber";
import { useSharedLists } from "src/shared/hooks/useSharedLists";
import { colors } from "src/styles/colors";

export interface SecondaryIndicationFormData {
  id?: number;
  userId: string | number;
  companyId: string | number;
  side: string;
  notional: string;
  sharePrice: string;
  valuation: string;
  fee: string;
  minSize: string;
  securityType: string;
  ownershipStructure: string;
  jurisdiction: string;
  docLanguage: string;
  premiumDiscount: string;
}

const IndicationForm = ({
  defaultValues,
  errorSharePriceCode,
  setErrorSharePriceCode,
}: {
  errorSharePriceCode?: string | null;
  setErrorSharePriceCode: (code: string | null) => void;
  defaultValues?: SecondaryIndicationFormData | undefined;
}) => {
  const { watch, reset, setValue, formState, trigger, setError } =
    useFormContext();
  const { listUser, listCompany } = useSharedLists();
  const [discount, setDiscount] = useState<number | string>("-");
  const sharePrice = watch("sharePrice");
  const companyId = watch("companyId");
  const valuation = watch("valuation");
  const notional = watch("notional");

  const [selectedUser, setSelectedUserState] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompanyState] = useState<number | null>(
    null
  );

  const { isValid } = formState;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const calculateDiscount = useCallback(() => {
    const LRVSharePrice = _.get(
      _.find(listCompany, { id: companyId }),
      "sharePrice"
    );

    if (sharePrice && LRVSharePrice) {
      const indicationSharePrice = new BigNumber(sharePrice.replace(/,/g, ""));
      const discountValue = indicationSharePrice
        .minus(LRVSharePrice)
        .dividedBy(LRVSharePrice)
        .multipliedBy(100);

      const discountFormatted = discountValue.toFixed(1);
      const sign = discountValue.isGreaterThan(0) ? "+" : "";
      setValue("premiumDiscount", discountFormatted.toString());

      return `${sign} ${formatNumber(Number(discountFormatted))}%`;
    }
    if (LRVSharePrice === null) {
      setValue("premiumDiscount", null);
      return "N/A";
    }
    setValue("premiumDiscount", null);
    return "N/A";
  }, [companyId, listCompany, setValue, sharePrice]);

  useEffect(() => {
    return setDiscount(calculateDiscount());
  }, [calculateDiscount, sharePrice, valuation]);

  const validateMinSize = (value: string) => {
    const bigMinSize = new BigNumber(value.replace(/,/g, ""));
    const bigNotional = new BigNumber(notional.replace(/,/g, ""));

    if (bigNotional.isLessThan(bigMinSize)) {
      return "The Min. Size must lower than the Notional";
    }
  };

  useEffect(() => {
    if (errorSharePriceCode) {
      if (errorSharePriceCode === "SECONDARY_00002")
        setError("sharePrice", {
          message: "The Share Price must be higher than the old one",
        });
      else if (errorSharePriceCode === "SECONDARY_00001")
        setError("sharePrice", {
          message: "The Share Price must be lower than the old one",
        });
    }
  }, [errorSharePriceCode, setError]);

  return (
    <>
      <Grid container sx={{ mb: 28 }}>
        <Grid mobile={12} laptop={12}>
          <FormItem
            name="side"
            label="Side"
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
                  orientation="horizontal"
                >
                  <Radio
                    value={1}
                    label="SELL"
                    sx={{
                      [`&.Mui-checked .MuiRadio-label`]: {
                        color: colors["astra-pink"],
                      },
                      [`& > .${radioClasses.checked}`]: {
                        borderColor: colors["astra-pink"],
                        backgroundColor: colors["astra-pink"],
                      },
                    }}
                  />
                  <Radio value={0} label="BUY" />
                </RadioGroup>
              </FormControl>
            )}
          </FormItem>
        </Grid>
      </Grid>
      <Grid container spacing={16} sx={{ mb: 28 }}>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="userId"
            label="Customer"
            rules={{ required: Message.REQUIRED }}
            labelStyle={{
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "Jost",
              mb: 8,
            }}
          >
            {(field) => (
              <Select
                value={field.value ? field.value : selectedUser}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                  setSelectedUserState(Number(newValue));
                }}
                startDecorator={
                  <RiUserLine color={colors["text-primary"]} size={16} />
                }
                slotProps={{
                  listbox: {
                    placement: "bottom-start",
                    sx: { minWidth: 160 },
                  },
                }}
                {...(field.value && {
                  endDecorator: (
                    <IconButton
                      size="sm"
                      variant="plain"
                      color="neutral"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={() => {
                        field.onChange("");
                      }}
                    >
                      <RiCloseLine color={colors["text-primary"]} size={16} />
                    </IconButton>
                  ),
                  indicator: null,
                })}
                sx={{ background: "transparent", height: 42 }}
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
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="companyId"
            label="Company"
            labelStyle={{
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "Jost",
              mb: 8,
            }}
            rules={{ required: Message.REQUIRED }}
          >
            {(field) => (
              <Select
                value={field.value ? field.value : selectedCompany}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                  setSelectedCompanyState(Number(newValue));
                }}
                startDecorator={
                  <RiBuilding4Line color={colors["text-primary"]} size={16} />
                }
                slotProps={{
                  listbox: {
                    placement: "bottom-start",
                    sx: { minWidth: 160 },
                  },
                }}
                {...(field.value && {
                  endDecorator: (
                    <IconButton
                      size="sm"
                      variant="plain"
                      color="neutral"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={() => {
                        field.onChange("");
                      }}
                    >
                      <RiCloseLine color={colors["text-primary"]} size={16} />
                    </IconButton>
                  ),
                  indicator: null,
                })}
                sx={{ background: "transparent", height: 42 }}
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
            )}
          </FormItem>
        </Grid>
      </Grid>
      <Typography level="h5" sx={{ mb: 20 }}>
        Indication Details
      </Typography>
      <Grid container spacing={20}>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="notional"
            label="Notional"
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
              <AppInputNumber {...field} maxLength={20} startDecorator="$" />
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="sharePrice"
            label="Share Price"
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
              <AppInputNumber
                {...field}
                maxLength={10}
                onChange={(e) => {
                  field.onChange(e);
                  setErrorSharePriceCode(null);
                }}
                startDecorator="$"
              />
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            label="Min. Size"
            name="minSize"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              validate: (value) => validateMinSize(value),
            }}
          >
            {(field) => (
              <AppInputNumber
                {...field}
                maxLength={10}
                startDecorator="$"
                onChange={(e) => {
                  field.onChange(e);
                  trigger("minSize");
                }}
              />
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="valuation"
            label="Valuation"
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
              <AppInputNumber {...field} maxLength={20} startDecorator="$" />
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="fee"
            label="Fee (%)"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
            }}
          >
            {(field) => <AppInputNumber {...field} maxLength={10} />}
          </FormItem>
        </Grid>
      </Grid>
      <Grid container spacing={20} mt={10}>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="premiumDiscount"
            label="Premium discount to LRV"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
          >
            {() => (
              <Typography level="body1" sx={{ mt: 8 }}>
                {discount}
              </Typography>
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="securityType"
            label="Security Type"
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
                onChange={(_, newValue) => field.onChange(newValue)}
                sx={{ background: "transparent", height: 42 }}
              >
                {SECURITY_TYPE.map((item, index) => (
                  <Option key={index} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="ownershipStructure"
            label="Ownership Structure"
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
                onChange={(_, newValue) => field.onChange(newValue)}
                sx={{ background: "transparent", height: 42 }}
              >
                {OWNERSHIP_STRUCTURE.map((item, index) => (
                  <Option key={index} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="jurisdiction"
            label="Jurisdiction"
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
                onChange={(_, newValue) => field.onChange(newValue)}
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
            name="docLanguage"
            label="Documentation Language"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: false,
            }}
          >
            {(field) => (
              <Input
                {...field}
                fullWidth
                sx={{ background: "transparent" }}
                slotProps={{
                  input: {
                    maxLength: 20,
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
          onClick={() => {
            window.history.back();
          }}
          sx={() => ({
            flex: 1,
          })}
        >
          Discard Changes
        </Button>
        <Button type="submit" sx={{ flex: 1 }} disabled={!isValid}>
          Save Indication
        </Button>
      </Box>
    </>
  );
};

export default IndicationForm;
