import React, { Component } from 'react';
import api from '../utils/api';
import DaysView from './DaysView'

class Weather extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetching: null,
            data: null,
            error: null,
        }
    }
    componentDidMount = () => {
        const {lat, lon} = this.props;
        api.getForecast(lat, lon)
            .then(data => {
                this.setState({
                    data: data
                },() => {console.log(data)})
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            })
    }
    render() {
        return (
            <div>
                 <h1>{this.props.city} - {this.props.country_name}</h1>
                 <div>
                      {
                        this.state.data && 
                        this.state.data.filter((item) => item.hour === this.state.data[0].hour)
                                        .map((day, index) => {
                                            console.log(day);
                                           return(
                                            <DaysView key={index} {...day} />
                                           )
                                        })
                    }  
                 </div>
            </div>
        );
    }
}

export default Weather;
