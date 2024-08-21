export const formatToRupiah = (price: string) => {
  return parseFloat(price).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });
};
