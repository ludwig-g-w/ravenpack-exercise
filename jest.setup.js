jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  return {
    get: jest.fn().mockReturnValue({
      width: 375,
      height: 812,
    }),
  };
});

// Mock the Animated component from react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  // Mock the SharedTransition functions
  Reanimated.SharedTransition = {
    custom: () => ({
      progressAnimation: () => ({
        defaultTransitionType: jest.fn(),
      }),
    }),
  };
  Reanimated.SharedTransitionType = {
    ANIMATION: "ANIMATION",
  };
  return Reanimated;
});

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));
