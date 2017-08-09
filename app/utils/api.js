import axios from 'axios';

const key = 'e72e3f791776264276bc7510fa5f5216';
const getDay = dateString => {
  
    let d = new Date(dateString);
   
    const days = {
        '0': 'Sunday',
        '1': 'Monday',
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday'
    }
    return days[d.getUTCDay().toString()];
}
const getHour = dateString => {
    let d = new Date(dateString);
    let hour = d.getHours()<10 ? '0'+d.getHours().toString()+':00':d.getHours().toString()+':00';
    return hour;
}

const api = {
    fetchUserInfo: () => (
            axios.get('https://freegeoip.net/json/')
                .then(response => response.data)
        ),
    getForecast: (lat, lon) => (
         axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${key}&units=metric`)
            .then(response => {
                const data = response.data.list;
                const formatedData = data.map(item => {
                    
                return(
                        {
                            day: getDay(item.dt_txt),
                            hour: getHour(item.dt_txt),
                            temp: item.main.temp,
                            temp_min: item.main.temp_min,
                            temp_max: item.main.temp_max,
                            humidity: item.main.humidity,
                            short_desc: item.weather[0].main,
                            desc: item.weather[0].description,
                            icon: item.weather[0].main

                        }
                    )
                });
                // console.log(formatedData);            
               return formatedData;                
            })
    ),
}
export default api;