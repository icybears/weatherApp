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
const getFullDate = dateString => {
    let d = new Date(dateString);
    return d.toDateString();
}
const addCap = str => {
   
    return str[0].toUpperCase() + str.substr(1);
}
const api = {
    fetchUserInfo: () => (
            axios.get('https://freegeoip.net/json/')
                .then(response => response.data)
        ),
    getForecast: (city) => (
         axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${key}&units=metric`)
            .then(response => {
                const data = response.data.list;
                const formatedData = data.map(item => {
                    
                return(
                        {
                            day: getDay(item.dt_txt),
                            hour: getHour(item.dt_txt),
                            full_date: getFullDate(item.dt_txt),
                            temp: Math.round(item.main.temp),
                            temp_min: Math.round(item.main.temp_min),
                            temp_max: Math.round(item.main.temp_max),
                            humidity: item.main.humidity,
                            wind_speed:item.wind.speed,
                            wind_direction: Math.round(item.wind.deg),
                            pressure: item.main.pressure,
                            short_desc: item.weather[0].main,
                            desc: addCap(item.weather[0].description),
                            icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`

                        }
                    )
                });
                // console.log(formatedData);            
               return formatedData;                
            })
    ),
}
export default api;