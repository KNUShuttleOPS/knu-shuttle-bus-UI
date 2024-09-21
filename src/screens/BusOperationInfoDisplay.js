import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";
import KNU_logoEng from '../../assets/img/KNU_logoEng_Red.png';
import KNU_emblem_Gray from '../../assets/img/KNU_emblem_Gray.png';
import LineDivider_Red from '../../assets/img/LineDivider_Red.png';

const BusOperationInfoDisplay = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../../assets/font/KNU TRUTH.ttf"),
  });
  if (!fontsLoaded) return null;

  // 초기화 변수
  const BusNumFirst = "1";
  const ArrivalMinuteFirst = "5";
  const delayMinuteFirst = "0";

  const BusNumSecond = "2";
  const ArrivalMinuteSecond = "3";
  const delayMinuteSecond = "1";

  const BusNumThird = "3";
  const ArrivalMinuteThird = "10";
  const delayMinuteThird = "2";

  return (
    <View style={styles.container}>
      <ImageBackground source={KNU_emblem_Gray} style={styles.background}>
        <View style={styles.overlay} />
      </ImageBackground>
      <Image source={LineDivider_Red} style={{ width: 360, height: 2, position: 'absolute', top: 60 }} />

      {/* 텍스트 표시 영역 추가 */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <View style={styles.leftAlign}>
            <Text style={styles.busNum}>{BusNumFirst}호선</Text>
          </View>
          <View style={styles.centerAlign}>
            <Text style={styles.arrival}>{ArrivalMinuteFirst}분 후 도착</Text>
          </View>
          <View style={styles.rightAlign}>
            {delayMinuteFirst > 0 && <Text style={styles.delay}>[{delayMinuteFirst}분 지연]</Text>}
          </View>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.leftAlign}>
            <Text style={styles.busNum}>{BusNumSecond}호선</Text>
          </View>
          <View style={styles.centerAlign}>
            <Text style={styles.arrival}>{ArrivalMinuteSecond}분 후 도착</Text>
          </View>
          <View style={styles.rightAlign}>
            {delayMinuteSecond > 0 && <Text style={styles.delay}>[{delayMinuteSecond}분 지연]</Text>}
          </View>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.leftAlign}>
            <Text style={styles.busNum}>{BusNumThird}호선</Text>
          </View>
          <View style={styles.centerAlign}>
            <Text style={styles.arrival}>{ArrivalMinuteThird}분 후 도착</Text>
          </View>
          <View style={styles.rightAlign}>
            {delayMinuteThird > 0 && <Text style={styles.delay}>[{delayMinuteThird}분 지연]</Text>}
          </View>
        </View>
      </View>

      <View style={styles.spacer} />
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />
      <View style={styles.spacer2} />
      <Image source={KNU_logoEng} style={{ width: 242, height: 70 }} />
      <Text style={styles.KNU_logo_font}>셔틀버스 시스템</Text>
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
    paddingTop: 50,
  },
  KNU_logo_font: {
    fontSize: 38,
    fontFamily: "KNU_TRUTH",
    color: '#000',
  },
  background: {
    position: 'absolute',
    top: 270,
    left: 20,
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
    paddingVertical: 40,
    paddingHorizontal: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DA2127',
    marginTop: 20,
  },
  buttonText: {
    color: '#DA2127',
    fontSize: 24,
    fontWeight: 'normal',
  },
  spacer: {
    height: 10,
  },
  spacer2: {
    height: 20,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoBox: {
    borderWidth: 2,
    borderColor: '#DA2127',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row', // 수평 정렬
    alignItems: 'center', // 텍스트 중앙 정렬
    width: 340, // 고정된 너비
    height: 60, // 고정된 높이
  },
  leftAlign: {
    flex: 1,
    alignItems: 'flex-start', // 왼쪽 정렬
  },
  centerAlign: {
    flex: 1,
    alignItems: 'center', // 가운데 정렬
  },
  rightAlign: {
    flex: 1,
    alignItems: 'flex-end', // 오른쪽 정렬
  },
  infoText: {
    fontSize: 18,
  },
  busNum: {
      color: '#DA2127', // 호선 색상
      fontWeight: 'bold',
      fontSize: 24, // 호선 폰트 크기
      paddingLeft: 10,
  },
  arrival: {
      color: '#000', // 도착 시간 색상
      fontSize: 18, // 도착 시간 폰트 크기
  },
  delay: {
      color: '#FF0000', // 지연 색상
      fontSize: 18, // 지연 폰트 크기
      paddingRight: 5,
  },
});

export default BusOperationInfoDisplay;
