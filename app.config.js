export default {
  "expo": {
    "plugins": [
      "@react-native-google-signin/google-signin",
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
        }
      ]
    ],
    "name": "uni-connect",
    "slug": "uniconnect",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
    },
    "android": {
      
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.epfl.uniconnect"
    },
    "owner": "uniconnect-epfl",
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "fonts": "./assets/fonts/JetBrains-Mono-Regular.ttf'",
    "extra": {
      "eas": {
        "projectId": "93c2373f-cb15-4998-8e0d-9da43cf47cb0"
      }
    }
  }
}