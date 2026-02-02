import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT PENTING: Koneksi ke Firebase
import { auth } from '../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    // 1. Validasi Input Kosong
    if (!email || !password) {
      Alert.alert('Eits!', 'Email dan Password harus diisi ya.');
      return;
    }

    setLoading(true);

    try {
      // 2. TEMBAK KE FIREBASE 🔥
      // Fungsi sakti ini akan mengecek apakah email/pass ada di server Google
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Login Berhasil:', user.email);

      // 3. Simpan Sesi di HP (Biar gak login ulang terus)
      // Kita simpan UID (User ID) unik dari Firebase
      await AsyncStorage.setItem('userToken', user.uid);
      await AsyncStorage.setItem('userData', JSON.stringify({
        email: user.email,
        uid: user.uid
      }));

      // 4. Pindah ke Halaman Utama
      navigation.replace('Home');

    } catch (error) {
      console.error(error);
      let errorMessage = 'Gagal masuk. Coba cek email/password.';
      
      // Menerjemahkan bahasa alien Firebase ke Bahasa Manusia
      if (error.code === 'auth/invalid-email') errorMessage = 'Format email salah.';
      if (error.code === 'auth/user-not-found') errorMessage = 'Akun tidak ditemukan.';
      if (error.code === 'auth/wrong-password') errorMessage = 'Password salah.';
      if (error.code === 'auth/invalid-credential') errorMessage = 'Email atau password salah.';

      Alert.alert('Gagal Login', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/react-logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.title}>VeggieZ</Text>
        <Text style={styles.subtitle}>Segar langsung ke rumahmu 🥦</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: mughis@veggiez.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Masukkan password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Text style={styles.eyeIcon}>{secureTextEntry ? '👁️' : '🚫'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Masuk Sekarang</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 80, height: 80, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2ecc71' },
  subtitle: { fontSize: 14, color: '#7f8c8d' },
  form: { width: '100%' },
  label: { fontSize: 16, marginBottom: 5, color: '#333', fontWeight: '500' },
  input: { 
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#f9f9f9' 
  },
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', 
    borderRadius: 8, paddingHorizontal: 12, marginBottom: 25, backgroundColor: '#f9f9f9'
  },
  passwordInput: { flex: 1, paddingVertical: 12 },
  eyeIcon: { fontSize: 18, marginLeft: 10 },
  button: { 
    backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, alignItems: 'center', elevation: 2 
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default LoginScreen;