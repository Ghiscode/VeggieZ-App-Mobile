import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 1. Ambil Data User & Produk saat aplikasi dibuka
  useEffect(() => {
    getUserData();
    fetchProducts();
  }, []);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      if (jsonValue != null) {
        const user = JSON.parse(jsonValue);
        setUserName(user.name);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProducts = async () => {
    try {
      // Tembak API Backend (GET /products)
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Gagal ambil produk:", error);
      Alert.alert("Error", "Gagal memuat produk dari server.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  // Komponen untuk setiap Kartu Produk
  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={{ fontSize: 40 }}>🥦</Text>
        {/* Nanti bisa diganti <Image source={{uri: item.image}} /> */}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          Rp {item.price.toLocaleString()}
        </Text>
        <Text style={styles.stock}>Stok: {item.stock}</Text>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Beli</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Atas */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, {userName} 👋</Text>
          <Text style={styles.subGreeting}>Mau masak apa hari ini?</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </View>

      {/* Daftar Produk */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2ecc71"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Tampilan 2 Kolom (Grid)
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 50 }}>
              Belum ada produk 😢
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  greeting: { fontSize: 20, fontWeight: "bold", color: "#333" },
  subGreeting: { fontSize: 14, color: "#888" },
  logoutBtn: { backgroundColor: "#ffebee", padding: 8, borderRadius: 8 },
  logoutText: { color: "red", fontWeight: "bold", fontSize: 12 },

  listContainer: { padding: 15 },
  row: { justifyContent: "space-between" },

  // Style Kartu Produk
  card: {
    backgroundColor: "#fff",
    width: "48%", // Supaya muat 2 kolom
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3, // Bayangan di Android
    shadowColor: "#000", // Bayangan di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: { padding: 10 },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  productPrice: { fontSize: 14, color: "#2ecc71", fontWeight: "bold" },
  stock: { fontSize: 12, color: "#999", marginBottom: 8 },
  addButton: {
    backgroundColor: "#2ecc71",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});

export default HomeScreen;
