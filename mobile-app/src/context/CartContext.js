import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 1. Import ini

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Status loading awal

  // 2. LOAD DATA: Ambil dari Memori HP saat aplikasi pertama dibuka
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("@user_cart");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Gagal memuat keranjang:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // 3. SAVE DATA: Simpan ke Memori HP setiap kali cartItems berubah
  useEffect(() => {
    // Jangan simpan kalau masih loading awal (biar ga nimpah data kosong)
    if (!loading) {
      const saveCart = async () => {
        try {
          await AsyncStorage.setItem("@user_cart", JSON.stringify(cartItems));
        } catch (error) {
          console.error("Gagal menyimpan keranjang:", error);
        }
      };
      saveCart();
    }
  }, [cartItems, loading]);

  // --- FUNGSI-FUNGSI LOGIKA (SAMA SEPERTI SEBELUMNYA) ---

  const addToCart = (product, quantity) => {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        // Pastikan harga bersih
        const priceString = product.price ? product.price.toString() : "0";
        const priceNumber = parseInt(priceString.replace(/[^0-9]/g, ""));
        return [...currItems, { ...product, price: priceNumber, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, type) => {
    setCartItems((currItems) => {
      return currItems.map((item) => {
        if (item.id === id) {
          const newQuantity =
            type === "plus" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
