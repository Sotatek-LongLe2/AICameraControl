import { styled } from "@mui/joy";
import Button from "@mui/joy/Button";
import { SxProps } from "@mui/joy/styles/types";
import { colors } from "src/styles/colors";

const StyledButtonStatusBuySell = styled(Button)(() => ({
  border: 0,
  borderRadius: "20px",
  padding: "2px 12px",
  gap: 8,
  fontSize: 13,
  fontWeight: 500,
  lineHeight: "20px",
  textTransform: "uppercase",
  minWidth: 55,
  cursor: "inherit",
  color: colors["text-primary"],
  ":hover": {
    zIndex: 1,
  },
}));

type Props = {
  side: number;
  sectionStyle?: SxProps;
};

export const AppButtonStatusBuySell: React.FC<Props> = ({
  side,
  sectionStyle,
}) => {
  return (
    <StyledButtonStatusBuySell
      variant="solid"
      color={side === 1 ? "danger" : "success"}
      sx={{
        ...sectionStyle,
        backgroundColor:
          side === 1 ? colors["astra-pink"] : colors["astra-main"],
        ":hover": {
          backgroundColor:
            side === 1 ? colors["astra-pink"] : colors["astra-main"],
        },
      }}
    >
      {side === 1 ? "Sell" : "Buy"}
    </StyledButtonStatusBuySell>
  );
};
