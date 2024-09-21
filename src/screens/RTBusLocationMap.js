import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFonts } from "expo-font";

const RTBusLocationMap = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        KNU_TRUTH: require("../assets/font/KNU TRUTH.ttf"),
    });
    
    const region = {
        latitude: 35.866258,
        longitude: 128.594013,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={region}
          >
            <Marker
              coordinate={{ latitude: 35.866258, longitude: 128.594013 }} // 버스 위치 예시 좌표
              title="수성역"
              description="수성구역 근처"
            >
              <View style={styles.markerContainer}>
                <Icon name="bus" size={30} color="blue" />
              </View>
            </Marker>
          </MapView>
    
          <View style={styles.stationCard}>
            <Text style={styles.stationText}>만촌역</Text>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="star" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default RTBusLocationMap;