export const stringifyObjectDates = (object: unknown) => {
  Object.keys(object).forEach((key) => {
    if (object[key] instanceof Date) {
      object[key] = (object[key] as Date).toISOString();
      return;
    }
    if (object[key] instanceof Object) {
      object[key] = stringifyObjectDates(object[key]);
    }
  });
  return object;
};
