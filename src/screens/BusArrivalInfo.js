import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BusArrivalInfo = () => {

  const navigation = useNavigation();

  return (
    <View>      
      <Text>버스 도착 정보 화면</Text>
      <TouchableOpacity
          onPress={() => navigation.navigate("Login", { screen: 'Login' })}
        >
          <Text>로그인 화면으로</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BusArrivalInfo;