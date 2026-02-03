export const formatRupiah = (price) => {
  if (!price) return "Rp 0";
  return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
