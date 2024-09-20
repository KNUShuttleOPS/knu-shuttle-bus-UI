import React, { useState } from 'react';  // useState 추가
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";
import KNU_logoEng from '../../assets/img/KNU_logoEng_Red.png';
import KNU_emblem_Red from '../../assets/img/KNU_emblem_Red.png';
import Bus_Icon from '../../assets/img/Bus_Icon.png';
import LineDivider_Red from '../../assets/img/LineDivider_Red.png';

const StartDriveBus = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../../assets/font/KNU TRUTH.ttf"),
  });
  const [isDriving, setIsDriving] = useState(false); // 운행 상태 관리

  if (!fontsLoaded) return null;

  const startOrStopDriving = () => {
    if (!isDriving) {
      // 운행 시작 상태일 때 메세지 표시
      Alert.alert('안전운전 하세요!');
    } else {
      // 운행 종료 상태일 때 메세지 표시 후 HomeScreen으로 이동
      Alert.alert('수고하셨습니다!', '', [
        { text: '확인', onPress: () => navigation.navigate('Home') }  // '확인' 버튼을 누르면 HomeScreen으로 이동
      ]);
    }
    setIsDriving(!isDriving);  // 상태를 반전시킴
  };

  const accidentOccurred = () => {
    alert('사고 발생!');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={KNU_emblem_Red} style={styles.background}>
        <View style={styles.overlay} />
      </ImageBackground>
      
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />
      <View style={styles.spacer2} />
      <Image source={KNU_logoEng} style={{ width: 242, height: 70 }} />
      <Text style={styles.KNU_logo_font}>셔틀버스 시스템</Text>
      <View style={styles.spacer2} />

      <Image source={Bus_Icon} style={{ width: 180, height: 180 }} />
      <View style={styles.spacer} />
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />

      <TouchableOpacity style={styles.button2} onPress={accidentOccurred}>
        <Text style={styles.buttonText2}>🔔 지연 알림</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isDriving && { borderColor: '#DA2127' } // 운행 중일 때 테두리 색상 변경
        ]}
        onPress={startOrStopDriving}
      >
        <Text style={[
          styles.buttonText,
          isDriving && { color: '#DA2127' } // 운행 중일 때 텍스트 색상 변경
        ]}>
          {isDriving ? '🛑 운행 종료' : '🚌 운행 시작'}  {/* 상태에 따른 텍스트 변경 */}
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
    paddingHorizontal: 25, // 버튼 가로 패딩
    borderRadius: 10, // 버튼의 둥근 모서리
    borderWidth: 2, // 테두리 두께
    borderColor: '#797977', // 테두리 색상
    marginTop: 20, // 텍스트 아래 간격
  },
  buttonText: {
    color: '#797977', // 텍스트 색상
    fontSize: 40, // 텍스트 크기
    fontWeight: 'normal', // 텍스트 굵기
  },
  button2: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // 버튼 배경색
    paddingVertical: 30, // 버튼 세로 패딩
    paddingHorizontal: 34, // 버튼 가로 패딩
    borderRadius: 10, // 버튼의 둥근 모서리
    borderWidth: 2, // 테두리 두께
    borderColor: '#bf7c26', // 테두리 색상
    marginTop: 20, // 텍스트 아래 간격
  },
  buttonText2: {
    color: '#bf7c26', // 텍스트 색상
    fontSize: 40, // 텍스트 크기
    fontWeight: 'normal', // 텍스트 굵기
  },
  spacer: {
    height: 50, // 원하는 높이로 설정
  },
  spacer2: {
    height: 20, // 원하는 높이로 설정
  },
});

export default StartDriveBus;
