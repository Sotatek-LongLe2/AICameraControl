import { SxProps } from "@mui/joy/styles/types";
import { forwardRef, memo } from "react";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const combineSx = (...sxProps: Array<SxProps | undefined>) => {
  let result: SxProps = [];

  sxProps.forEach((sx) => {
    if (sx && Array.isArray(result)) {
      if (Array.isArray(sx)) {
        result = [...result, ...sx];
      } else {
        result = [...result, sx];
      }
    }
  });

  return result;
};

export const genericMemo: <T>(component: T) => T = memo;
// @ts-expect-error: Unreachable code error
export const genericForwardRef: <T>(component: T) => T = forwardRef;

export const isNullOrUndefined = (
  object: unknown
): object is null | undefined => object === null || object === undefined;
