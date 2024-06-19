import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import CustomButton from "./custom-button";
import { Link } from "expo-router";
interface FormFieldProps {
  title?: string;
  value: any;
  handleChangeText: any;
  otherStyles?: string;
  textStyles?: string;
  keyboardType?: string;
  placeholder: string;
  icon?: any;
  textInputStyles?: string;
  handlePress?: () => void;
}
const FormField = ({
  title,
  value,
  handleChangeText,
  textStyles,
  otherStyles,
  keyboardType,
  placeholder,
  icon,
  textInputStyles,
  handlePress
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className={`w-full  ${textStyles ? textStyles : "border border-white rounded-full h-16 bg-black-100 focus:border-secondary"} px-4 items-center flex-row`}>
       {icons && <TouchableOpacity onPress={handlePress}>
        <Image  source={icon} className="h-5 w-5 opacity-20" resizeMode="contain"/>
       </TouchableOpacity> }
        <TextInput
          className={`flex-1 ${textInputStyles ? textInputStyles : "text-white text-base"}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
