import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import semua halaman
// ✅ YANG BENAR (Langsung panggil folder screens)
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

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
