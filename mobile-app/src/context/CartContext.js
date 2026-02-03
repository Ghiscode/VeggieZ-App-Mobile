import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "Michael Anderson",
    phone: "+62 812-3456-7890",
    address: "Jl. Sudirman No. 45, Jakarta Pusat",
    landmark: "Apartment 15C",
    city: "DKI Jakarta, 10220",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("@user_cart");
        const storedOrders = await AsyncStorage.getItem("@user_orders");
        if (storedCart) setCartItems(JSON.parse(storedCart));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const saveCart = async () => {
        try {
          await AsyncStorage.setItem("@user_cart", JSON.stringify(cartItems));
        } catch (e) {
          console.error(e);
        }
      };
      saveCart();
    }
  }, [cartItems, loading]);

  useEffect(() => {
    if (!loading) {
      const saveOrders = async () => {
        try {
          await AsyncStorage.setItem("@user_orders", JSON.stringify(orders));
        } catch (e) {
          console.error(e);
        }
      };
      saveOrders();
    }
  }, [orders, loading]);

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
        const priceString = product.price ? product.price.toString() : "0";
        const priceNumber = parseInt(priceString.replace(/[^0-9]/g, ""));
        return [...currItems, { ...product, price: priceNumber, quantity }];
      }
    });
  };

  const removeFromCart = (id) =>
    setCartItems((curr) => curr.filter((item) => item.id !== id));

  const updateQuantity = (id, type) => {
    setCartItems((curr) =>
      curr.map((item) => {
        if (item.id === id) {
          const qty = type === "plus" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: qty > 0 ? qty : 1 };
        }
        return item;
      }),
    );
  };

  const placeOrder = () => {
    const newOrder = {
      id: "ORD-" + new Date().getTime(),
      date: new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      items: cartItems,
      totalPrice:
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
        10000,
      status: "Sedang Dikirim",
      shippingAddress: deliveryAddress,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
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
        orders,
        placeOrder,
        deliveryAddress,
        setDeliveryAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
