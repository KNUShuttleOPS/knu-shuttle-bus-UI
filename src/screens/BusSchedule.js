import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BusSchedule = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // 기본 헤더 숨기기
    });
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  // 더미 데이터 생성
  const schedules = Array.from({ length: 13 }, (_, index) => ({
    title: `${index + 1}회차`,
  }));

  // 시간 리스트
  const times = [
    '8:00', '8:05', '8:10', '8:20', '8:30', 
    '8:35', '8:40', '8:50', '9:00', '9:05', 
    '9:10', '9:30', '9:35'
  ];

  return (
    <View style={{ flex: 1 }}>      
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image 
            source={require('../assets/img/back_icon.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1호선 - 신천역</Text>
      </View>
      <View style={styles.redLine} />

      <ScrollView contentContainerStyle={styles.scheduleContainer}>
        {schedules.map((schedule, index) => (
          <View key={index} style={styles.scheduleBox}>
            <View style={styles.scheduleRow}>
              <Text style={styles.scheduleTitle}>{schedule.title}</Text>
              <Text style={styles.scheduleTime}>{times[index]}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButtonImage: {
    marginTop: 23,
    marginRight: 10, 
    marginLeft: -100,
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
    marginBottom: 15,
    justifyContent: 'center',
    marginLeft: 15,
  },
  scheduleContainer: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  scheduleBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#DA2127',
    borderWidth: 2,
    padding: 15,
    marginVertical: 5,
    width: '100%',
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 50
  },
  scheduleTitle: {
    fontSize: 20,
    color: '#DA2127',
    fontWeight: 'bold',
  },
  scheduleTime: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default BusSchedule;
