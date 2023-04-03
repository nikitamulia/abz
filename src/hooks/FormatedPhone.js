export const FormatedPhone = number => {
  let data = number;
  if (data[0] !== '+') {
    data = '+' + data;
  }
  const result = `${data.slice(0, 3)} (${data.slice(3, 6)}) ${data.slice(
    6,
    9
  )} ${data.slice(9, 11)} ${data.slice(11, 13)}`;
  return result;
};
