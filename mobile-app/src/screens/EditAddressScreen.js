import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const EditAddressScreen = ({ navigation }) => {
  const { deliveryAddress, setDeliveryAddress } = useCart();

  const [name, setName] = useState(deliveryAddress.name);
  const [phone, setPhone] = useState(deliveryAddress.phone);
  const [address, setAddress] = useState(deliveryAddress.address);
  const [landmark, setLandmark] = useState(deliveryAddress.landmark);
  const [city, setCity] = useState(deliveryAddress.city);

  const handleSave = () => {
    if (!name || !address || !phone) {
      return Alert.alert("Peringatan", "Nama, Alamat, dan No HP wajib diisi!");
    }

    setDeliveryAddress({ name, phone, address, landmark, city });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubah Alamat</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Simpan</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Penerima</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nama Lengkap"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Telepon</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="08xxxxxxxx"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kota & Kode Pos</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Kota, Kode Pos"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Alamat Lengkap</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={address}
              onChangeText={setAddress}
              placeholder="Jalan, No. Rumah, RT/RW"
              multiline
            />

            <TouchableOpacity
              style={styles.mapButton}
              onPress={() =>
                Alert.alert("Info", "Integrasi Google Maps API diperlukan.")
              }
            >
              <Ionicons name="map" size={20} color="#27ae60" />
              <Text style={styles.mapButtonText}>
                Pilih Titik di Peta (Google Maps)
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Patokan / Catatan (Opsional)</Text>
            <TextInput
              style={styles.input}
              value={landmark}
              onChangeText={setLandmark}
              placeholder="Contoh: Pagar hitam, depan masjid"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Simpan Alamat</Text>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  saveText: { fontSize: 16, fontWeight: "bold", color: "#27ae60" },
  formContainer: { padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: "#7f8c8d", marginBottom: 8, fontWeight: "600" },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ecf0f1",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#2d3436",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 12,
    backgroundColor: "#e5f9ed",
    borderRadius: 10,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#27ae60",
  },
  mapButtonText: {
    color: "#27ae60",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: "#f1f2f6" },
  saveButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default EditAddressScreen;
