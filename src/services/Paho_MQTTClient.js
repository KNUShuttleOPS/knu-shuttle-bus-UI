import Paho from 'paho-mqtt';
import {MQTT_BROKER_DOMAIN, MQTT_BROKER_PORT} from '../constants/MQTT_Broker_Server_Constants';
import { loadUUID } from '../utils/UUIDManager';

export const createMqttClient = async () => {
    try {
        const clientId = await loadUUID();
        const mqttClient = new Paho.Client(MQTT_BROKER_DOMAIN, MQTT_BROKER_PORT, clientId);
        mqttClient.connect({
            onSuccess() {
                console.log('Connected to MQTT broker with client ID:', clientId);
                mqttClient.subscribe( clientId +'/location');
            },
                onFailure(err) {
                console.log('Failed to connect:', err);
            }
        });
        return mqttClient;
    } catch(error) {
        console.error('Failed to initialize MQTT client:', error);
    }
}
