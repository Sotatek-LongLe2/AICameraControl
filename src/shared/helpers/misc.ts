import BigNumber from "bignumber.js";
import { SecondarySideEnum } from "src/constants/enumBE";
import { number2USD } from "src/helpers/formatNumber";

interface IParamsGetNet {
  notional: string | number;
  fee?: string | number | null; // %
}

export const getNet = (
  type: SecondarySideEnum | (number & { _?: never }),
  { notional, fee }: IParamsGetNet
) => {
  const bigNotional = BigNumber(notional);
  const bigMultiple = BigNumber(notional)
    .multipliedBy(fee || 0)
    .dividedBy(100);

  const result =
    bigNotional[type === SecondarySideEnum.SELL ? "minus" : "plus"](
      bigMultiple
    ).toNumber();

  return number2USD(result);
};

export const emailSupport = "support@launchpoint.com.hk";
