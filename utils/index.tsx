export const formatDateString = (date: string): string =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
