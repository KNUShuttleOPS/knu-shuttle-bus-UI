import * as TaskManager from 'expo-task-manager';
import { LOCATION_TASK_NAME } from '../constants/TaskConstants'

const initializeTask = () => {
    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        if (error) {
        console.error('백그라운드 위치 작업 오류:', error);
        return;
        }
        if (data) {
            const { locations } = data;
            console.log('새 위치 데이터 수신:', locations);
            await sendLocationInfo(mqttClient, locations[0]);
        }
    });
};