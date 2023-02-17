import { ConfigContext, ExpoConfig } from "@expo/config";

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  "name": "kamba",
  "slug": "kamba",
  "version": "1.0.0",
  "scheme": "kamba",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "automatic",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": false,
    "userInterfaceStyle": "automatic",
    "bundleIdentifier": "com.kamba.app"
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#FFFFFF"
    }
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "extra": {
    "eas": {
      "projectId": "4ac06c72-3ffe-4a5f-a726-2df9f39f3f1b"
    }
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;