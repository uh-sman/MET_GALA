import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../constants/index";
import CustomButton from "../components/custom-button";
import { Redirect, router } from "expo-router";
import SvgComponent from "../components/SvgComponent";
import { useFonts, loadAsync } from "expo-font";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoggedIn, isLoading, user } = useGlobalContext()
  useEffect(() => {
    // checkUser()
    if (!isLoggedIn && !user) {
      console.log("NO USER!")
    }
    if (!isLoggedIn && user) {
      return  router.replace('/home')
    }

    if (isLoggedIn === true && user) {
      return  router.replace('/home')
      
    }
    // console.log("user?", user)
  }, [user])
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="image-container flex relative w-full h-full">
          <ImageBackground
            source={images.cover}
            className="h-full object-cover opacity-90 space-x-2 px-2"
            resizeMode="cover"
          >
            <View className="justify-center items-start text-white absolute -top-[46%] left-0 w-full h-full">
              <Image
                source={icons.logo}
                className="h-15 w-20"
                resizeMode="contain"
              />
            </View>

            <View className="justify-center items-center text-white absolute -top-[14%] left-0 w-full h-full">
              <Text
                className="text-6xl font mb-2 font-dARegular leading-[100px] text-white tracking-widest "
                // style={{ fontFamily: fontsLoaded ? "Amita-Normal" : "sans-serif" }} // Apply font conditionally
              >
                MET GALA
              </Text>
              {/* <Image className="text-6xl font-bold mb-2  text-white tracking-widest" source={icons.met} resizeMode="contain"/> */}
            </View>
            <View className="justify-center items-center text-white absolute top-[30%] left-0 w-full h-full">
              <CustomButton
                title="CONTINUE"
                textStyles="text-white"
                containerStyles="bg-black mb-4 h-[62px] rounded-full w-full"
                handlePress={() => router.push("/sign-in")}
              />
              <CustomButton
                title="START OVER"
                textStyles="" // Assuming this refers to another font
                containerStyles="border h-[62px] border-black rounded-full w-full"
                handlePress={() => {}}
              />
              <CustomButton title="KEEP LOOKING" containerStyles="mt-4" handlePress={() => {}} />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
