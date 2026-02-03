import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
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
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { ref, onValue } from "firebase/database";

const { width } = Dimensions.get("window");

const imageMap = {
  pisang: require("../../assets/images/pisang.png"),
  wortel: require("../../assets/images/wortel.png"),
  apel: require("../../assets/images/apel.png"),
  kentang: require("../../assets/images/kentang.png"),
  timun: require("../../assets/images/timun.png"),
  jeruk: require("../../assets/images/jeruk.png"),
  default: require("../../assets/images/pisang.png"),
};

const formatRupiah = (price) => {
  return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const AnimatedProductCard = memo(({ item, index, navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const displayImage = imageMap[item.imageType] || imageMap["default"];
  const displayPrice = formatRupiah(item.price);

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() =>
          navigation.navigate("ProductDetail", {
            product: { ...item, image: displayImage, price: displayPrice },
          })
        }
      >
        <View style={styles.imageWrapper}>
          <Image
            source={displayImage}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productWeight}>{item.weight}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>{displayPrice}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Most Ordered");
  const [activeBanner, setActiveBanner] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { totalItems } = useCart();
  const { logout } = useAuth();

  useEffect(() => {
    const starCountRef = ref(db, "products/");
    const unsubscribe = onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productsList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setProducts(productsList);
        } else {
          setProducts([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const banners = [
    { id: "1", image: require("../../assets/images/banner1.png") },
    { id: "2", image: require("../../assets/images/banner2.png") },
    { id: "3", image: require("../../assets/images/banner3.png") },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      return item.name
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
    });
  }, [products, searchQuery]);

  const handleLogout = useCallback(() => {
    Alert.alert("Konfirmasi Logout", "Yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        style: "destructive",
        onPress: () => {
          logout();
          navigation.replace("Login");
        },
      },
    ]);
  }, [logout, navigation]);

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

        <View style={styles.gridContainer}>
          {loading ? (
            <View
              style={{ width: "100%", alignItems: "center", marginTop: 50 }}
            >
              <ActivityIndicator size="large" color="#27ae60" />
              <Text style={{ marginTop: 10, color: "#7f8c8d" }}>
                Mengambil data...
              </Text>
            </View>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <AnimatedProductCard
                key={item.id}
                item={item}
                index={index}
                navigation={navigation}
              />
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

      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#27ae60" />
            <Text
              style={[styles.navText, { color: "#27ae60", fontWeight: "bold" }]}
            >
              Home
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Orders")}
          >
            <Ionicons name="document-text-outline" size={24} color="#bdc3c7" />
            <Text style={styles.navText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
            <Text style={[styles.navText, { color: "#e74c3c" }]}>Logout</Text>
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
