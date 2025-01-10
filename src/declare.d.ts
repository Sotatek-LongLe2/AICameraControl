/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from "react-router-dom";

declare global {
  interface String {
    format: (...args: any[]) => string;
  }

  interface Window {
    navigate: NavigateFunction;
  }

  interface Array<T> {
    findLastIndex: (callback: (item: T, index: number) => boolean) => number;
    groupBy: (callback: (item: T) => any) => Array<T>[];
    findReverse: (
      callback: (item: T, index: number) => boolean,
      startIndex?: number
    ) => T;
  }
}

export {};
