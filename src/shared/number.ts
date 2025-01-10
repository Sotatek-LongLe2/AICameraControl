export const formatPrice = (num: number) => {
  if (num >= 1_000_000_000_000) {
    const trillions = num / 1_000_000_000_000;
    return `${
      trillions % 1 === 0 ? Math.round(trillions) : trillions.toFixed(2)
    }tn`;
  } else if (num >= 1_000_000_000) {
    const billions = num / 1_000_000_000;
    return `${
      billions % 1 === 0 ? Math.round(billions) : billions.toFixed(2)
    }bn`;
  } else if (num >= 1_000_000) {
    const millions = num / 1_000_000;
    return `${
      millions % 1 === 0 ? Math.round(millions) : millions.toFixed(2)
    }mn`;
  } else if (num >= 1_000) {
    const thousands = num / 1_000;
    return `${
      thousands % 1 === 0 ? Math.round(thousands) : thousands.toFixed(2)
    }k`;
  } else {
    return num % 1 === 0 ? Math.round(num).toString() : num.toFixed(2);
  }
};
