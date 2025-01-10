import { styled } from "@mui/joy";
import Button from "@mui/joy/Button";
import ButtonGroup, { ButtonGroupProps } from "@mui/joy/ButtonGroup";
import { useState } from "react";
import { SecondarySideEnum } from "src/constants/enumBE";
import { combineSx } from "src/shared/utils";
import { colors } from "src/styles/colors";
import { shadow } from "src/styles/shadow";

const StyledButtonBuySell = styled(Button)(() => ({
  border: 0,
  borderRadius: "20px",
  padding: "8px 18px",
  gap: 8,
  fontSize: 15,
  fontWeight: 500,
  lineHeight: "22px",
  textTransform: "uppercase",
  backgroundColor: colors["gray-900"],
  fontFamily: "Jost",
  minWidth: 68,
  ":hover": {
    zIndex: 1,
  },
}));

interface BasicButtonGroupProps
  extends Omit<ButtonGroupProps, "value" | "onChange"> {
  value?: SecondarySideEnum;
  onChange?: (value: SecondarySideEnum) => void;
}

export default function BasicButtonGroup({
  value,
  onChange,
  ...props
}: BasicButtonGroupProps) {
  const [variant, setVariant] = useState<SecondarySideEnum>(
    value || SecondarySideEnum.BUY
  );

  const createOnClick = (value: SecondarySideEnum) => () => {
    setVariant(value);
    onChange?.(value);
  };

  return (
    <ButtonGroup
      aria-label="outlined primary button group"
      color="success"
      disabled={false}
      orientation="horizontal"
      size="md"
      {...props}
      sx={combineSx(
        {
          boxShadow: shadow.xs,
          border: 0,
          "[data-first-child]": {
            borderRight: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          "[data-last-child]": {
            borderLeft: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        },
        props.sx
      )}
    >
      <StyledButtonBuySell
        onClick={createOnClick(SecondarySideEnum.BUY)}
        sx={{
          backgroundColor:
            variant === SecondarySideEnum.BUY
              ? colors["astra-main"]
              : colors["gray-900"],
          color: colors["text-primary"],
          ":hover": {
            backgroundColor: colors["astra-main"] + "!important",
          },
        }}
      >
        Buy
      </StyledButtonBuySell>
      <StyledButtonBuySell
        onClick={createOnClick(SecondarySideEnum.SELL)}
        sx={{
          backgroundColor:
            variant === SecondarySideEnum.SELL
              ? colors["astra-pink"]
              : colors["gray-900"],
          color: colors["text-primary"],
          ":hover": {
            backgroundColor: colors["astra-pink"] + "!important",
          },
        }}
      >
        Sell
      </StyledButtonBuySell>
    </ButtonGroup>
  );
}
