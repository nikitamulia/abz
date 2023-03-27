export default function FormatedPhone(number) {
  const countryCode = '+38';
  const areaCode = number.slice(3, 6);
  const firstPart = number.slice(6, 9);
  const secondPart = number.slice(9, 11);
  const finalPart = number.slice(11);

  return `${countryCode} (${areaCode}) ${firstPart} ${secondPart} ${finalPart}`;
}
