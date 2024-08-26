export const formatToRupiah = (price: string | number) => {
  return parseFloat(String(price)).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });
};
