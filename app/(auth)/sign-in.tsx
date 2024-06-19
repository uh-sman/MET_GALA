import { View, Text, ScrollView, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/form-field";
import image from "../../constants/image";
import CustomButton from "../../components/custom-button";
import { Link, useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { resendVerificationEmail, signIn } from "../../lib/auth";

const SignIn = () => {
  const { setUser, setIsLoggedIn, user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const submit = async () => {
    setIsLoading(true);
    try {
      if (!form.email || !form.password) {
        setIsLoading(false);
        return Alert.alert("Please fill in all fields");
      }
      const result = await signIn(form);
      if (result?.user_metadata?.email_verified === false) {
        Alert.alert("Email not verified", "Please check your email. Another verification email has been sent");
      } else {
        setUser(result);
        setIsLoggedIn(true);
        router.push('/home');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("user....", user);

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center h-full">
          <ImageBackground
            source={image.cover}
            resizeMode="cover"
            className="w-full h-full relative"
          >
            <View className="bg-black/60 h-full w-full" />
            <View className="absolute w-full h-full justify-center items-center px-4">
              <Text className="text-2xl mt-10 font-bold space-x-3">
                <Text className="text-green-500/60 text-opacity-90">Log In To </Text>
                <Text className="text-white font-dABold leading-[50px]">
                  MET GALA
                </Text>
              </Text>
              <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e: any) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                // textStyles="border-2"
                keyboardType="email-address"
                placeholder=""
              />
              <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e: any) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
                // textStyles="border-2"
                placeholder=""
              />
              <CustomButton
                title="Sign In"
                handlePress={submit}
                containerStyles="mt-7 bg-white w-full rounded-full min-h-[62px]"
                textStyles="font-bold"
                isLoading={isLoading}
              />
              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-100 font-base">
                  Don't have an account?
                </Text>
                <Link
                  href="/sign-up"
                  className="text-lg font-semibold text-secondary"
                >
                  Sign Up
                </Link>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
