import React, { Component } from 'react';
import api from '../utils/api';

class Weather extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetching: null,
            data: null,
        }
    }
    componentDidMount = () => {
        const {lat, lon} = this.props;
        api.getForecast(lat, lon)
            .then(data => {
                
            })
    }
    render() {
        return (
            <div>
                 <h1>{this.props.city} - {this.props.country_name}</h1>
            </div>
        );
    }
}

export default Weather;
