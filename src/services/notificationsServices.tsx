type BooleanRecord<T> = {
  [K in keyof T]: boolean;
};

export const areAllEnabled = <T extends object>(
  obj: BooleanRecord<T>
): boolean => {
  return Object.values(obj).every((v) => v === true);
};

export const toggleAll = <T extends object>(
  value: boolean,
  keys: (keyof T)[]
): BooleanRecord<T> => {
  const result = {} as BooleanRecord<T>;

  keys.forEach((key) => {
    result[key] = value;
  });

  return result;
};
