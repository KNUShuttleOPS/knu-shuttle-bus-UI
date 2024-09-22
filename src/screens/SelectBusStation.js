import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 
import KNU_logoEng from '../assets/img/KNU_logoEng_Red.png';
import KNU_emblem_Red from '../assets/img/KNU_emblem_Red.png';
import LineDivider_Red from '../assets/img/LineDivider_Red.png';
import ComplaintsReport_Icon from '../assets/img/ComplaintsReport_Icon.png';
import StarChecked_Icon from '../assets/img/StarChecked_Icon.png';
import StarUnchecked_Icon from '../assets/img/StarUnchecked_Icon.png';
import TimeTable_Icon from '../assets/img/TimeTable_Icon.png';

const SelectBusStation = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    KNU_TRUTH: require("../assets/font/KNU TRUTH.ttf"),
  });

  const [favoriteStation, setFavoriteStation] = useState(null);

  if (!fontsLoaded) return null;

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

  if (!fontsLoaded) return null;

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

  const renderStationButton = (stationName) => {
    return (
      <View style={styles.stationContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BusArrivalInfo', { stationName })} // 여기서 stationName 전달
        >
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

      {renderStationButton('동대구역')}
      {renderStationButton('신천역')}
      {renderStationButton('만촌역')}
      {renderStationButton('대구은행역')}
      {renderStationButton('북구청역')}

      <View style={styles.spacer2} />
      <Image source={LineDivider_Red} style={{ width: 360, height: 2 }} />
      <View style={styles.spacer2} />
      <Image source={KNU_logoEng} style={{ width: 242, height: 70 }} />
      <View style={styles.spacer2} />

      <TouchableOpacity style={styles.complaintsIconButton} onPress={() => alert('불편사항 접수!')}>
        <Image source={ComplaintsReport_Icon} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.timeTableIconButton}  onPress={() => navigation.navigate('BusSchedule')}>
        <Image source={TimeTable_Icon} style={styles.icon} />
      </TouchableOpacity>

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
  stationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom:  24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DA2127',
    width: 340,
    alignItems: 'flex-start',
    zIndex: 1,
    marginTop: 10,
  },
  buttonText: {
    color: '#DA2127',
    fontSize: 25,
    fontWeight: '500',
    marginHorizontal: 15,
  },
  favoriteButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    paddingRight: 10,
    zIndex: 2,
  },
  favoriteIcon: {
    width: 40,
    height: 40,
  },
  complaintsIconButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTableIconButton: {
    position: 'absolute',
    bottom: 20,
    right: 90,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  spacer2: {
    height: 20,
  },
});

export default SelectBusStation;
