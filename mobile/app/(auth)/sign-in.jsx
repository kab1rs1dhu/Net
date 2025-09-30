import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Basic validation
    if (!emailAddress || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!emailAddress.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear any previous errors

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error("Sign-in incomplete:", JSON.stringify(signInAttempt, null, 2));
        setError("Sign-in process incomplete. Please try again.");
      }
    } catch (err) {
      console.error("Error signing in:", err);
      
      const errorCode = err.errors?.[0]?.code;
      const errorMessage = err.errors?.[0]?.longMessage || err.errors?.[0]?.message;
      
      if (errorCode === "form_password_incorrect") {
        setError("Password is incorrect. Please try again.");
      } else if (errorCode === "form_password_pwned") {
        setError("This password has been found in a data breach. Please use a different, more secure password.");
      } else if (errorMessage?.includes("CAPTCHA")) {
        setError("Security verification failed. Please try refreshing the page or using a different browser.");
      } else if (errorCode === "form_identifier_not_found") {
        setError("No account found with this email address.");
      } else if (errorCode === "form_param_format_invalid") {
        setError("Please check your email format and try again.");
      } else if (errorCode === "session_token_and_uat_header_missing") {
        setError("Authentication error. Please restart the app and try again.");
      } else {
        setError(errorMessage || "An error occurred. Please try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/revenue-i4.png")} style={styles.illustration} />
        <Text style={styles.title}>Welcome Back</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>

          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
