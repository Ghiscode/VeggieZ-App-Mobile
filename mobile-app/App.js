import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import semua halaman
import SplashScreen from "./src/screens/SplashScreen"; // <-- Halaman Baru
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Ganti initialRouteName jadi "Splash" */}
      <Stack.Navigator initialRouteName="Splash">
        {/* Halaman Splash (Header disembunyikan biar full screen) */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "VeggieZ Market" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
