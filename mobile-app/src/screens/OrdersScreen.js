import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const OrdersScreen = ({ navigation }) => {
  const { orders } = useCart();

  const formatRupiah = (num) =>
    "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.itemsContainer}>
        {item.items.map((prod, index) => (
          <Text key={index} style={styles.itemText}>
            {prod.quantity}x {prod.name}
          </Text>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.totalLabel}>Total Belanja</Text>
          <Text style={styles.totalValue}>{formatRupiah(item.totalPrice)}</Text>
        </View>

        <TouchableOpacity
          style={styles.reorderBtn}
          onPress={() => alert("Fitur Beli Lagi segera hadir!")}
        >
          <Text style={styles.reorderText}>Beli Lagi</Text>
        </TouchableOpacity>
      </View>

      {item.shippingAddress && (
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#f9f9f9",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 10, color: "#7f8c8d" }}>
            Dikirim ke: {item.shippingAddress.name}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 5 }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riwayat Pesanan</Text>
        <View style={{ width: 30 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={80} color="#dfe6e9" />
          <Text style={styles.emptyText}>Belum ada pesanan nih.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ color: "#27ae60", fontWeight: "bold" }}>
              Yuk Belanja Sekarang!
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#2d3436" },

  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderId: { fontWeight: "bold", fontSize: 16, color: "#2d3436" },
  orderDate: { fontSize: 12, color: "#b2bec3", marginTop: 2 },
  statusBadge: {
    backgroundColor: "#e5f9ed",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: { color: "#27ae60", fontSize: 12, fontWeight: "bold" },

  divider: { height: 1, backgroundColor: "#f1f2f6", marginVertical: 12 },

  itemsContainer: { marginBottom: 5 },
  itemText: { fontSize: 14, color: "#636e72", marginBottom: 2 },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 12, color: "#b2bec3" },
  totalValue: { fontSize: 16, fontWeight: "bold", color: "#2d3436" },
  reorderBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#27ae60",
  },
  reorderText: { color: "#27ae60", fontWeight: "600", fontSize: 12 },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
  },
  emptyText: { color: "#b2bec3", marginTop: 10, fontSize: 16 },
});

export default OrdersScreen;
