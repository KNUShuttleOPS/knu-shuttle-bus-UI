import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window'); // 화면 높이 가져오기

const BusArrivalInfo = () => {
  const navigation = useNavigation();
  const [selectedStation, setSelectedStation] = useState(null); // 선택된 정류장 상태

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // 기본 헤더 숨기기
    });
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleStationPress = (station) => {
    setSelectedStation(station); // 선택된 정류장 상태 업데이트
  };

  return (
    <ImageBackground
      source={require('../assets/img/bus_arrival_background.png')} // 배경 이미지
      style={styles.background}
      imageStyle={{ width: 400, height: 510, position: 'absolute', top: 400, left: 10}} // 이미지 오른쪽 아래에 배치
    >
    <View style={{ flex: 1 , backgroundColor: 'rgba(255, 255, 255, 0)'}}>
      {/* 커스텀 헤더 */}
      <View style={styles.customHeader}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Image 
              source={require('../assets/img/back_icon.png')}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          
          <View style={styles.headerIcons}>
          <Text style={styles.headerTitle}>만촌역</Text>
            <Image 
              source={require('../assets/img/bus_map.png')} 
              style={styles.headerIconMap}
            />
          </View>
          <Image 
              source={require('../assets/img/bus_alarm.png')} 
              style={styles.headerIconAlarm}
            />
        </View>
        <View style={styles.redLine} />

      <ScrollView style={styles.container}>
        <View style={styles.busInfoContainer}>
          <View style={styles.busInfoBox}>
            <Text style={styles.highlight}>1호차</Text>
            <Text style={styles.busInfo}> 3분 후 도착</Text>
          </View>
          <View style={styles.busInfoBox}>
            <Text style={styles.highlight}>2호차</Text>
            <Text style={styles.busInfo}> 8분 후 도착</Text>
            <View style={styles.delayBox}>
              <Text style={styles.delay}>3분 지연</Text>
            </View>
          </View>
          <View style={styles.busInfoBox}>
            <Text style={styles.highlight}>3호차</Text>
            <Text style={styles.busInfo}> 13분 후 도착</Text>
          </View>
        </View>

        <View style={styles.stationContainer}>
          <Image
            source={require('../assets/img/bus_routine.png')}
            style={styles.busRoutineImage}
          />
          <View style={styles.busIconContainer}>
            <Image
              source={require('../assets/img/bus_icon.png')}
              style={styles.busIcon}
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.stationTextContainer_Manchon,
              selectedStation === '만촌역' ? styles.selected : null
            ]}
            onPress={() => handleStationPress('만촌역')}
          >
            <Text style={[
              styles.station,
              selectedStation === '만촌역' ? styles.selectedText : null
            ]}>
              만촌역
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.stationTextContainer_Bank,
              selectedStation === '대구은행역' ? styles.selected : null
            ]}
            onPress={() => handleStationPress('대구은행역')}
          >
            <View style={styles.stationRow}>
              <Text style={[
                styles.station,
                selectedStation === '대구은행역' ? styles.selectedText : null
              ]}>
                대구은행역
              </Text>
              <Text style={styles.stationTime}>10분 소요</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.stationTextContainer_School,
              selectedStation === '일청담' ? styles.selected : null
            ]}
            onPress={() => handleStationPress('일청담')}
          >
            <View style={styles.stationRow}>
              <Text style={[
                styles.station,
                selectedStation === '일청담' ? styles.selectedText : null
              ]}>
                일청담
              </Text>
              <Text style={styles.stationTime}>15분 소요</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  customHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 배경을 반투명으로 설정
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButtonImage: {
    marginTop: 20,
    marginRight: 10, // 텍스트와의 간격
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30
  },
  headerIconMap: {
    marginTop: 15,
    marginBottom: -10
  },
  headerIconAlarm: {
    width: 45,
    height: 45,
    marginTop: 20,
    marginBottom: -10
  },
  headerTitle: {
    color: '#DA2127',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 15,
  },
  redLine: {
    height: 2,
    backgroundColor: '#DA2127',
    width: '93%',
    marginBottom: 20,
    justifyContent: 'center',
    marginLeft: 15
  },
  container: {
    flex: 1,
  },
  busInfoContainer: {
    marginBottom: 20,
    paddingHorizontal: 30
  },
  busInfoBox: {
    borderColor: '#DA2127',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row', // 수평 정렬
    alignItems: 'center', // 수직 가운데 정렬
  },
  busInfo: {
    color: "black",
    fontSize: 18,
    fontWeight: '500',
    marginRight: 70,
  },
  highlight: {
    color: '#DA2127',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 30,
    marginLeft: 10,
  },
  delayBox: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 7,
    padding: 3,
    paddingHorizontal: 15,
    marginLeft: -20,
  },
  delay: {
    color: "red",
    fontSize: 15,
    paddingBottom: 2,
  },
  stationContainer: {
    flex: 1, // 전체 공간을 차지하도록 설정
    height: height * 0.5,
    position: 'relative', // 자식 요소의 절대 위치를 허용
    padding:20,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  busRoutineImage: {
    width: 30, 
    position: 'absolute',
    left: 30,
    top: -10,
  },
  busIconContainer: {
    position: 'absolute',
    left: 30,
    top: 100, 
  },
  stationTextContainer_Manchon: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 20, 
    top: 45, // 높이 조정
    padding: 10,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingLeft: 80,
    paddingBottom: 15
  },
  stationTextContainer_Bank: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 20, 
    top: 180, // 높이 조정
    padding: 10,
    width: '100%', 
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingLeft: 80,
    paddingBottom: 15
  },
  stationTextContainer_School: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    top: 325, // 높이 조정
    padding: 10,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent', 
    paddingLeft: 80,
    paddingBottom: 15
  },
  stationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 텍스트 간격을 맞추기 위해
    width: '100%',
  },
  stationTime: {
    marginTop: 5,
    fontSize: 16,
  },
  selected: {
    borderColor: 'red',
  },
  selectedText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  station: {
    fontSize: 18,
  },
});

export default BusArrivalInfo;
