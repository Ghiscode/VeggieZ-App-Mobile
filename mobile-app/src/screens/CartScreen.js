import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext"; // <--- Import Context

const CartScreen = ({ navigation }) => {
  // Ambil Data & Fungsi dari Context (BUKAN DUMMY LAGI)
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const [subtotal, setSubtotal] = useState(0);
  const deliveryFee = 10000;

  // Hitung Subtotal Real-time
  useEffect(() => {
    let tempTotal = 0;
    cartItems.forEach((item) => {
      tempTotal += item.price * item.quantity;
    });
    setSubtotal(tempTotal);
  }, [cartItems]);

  const handleDelete = (id) => {
    Alert.alert("Hapus Produk", "Yakin ingin menghapus?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => removeFromCart(id),
      },
    ]);
  };

  const formatRupiah = (num) =>
    "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Keranjang Saya</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#dfe6e9" />
            <Text style={{ color: "#b2bec3", marginTop: 10 }}>
              Keranjang kamu masih kosong.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "#27ae60", fontWeight: "bold" }}>
                Mulai Belanja
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cartList}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={item.image}
                    style={styles.itemImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemWeight}>{item.weight}</Text>
                  <Text style={styles.itemPrice}>
                    {formatRupiah(item.price)}
                  </Text>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons
                      name="trash-outline"
                      size={22}
                      color="#e74c3c"
                      style={{ marginBottom: 15 }}
                    />
                  </TouchableOpacity>
                  <View style={styles.counterWrapper}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, "minus")}
                      style={styles.counterBtnMinus}
                    >
                      <Ionicons name="remove" size={16} color="#7f8c8d" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, "plus")}
                      style={styles.counterBtnPlus}
                    >
                      <Ionicons name="add" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Summary */}
      {cartItems.length > 0 && (
        <View style={styles.bottomSheet}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatRupiah(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ongkos Kirim</Text>
            <Text style={styles.summaryValue}>{formatRupiah(deliveryFee)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {formatRupiah(subtotal + deliveryFee)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.checkoutText}>Lanjut ke Pembayaran</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  iconBtn: { padding: 5 },
  cartList: { padding: 20 },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemImage: { width: 60, height: 60 },
  itemDetails: { flex: 1 },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 4,
  },
  itemWeight: { fontSize: 12, color: "#b2bec3", marginBottom: 8 },
  itemPrice: { fontSize: 15, fontWeight: "bold", color: "#2d3436" },
  actionsContainer: { alignItems: "flex-end", justifyContent: "space-between" },
  counterWrapper: { flexDirection: "row", alignItems: "center" },
  counterBtnMinus: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#f1f2f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  counterBtnPlus: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#f39c12",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: { fontSize: 14, color: "#95a5a6" },
  summaryValue: { fontSize: 16, fontWeight: "600", color: "#2d3436" },
  totalRow: {
    marginTop: 10,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f2f6",
    paddingTop: 15,
  },
  totalLabel: { fontSize: 18, fontWeight: "bold", color: "#2d3436" },
  totalValue: { fontSize: 20, fontWeight: "bold", color: "#2d3436" },
  checkoutBtn: {
    backgroundColor: "#27ae60",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CartScreen;
