import { View, StyleSheet, FlatList } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Screen } from "react-native-screens";
import { theme } from "../theme";
import { properties } from "../data/properties";
import { Card } from "../components/Card";
import { Property } from "../types/property";
import LottieView from "lottie-react-native";
import { SignUpandSignInButtons } from "../components/SignUpandSignInButton";
import { useAuth } from "../hooks/useAuth";

export const SavedScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { user } = useAuth();
  const likedProperties = null;
  const contactedProperties = undefined;
  const applicationProperties = undefined;

  const getButtonAppearance = (buttonIndex: number) => {
    if (activeIndex === buttonIndex) return "filled";
    return "ghost";
  };

  const handleButtonPressed = (index: number) => {
    setActiveIndex(index);
  };
  const getBodyText = (heading: string, subHeading: string) => {
    return (
      <View style={styles.textContainer}>
        <Text category={"h6"} style={styles.text}>
          {heading}
        </Text>
        <Text appearance={"hint"} style={[styles.text, styles.subHeading]}>
          {subHeading}
        </Text>
      </View>
    );
  };

  const getPropertiesFlatList = (properties: Property[]) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={properties}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => <Card property={item} style={styles.card} />}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  const getBody = () => {
    if (activeIndex === 0) {
      if (likedProperties) {
        return getPropertiesFlatList(likedProperties);
      }
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../assets/lotties/favourites_animation.json")}
          />
          {getBodyText(
            "You do not have any favourites saved",
            "Tap on the heart icon to add to favourites"
          )}
          {!user && (
            <SignUpandSignInButtons
              style={styles.SignUpAndSignUpButtonContainer}
            />
          )}
        </>
      );
    }
    if (activeIndex == 1) {
      if (contactedProperties)
        return getPropertiesFlatList(contactedProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../assets/lotties/contacted_animation.json")}
          />
          {getBodyText(
            "You do not have any contacts for now",
            "Tap on the mail icon to contact to brokers"
          )}
          {!user && (
            <SignUpandSignInButtons
              style={styles.SignUpAndSignUpButtonContainer}
            />
          )}
        </>
      );
    }
    if (activeIndex == 2) {
      if (applicationProperties)
        return getPropertiesFlatList(applicationProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../assets/lotties/applications_animation.json")}
          />
          {getBodyText(
            "Check the status of your current applications here",
            "Apply for some properties now...!!!"
          )}
          {!user && (
            <SignUpandSignInButtons
              style={styles.SignUpAndSignUpButtonContainer}
            />
          )}
        </>
      );
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={[styles.row, styles.buttonContainer]}>
        <Button
          style={[styles.button, styles.favouritesButton]}
          size={"small"}
          appearance={getButtonAppearance(0)}
          onPress={() => handleButtonPressed(0)}
        >
          Favourites
        </Button>
        <Button
          style={[styles.button, styles.contactedButton]}
          size={"small"}
          appearance={getButtonAppearance(1)}
          onPress={() => handleButtonPressed(1)}
        >
          Contacted
        </Button>
        <Button
          style={[styles.button, styles.applicationButton]}
          size={"small"}
          appearance={getButtonAppearance(2)}
          onPress={() => handleButtonPressed(2)}
        >
          Applications
        </Button>
      </View>
      <View style={styles.container}>{getBody()}</View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 10,
    marginVertical: 50,
    height: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 5,
  },
  button: {
    width: "33.3%",
    borderRadius: 0,
    borderColor: theme["color-primary-500"],
  },
  applicationButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  favouritesButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  contactedButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  container: {
    marginVertical: "10%",
  },
  lottie: {
    height: 180,
    width: 180,
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
  },
  subHeading: {
    marginTop: 10,
  },
  textContainer: {
    marginVertical: 15,
  },
  SignUpAndSignUpButtonContainer: {
    marginTop: 20,
  },
  card: {
    marginHorizontal: 0,
    marginVertical: 5,
  },
});
