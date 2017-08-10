import React, { Component } from 'react';
import api from '../utils/api';
import Weather from './Weather';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            ip: null,
            country_name: null,
            country_code: null,
            city: null,
            region_name:null,
            lat: null,
            lon: null,
            fetching:null,
            citySearch: null,
        }
    }
    
    checkUserWeather = () => {
        this.setState({
            fetching: true
        },() => 
        api.fetchUserInfo()
            .then(data => {
                this.setState({
                    ip: data.ip,
                    country_name: data.country_name,
                    country_code: data.country_code,
                    city: data.city,
                    region_name: data.region_name,
                    lat: data.latitude,
                    lon: data.longitude,
                    fetching: false,
                    citySearch: false
                })
            })
        )
    }
    checkCityWeather= () => {
        this.setState({
            citySearch:true
        })
    }
    render() {
        const {city, country_name, lat, lon} = this.state;
        return (
            <div>
                <h1>Weather App</h1>
                    <button onClick={this.checkUserWeather}>Check Weather in your own city</button>
                    <h3>Or</h3>
                    { this.state.citySearch === null ?
                        <button onClick={this.checkCityWeather}>Search Weather of a specific city</button>
                        :
                        (<form>
                            <input type="text" placeholder="Enter city name" />
                        </form>
                        )
                    }
                {
                    this.state.fetching && <div>Fetching data</div>
                }
                {
                    this.state.fetching===false &&
                            <Weather 
                            city={city} 
                            country_name={country_name} 
                            lat={lat}
                            lon={lon}
                            />
                 

                }
            </div>
        );
    }
}

export default App;