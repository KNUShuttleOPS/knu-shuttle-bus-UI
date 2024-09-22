import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";
import { MQTT_BROKER_DOMAIN, MQTT_BROKER_PORT } from '../constants/MQTT_Broker_Server_Constants';
import { loadUUID } from '../utils/UUIDManager';
import { fetchDirections } from '../services/Direction5_DurationCheck';
import { Client, Message } from 'paho-mqtt';
import * as Location from 'expo-location';
import KNU_logoEng from '../assets/img/KNU_logoEng_Red.png';
//import KNU_emblem_Red from '../assets/img/KNU_emblem_Red.png';
import KNU_emblem_Gray from '../assets/img/KNU_emblem_Gray.png';
import Bus_Icon from '../assets/img/bus_icon.png';
import LineDivider_Red from '../assets/img/LineDivider_Red.png';

 
const StartDriveBus = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../assets/font/KNU TRUTH.ttf"),
  });
  const [isDriving, setIsDriving] = useState(false); // 운행 상태 관리
  const [mqttClient, setMqttClient] = useState(null);
  if (!fontsLoaded) return null;
  
  const startOrStopDriving = async () => {
    if (!isDriving) {
      try {
        // MQTT 클라이언트 생성
        const clientId = await loadUUID();
        const client = new Client(MQTT_BROKER_DOMAIN, MQTT_BROKER_PORT, clientId);
  
        client.connect({
          onSuccess() {
            console.log('Connected to MQTT broker with client ID:', clientId);
            client.subscribe(route.params.line + 'line_' + route.params.busNumber + '/location');
  
            // 위치 추적 시작 (MQTT 연결이 완료된 후)
            startLocationTracking(client);
          },
          onFailure(err) {
            console.log('Failed to connect:', err);
          },
        });
  
        // MQTT 클라이언트를 상태로 저장
        setMqttClient(client);
  
        // 운전 상태를 true로 설정 (클라이언트 연결 완료 후)
        setIsDriving(true);
  
      } catch (error) {
        console.error('Failed to initialize MQTT client or start tracking:', error);
      }
    } else {
      try {
        if (mqttClient) {
          mqttClient.disconnect(); // MQTT 연결 해제
          setMqttClient(null); // 클라이언트 초기화
        }
  
        // 운전 상태를 false로 설정
        setIsDriving(false);
        navigation.navigate('Home'); // 홈 화면으로 이동
  
      } catch (error) {
        console.error('Error stopping driving or disconnecting MQTT:', error);
      }
    }
  };
  
  // 위치 추적을 별도의 함수로 분리하여 MQTT 연결 후 호출
  const startLocationTracking = async (client) => {
    // 위치 권한 요청
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('위치 권한이 거부되었습니다.');
      return;
    }
  
    // 위치 추적 시작
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 50,
      },
      async (location) => {
        console.log('현재 위치:', location);
  
        // 연결 확인 후 메시지 전송
        if (client && client.isConnected()) {
          const payload = {
            time: new Date().toISOString(),
            lat: location.coords.latitude,
            lng: location.coords.longitude,
            duration: await fetchDirections('128.62772, 35.87689', '128.63035, 35.86663'),
          };
          const mqttMessage = new Message(JSON.stringify(payload));
          const clientId = await loadUUID();
          mqttMessage.destinationName = clientId + '/location';
          client.send(mqttMessage);
  
          console.log('Location Message Sent');
        } else {
          console.log('Client is not connected');
        }
      }
    );
  };
  
  // route.params에서 전달된 호선과 호차 정보 추출
 const { line, busNumber } = route.params || { line: '정보 없음', busNumber: '정보 없음' };


  const accidentOccurred = () => {
    alert('사고 발생!');
  };

 

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
      <Image source={LineDivider_Red} style={{ width: 360, height: 2, marginTop: 10 }} />

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
    paddingVertical: 25,
    paddingHorizontal: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#797977',
    marginTop: 20,
  },
  buttonText: {
    color: '#797977',
    fontSize: 32,
    fontWeight: '500',
  },
  button2: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 25,
    paddingHorizontal: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#bf7c26',
    marginTop: 40,
  },
  buttonText2: {
    color: '#bf7c26',
    fontSize: 32,
    fontWeight: '500',
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
