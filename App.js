import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { useFonts } from "expo-font";

import KNU_logoEng from './assets/img/KNU_logoEng_Red.png';
import KNU_emblem_Red from './assets/img/KNU_emblem_Red.png';

export default function App() {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH : require("./assets/font/KNU TRUTH.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* 배경 이미지가 UI와 독립적으로 움직일 수 있도록 설정 */}
      <ImageBackground
        source={KNU_emblem_Red}
        style={styles.background}
      >
        {/* 투명도 오버레이를 추가 */}
        <View style={styles.overlay} />
      </ImageBackground>

      {/* 고정된 UI */}
      <Image
        source={KNU_logoEng}
        style={{ width: 242, height: 70 }}
      />
      <Text style={styles.KNU_logo_font}>셔틀버스 시스템</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // UI를 배경 이미지 위에 위치시킴
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
    width: 620,  // 배경 이미지 너비
    height: 620,  // 배경 이미지 높이
    resizeMode: 'cover',  // 이미지 크기 조정 방식
    zIndex: -1,  // 배경 이미지를 UI 뒤로 보냄
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,  // 부모 요소(배경 이미지)를 채우도록 설정
    backgroundColor: 'rgba(255, 255, 255, 0.85)',  // 투명도 설정 (50%)
  },
});
