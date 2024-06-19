import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import CustomButton from "../../components/custom-button";
import FormField from "../../components/form-field";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";
import { useGlobalContext } from "../../context/GlobalProvider";
import { upLoadPost, upload, uploadImage } from "../../lib/auth";
import { router } from "expo-router";
import fetchFunc from "../../lib/fetch-func";

export interface PostProps {
  title: string;
  subtitle: string;
  text: string;
  video: any;
  image: any;
  category: string;
}
const Create = () => {
  const { user } = useGlobalContext()
  // console.log(user)
  const [uploading, setUploading] = useState(false);
  const [post, setPost] = useState<PostProps>({
    title: "",
    subtitle: "",
    text: "",
    image: null,
    video: null,
    category: "",
  });

  const onePicker = async (selectType: "image" | "video") => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          selectType === "image"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        const file = result.assets[0];
  
        if (selectType === "image") {
          setPost({ ...post, image: file });
        } else if (selectType === "video") {
          setPost({ ...post, video: file });
        }
        // await uploadImage(file?.uri)
      }
    } catch (error: any) {
        throw Error(error)
    }
  };
  

  const submit = async () => {
    if (!post.text || !post.title || !post.video || !post.image) {
      Alert.alert('Please fill in all the fields')
    }
    setUploading(true)
    try {
       await upload(user?.id, {...post})
    } catch (error: any) {
      Alert.alert("Error", error.message)
    }finally {
      setPost({
        title: "",
        video: null,
        image: null ,
        text: "",
        subtitle: "",
        category: ""
      })
      setUploading(false)
      Alert.alert("Success", "Post uploaded successfully")
      router.push('/home')
    }
  }
  return (
    <SafeAreaView className="h-full w-full">
      <View className="flex-row px-2 py-4 justify-between items-center">
            <TouchableOpacity>
              <Image
                source={icons.close}
                className="w-6 h-6 leading-[50px]"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="flex-row items-center">
              <CustomButton
                title="Drafts"
                textStyles="text-black"
                containerStyles="pr-2 rounded-full"
                handlePress={() => {}}
              />
              <CustomButton
                title="Publish"
                textStyles="text-white"
                containerStyles="bg-black/90 w-[80px] h-8"
                handlePress={submit}
                isLoading={uploading}
              />
            </View>
          </View>
      <ScrollView>
        <View className="w-full px-2 py-5">
          
          <View className="gap-y-4">
            <FormField
              placeholder="What's your fashion story?"
              value={post.title}
              handleChangeText={(e: any) => setPost({ ...post, title: e })}
              textStyles="border-none"
              textInputStyles="text-black uppercase"
            />
            <FormField
              placeholder="Your fashion story"
              value={post.text}
              handleChangeText={(e: any) => setPost({ ...post, text: e })}
              textStyles="border border-black/20 h-20 rounded-2xl"
              textInputStyles="text-black"
            />
            <TouchableOpacity onPress={() => onePicker("image")}>
              {post.image ? (
                <Image
                  source={{ uri: post.image.uri }}
                  className="w-full h-64 rounded-2xl"
                  resizeMode={ResizeMode.COVER}
                />
              ) : (
                <View className="w-full h-[30vh] px-4 my-[20%] bg-white rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                    <Image
                      source={icons.filterMenu}
                      resizeMode="contain"
                      className="w-1/2 h-1/2"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onePicker("video")}>
              {post.video ? (
                <Video
                  source={{ uri: post.video.uri }}
                  className="w-full h-64 rounded-2xl "
                  resizeMode={ResizeMode.COVER}
                />
              ) : (
                <View className="w-full h-[30vh] px-4 my-[20%] bg-white rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                    <Image
                      source={icons.filterMenu}
                      resizeMode="contain"
                      className="w-1/2 h-1/2"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
