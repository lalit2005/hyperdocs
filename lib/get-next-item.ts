export const getNextItem = (items: string[], item: string) => {
  const index = items.indexOf(item);
  return items[index + 1];
};

export const getPreviousItem = (items: string[], item: string) => {
  const index = items.indexOf(item);
  return items[index - 1];
};
