import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Login = () => {

    const navigation = useNavigation();
    
    return (
        <View>      
            <Text>로그인 화면</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("BusSchedule", { screen: 'BusSchedule' })}
            >
                <Text>버스 시간표 화면으로</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("BusArrivalInfo", { screen: 'BusArrivalInfo' })}
            >
                <Text>버스 도착 정보 화면으로</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;