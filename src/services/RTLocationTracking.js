import * as Location from 'expo-location';

export const startLocationTracking = async () => {
    // 위치 권한 요청
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('위치 권한이 거부되었습니다.');
      return;
    }

    // 백그라운드 위치 권한 요청 (iOS 전용)
    if (Platform.OS === 'ios') {
      const { granted } = await Location.requestBackgroundPermissionsAsync();
      if (!granted) {
        console.error('백그라운드 위치 권한이 거부되었습니다.');
        return;
      }
    }

    // 백그라운드 위치 추적 시작
    await Location.startLocationUpdatesAsync('background-location-task', {
      accuracy: Location.Accuracy.High,
      timeInterval: 10000, // 10초마다 위치 업데이트
      distanceInterval: 50, // 50미터 이동 시 위치 업데이트
      showsBackgroundLocationIndicator: true, // iOS에서 백그라운드 위치 추적 표시
    });
  };


  const stopLocationTracking = async () => {
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      setIsTracking(false);
    } catch (error) {
      console.error('위치 추적 중지 오류:', error);
    }
  };
