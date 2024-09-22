import { GOOGLE_MAPS_API_KEY_IOS, GOOGLE_MAPS_API_KEY_ANDROID } from './google-map-credentials.js';

export default {
  expo: {
    name: "knu_bus",
    slug: "knu_bus",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    plugins: [
      "expo-secure-store"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.m3e4.knu-shuttle-bus",
      config: {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY_IOS, 
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "Allows App to use location services in the foreground and background.",
        NSLocationAlwaysUsageDescription: "Allows App to use location services in the foreground and background.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "Allows App to use location services in the foreground and background.",
        UIBackgroundModes: ["location", "fetch"],
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true
        }
      }
    },
    android: {
      package: "com.m3e4.knu_shuttle_bus",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      config: {
        googleMaps: {
          apiKey: GOOGLE_MAPS_API_KEY_ANDROID,  // Android API 키 사용
        },
      },
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "FOREGROUND_SERVICE"
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  }
};