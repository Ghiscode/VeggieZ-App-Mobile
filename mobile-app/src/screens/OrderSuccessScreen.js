import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const OrderSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={60} color="#fff" />
        </View>

        <Text style={styles.title}>Your Order is Confirmed !</Text>
        <Text style={styles.subtitle}>
          Your order is being packed and will arrive soon.{"\n"}Fruits and
          veggies coming right up!
        </Text>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.navigate("Orders")}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          }
        >
          <Text style={styles.homeButtonText}>BACK TO HOME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 30,
    width: "100%",
  },

  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,

    shadowColor: "#27ae60",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 60,
  },

  trackButton: {
    backgroundColor: "#27ae60",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
  trackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  homeButton: {
    paddingVertical: 10,
  },
  homeButtonText: {
    color: "#27ae60",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default OrderSuccessScreen;
