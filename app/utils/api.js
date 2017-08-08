import axios from 'axios';

const key = 'e72e3f791776264276bc7510fa5f5216';

const api = {
    fetchUserInfo: () => (
            axios.get('https://freegeoip.net/json/')
                .then(response => response.data)
        ),
    getCurrentWeather: (lat, lon) => {
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}`)
            .then(response => response.data)
    },
    getForecast: (lat, lon) => {
         axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${key}`)
            .then(response => response.data)
    }
}
export default api;