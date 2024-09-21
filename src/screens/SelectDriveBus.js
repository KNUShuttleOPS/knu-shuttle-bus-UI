import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from "expo-font";
import KNU_logoEng from '../assets/img/KNU_logoEng_Red.png';
import KNU_emblem_Red from '../assets/img/KNU_emblem_Red.png';
import LineDivider_Red from '../assets/img/LineDivider_Red.png';

const SelectDriveBus = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../assets/font/KNU TRUTH.ttf"),
  });

  // 각 호선의 버튼 표시 여부를 관리하는 상태 변수
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);

  const toggleLine1 = () => {
    setShowLine1(!showLine1);
    setShowLine2(false); // 다른 호선 버튼 숨기기
    setShowLine3(false);
  };

  const toggleLine2 = () => {
    setShowLine2(!showLine2);
    setShowLine1(false); // 다른 호선 버튼 숨기기
    setShowLine3(false);
  };

  const toggleLine3 = () => {
    setShowLine3(!showLine3);
    setShowLine1(false); // 다른 호선 버튼 숨기기
    setShowLine2(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={KNU_emblem_Red} style={styles.background}>
        <View style={styles.overlay} />
      </ImageBackground>
      <Image source={LineDivider_Red} style={{ width: 360, height: 2, position: 'absolute', top: 60 }} />
      <View style={styles.spacer2} />

      {/* 1호선 버튼 */}
      <TouchableOpacity style={styles.button} onPress={toggleLine1}>
        <Text style={styles.buttonText}>1호선</Text>
      </TouchableOpacity>

      {/* 1호차 버튼 아래에 작은 호차 버튼들을 스크롤 가능하게 표시 */}
      {showLine1 && (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          {[...Array(13).keys()].map((index) => (
            <TouchableOpacity key={index} style={styles.smallButton} onPress={() => navigation.navigate('DriveBus', { line: 1, busNumber: index + 1 })}>
              <Text style={styles.smallButtonText}>{index + 1}회차</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* 2호선 버튼 */}
      <TouchableOpacity style={styles.button} onPress={toggleLine2}>
        <Text style={styles.buttonText}>2호선</Text>
      </TouchableOpacity>

      {/* 2호차 버튼 아래에 작은 호차 버튼들을 스크롤 가능하게 표시 */}
      {showLine2 && (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          {[...Array(6).keys()].map((index) => (
            <TouchableOpacity key={index} style={styles.smallButton} onPress={() => navigation.navigate('DriveBus', { line: 2, busNumber: index + 1 })}>
              <Text style={styles.smallButtonText}>{index + 1}회차</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* 3호선 버튼 */}
      <TouchableOpacity style={styles.button} onPress={toggleLine3}>
        <Text style={styles.buttonText}>3호선</Text>
      </TouchableOpacity>

      {/* 3호차 버튼 아래에 작은 호차 버튼들을 스크롤 가능하게 표시 */}
      {showLine3 && (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          {[...Array(2).keys()].map((index) => (
            <TouchableOpacity key={index} style={styles.smallButton} onPress={() => navigation.navigate('DriveBus', { line: 3, busNumber: index + 1 })}>
              <Text style={styles.smallButtonText}>{index + 1}회차</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <View style={styles.spacer2} />
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />
      <View style={styles.spacer2} />
      <View style={styles.logoContainer}>
        <Image source={KNU_logoEng} style={{ width: 242, height: 70 }} />
        <Text style={styles.KNU_logo_font}>셔틀버스 시스템</Text>
      </View>
      <View style={styles.spacer2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    paddingTop: 40,
  },
  logoContainer: {
    paddingTop: 10,
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
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DA2127',
    marginTop: 20,
  },
  buttonText: {
    color: '#DA2127',
    fontSize: 28,
    fontWeight: '600',
  },
  scrollContainer: {
    maxHeight: 250, // 스크롤뷰의 최대 높이를 240으로 제한
    width: 320,  // 스크롤 영역의 너비 설정
    marginTop: 10,  // 스크롤뷰가 버튼 아래에 위치하도록 여백 추가
    marginBottom: 0, // 2호차 버튼과 간격 추가
    marginLeft: 5,
    borderLeftWidth: 3,  
    borderLeftColor: '#DA2127',
  },
  scrollContent: {
    alignItems: 'center',  // 작은 버튼들을 가운데 정렬
    // borderLeftWidth: 2,  // 안쪽 왼쪽에 선 추가
    // borderLeftColor: '#DA2127',  // 안쪽 왼쪽 선의 색상
    paddingLeft: 8,  // 텍스트와 선 사이 간격 추가 (필요 시)
  },
  smallButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DA2127',
    marginVertical: 5,
    width: 280,
  },
  smallButtonText: {
    color: '#33363F',
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
  },
  spacer2: {
    height: 20,
  },
});

export default SelectDriveBus;
