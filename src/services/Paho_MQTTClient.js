import { Client, Message } from 'paho-mqtt';
import { MQTT_BROKER_DOMAIN, MQTT_BROKER_PORT } from '../constants/MQTT_Broker_Server_Constants';
import * as Location from 'expo-location';
import { loadUUID } from '../utils/UUIDManager';
import { fetchDirections } from './Direction5_DurationCheck';
import 'dotenv/config';

export const createMqttClient = async () => {
    try {
        const clientId = await loadUUID();
        const mqttClient = new Client(MQTT_BROKER_DOMAIN, MQTT_BROKER_PORT, clientId);
        mqttClient.connect({
            onSuccess() {
                console.log('Connected to MQTT broker with client ID:', clientId);
                mqttClient.subscribe(clientId +'/location');
            },
                onFailure(err) {
                console.log('Failed to connect:', err);
            }
        });
        return mqttClient;
    } catch(error) {
        console.error('Failed to initialize MQTT client:', error);
    }
};

export const sendLocationInfo = async (mqttClient) => {
    if(mqttClient.isConnected()){
        let currentLocation = await Location.getCurrentPositionAsync({});
        
        const payload = {
            time : new Date().toISOString(),
            lat : currentLocation.coords.latitude,
            lng : currentLocation.coords.latitude,
            duration : await fetchDirections()
        }
        const mqttMessage = new Message(JSON.stringify(payload));
        const clientId = await loadUUID('128.62772, 35.87689', '128.63035, 35.86663');
        mqttMessage.destinationName = clientId +'/location';
        mqttClient.send(mqttMessage);

        console.log('Location Message Sent');
    } else {
        console.log('Client is not connected');
    }
};