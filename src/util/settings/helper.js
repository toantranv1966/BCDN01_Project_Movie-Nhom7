export const formatDate = (date) => {
  date = new Date(date);
  return [date.getDay(), date.getMonth() + 1, date.getFullYear()].join("/");
};
export const formatTime = (date) => {
  date = new Date(date);
  return [date.getHours(), date.getMinutes()].join(":");
};
export const comparTwoDate = (date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  ) {
    return true;
  }
  return false;
};
export const arrDay = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];
