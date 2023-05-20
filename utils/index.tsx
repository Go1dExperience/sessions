export const formatDateString = (date: string): string =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
export const debounce = (func: Function, timeout: number = 300) => {
  console.log("debounce")
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
