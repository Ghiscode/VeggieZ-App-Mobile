import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLogin = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      try {
        const userToken = await AsyncStorage.getItem("userToken");

        if (userToken) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            }),
          );
        }
      } catch (e) {
        console.error("Gagal membaca token:", e);

        navigation.replace("Login");
      }
    };

    checkLogin();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🥦</Text>
        <Text style={styles.logoText}>VeggieZ</Text>
      </View>

      <Text style={styles.tagline}>Fresh from the Garden</Text>

      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2ecc71",
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: "#888",
    marginBottom: 50,
    letterSpacing: 1,
  },
  loading: {
    position: "absolute",
    bottom: 60,
  },
});

export default SplashScreen;
