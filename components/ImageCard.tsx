import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import { icons, images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import { getImages } from "../lib/auth";
import fetchFunc from "../lib/fetch-func";
interface ImageCardProps {
  icon?: any;
  containerStyles: string;
  imageStyles1?: string;
  imageStyles: string;
  resizeMode: string;
  title?: string;
  titleStyles?: string;
  image?: string;
  data?: any;
}
const ImageCard = ({
  icon,
  containerStyles,
  imageStyles,
  resizeMode,
  imageStyles1,
  title,
  titleStyles,
  image,
  ...data
}: ImageCardProps) => {
  const { user } = useGlobalContext();
  // console.log(postImages)
  const CDN_URL = "https://hbdfohioshfeaverueac.supabase.co/storage/v1/object/public/images/"

  return (
    <View>
      <View className={`${containerStyles}`}>
        {title && <Text className={titleStyles}>{title}</Text>}
        <View className="">
          {icon && (
            <Image
              source={icon}
              className="h-5 w-5 absolute top-3 z-10 right-2"
              resizeMode="contain"
            />
          )}
          <Image
            source={{ uri: CDN_URL + image }}
            className={`${imageStyles1}`}
            // @ts-ignore
            resizeMode={resizeMode ? resizeMode : "contain"}
            // borderRadius={25}
          />
       {  title && <Text className="absolute bottom-2 left-2 text-white font-bold">
            {title}
          </Text>}
        </View>
        
      </View>
    </View>
  );
};

export default ImageCard;

