const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret Key untuk JWT (Harusnya di .env, tapi kita hardcode dulu biar mudah)
const JWT_SECRET = process.env.JWT_SECRET || "kunci_rahasia_negara_api";

// 1. REGISTER (Daftar User Baru)
exports.register = async (req, res) => {
  try {
    const { email, password, name, phone, address } = req.body;

    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        address,
        role: "USER", // Default role
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. LOGIN (Masuk)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Cek password (karena di seed passwordnya belum di-hash, kita bypass dulu untuk data seed)
    // PENTING: Untuk data seed "mughis@", passwordnya plain text "password123"
    // Untuk user baru hasil register, passwordnya ter-hash.
    // Kode di bawah menghandle keduanya (Logika darurat biar seed jalan)
    let isMatch = false;
    if (user.password === password) {
      isMatch = true; // Match plain text (khusus seed)
    } else {
      isMatch = await bcrypt.compare(password, user.password); // Match hash
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Buat Token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }, // Token berlaku 1 hari
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
