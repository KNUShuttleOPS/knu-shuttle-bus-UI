import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BusStopList = () => {

  const navigation = useNavigation();

  return (
    <View>      
      <Text>버스 정류장 목록 화면</Text>
      <TouchableOpacity
          onPress={() => navigation.navigate("Login", { screen: 'Login' })}
        >
          <Text>로그인 화면으로</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BusStopList;