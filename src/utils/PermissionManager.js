import * as Location from 'expo-location';

const requestPermissions = async () => {
    let { locationstatus } = await Location.requestForegroundPermissionsAsync();
    if (locationstatus !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

    let { taskstatus } = await Location.requestForegroundPermissionsAsync();
    if (taskstatus !== 'granted') {
        Alert.alert('위치 권한 거부', '앱에서 위치 접근 권한이 필요합니다.');
        return;
    }

    if (Platform.OS === 'ios') {
        const { granted } = await Location.requestBackgroundPermissionsAsync();
        if (!granted) {
            Alert.alert('백그라운드 위치 권한 거부', '백그라운드 위치 추적을 위해 권한이 필요합니다.');
            return;
        }
    }
}