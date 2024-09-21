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

  const schedules = {
    "1호선 - 신천역": {
      title: "1호선 - 신천역",
      times: [
        '8:00', '8:05', '8:10', '8:20', '8:30', 
        '8:35', '8:40', '8:50', '9:00', '9:05', 
        '9:10', '9:30', '9:35'
      ],
    },
    "2호선 - 대구은행역": {
      title: "2호선 - 대구은행역",
      times: [
        '8:15', '8:20', '8:30', '9:05', '9:10', 
        '9:20'
      ],
    },
    "3호선 - 북구청역": {
      title: "3호선 - 북구청역",
      times: [
        '8:20', '9:10'
      ],
    },
  };

  return (
    <View style={{ flex: 1 }}>      
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image 
            source={require('../assets/img/back_icon.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>통학버스 운행시간표</Text>
      </View>
      <View style={styles.redLine} />

      <ScrollView contentContainerStyle={styles.scheduleContainer}>
        {Object.entries(schedules).map(([line, { title, times }]) => (
          <View key={line} style={styles.lineContainer}>
            <Text style={styles.lineTitle}>{title}</Text>
            {times.map((time, index) => (
              <View key={index} style={styles.scheduleBox}>
                <View style={styles.scheduleRow}>
                  <Text style={styles.scheduleTitle}>{index + 1}회차</Text>
                  <Text style={styles.scheduleTime}>{time}</Text>
                </View>
              </View>
            ))}
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
    marginLeft: -70,
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
  lineContainer: {
    marginBottom: 20,
  },
  lineTitle: {
    fontSize: 24,
    color: '#DA2127',
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginHorizontal: 50,
  },
  scheduleTitle: {
    fontSize: 18,
    color: '#DA2127',
    fontWeight: 'bold',
  },
  scheduleTime: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default BusSchedule;
