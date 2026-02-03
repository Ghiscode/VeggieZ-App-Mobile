import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, totalItems } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert("Sukses", "Produk berhasil masuk keranjang!");
  };

  const allProducts = [
    {
      id: "1",
      name: "Pisang",
      price: "Rp 22.000",
      weight: "1kg",
      image: require("../../assets/images/pisang.png"),
    },
    {
      id: "2",
      name: "Wortel",
      price: "Rp 15.000",
      weight: "1kg",
      image: require("../../assets/images/wortel.png"),
    },
    {
      id: "3",
      name: "Apel",
      price: "Rp 45.000",
      weight: "1kg",
      image: require("../../assets/images/apel.png"),
    },
    {
      id: "4",
      name: "Kentang",
      price: "Rp 18.000",
      weight: "1kg",
      image: require("../../assets/images/kentang.png"),
    },
    {
      id: "5",
      name: "Timun",
      price: "Rp 8.000",
      weight: "500gr",
      image: require("../../assets/images/timun.png"),
    },
    {
      id: "6",
      name: "Jeruk",
      price: "Rp 28.000",
      weight: "1kg",
      image: require("../../assets/images/jeruk.png"),
    },
  ];

  const relatedProducts = allProducts.filter(
    (item) => !item.name.includes(product.name),
  );

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const priceString = product.price || "Rp 0";
  const numericPrice = parseInt(priceString.replace(/[^0-9]/g, ""));
  const totalPrice = (numericPrice * quantity).toLocaleString("id-ID");

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
        <Text style={styles.headerTitle}>Detail Produk</Text>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart-outline" size={24} color="#333" />

          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>
                {product.price}
                <Text style={styles.unitText}> /{product.weight}</Text>
              </Text>
            </View>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                onPress={handleDecrement}
                style={styles.counterBtnMinus}
              >
                <Ionicons name="remove" size={20} color="#bdc3c7" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncrement}
                style={styles.counterBtnPlus}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.descriptionText}>
              Produk segar berkualitas terbaik.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Produk Lainnya</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {relatedProducts.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.circleCard}
                  onPress={() =>
                    navigation.push("ProductDetail", { product: item })
                  }
                >
                  <View style={styles.circleImageWrapper}>
                    <Image
                      source={item.image}
                      style={{ width: 40, height: 40 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{ fontSize: 12, marginTop: 8, color: "#7f8c8d" }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total Harga</Text>
          <Text style={styles.totalPrice}>Rp {totalPrice}</Text>
        </View>

        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Tambah ke Keranjang</Text>
        </TouchableOpacity>
      </View>
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
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  iconBtn: { padding: 5 },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#e74c3c",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  imageContainer: {
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  productImage: { width: "70%", height: "70%" },
  contentContainer: { paddingHorizontal: 20 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 5,
  },
  productPrice: { fontSize: 20, fontWeight: "bold", color: "#27ae60" },
  unitText: { fontSize: 14, color: "#95a5a6", fontWeight: "normal" },
  counterContainer: { flexDirection: "row", alignItems: "center" },
  counterBtnMinus: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 1,
    borderColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
  },
  counterBtnPlus: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#f39c12",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    color: "#333",
  },
  section: { marginBottom: 30 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 10,
  },
  descriptionText: { fontSize: 14, color: "#7f8c8d", lineHeight: 22 },
  circleCard: { alignItems: "center", marginRight: 20, width: 70 },
  circleImageWrapper: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f2f6",
    elevation: 10,
  },
  totalLabel: { fontSize: 12, color: "#95a5a6", marginBottom: 2 },
  totalPrice: { fontSize: 22, fontWeight: "bold", color: "#2d3436" },
  addToCartBtn: {
    backgroundColor: "#27ae60",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 2,
  },
  addToCartText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default ProductDetailScreen;
