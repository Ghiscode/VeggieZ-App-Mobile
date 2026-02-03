import { formatRupiah } from "./currency";

describe("Testing Fungsi Mata Uang", () => {
  it("harus mengubah 15000 jadi Rp 15.000", () => {
    expect(formatRupiah(15000)).toBe("Rp 15.000");
  });

  it("harus mengubah 0 jadi Rp 0", () => {
    expect(formatRupiah(0)).toBe("Rp 0");
  });
});
