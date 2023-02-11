import { Screen } from "../components/Screen";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ModalHeader } from "../components/ModalHeader";
import { GoogleButton } from "../components/GoogleButton";
import { AppleButton } from "../components/AppleButton";
import { OrDivider } from "../components/OrDivider";
import { PasswordInput } from "../components/PasswordInput";
import { useNavigation } from "@react-navigation/native";

export const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <ModalHeader text="Apartio" xShown />
        <Text category={"h5"} style={styles.header}>
          Reset Password
        </Text>
        <Formik
          initialValues={{
            password: "",
            passwordRepeat: "",
          }}
          validationSchema={yup.object().shape({
            password: yup
              .string()
              .required("Create a new Password")
              .matches(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                "Your password must have 8 characters, 1 uppercase letter,1 lowercase letter, 1 special character"
              ),
            passwordRepeat: yup
              .string()
              .oneOf([yup.ref("password"), null], "Passwords don't match")
              .required("Required"),
          })}
          onSubmit={(values) => {
            console.log("register", values);
            navigation.navigate("SignIn");
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
                <PasswordInput
                  style={styles.input}
                  value={values.passwordRepeat}
                  onChangeText={handleChange("passwordRepeat")}
                  placeholder="Re-enter Password"
                  label="Password"
                  onBlur={() => setFieldTouched("passwordRepeat")}
                  caption={
                    touched.passwordRepeat && errors.passwordRepeat
                      ? errors.passwordRepeat
                      : undefined
                  }
                  status={
                    touched.passwordRepeat && errors.passwordRepeat
                      ? "danger"
                      : "basic"
                  }
                />

                <Button
                  style={styles.submitButton}
                  onPress={() => handleSubmit()}
                >
                  Reset Password
                </Button>
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
  submitButton: {
    marginTop: 20,
  },
});
