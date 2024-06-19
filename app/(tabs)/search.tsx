import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import FormField from "../../components/form-field";
import { icons } from "../../constants";
import ImageCard from "../../components/ImageCard";
import FloatingWidget from "../../components/floating-widget";
import fetchFunc from "../../lib/fetch-func";
import { getPost, searchPost } from "../../lib/auth";
import EmptyState from "../../components/EmptyState";
interface DebounceProps<T extends any[]> {
  func: (...args: T) => void; // Function to be debounced
  delay: number; // Delay in milliseconds
}
interface searchResultsProps {
  title: string;
  image_url: string;
  text: string;
}
const Search = () => {
  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState<any | []>();

  const debounce = <T extends any[]>({ func, delay }: DebounceProps<T>) => {
    // Debounce function (replace with your implementation)
    let timeoutId: any;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = debounce<string[]>({
    func: async (query: string) => {
      const results = await searchPost(query);
      setSearchResults(results);
    },
    delay: 500, // Adjust debounce delay as needed
  });

  useEffect(() => {
    debouncedSearch(search); // Trigger search on initial render and query changes
  }, [search]);

  return (
    <SafeAreaView className="h-full w-full">
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
      <FlatList
        className="py-2"
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageCard
            key={item.id}
            containerStyles="w-[100vw] pb-4 px-2"
            imageStyles="w-full h-[300px] rounded-xl"
            resizeMode="cover"
            imageStyles1="h-[300px] w-[200px] rounded-2xl"
            titleStyles="text-4xl py-4 leading-[50px] font-dARegular"
            image={item?.image_url}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Results Found"
            subtitle={`No Celebrity search found  ${search ? "with " + search : ""}`}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
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

{
  /* <ImageCard containerStyles=" flex flex-1 gap-4 pb-4 flex-row space-y-4" imageStyles="w-[150px] h-[200px] rounded-[20px]" resizeMode="contain" imageStyles1="h-[300px] w-[200px] rounded-2xl"/> */
}

{
  /* <ScrollView
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
    
  </View>
</View>
</ScrollView> */
}
