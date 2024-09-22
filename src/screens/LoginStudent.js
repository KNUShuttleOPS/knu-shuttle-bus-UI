import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useFonts } from "expo-font";
import { loadUUID } from '../utils/UUIDManager';
import KNU_logoEng from '../assets/img/KNU_logoEng_Red.png';
import KNU_emblem_Red from '../assets/img/KNU_emblem_Red.png';
import { API_DOMAIN } from '../constants/serverConstants';

const LoginStudent = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../assets/font/KNU TRUTH.ttf"),
  });
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  if (!fontsLoaded) return null;


  const handleLogin = async () => {
    try {
      // 첫 번째 POST 요청
      const deviceId = await loadUUID();
      console.log(deviceId);
      const userResponse = await fetch(API_DOMAIN + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'deviceId': deviceId,
          'userName': userName,
          'password': password
        }),
      });
      
      const userData = await userResponse.text();
      if (!userResponse.ok) {
        console.log(userData);
        throw new Error(userData.message || '사용자 로그인 실패');
      }
      console.log("ok");
      // 두 번째 POST 요청
      const passengerResponse = await fetch(API_DOMAIN + '/passengers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'deviceId': deviceId,
          'studentId': userName
        }),
      });
      
      const passengerData = await passengerResponse.text();
      if (!passengerResponse.ok) {
        throw new Error(passengerData.message || '승객 정보 전송 실패');
      }

      // 로그인 성공 및 정보 전송 성공
      Alert.alert('로그인 성공', '로그인에 성공했습니다!');
      navigation.navigate('SelectStation');

    } catch (error) {
      // 에러 처리
      Alert.alert('오류', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={KNU_emblem_Red} style={styles.background}>
        <View style={styles.overlay} />
      </ImageBackground>
      
      <View style={styles.logoContainer}>
        <Image source={KNU_logoEng} style={{ width: 242, height: 70 }} />
        <Text style={styles.KNU_logo_font}>셔틀버스 시스템</Text>
      </View>

      <View style={styles.spacer} />
      <View style={styles.inputContainer}>
        <TextInput 
            style={styles.input} 
            placeholder="ID를 입력하세요" 
            placeholderTextColor="#999" 
            value={userName}
            onChangeText={setUserName} // 입력값 저장
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
            style={styles.input} 
            placeholder="비밀번호를 입력하세요" 
            placeholderTextColor="#999" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword} // 입력값 저장
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 50
  },
  KNU_logo_font: {
    fontSize: 38,
    fontFamily: "KNU_TRUTH",
    color: '#000',
  },
  background: {
    position: 'absolute',
    top: 230,
    left: -210,
    width: 580,
    height: 580,
    resizeMode: 'cover',
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 10,
    paddingHorizontal: 50,
    paddingBottom: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DA2127',
    marginTop: 40,
  },
  buttonText: {
    color: '#DA2127',
    fontSize: 25,
    fontWeight: 'bold',
  },
  spacer: {
    height: 80,
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  inputContainer: {
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: '#DA2127',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },  
});

export default LoginStudent;