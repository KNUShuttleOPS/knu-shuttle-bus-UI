import {DIRECTION5_CLIENT_ID, DIRECTION5_CLIENT_SECRET} from '../../naver_direction5_credentials';

export const fetchDirections = async (start, goal) => {
    const clientId = DIRECTION5_CLIENT_ID;
    const clientSecret = DIRECTION5_CLIENT_SECRET;
    const url = `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${start}&goal=${goal}&option=traavoidtoll`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': clientId,
          'X-NCP-APIGW-API-KEY': clientSecret
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const summary = data.route.traavoidtoll[0].summary;
      console.log('Directions data:', summary.duration);
      
      return summary.duration/1000;
  
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
};