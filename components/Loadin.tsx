import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Screen } from "./Screen";

export const Loading = () => {
  const animation = useRef<LottieView | null>(null);
  setTimeout(() => {
    animation.current?.play();
  }, 100);

  return (
    <Screen style={Styles.container}>
      <LottieView
        ref={animation}
        source={require("../assets/lotties/loading.json")}
        style={Styles.lottie}
      />
    </Screen>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: 250,
    width: 250,
  },
});
