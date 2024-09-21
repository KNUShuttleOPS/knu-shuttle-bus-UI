import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";
import KNU_logoEng from '../../assets/img/KNU_logoEng_Red.png';
//import KNU_emblem_Red from '../../assets/img/KNU_emblem_Red.png';
import KNU_emblem_Gray from '../../assets/img/KNU_emblem_Gray.png';
import Bus_Icon from '../../assets/img/Bus_Icon.png';
import LineDivider_Red from '../../assets/img/LineDivider_Red.png';

const StartDriveBus = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../../assets/font/KNU TRUTH.ttf"),
  });
  const [isDriving, setIsDriving] = useState(false); // 운행 상태 관리

  if (!fontsLoaded) return null;

  const startOrStopDriving = () => {
    if (!isDriving) {
      Alert.alert('안전운전 하세요!');
    } else {
      Alert.alert('수고하셨습니다!', '', [
        { text: '확인', onPress: () => navigation.navigate('Home') }
      ]);
    }
    setIsDriving(!isDriving);  // 상태를 반전시킴
  };

  const accidentOccurred = () => {
    alert('사고 발생!');
  };

  // route.params에서 전달된 호선과 호차 정보 추출
  const { line, busNumber } = route.params || { line: '정보 없음', busNumber: '정보 없음' };

  return (
    <View style={styles.container}>
      <ImageBackground source={KNU_emblem_Gray} style={styles.background}>
        <View style={styles.overlay} />
      </ImageBackground>
      
      <Image source={LineDivider_Red} style={{ width: 360, height: 2, position: 'absolute', top: 60 }} />
      <View style={styles.spacer2} />
      <Image source={KNU_logoEng} style={{ width: 242, height: 70 }} />
      <Text style={styles.KNU_logo_font}>셔틀버스 시스템</Text>
      <View style={styles.spacer2} />

      <Image source={Bus_Icon} style={{ width: 180, height: 180 }} />
      <View style={styles.spacer2} />
      {/* 호선 및 호차 정보를 표시하는 텍스트 추가 */}
      <Text style={styles.infoText}>{line}호선 {busNumber}회차</Text>
      
      <View style={styles.spacer2} />
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />

      <TouchableOpacity style={styles.button2} onPress={accidentOccurred}>
        <Text style={styles.buttonText2}>🔔 지연 알림</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isDriving && { borderColor: '#DA2127' }
        ]}
        onPress={startOrStopDriving}
      >
        <Text style={[
          styles.buttonText,
          isDriving && { color: '#DA2127' }
        ]}>
          {isDriving ? '🛑 운행 종료' : '🚌 운행 시작'}
        </Text>
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
  KNU_logo_font: {
    fontSize: 38,
    fontFamily: "KNU_TRUTH",
    color: '#000',
  },
  background: {
    position: 'absolute',  // 배경 이미지를 절대 위치로 설정
    top: 270,  // Y 좌표 위치 (배경 이미지를 이동시킬 위치)
    left: 20,  // X 좌표 위치
    width: 580,  // 배경 이미지 너비
    height: 580,  // 배경 이미지 높이
    resizeMode: 'cover',  // 이미지 크기 조정 방식
    zIndex: -1,  // 배경 이미지를 UI 뒤로 보냄
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#797977',
    marginTop: 20,
  },
  buttonText: {
    color: '#797977',
    fontSize: 40,
    fontWeight: 'normal',
  },
  button2: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#bf7c26',
    marginTop: 20,
  },
  buttonText2: {
    color: '#bf7c26',
    fontSize: 40,
    fontWeight: 'normal',
  },
  spacer: {
    height: 50,
  },
  spacer2: {
    height: 20,
  },
  infoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#DA2127', // 텍스트 색상 조정
    marginTop: 10, // 여백 추가
  },
});

export default StartDriveBus;
