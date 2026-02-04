import * as SQLite from "expo-sqlite";

const getDB = async () => {
  return await SQLite.openDatabaseAsync("veggiez.db");
};

export const initDB = async () => {
  try {
    const db = await getDB();

    //3. Local Data Storage
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS orders ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        totalPrice TEXT,
        items TEXT,
        status TEXT
      );
    `);
    console.log("Tabel Orders berhasil dibuat!");
  } catch (error) {
    console.error("Gagal init DB:", error);
  }
};

export const addOrderToLocal = async (
  date,
  totalPrice,
  items,
  status = "Selesai",
) => {
  try {
    const db = await getDB();
    const itemsString = JSON.stringify(items);

    const result = await db.runAsync(
      "INSERT INTO orders (date, totalPrice, items, status) VALUES (?, ?, ?, ?)",
      date,
      totalPrice,
      itemsString,
      status,
    );
    return result;
  } catch (error) {
    console.error("Gagal simpan order:", error);
    throw error;
  }
};

export const getLocalOrders = async () => {
  try {
    const db = await getDB();

    const allRows = await db.getAllAsync(
      "SELECT * FROM orders ORDER BY id DESC",
    );
    return allRows;
  } catch (error) {
    console.error("Gagal ambil order:", error);
    return [];
  }
};
