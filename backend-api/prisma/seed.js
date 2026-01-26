const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // --- 1. SEED USER (Data Kamu Asli) ---
  await prisma.user.upsert({
    where: { email: "admin@veggiez.com" },
    update: {},
    create: {
      email: "admin@veggiez.com",
      password: "hashed_password_here",
      name: "Admin VeggieZ",
      role: "ADMIN",
      phone: "081234567890",
    },
  });

  await prisma.user.upsert({
    where: { email: "mughis@student.nusaputra.ac.id" }, // Saya sesuaikan emailnya biar keren dikit
    update: {},
    create: {
      email: "mughis@student.nusaputra.ac.id", // Bisa dipakai login nanti
      password: "password123",
      name: "Mughis Fadhil A. Ridwan", // Request: Nama Kamu
      role: "USER",
      address: "Kp. Nagrak Tengah Kec.Cisaat Kab. Sukabumi", // Request: Alamat Kamu
      phone: "089503614848", // Request: No HP Kamu
    },
  });

  console.log("Users ready");

  // --- 2. SEED PRODUCTS (Lengkap 18 Item) ---
  const products = [
    // --- ROW 1 & 2 (Main Display) ---
    {
      name: "Bananas",
      price: 21000,
      category: "Fruits",
      description: "Naturally Ripe Bananas. Rich in potassium.",
      image: "https://placehold.co/400x400/ffe066/333?text=Bananas",
      stock: 50,
    },
    {
      name: "Carrots",
      price: 13500,
      category: "Vegetables",
      description: "Fresh organic carrots, perfect for juice.",
      image: "https://placehold.co/400x400/ff9933/333?text=Carrots",
      stock: 100,
    },
    {
      name: "Apples",
      price: 29000,
      category: "Fruits",
      description: "Sweet and crunchy red apples.",
      image: "https://placehold.co/400x400/ff4d4d/eee?text=Apples",
      stock: 40,
    },
    {
      name: "Potatoes",
      price: 8000,
      category: "Vegetables",
      description: "Organic potatoes, great for frying.",
      image: "https://placehold.co/400x400/d9b38c/333?text=Potatoes",
      stock: 200,
    },
    // --- ROW 3 ---
    {
      name: "Cucumbers",
      price: 4000,
      category: "Vegetables",
      description: "Cool and crisp cucumbers.",
      image: "https://placehold.co/400x400/99cc00/333?text=Cucumbers",
      stock: 80,
    },
    {
      name: "Lemons",
      price: 31000,
      category: "Fruits",
      description: "Zesty fresh lemons.",
      image: "https://placehold.co/400x400/ffff00/333?text=Lemons",
      stock: 60,
    },
    // --- FRUITS CATEGORY ---
    {
      name: "Orange",
      price: 25000,
      category: "Fruits",
      description: "Vitamin C packed oranges.",
      image: "https://placehold.co/400x400/orange/white?text=Orange",
      stock: 100,
    },
    {
      name: "Watermelon",
      price: 45000,
      category: "Fruits",
      description: "Sweet juicy watermelon.",
      image: "https://placehold.co/400x400/green/white?text=Watermelon",
      stock: 20,
    },
    {
      name: "Pear",
      price: 28000,
      category: "Fruits",
      description: "Fresh green pears.",
      image: "https://placehold.co/400x400/lightgreen/333?text=Pear",
      stock: 45,
    },
    {
      name: "Grapes",
      price: 35000,
      category: "Fruits",
      description: "Seedless purple grapes.",
      image: "https://placehold.co/400x400/purple/white?text=Grapes",
      stock: 50,
    },
    {
      name: "Strawberry",
      price: 40000,
      category: "Fruits",
      description: "Fresh picked strawberries.",
      image: "https://placehold.co/400x400/red/white?text=Strawberry",
      stock: 30,
    },
    {
      name: "Peach",
      price: 32000,
      category: "Fruits",
      description: "Soft and sweet peaches.",
      image: "https://placehold.co/400x400/pink/333?text=Peach",
      stock: 40,
    },
    // --- VEGETABLES CATEGORY ---
    {
      name: "Broccoli",
      price: 15000,
      category: "Vegetables",
      description: "Fresh green broccoli.",
      image: "https://placehold.co/400x400/green/white?text=Broccoli",
      stock: 35,
    },
    {
      name: "Cabbage",
      price: 12000,
      category: "Vegetables",
      description: "Crisp green cabbage.",
      image: "https://placehold.co/400x400/lightgreen/333?text=Cabbage",
      stock: 40,
    },
    {
      name: "Onion",
      price: 18000,
      category: "Vegetables",
      description: "Red onions.",
      image: "https://placehold.co/400x400/purple/white?text=Onion",
      stock: 100,
    },
    {
      name: "Peas",
      price: 10000,
      category: "Vegetables",
      description: "Sweet green peas.",
      image: "https://placehold.co/400x400/green/white?text=Peas",
      stock: 60,
    },
    {
      name: "Corn",
      price: 9000,
      category: "Vegetables",
      description: "Sweet corn on the cob.",
      image: "https://placehold.co/400x400/yellow/333?text=Corn",
      stock: 50,
    },
    {
      name: "Tomato",
      price: 14000,
      category: "Vegetables",
      description: "Red ripe tomatoes.",
      image: "https://placehold.co/400x400/red/white?text=Tomato",
      stock: 80,
    },
  ];

  console.log("Starting seeding...");

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`Seeded ${products.length} products successfully!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
