import { useMediaQuery } from "usehooks-ts";

export const useDevice = () => {
  const deviceLaptop = useMediaQuery(`(min-width: 1140px)`);
  const deviceTablet = useMediaQuery(`(min-width: 900px)`);

  return { deviceLaptop, deviceTablet };
};
