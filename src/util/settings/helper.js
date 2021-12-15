export const formatDate = (date) => {
  date = new Date(date);
  return [date.getDay(), date.getMonth() + 1, date.getFullYear()].join("/");
};
export const formatTime = (date) => {
  date = new Date(date);
  return [date.getHours(), date.getMinutes()].join(":");
};
export const comparTwoDate = (date1, date2) => {
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  ) {
    return true;
  }
  return false;
};
