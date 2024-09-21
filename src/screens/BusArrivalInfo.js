import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";
import * as Notifications from 'expo-notifications';
import KNU_emblem_Gray from '../assets/img/KNU_emblem_Gray.png';
import LineDivider_Red from '../assets/img/LineDivider_Red.png';
import MapMaker_Icon from '../assets/img/MapMaker_Icon.png';
import BusLine_2way from '../assets/img/BusLine_2way.png';
import BusLine_1way from '../assets/img/BusLine_1way.png';
import KNU_logoFlower from '../assets/img/KNU_logoFlower.png';
import BusAlarmIcon from '../assets/img/bus_alarm.png';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const  BusArrivalInfo = ({ route }) => {
  const { stationName } = route.params;

  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../assets/font/KNU TRUTH.ttf"),
  });
  if (!fontsLoaded) return null;

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('알림 권한이 필요합니다.');
        }
      }
    };

    requestPermissions();
  }, []);

  const handleAlarmIconPress = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "버스 도착 알림",
        body: `${BusNumFirst}호차가 ${ArrivalMinuteFirst}분 후 도착합니다.`,
      },
      trigger: null, // 즉시 알림
    });
  };

  // Initialize variables
  const BusNumFirst = "1";
  const ArrivalMinuteFirst = "5";
  const delayMinuteFirst = "0";

  const BusNumSecond = "2";
  const ArrivalMinuteSecond = "3";
  const delayMinuteSecond = "1";

  const BusNumThird = "3";
  const ArrivalMinuteThird = "10";
  const delayMinuteThird = "2";

  // Icon button action
  const handleMapIconPress = () => {
    Alert.alert("지도", "지도로 이동합니다.");
  };

  // Determine which bus line image to display
  const busLineImage = stationName === '북구청역' ? BusLine_1way : BusLine_2way;

  return (
    <View style={styles.container}>
      <ImageBackground source={KNU_emblem_Gray} style={styles.background}>
        <View style={styles.overlay} />
      </ImageBackground>
      <Image source={LineDivider_Red} style={{ width: 360, height: 2, position: 'absolute', top: 60 }} />

      {/* Bus info section */}
      <View style={styles.infoContainer}>
        {BusNumFirst !== "0" ? (
          <View style={styles.infoBox}>
            <View style={styles.leftAlign}>
              <Text style={styles.busNum}>{BusNumFirst}호차</Text>
            </View>
            <View style={styles.centerAlign}>
              <Text style={styles.arrival}>{ArrivalMinuteFirst}분 후 도착</Text>
            </View>
            <View style={styles.rightAlign}>
              {delayMinuteFirst > 0 && <Text style={styles.delay}>[{delayMinuteFirst}분 지연]</Text>}
            </View>
          </View>
        ) : (
          <View style={styles.infoBox}>
            <View style={styles.centerAlign}>
              <Text style={styles.arrival}>운행 정보 없음</Text>
            </View>
          </View>
        )}

        {BusNumSecond !== "0" ? (
          <View style={styles.infoBox}>
            <View style={styles.leftAlign}>
              <Text style={styles.busNum}>{BusNumSecond}호차</Text>
            </View>
            <View style={styles.centerAlign}>
              <Text style={styles.arrival}>{ArrivalMinuteSecond}분 후 도착</Text>
            </View>
            <View style={styles.rightAlign}>
              {delayMinuteSecond > 0 && <Text style={styles.delay}>[{delayMinuteSecond}분 지연]</Text>}
            </View>
          </View>
        ) : (
          <View style={styles.spacer3} />
        )}

        {BusNumThird !== "0" ? (
          <View style={styles.infoBox}>
            <View style={styles.leftAlign}>
              <Text style={styles.busNum}>{BusNumThird}호차</Text>
            </View>
            <View style={styles.centerAlign}>
              <Text style={styles.arrival}>{ArrivalMinuteThird}분 후 도착</Text>
            </View>
            <View style={styles.rightAlign}>
              {delayMinuteThird > 0 && <Text style={styles.delay}>[{delayMinuteThird}분 지연]</Text>}
            </View>
          </View>
        ) : (
          <View style={styles.spacer3} />
        )}
      </View>

      <View style={styles.spacer} />
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />
      
      {/* Bus line view */}
      <View style={styles.busLineContainer}>
        <Image source={busLineImage} style={styles.busLineImage} />
        <View style={styles.stationTextContainer}>
          <Text style={styles.departureText}>출발지</Text>
          {/* 추가된 부분: 동대구역 텍스트 */}
          {stationName === '신천역' && (
            <Text style={[styles.departureText, { marginTop: 20 }]}>동대구역</Text> // marginTop 추가
          )}
          {/* 추가된 부분: 동대구역 텍스트 */}
          {stationName === '대구은행역' && (
            <Text style={[styles.departureText, { marginTop: 20 }]}>만촌역</Text> // marginTop 추가
          )}
          
          <View style={styles.textBorder}>
            <Text style={styles.stationLineText}>{stationName}</Text>
          </View>
          {/* 추가된 부분: 신천역 텍스트 */}
          {stationName === '동대구역' && (
            <Text style={[styles.departureText, { marginBottom: 40 } ]}>신천역</Text> // marginTop 추가
          )}

          {/* 추가된 부분: 동대구역 텍스트 */}
          {stationName === '만촌역' && (
            <Text style={[styles.departureText, { marginBottom: 40 }]}>대구은행역</Text> // marginTop 추가
          )}

          <View style={styles.destinationContainer}>
            <Text style={styles.destinationText}>경북대학교</Text>
            <Image source={KNU_logoFlower} style={styles.logoFlower} />
          </View>
        </View>
      </View>
      
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />
      <View style={styles.spacer} />
      {/* Station name and icon section */}
      <View style={styles.stationContainer}>
        <View style={styles.stationNameContainer}>
        <Text style={styles.stationNameText}>{stationName}</Text>
        <TouchableOpacity onPress={handleMapIconPress} style={styles.iconButton}>
          <Image source={MapMaker_Icon} style={styles.icon} />
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAlarmIconPress}>
          <Image source={BusAlarmIcon} style={styles.Alarmicon}/>
      </TouchableOpacity>
      </View>
      <View style={styles.spacer} />
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
  busLineContainer: {
    flexDirection: 'row',
    width: 360,
    height: 400,
  },
  busLineImage: {
    width: 50,
    height: '93%', // Height should be 100% of the container
    resizeMode: 'contain', // Keep aspect ratio
  },
  stationTextContainer: {
    flex: 1, // 가용 공간을 모두 사용
    justifyContent: 'space-between', // 요소들 간격을 조절
    alignItems: 'flex-start', // 왼쪽 정렬
    width: 300,
    paddingVertical: 10, // 상하 여백 추가
    paddingLeft: 15,
    height: '93%', // 전체 높이 사용
  },
  stationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
  stationNameContainer: {
    flexDirection: 'row',
    marginLeft: 100,
    marginBottom: 10
  },
  stationNameText: {
    fontSize: 32,
    color: '#DA2127',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stationLineText: {
    fontSize: 40,
    color: '#DA2127',
    fontWeight: '600',
    marginLeft: -50,
    marginBottom: 0,
  },
  iconButton: {
    marginLeft: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 10
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  spacer: {
    height: 10,
  },
  spacer2: {
    height: 20,
  },
  spacer3: {
    height: 70,
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
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    width: 340,
    height: 70,
  },
  leftAlign: {
    flex: 0.9,
    alignItems: 'flex-start',
  },
  centerAlign: {
    flex: 1,
    alignItems: 'center',
  },
  rightAlign: {
    flex: 1,
    alignItems: 'flex-end',
  },
  busNum: {
    color: '#DA2127',
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 10,
  },
  arrival: {
    color: '#000',
    fontSize: 20,
  },
  delay: {
    color: '#FF0000',
    fontSize: 18,
    paddingRight: 5,
  },
  textBorder: {
    borderWidth: 2,
    borderColor: '#DA2127',
    borderRadius: 10,
    width: 380,
    height: 90, // 높이를 늘립니다
    marginLeft: -75,
    marginBottom: 30,
    justifyContent: 'center', // 수직 가운데 정렬
    alignItems: 'center',// 수평 가운데 정렬
    display: 'flex',
  },
  departureText: {
    fontSize: 32,
    color: '#DA2127',
    fontWeight: '500',
    marginBottom: 30, // "출발지" 아래 여백 추가
    textAlign: 'left', // 왼쪽 정렬
  },
  destinationText: {
    fontFamily: "KNU_TRUTH",
    fontSize: 32,
    color: '#DA2127',
    fontWeight: '600',
    marginTop: 5, // "경북대학교" 위 여백 추가
    textAlign: 'left', // 왼쪽 정렬
    marginLeft: -5,
  },  
  destinationContainer: {
    flexDirection: 'row', // 수평 정렬
    alignItems: 'center', // 수직 가운데 정렬
    marginTop: 0, // 텍스트 위 여백
  },
  logoFlower: {
    width: 40, // 이미지 너비 조정
    height: 40, // 이미지 높이 조정
    marginLeft: 5, // 텍스트와의 간격
    marginTop: 6,
    alignSelf: 'center', // 중앙 정렬
  },
  Alarmicon: {
    width: 50,
    height: 50,
  }
});

export default BusArrivalInfo;
