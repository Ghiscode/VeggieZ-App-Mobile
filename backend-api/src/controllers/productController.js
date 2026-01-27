const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
  try {
    // Ambil semua produk dari database
    const products = await prisma.product.findMany();

    // Kirim ke HP
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data produk" });
  }
};
