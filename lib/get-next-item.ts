export const getNextItem = (items: string[], item: string) => {
  const index = items.indexOf(item);
  if (items[index + 1]?.startsWith('- ')) {
    return items[index + 2];
  }
  return items[index + 1];
};

export const getPreviousItem = (items: string[], item: string) => {
  const index = items.indexOf(item);
  if (items[index - 1]?.startsWith('- ')) {
    return items[index - 2];
  }
  return items[index - 1];
};
