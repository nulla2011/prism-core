// export const formatDate = (date: Date) => {
//   return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
//     .getDate()
//     .toString()
//     .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
//     .getMinutes()
//     .toString()
//     .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
// };
// export const formatTime = (date: Date) => {
//   return `${date.getHours().toString().padStart(2, '0')}:${date
//     .getMinutes()
//     .toString()
//     .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
// };

export const replaceSlash = (input: string) => {
  return input.replaceAll('/', '-');
};
export const isSkin = (id: string) => {
  return /^3000\d{5}0$/.test(id);
};
