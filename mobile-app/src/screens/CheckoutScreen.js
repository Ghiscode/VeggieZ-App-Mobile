import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, placeOrder, deliveryAddress } = useCart();

  const [deliveryType, setDeliveryType] = useState("Standard");
  const DELIVERY_OPTIONS = {
    Standard: { price: 10000, label: "1-2 Hari" },
    Express: { price: 25000, label: "Hari Ini" },
    Schedule: { price: 15000, label: "Atur Waktu" },
  };

  const [selectedPayment, setSelectedPayment] = useState("BCA");
  const PAYMENT_METHODS = [
    {
      id: "BCA",
      name: "Bank BCA",
      image: require("../../assets/images/bca.png"),
    },
    {
      id: "Mandiri",
      name: "Bank Mandiri",
      image: require("../../assets/images/mandiri.png"),
    },
    {
      id: "BRI",
      name: "Bank BRI",
      image: require("../../assets/images/bri.png"),
    },
    {
      id: "GoPay",
      name: "GoPay",
      image: require("../../assets/images/gopay.jpeg"),
    },
    { id: "OVO", name: "OVO", image: require("../../assets/images/ovo.jpeg") },
    {
      id: "COD",
      name: "Tunai (COD)",
      image: require("../../assets/images/cod.jpeg"),
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = DELIVERY_OPTIONS[deliveryType].price;
  const total = subtotal + deliveryFee;

  const formatRupiah = (num) =>
    "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handlePlaceOrder = () => {
    if (cartItems.length === 0)
      return Alert.alert("Error", "Keranjang kosong!");

    placeOrder();

    navigation.replace("OrderSuccess");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
          <TouchableOpacity
            style={styles.summaryCard}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.itemCountText}>
              {cartItems.length} items dalam keranjang
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
          <View style={styles.addressCard}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.addressName}>{deliveryAddress.name}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditAddress")}
              >
                <Text
                  style={{ color: "#27ae60", fontWeight: "bold", fontSize: 12 }}
                >
                  UBAH
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.addressText}>{deliveryAddress.address}</Text>
            <Text style={styles.addressText}>{deliveryAddress.city}</Text>

            {deliveryAddress.landmark !== "" && (
              <Text
                style={[
                  styles.addressText,
                  { fontStyle: "italic", marginTop: 2 },
                ]}
              >
                (Patokan: {deliveryAddress.landmark})
              </Text>
            )}

            <Text
              style={[styles.addressText, { marginTop: 5, fontWeight: "600" }]}
            >
              {deliveryAddress.phone}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipe Pengiriman</Text>
          <View style={styles.deliveryContainer}>
            {Object.keys(DELIVERY_OPTIONS).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.deliveryCard,
                  deliveryType === type && styles.deliveryCardActive,
                ]}
                onPress={() => setDeliveryType(type)}
              >
                <Ionicons
                  name={
                    type === "Standard"
                      ? "bicycle-outline"
                      : type === "Express"
                        ? "rocket-outline"
                        : "calendar-outline"
                  }
                  size={24}
                  color={deliveryType === type ? "#27ae60" : "#bdc3c7"}
                />
                <Text style={styles.deliveryTypeLabel}>{type}</Text>
                <Text style={styles.deliveryTimeLabel}>
                  {DELIVERY_OPTIONS[type].label}
                </Text>
                <Text style={styles.deliveryPriceLabel}>
                  {formatRupiah(DELIVERY_OPTIONS[type].price)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentCard,
                  selectedPayment === method.id && styles.paymentCardActive,
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <Image
                  source={method.image}
                  style={styles.paymentLogo}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.paymentText,
                    selectedPayment === method.id && {
                      color: "#27ae60",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {method.name}
                </Text>

                <View
                  style={[
                    styles.radioCircle,
                    selectedPayment === method.id && styles.radioCircleActive,
                  ]}
                >
                  {selectedPayment === method.id && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.bottomSheet}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatRupiah(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Ongkos Kirim ({deliveryType})</Text>
          <Text style={styles.summaryValue}>{formatRupiah(deliveryFee)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Bayar</Text>
          <Text style={styles.totalValue}>{formatRupiah(total)}</Text>
        </View>

        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Buat Pesanan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  iconBtn: { padding: 5 },
  section: { marginTop: 20, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 10,
  },

  summaryCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f2f6",
  },
  itemCountText: { fontSize: 14, color: "#333", fontWeight: "500" },
  addressCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f1f2f6",
  },
  addressName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 5,
  },
  addressText: { fontSize: 13, color: "#7f8c8d", marginBottom: 2 },

  deliveryContainer: { flexDirection: "row", justifyContent: "space-between" },
  deliveryCard: {
    width: "31%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f2f6",
  },
  deliveryCardActive: { borderColor: "#27ae60", backgroundColor: "#e9f7ef" },
  deliveryTypeLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2d3436",
    marginTop: 8,
  },
  deliveryTimeLabel: { fontSize: 10, color: "#b2bec3", marginTop: 2 },
  deliveryPriceLabel: {
    fontSize: 11,
    color: "#27ae60",
    fontWeight: "bold",
    marginTop: 4,
  },

  paymentCard: {
    width: 140,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#f1f2f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  paymentCardActive: { borderColor: "#27ae60", backgroundColor: "#e9f7ef" },
  paymentLogo: { width: 70, height: 35, marginBottom: 5 },
  paymentText: { fontSize: 11, color: "#333" },

  radioCircle: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleActive: { borderColor: "#27ae60" },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#27ae60",
  },

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
  placeOrderBtn: {
    backgroundColor: "#27ae60",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  placeOrderText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CheckoutScreen;
