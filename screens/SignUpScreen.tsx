import { Screen } from "../components/Screen";
import { View, StyleSheet } from "react-native";
import { useMutation } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { Text, Input, Button } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ModalHeader } from "../components/ModalHeader";
import { GoogleButton } from "../components/GoogleButton";
import { AppleButton } from "../components/AppleButton";
import { OrDivider } from "../components/OrDivider";
import { PasswordInput } from "../components/PasswordInput";
import { googleLoginOrRegister, registerUser } from "../services/user";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loadin";
import * as Google from "expo-auth-session/providers/google";

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [___, __, googlePromptAsync] = Google.useAuthRequest({
    expoClientId:
      "418029878154-l4l6njkgq55tu18i9uidtr61tcc7fbuq.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  const nativeRegister = useMutation(
    async (values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      const user = await registerUser(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );

      if (user) {
        login(user);
        navigation.goBack();
      }
    }
  );

  const googleRegister = useMutation(async () => {
    const response = await googlePromptAsync();
    if (response.type === "success") {
      const { access_token } = response.params;
      console.log("Access token is ", access_token);
      const user = await googleLoginOrRegister(access_token);
      if (user) {
        login(user);
        navigation.goBack();
      }
    }
  });

  if (nativeRegister.isLoading || googleRegister.isLoading) return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <ModalHeader text="Apartio" xShown />
        <Text category={"h5"} style={styles.header}>
          Sign Up
        </Text>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
            firstName: yup.string().required("Your First name is required"),
            lastName: yup.string().required("Your last name is required"),
            email: yup.string().email().required("Your email is required"),
            password: yup
              .string()
              .required("Create a new Password")
              .matches(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                "Your password must have 8 characters, 1 uppercase letter,1 lowercase letter, 1 special character"
              ),
          })}
          onSubmit={(values) => {
            nativeRegister.mutate(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <>
                <Input
                  style={styles.input}
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  placeholder="Your First Name"
                  label="First Name"
                  autoComplete="name"
                  textContentType="givenName"
                  onBlur={() => setFieldTouched("firstName")}
                  caption={
                    touched.firstName && errors.firstName
                      ? errors.firstName
                      : undefined
                  }
                  status={
                    touched.firstName && errors.firstName ? "danger" : "basic"
                  }
                ></Input>

                <Input
                  style={styles.input}
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  placeholder="Your Last Name"
                  label="Last Name"
                  autoComplete="name"
                  textContentType="familyName"
                  onBlur={() => setFieldTouched("lastName")}
                  caption={
                    touched.lastName && errors.lastName
                      ? errors.lastName
                      : undefined
                  }
                  status={
                    touched.lastName && errors.lastName ? "danger" : "basic"
                  }
                ></Input>

                <Input
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Your Email Address"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  label="Email"
                  onBlur={() => setFieldTouched("email")}
                  caption={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  status={touched.email && errors.email ? "danger" : "basic"}
                />

                <PasswordInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder="Your Password"
                  label="Password"
                  onBlur={() => setFieldTouched("password")}
                  caption={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  status={
                    touched.password && errors.password ? "danger" : "basic"
                  }
                />

                <Button
                  style={styles.signUpButton}
                  onPress={() => handleSubmit()}
                >
                  Sign Up
                </Button>

                <OrDivider style={styles.orContainer} />

                <GoogleButton
                  text="Sign Up with Google"
                  style={styles.button}
                  onPress={() => googleRegister.mutate()}
                />
              </>
            );
          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    marginTop: 10,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  signUpButton: {
    marginTop: 20,
  },
  orContainer: { marginVertical: 30 },
  button: {
    marginBottom: 10,
  },
});
