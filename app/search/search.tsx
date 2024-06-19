import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import FormField from "../../components/form-field";
import { icons } from "../../constants";
import ImageCard from "../../components/ImageCard";
import FloatingWidget from "../../components/floating-widget";
// const data = [
//     {
//         name: "Zendaya"
//         im
//     },
//     {
//         name: "Will Smith"
//     },
//     {
//         name: "Joe Cole"
//     },
// ]
const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full h-full">
          <View className="px-4 py-2">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-2xl font-dABold leading-[50px] pt-6">
                MET
              </Text>
              <FormField
                value={search}
                handleChangeText={(text: any) => setSearch(text)}
                otherStyles="w-[70%]"
                textStyles="border-gray-200 h-12 px-3 rounded-2xl space-x-3"
                placeholder="Search Celebrities"
                textInputStyles="text-gray-700"
                icon={icons.search}
              />
              <TouchableOpacity>
                <Image
                  source={icons.menu}
                  className="h-5 w-5 mt-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="py-2 px-1.5 w-full">
            <ImageCard containerStyles=" flex flex-1 gap-4 pb-4 flex-row space-y-4" imageStyles="w-[150px] h-[200px] rounded-[20px]" resizeMode="contain" imageStyles1="h-[300px] w-[200px] rounded-2xl"/>
          </View>
        </View>
      </ScrollView>
          <View className="relative justify-center items-center">
            <FloatingWidget />
          </View>
    </SafeAreaView>
  );
};

export default Search;

{
  /* <ScrollView contentContainerStyle={{
    height: "100%",
  }}> */
}


