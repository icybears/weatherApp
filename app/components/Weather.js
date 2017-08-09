import React, { Component } from 'react';
import api from '../utils/api';

const MainView = (props) => {
    return(
        <div>
            
        </div>
    )
}
const DayView = (props) => {
    return (
        <div className="day-view">
            <div>{props.day} </div>
            <div>{props.hour}</div>
            <div>{props.short_desc}</div>
            <div className="temp">
                {props.temp}&nbsp;<span>°C</span>
            </div>
            <img src={`https://openweathermap.org/img/w/${props.icon}.png`} alt={`Icon for ${props.short_desc}`}/>
        </div>
    );
};

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
                })
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
                                           return(
                                            <DayView key={index} {...day} />
                                           )
                                        })
                    }  
                 </div>
            </div>
        );
    }
}

export default Weather;
