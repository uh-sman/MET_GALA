import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageCard from "../../components/ImageCard";
import { icons, images } from "../../constants";
import { router } from "expo-router";
import fetchFunc from "../../lib/fetch-func";
import { getImages, getPost } from "../../lib/auth";

const Home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const { data: postImages, refetch } = fetchFunc(getPost);

  const onRefresh = async () => {
    setRefreshing(true);
    // recall post videos
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full w-full">
      <View className="p-4">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-dABold leading-[50px]">MET GALA</Text>
          <View className="flex-row gap-6 items-center">
            <TouchableOpacity>
              <Image
                source={icons.notification}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/search/search")}>
              <Image
                source={icons.search}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        data={postImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageCard
            key={item.id}
            title={item?.title}
            containerStyles="w-[100vw] pb-4 px-2"
            imageStyles="w-full h-[300px] rounded-xl"
            resizeMode="cover"
            imageStyles1="h-[300px] w-full rounded-2xl"
            titleStyles="text-4xl py-4 leading-[50px] font-dARegular"
            image={item?.image_url}
            data={postImages}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />

      <View className="relative items-end justify-center">
        <TouchableOpacity
          className="bg-black absolute -top-[10vh]
         right-2 h-16 w-16 rounded-full
          justify-center items-center"
          onPress={() => router.push("/create")}
        >
          <Image
            source={icons.plusTransparent}
            resizeMode="contain"
            className="w-7 h-7"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
