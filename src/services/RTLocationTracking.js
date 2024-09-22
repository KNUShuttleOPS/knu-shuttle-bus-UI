import * as Location from 'expo-location';
import {sendLocationInfo} from './Paho_MQTTClient';

export const startLocationTracking = async (client) => {
    // 위치 권한 요청
    if(!client){
      console.log("null error");
    }
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('위치 권한이 거부되었습니다.');
      return;
    }

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 50,
      },
      async (location) => {
        console.log('현재 위치:', location);
        await sendLocationInfo(client, location)
        .then(() => {
          console.log('위치 정보 전송 성공');
        })
        .catch(err => {
          console.error('위치 정보 전송 실패:', err);
        });
      }
    );
  };
