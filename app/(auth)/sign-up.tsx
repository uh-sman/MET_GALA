import { View, Text, ScrollView, Image, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/form-field";
import image from "../../constants/image";
import CustomButton from "../../components/custom-button";
import { Link, router } from "expo-router";
import { signUp } from "../../lib/auth";
import { useGlobalContext } from "../../context/GlobalProvider";


const SignUp = () => {
  const { setUser,setIsLoggedIn } = useGlobalContext()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    setIsLoading(true)
    try {
      if (!form.email || !form.password ||  !form.username) {
        Alert.alert("Please fill in all fields")
      }else{
        const result = await signUp(form)
        setUser(result)
        setIsLoggedIn(true)
        router.push('/verification')
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{
        height: "100%"
      }}>
        <View className="w-full justify-center h-full">
          <ImageBackground
            source={image.cover}
            resizeMode="cover"
            className="w-full h-full relative"
          >
            <View className="bg-black/60 h-full w-full" />
            <View className="absolute w-full h-full justify-center items-center px-4">
            <Text className="text-2xl mt-10 font-bold space-x-3">
              <Text className=" text-white text-opacity-90">CREATE {""}</Text> 
              <Text className="text-green-500/60">
             A MET GALA {""}
              </Text>
              <Text className="text-white">
              ACCOUNT
              </Text>
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e: any) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
              placeholder=""
              />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e: any) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder=""
              />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e: any) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder=""
              />
            <CustomButton
              title="CREATE ACCOUNT"
              handlePress={submit}
              containerStyles="mt-7 bg-white w-full rounded-full min-h-[62px]"
              textStyles="font-bold"
              isLoading={isLoading}
              />
            <View className=" justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-base">
                Don't have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-semibold text-secondary"
                >
                Sign In
              </Link>
            </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
