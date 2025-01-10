import theme from "src/styles/theme";
import { useMediaQuery } from "usehooks-ts";

export const useMedia = () => {
  const matches = useMediaQuery(
    `(min-width: ${theme.breakpoints.values.laptop}px)`
  );

  return { isMobile: !matches, isDesktop: matches };
};
