import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";
import KNU_logoEng from '../assets/img/KNU_logoEng_Red.png';
import KNU_emblem_Red from '../assets/img/KNU_emblem_Red.png';

const Home = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../assets/font/KNU TRUTH.ttf"),
  });
  if (!fontsLoaded) return null;

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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginStudent')}>
        <Text style={styles.buttonText}>학생 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginDriver')}>
        <Text style={styles.buttonText}>기사 로그인</Text>
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
    zIndex: 1, // UI를 배경 이미지 위에 위치시킴
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
    position: 'absolute',  // 배경 이미지를 절대 위치로 설정
    top: 230,  // Y 좌표 위치 (배경 이미지를 이동시킬 위치)
    left: -210,  // X 좌표 위치
    width: 580,  // 배경 이미지 너비
    height: 580,  // 배경 이미지 높이
    resizeMode: 'cover',  // 이미지 크기 조정 방식
    zIndex: -1,  // 배경 이미지를 UI 뒤로 보냄
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,  // 부모 요소(배경 이미지)를 채우도록 설정
    backgroundColor: 'rgba(255, 255, 255, 0.85)',  // 투명도 설정 (50%)
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // 버튼 배경색
    paddingVertical: 30, // 버튼 세로 패딩
    paddingHorizontal: 80, // 버튼 가로 패딩
    borderRadius: 10, // 버튼의 둥근 모서리
    borderWidth: 2, // 테두리 두께
    borderColor: '#DA2127', // 테두리 색상
    marginTop: 20, // 텍스트 아래 간격
  },
  buttonText: {
    color: '#DA2127', // 텍스트 색상
    fontSize: 24, // 텍스트 크기
    fontWeight: 'bold', // 텍스트 굵기
  },
  spacer: {
    height: 50, // 원하는 높이로 설정
  },
});

export default Home;
