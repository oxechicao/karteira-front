type maskPatterProp = {
  reverse?: boolean;
  charPattern?: string;
};

export const doMask = (
  value: string,
  pattern: string,
  opt: maskPatterProp = { reverse: false, charPattern: "#" },
): string => {
  const { reverse = false, charPattern = "#" } = opt;
  const patternArray = reverse
    ? pattern.split("").reverse()
    : pattern.split("");
  const valueArray = reverse ? value.split("").reverse() : value.split("");
  const limitIndexPattern = patternArray.length;

  let resultMask = "";
  let indexValue = 0;
  for (let indexPattern = 0; indexPattern < limitIndexPattern; indexPattern++) {
    const pat = patternArray[indexPattern];

    if (indexValue >= valueArray.length) {
      break;
    }

    if (pat === charPattern) {
      if (valueArray[indexValue]) {
        resultMask = `${resultMask}${valueArray[indexValue]}`;
        indexValue++;
      }
    } else {
      resultMask = `${resultMask}${pat}`;
    }
  }

  return reverse ? resultMask.split("").reverse().join("") : resultMask;
};

export const moneyMask = (value: string): string =>
  doMask(value.replace(/\D/g, ""), "###.###.###,##", { reverse: true });
