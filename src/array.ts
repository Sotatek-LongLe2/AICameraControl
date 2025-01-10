/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

Object.defineProperty(Array.prototype, "findLastIndex", {
  value: function (callback: any) {
    const array = Array.from(this);
    let lastIndex = -1;
    array.forEach((item, index) => {
      if (callback(item, index)) {
        lastIndex = index;
      }
    });
    return lastIndex;
  },
});

Object.defineProperty(Array.prototype, "groupBy", {
  value: function (callback: any) {
    const array = Array.from(this);

    const result: any[] = [];

    array.forEach((item1) => {
      const value = callback(item1);
      if (result.some((item2) => item2.includes(value))) return;

      const arrayHasSameKey = array.filter(
        (item2) => callback(item2) === value
      );
      result.push(arrayHasSameKey);
    });

    return result;
  },
});

Object.defineProperty(Array.prototype, "findReverse", {
  value: function (callback: any, startIndex?: number) {
    const array = Array.from(this);

    const reverseStartIndex = array.length - 1 - (startIndex ?? 0);

    const reverseList = array.reverse();

    const result = reverseList.find((item, index) => {
      if (index < reverseStartIndex) return false;
      return callback(item, index);
    });

    return result;
  },
});
