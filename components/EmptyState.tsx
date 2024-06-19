import { View, Text, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import CustomButton from "./custom-button";
import { router } from "expo-router";
interface EmptyStateProps {
  title: string;
  subtitle: string;
}
const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="flex h-screen w-full justify-center items-center px-4">
      <Image
        source={icons.filter}
        className="w-10 h-10"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-bold text-black/40 mt-2">
        {subtitle}
      </Text>
      <Text className=" font-medium text-sm text-gray-100">{title}</Text>
      {/* <CustomButton title="Create a search"  handlePress={() => router.push('/create')} containerStyles="w-full my-5"/> */}
    </View>
  );
};

export default EmptyState;
