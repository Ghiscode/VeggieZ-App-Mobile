import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext"; // Import Context

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Most Ordered");
  const [activeBanner, setActiveBanner] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil data totalItems untuk Badge Cart
  const { totalItems } = useCart();

  // --- DATA DUMMY ---
  const banners = [
    { id: "1", image: require("../../assets/images/banner1.png") },
    { id: "2", image: require("../../assets/images/banner2.png") },
    { id: "3", image: require("../../assets/images/banner3.png") },
  ];

  const products = [
    {
      id: "1",
      name: "Pisang Cavendish",
      price: "Rp 22.000",
      weight: "1kg",
      image: require("../../assets/images/pisang.png"),
    },
    {
      id: "2",
      name: "Wortel Import",
      price: "Rp 15.000",
      weight: "1kg",
      image: require("../../assets/images/wortel.png"),
    },
    {
      id: "3",
      name: "Apel Fuji",
      price: "Rp 45.000",
      weight: "1kg",
      image: require("../../assets/images/apel.png"),
    },
    {
      id: "4",
      name: "Kentang Dieng",
      price: "Rp 18.000",
      weight: "1kg",
      image: require("../../assets/images/kentang.png"),
    },
    {
      id: "5",
      name: "Timun Jepang",
      price: "Rp 8.000",
      weight: "500gr",
      image: require("../../assets/images/timun.png"),
    },
    {
      id: "6",
      name: "Jeruk Sunkist",
      price: "Rp 28.000",
      weight: "1kg",
      image: require("../../assets/images/jeruk.png"),
    },
  ];

  // Logic Filter Pencarian
  const filteredProducts = products.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const tabs = ["Most Ordered", "In Season", "Fresh Deals", "Best Value"];

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width - 40));
    setActiveBanner(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header Location */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerLabel}>Lokasi Kamu</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={20} color="#27ae60" />
              <Text style={styles.locationText}>Jakarta Selatan, ID</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#999"
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Cari buah & sayur..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#bdc3c7" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Banner Carousel */}
        <View>
          <FlatList
            data={banners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.bannerWrapper}>
                <Image
                  source={item.image}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            snapToInterval={width - 40}
            decelerationRate="fast"
          />
          <View style={styles.dotsContainer}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeBanner === index
                    ? styles.activeDotBanner
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Text Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity key={index} onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeLine} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <View style={styles.gridContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              >
                <View style={styles.imageWrapper}>
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productWeight}>{item.weight}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{ width: "100%", alignItems: "center", marginTop: 20 }}
            >
              <Ionicons name="search" size={50} color="#dfe6e9" />
              <Text style={{ color: "#b2bec3", marginTop: 10 }}>
                Produk tidak ditemukan
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {/* 1. Home (Aktif) */}
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#27ae60" />
            <Text
              style={[styles.navText, { color: "#27ae60", fontWeight: "bold" }]}
            >
              Home
            </Text>
          </TouchableOpacity>

          {/* 2. Cart (Dengan Badge) */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Cart")}
          >
            <View>
              <Ionicons name="cart-outline" size={24} color="#bdc3c7" />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
            </View>
            <Text style={styles.navText}>Cart</Text>
          </TouchableOpacity>

          {/* 3. Orders (SUDAH AKTIF SEKARANG) */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Orders")} // <--- Navigasi ke OrdersScreen
          >
            <Ionicons name="document-text-outline" size={24} color="#bdc3c7" />
            <Text style={styles.navText}>Orders</Text>
          </TouchableOpacity>

          {/* 4. Profile */}
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person-outline" size={24} color="#bdc3c7" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerLabel: { fontSize: 12, color: "#7f8c8d" },
  locationRow: { flexDirection: "row", alignItems: "center" },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 5,
  },
  menuButton: { padding: 5 },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 25,
    alignItems: "center",
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 15,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#333" },
  filterButton: {
    backgroundColor: "#27ae60",
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerWrapper: {
    width: width - 40,
    height: 160,
    marginRight: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  bannerImage: { width: "100%", height: "100%", borderRadius: 20 },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  activeDotBanner: { backgroundColor: "#27ae60", width: 20 },
  inactiveDot: { backgroundColor: "#dfe6e9" },
  tabScroll: { paddingLeft: 20, marginBottom: 20, maxHeight: 40 },
  tabText: {
    fontSize: 16,
    color: "#bdc3c7",
    marginRight: 30,
    fontWeight: "600",
  },
  tabTextActive: { color: "#f39c12", fontWeight: "bold" },
  activeLine: {
    width: 20,
    height: 3,
    backgroundColor: "#f39c12",
    marginTop: 4,
    alignSelf: "center",
    marginRight: 30,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f1f2f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  imageWrapper: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: { width: 90, height: 90 },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 2,
  },
  productWeight: { fontSize: 12, color: "#b2bec3", marginBottom: 10 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#2d3436" },
  addButton: {
    backgroundColor: "#f39c12",
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 10, color: "#bdc3c7", marginTop: 4, fontWeight: "600" },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "#e74c3c",
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "bold" },
});

export default HomeScreen;
