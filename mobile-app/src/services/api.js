import axios from "axios";

// PENTING: Pilih salah satu sesuai kondisimu!

// OPSI 1: Jika pakai Emulator Android bawaan Android Studio
const API_URL = "http://192.168.1.14:3000/api";

// OPSI 2: Jika pakai HP Asli (Harus satu Wi-Fi dengan Laptop)
// Ganti IP di bawah dengan IP Laptopmu (Cek di cmd > ipconfig)
// const API_URL = 'http://192.168.1.5:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
