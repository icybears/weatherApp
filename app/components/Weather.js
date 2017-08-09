import React, { Component } from 'react';
import api from '../utils/api';

const MainView = (props) => {
    return(
        <div className="main-view">
            <h2>{props.city},&nbsp;{props.country_name}</h2>
            <div>{props.day}</div>
            <div>{props.hour}</div>
            <div>{props.desc}</div>
            <img src={props.icon} alt={`Icon for ${props.desc}`}/>
            <div>
                <h3>Temperature</h3>
                <div className="temp">{props.temp}&nbsp;<span>°C</span></div>
                <div>Min: {props.temp_min}&nbsp;<span>°C</span></div>
                <div>Max: {props.temp_max}&nbsp;<span>°C</span></div>
            </div>
            <div className="row">
                <div>
                    <h3>Wind</h3>
                    <div>Speed: {props.wind_speed} m/s</div>
                    <div>Direction: {props.wind_direction} deg</div>
                </div>
                <div>
                    <h3>Pressure</h3>
                    <div>{props.pressure} hPa</div>
                    
                </div>
                <div>
                    <h3>Humidity</h3>
                    <div>{props.humidity} %</div>
                </div>
            </div>
        </div>
    )
}
const DayView = (props) => {
    return (
        <div className="day-view">
            <h4>{props.day} </h4>
            <div>{props.short_desc}</div>
            <div className="temp">
                {props.temp}&nbsp;<span>°C</span>
            </div>
            <img src={props.icon} alt={`Icon for ${props.short_desc}`}/>
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
                 <div className="main-section">
                    {
                       this.state.data && <MainView city={this.props.city}
                                                    country_name={this.props.country_name}
                                                    {...this.state.data[0]} />
                    }
                </div>
                 <div className="days-section">
                      {
                        this.state.data && 
                        this.state.data.filter((item) => {
                                            
                                                    return(item.hour === this.state.data[0].hour
                         ) })
                                        .map((day, index) => {
                                            console.log(this.state.data);
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
