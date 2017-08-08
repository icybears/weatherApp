import React, { Component } from 'react';
import api from '../utils/api';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            ip: null,
            country_name: null,
            country_code: null,
            city: null,
            latitude: null,
            longitude: null,
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
                    latitude: data.latitude,
                    longitude: data.longitude,
                    fetching: false
                })
            })
        )
    }
    render() {
        return (
            <div>
                <h1>Weather App</h1>
                <button onClick={this.checkUserWeather}>Check Weather in your own area</button>
                {
                    this.state.fetching && <div>Fetching data</div>
                }
                {
                    this.state.fetching===false && <div>IP: {this.state.ip}</div>
                }
            </div>
        );
    }
}

export default App;