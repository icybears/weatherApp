import React, { Component } from 'react';
import api from '../utils/api';

const MainView = (props) => {
    return(
        <div className="main-view">
            <h2>{props.city},&nbsp;{props.country_name}</h2>
            <div className="row space">
                <div>{props.full_date}</div>
                <div>{props.hour} UTC</div>
                <div>{props.desc}</div>
            </div>
            <img className='icon' src={props.icon} alt={`Icon for ${props.desc}`}/>
            <hr />
            <div className="row space">
                <h3>Temperature</h3>
                <div>Min: {props.temp_min}&nbsp;<span>°C</span></div>
                <div>Max: {props.temp_max}&nbsp;<span>°C</span></div>
                <div className="temp">{props.temp}&nbsp;<span>°C</span></div>
            </div>
            <hr />
            <div className="row space">
                <div>
                    <h3>Wind</h3>
                    <div><span>Speed:</span> {props.wind_speed}&nbsp;m/s</div>
                    <div><span>Direction:</span> {props.wind_direction}&nbsp;deg</div>
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
class DayView extends Component{
    constructor(props){
        super(props);
    }
    handleClick = () => {
        this.props.changeDay(this.props.day);
    }
    render(){
        const {
                day, 
                short_desc,
                temp,
                icon,
                selectedDay
            } = this.props;
        const styleClass = (selectedDay === day)? "day-view selected": "day-view";
    return (
        <div onClick={this.handleClick} className={styleClass}>
            <h4>{day} </h4>
            <div>{short_desc}</div>
            <div className="temp">
                {temp}&nbsp;<span>°C</span>
            </div>
            <img src={icon} alt={`Icon for ${short_desc}`}/>
        </div>
    );
    }
};

class HourView extends Component{
    constructor(props){
        super(props);
    }
    handleClick = () => {
        this.props.changeHour(this.props.hour);
    }
    render(){
        const {
            hour,
            temp,
            desc,
            icon,
            selectedHour
        } = this.props;
        
        const styleClass = (selectedHour === hour)? 'row selected': 'row';

        return(
            <div onClick={this.handleClick} className="row">
                <h3>{hour} UTC</h3>
                <div className="temp">{temp}&nbsp;<span>°C</span></div>
                <div>{desc}</div>
                <img src={icon} alt={`Icon for ${desc}`}/>
            </div>
        );
    }
} 

class Weather extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetching: null,
            data: null,
            error: null,
            selectedDay: null,
            selectedHour: null,
        }
    }
    componentDidMount = () => {
        const {lat, lon} = this.props;
        api.getForecast(lat, lon)
            .then(data => {
                this.setState({
                    data: data,
                    selectedDay: data[0].day,
                    selectedHour: data[0].hour
                })
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            })
    }
    changeDay = (day) => {
        this.setState({
            selectedDay: day
        })
    }
    changeHour = (hour) => {
        this.setState({
            selectedHour: hour
        })
    }
    render() {
        const selectedDay = this.state.selectedDay;
        const selectedHour = this.state.selectedHour;
    
        return (
            <div>
                 <div className="main-section">
                    {
                        this.state.data && this.state.data
                                            .filter(obj => (obj.day === selectedDay && obj.hour === selectedHour))
                                            .map(obj => (<MainView 
                                                    key={obj.full_date}
                                                    city={this.props.city}
                                                    country_name={this.props.country_name}
                                                    {...obj} />)
                                            )
                    }
                    <div className="hours-section">
                    {
                        this.state.data && 
                        this.state.data.filter((item) => {
                            return (item.day === this.state.selectedDay)
                        }).map( (hourObj, index) => {
                            return (
                                <HourView changeHour={this.changeHour}
                                          key={index}
                                          {...hourObj}
                                          selectedHour={selectedHour} 
                                          />
                            )
                        })
                    }
                 </div>
                </div>
                 <div className="days-section">
                      {
                        this.state.data && 
                        this.state.data.filter((item) => {
                                // this one is to be changed later
                                // needs to check selectedHour!!
                            return(item.hour === this.state.data[0].hour) 
                            })
                                    .map((dayObj, index) => {

                                           return(
                                            <DayView changeDay={this.changeDay}
                                                    key={index} 
                                                    {...dayObj}
                                                    selectedDay={selectedDay} 
                                                    />
                                           )
                                        })
                    }  
                 </div>
                
            </div>
        );
    }
}

export default Weather;
