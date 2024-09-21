import 'dotenv/config';

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
    plugins : [
        "expo-secure-store"
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.m3e4.knu-shuttle-bus",
        config: {
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
        },
        infoPlist : {
            NSLocationWhenInUseUsageDescription: "앱 사용 중에 위치 서비스를 허용해주세요.",
            NSLocationAlwaysUsageDescription: "앱이 백그라운드에서 위치를 추적하려면 위치 접근 권한이 필요합니다.",
            UIBackgroundModes: ["location"]
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
            apiKey: process.env.GOOGLE_MAPS_API_KEY, 
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