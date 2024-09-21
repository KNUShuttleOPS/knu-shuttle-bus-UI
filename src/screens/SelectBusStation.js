import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";
import KNU_logoEng from '../../assets/img/KNU_logoEng_Red.png';
import KNU_emblem_Red from '../../assets/img/KNU_emblem_Red.png';
import LineDivider_Red from '../../assets/img/LineDivider_Red.png';
import ComplaintsReport_Icon from '../../assets/img/ComplaintsReport_Icon.png';
import StarChecked_Icon from '../../assets/img/StarChecked_Icon.png';
import StarUnchecked_Icon from '../../assets/img/StarUnchecked_Icon.png';

const SelectBusStation = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../../assets/font/KNU TRUTH.ttf"),
  });

  // 현재 선택된 즐겨찾기 역을 관리하는 state
  const [favoriteStation, setFavoriteStation] = useState(null);

  if (!fontsLoaded) return null;

  // 즐겨찾기 버튼 클릭 시 실행될 함수
  const handleFavorite = (stationName) => {
    if (favoriteStation === stationName) {
      // 이미 선택된 역을 다시 클릭한 경우, 즐겨찾기 해제
      setFavoriteStation(null);
      Alert.alert('즐겨찾기가 해제되었습니다!');
    } else {
      // 다른 역을 클릭한 경우 즐겨찾기 변경
      setFavoriteStation(stationName);
      Alert.alert('즐겨찾기가 지정되었습니다!');
    }
  };

  const renderStationButton = (stationName) => {
    return (
      <View style={styles.stationContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DriveBus')}>
          <Text style={styles.buttonText}>{stationName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleFavorite(stationName)}
        >
          <Image
            source={favoriteStation === stationName ? StarChecked_Icon : StarUnchecked_Icon}
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={KNU_emblem_Red} style={styles.background}>
        <View style={styles.overlay} />
      </ImageBackground>

      <Image source={LineDivider_Red} style={{ width: 360, height: 2, position: 'absolute', top: 60 }} />
      <View style={styles.spacer2} />

      {renderStationButton('만촌역')}
      {renderStationButton('동대구역')}
      {renderStationButton('신천역')}
      {renderStationButton('대구은행역')}
      {renderStationButton('북구청역')}
      {renderStationButton('일청당')}

      <View style={styles.spacer2} />
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />
      <View style={styles.spacer2} />
      <Image source={KNU_logoEng} style={{ width: 242, height: 70 }} />
      <View style={styles.spacer2} />

      {/* 불편사항 접수 아이콘 버튼 */}
      <TouchableOpacity style={styles.complaintsIconButton} onPress={() => alert('불편사항 접수!')}>
        <Image source={ComplaintsReport_Icon} style={styles.icon} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // 가운데 정렬에서 윗쪽 정렬로 변경
    backgroundColor: '#FFFFFF',
    zIndex: 1, // UI를 배경 이미지 위에 위치시킴
    paddingTop: 50, // 윗쪽에 여백 추가
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
  stationContainer: {
    flexDirection: 'row', // 역 이름과 즐겨찾기 버튼을 가로로 정렬
    alignItems: 'center',
    marginVertical: 5, // 버튼 간격
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // 버튼 배경색
    paddingVertical: 24, // 버튼 세로 패딩
    paddingHorizontal: 20, // 버튼 가로 패딩
    borderRadius: 10, // 버튼의 둥근 모서리
    borderWidth: 2, // 테두리 두께
    borderColor: '#DA2127', // 테두리 색상
    width: 340, // 버튼 너비
    alignItems: 'flex-start', // 텍스트 왼쪽 정렬
    zIndex: 1, // 즐겨찾기 버튼 위에 위치하도록
  },
  buttonText: {
    color: '#DA2127', // 텍스트 색상
    fontSize: 32, // 텍스트 크기
    fontWeight: 'normal', // 텍스트 굵기
  },
  favoriteButton: {
    position: 'absolute',
    right: 12,  // 버튼의 오른쪽에 위치
    paddingRight: 10,
    zIndex: 2, // 역 버튼 위에 즐겨찾기 버튼 위치
  },
  favoriteIcon: {
    width: 40,  // 즐겨찾기 아이콘 크기
    height: 40,  // 즐겨찾기 아이콘 크기
  },
  complaintsIconButton: {
    position: 'absolute',  // 아이콘을 절대 위치로 설정
    bottom: 20,  // 화면 하단에서 40px 위에 고정
    right: 20,  // 화면 오른쪽에서 20px 떨어진 위치에 고정
    width: 60,  // 아이콘 버튼의 너비
    height: 60,  // 아이콘 버튼의 높이
    justifyContent: 'center',  // 아이콘을 중앙에 정렬
    alignItems: 'center',  // 아이콘을 중앙에 정렬
  },
  icon: {
    width: 50,  // 아이콘 너비
    height: 50,  // 아이콘 높이
  },
  spacer2: {
    height: 20, // 원하는 높이로 설정
  },
});

export default SelectBusStation;
