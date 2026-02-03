import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
} from "react-native";

import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Email dan Password tidak boleh kosong");
      return;
    }

    try {
      await login(email, password);

      navigation.replace("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Login Gagal", "Email atau password salah.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to continue using VeggieZ</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Alert.alert("Info", "Fitur Register akan segera dibuat.")
        }
      >
        <Text style={styles.linkText}>
          Don't have an account?{" "}
          <Text style={{ fontWeight: "bold", color: "#27ae60" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#7f8c8d", marginBottom: 40 },
  inputContainer: { width: "100%", marginBottom: 20 },
  input: {
    backgroundColor: "#f5f6fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#27ae60",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkText: { color: "#7f8c8d", fontSize: 14 },
});

export default LoginScreen;
