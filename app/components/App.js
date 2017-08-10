import React, { Component } from 'react';
import api from '../utils/api';
import Weather from './Weather';
import {Route, Link} from 'react-router-dom';

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
            fetching:null
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
                    fetching: false
                })
            })
        )
    }
    render() {
        const {city, country_name, lat, lon} = this.state;
        return (
            <div>
                <Route path='/' component={Landing} />
                <h1>Weather App</h1>
                <Link to="/weather">
                    <button onClick={this.checkUserWeather}>Check Weather in your own area</button>
                </Link>
                {
                    this.state.fetching && <div>Fetching data</div>
                }
                {
                    this.state.fetching===false &&
                    <Route path='/weather' render={() => (
                            <Weather 
                            city={city} 
                            country_name={country_name} 
                            lat={lat}
                            lon={lon}
                            />
                    )} />

                }
            </div>
        );
    }
}

export default App;