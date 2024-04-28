export const createMany = <T>(factory: () => T, quantity: number) => {
  const items: T[] = [];

  for (let i = 0; i < quantity; i++) {
    items.push(factory());
  }

  return items;
};
