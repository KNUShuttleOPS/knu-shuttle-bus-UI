import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 
import BusStopMarker from '../assets/img/busStop_marker.png';
import StarChecked_Icon from '../assets/img/StarChecked_Icon.png';
import StarUnchecked_Icon from '../assets/img/StarUnchecked_Icon.png';
import LineDivider_Red from '../assets/img/LineDivider_Red.png';

const RTBusLocationMap = ({ route }) => {
    const { stationName } = route.params;

    const region = {
        latitude: 35.866258,
        longitude: 128.594013,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const [favoriteStation, setFavoriteStation] = useState(null);
    
    useFocusEffect(
      React.useCallback(() => {
        const loadFavoriteStation = async () => {
          const storedStation = await AsyncStorage.getItem('favoriteStation');
          if (storedStation) {
            setFavoriteStation(storedStation);
          }
        };
        loadFavoriteStation();
      }, [])
    );

    const handleFavorite = async (stationName) => {
        if (favoriteStation === stationName) {
            setFavoriteStation(null);
            await AsyncStorage.removeItem('favoriteStation'); // 즐겨찾기 해제
            Alert.alert('즐겨찾기가 해제되었습니다!');
        } else {
            setFavoriteStation(stationName);
            await AsyncStorage.setItem('favoriteStation', stationName); // 즐겨찾기 저장
            Alert.alert('즐겨찾기가 지정되었습니다!');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={LineDivider_Red} style={styles.lineDivider} />
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.mapview}
                    initialRegion={region}
                    showsUserLocation={true} // 사용자 위치 표시
                >
                    <Marker
                        coordinate={{ latitude: 35.866258, longitude: 128.594013 }} // 버스 위치 예시 좌표
                        title="수성역"
                        description="수성구역 근처"
                        icon={BusStopMarker}
                    />
                </MapView>
            </View>
            <Image source={LineDivider_Red} style={styles.lineDivider} />

            <View style={styles.stationContainer}>
                <Text style={styles.buttonText}>{stationName}</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#FFFFFF',
      paddingTop: 45,
    },
    mapContainer: {
      width: '90%',
      height: '75%',
      borderRadius: 20,
      overflow: 'hidden', // 둥글게 처리하기 위해 overflow 숨김
      marginVertical: 30,
    },
    mapview: {
      width: '100%',
      height: '100%',
    },
    lineDivider: {
      width: 360,
      height: 2,
    },
    stationContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#DA2127',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
        margin: 20,
        width: '90%',
    },
    buttonText: {
        color: '#DA2127',
        fontSize: 25,
        fontWeight: '500',
        marginHorizontal: 15,
    },
    favoriteButton: {
        paddingRight: 10,
        paddingTop: 5,
        zIndex: 2,
    },
    favoriteIcon: {
        width: 40,
        height: 40,
    },
});

export default RTBusLocationMap;
