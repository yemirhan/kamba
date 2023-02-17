module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ["nativewind/babel", 'react-native-reanimated/plugin',require.resolve("expo-router/babel")],
    presets: ["babel-preset-expo"],
  };
};
