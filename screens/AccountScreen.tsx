import { ScrollView, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "@ui-kitten/components";
import { Screen } from "../components/Screen";
import { SignUpandSignInButtons } from "../components/SignUpandSignInButton";
import { theme } from "../theme";
import { ButtonList } from "../components/ButtonList";
import { useAuth } from "../hooks/useAuth";

export const AccountScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const firstSignedOutButtons = [
    {
      label: "Add a Property",
      onPress: () => console.log("Navigate to Add Property"),
    },
    {
      label: "View my Properties",
      onPress: () => console.log("Navigate to View my Properties"),
    },
  ];

  const supportButtons = [
    {
      label: "Help Center",
      onPress: () => console.log("Navigate to Help center"),
    },
    {
      label: "Terms and Conditions",
      onPress: () => console.log("Navigate to Terms and Conditions"),
    },
  ];

  const rentingButtons = [
    {
      label: "Favourite Properties",
      onPress: () => navigation.navigate("Root", { screen: "Saved" }),
    },
    {
      label: "Rental Applications",
      onPress: () => console.log("Navigate to Rental Applications"),
    },
    {
      label: "My Residences",
      onPress: () => console.log("Navigate to My Residences"),
    },
    {
      label: "Rent Payments",
      onPress: () => console.log("Navigate to My Payments"),
    },
  ];
  const accountButtons = [
    {
      label: "Account Settings",
      onPress: () => console.log("Navigate to Account Settings"),
    },
    {
      label: "Billing History",
      onPress: () => console.log("Navigate to billing History"),
    },
    {
      label: "Banks and Cards",
      onPress: () => console.log("Navigate to banks and Cards"),
    },
  ];

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={[styles.defaultMarginHorizontal, { marginBottom: 40 }]}>
          {user ? (
            <>
              <Text style={styles.userName} category={"h4"}>
                Welcome{user.firstName ? `, ${user.firstName}` : ""}
              </Text>
              <Text style={styles.userName} category={"h6"}>
                {user.email}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.header} category={"h5"}>
                Renting has never been easier
              </Text>
              <SignUpandSignInButtons />
              <View style={styles.middleContainer}>
                <Text category={"s1"} style={styles.subheader}>
                  Are you a property owner or manager ?
                </Text>
                <Text style={styles.bodyText}>
                  Sign up now and start receiving applications in minutes!
                </Text>
              </View>
            </>
          )}
        </View>
        {user ? (
          <>
            <ButtonList data={rentingButtons} header={"Renting Made Easy"} />
            <ButtonList data={accountButtons} header={"My account"} />
            <ButtonList data={supportButtons} header={"Support"} />
            <View
              style={[
                styles.specialMarginVertical,
                styles.defaultMarginHorizontal,
              ]}
            >
              <Button
                appearance={"ghost"}
                style={styles.button}
                onPress={logout}
              >
                Sign Out
              </Button>
              <Button
                style={styles.button}
                onPress={() =>
                  navigation.navigate("ResetPassword", {
                    token: "sdfsadfjaosdfi",
                  })
                }
              >
                Reset Password
              </Button>
            </View>
          </>
        ) : (
          <>
            <ButtonList data={firstSignedOutButtons} borderTop />
            <ButtonList data={supportButtons} header="support" marginTop />
            <Text style={[styles.brandText, styles.specialMarginVertical]}>
              Apartio.com Version 3.1.3
            </Text>
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  defaultMarginHorizontal: {
    marginHorizontal: 10,
  },
  userName: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  email: {
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
  },
  header: {
    textAlign: "center",
    marginVertical: 25,
    marginHorizontal: 70,
    fontWeight: "600",
  },
  middleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 50,
    borderTopColor: theme["color-gray"],
    borderTopWidth: 2,
  },
  subheader: {
    textAlign: "center",
    paddingHorizontal: 20,
  },
  bodyText: {
    marginTop: 10,
    textAlign: "center",
    marginHorizontal: 15,
  },
  specialMarginVertical: {
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    marginBottom: 15,
    borderColor: theme["color-primary-500"],
  },
  brandText: {
    textAlign: "center",
  },
});
