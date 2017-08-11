import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';
import Weather from './Weather';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            ip: null,
            country_name: null,
            city: null,
            lat: null,
            lon: null,
            fetching:null,
            citySearch: null,
            searchTerm: '',
            error:null,
            errorMsg:null
        }
    }
    
    checkUserWeather = () => {
        this.setState({
            fetching: true
        },() => {
        api.fetchUserInfo()
            .then(data => {
                this.setState({
                    ip: data.ip,
                    country_name: data.country_name,
                    city: data.city,
                    lat: data.latitude,
                    lon: data.longitude,
                    fetching: null,
                    citySearch: false,
                    
                })
            })
            .catch(error => {
                this.setState({
                    error:true,
                    errorMsg:'We were unable to fetch the data, please try again later!'
                })
            })
        }
        )
    }
    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    submitCitySearch = (e) => {
        const city = this.state.searchTerm;
        e.preventDefault();
       this.setState({
           fetching: true,
           city: city[0].toUpperCase() + city.substr(1)
       }, () => {
            api.getCountry(city)
            .then(data => {
                this.setState({
                    country_name: data.country_name,
                    city: data.city_name,
                    fetching: false,
                    error: false,
                    errorMsg:''
                },
                () => {
                    window.scrollTo(0, document.body.scrollHeight);
                }
            )

            })
            .catch( error => {
                this.setState({
                    error: true,
                    errorMsg:"Sorry, we couldn't find a match for the city name you entered.",
                    fetching: null,
                    searchTerm:''
                })
            })

       });
        
    }
    handleError = (error) => {
        this.setState({
            error: true,
            errorMsg: error,
            fetching: null
        })
    }
    checkCityWeather= () => {
        this.setState({
            citySearch:true,
        })
    }
    resetAll = () => {
        this.setState({
            ip: null,
            fetching:null,
            citySearch: null,
            searchTerm: '',
            error:null,
            errorMsg:null
        })
    }
    render() {
        const {city, country_name, lat, lon, error} = this.state;
        /*const btnsPositionClass= (this.state.fetching === null) ? 'middle btns':'top btns';*/
        const btnsPositionClass= 'middle btns';

        
        return (
            <div>
                <h1>Weather App</h1>
                <div className={btnsPositionClass}>
                    <div>
                        <button onClick={this.checkUserWeather}>View weather in your area</button>
                    </div>
                      
                    <div>
                    { !this.state.citySearch ?
                        <button onClick={this.checkCityWeather}>Search other cities</button>
                        :
                        (<form className="form" onSubmit={this.submitCitySearch}>
                            <input type="text" placeholder="Enter city name" 
                                            value={this.state.searchTerm} 
                                            onChange={this.handleChange} 
                                            />
                        </form>
                        )
                    }
                    </div>
                </div>
                {
                    this.state.fetching && <div className="fetching">Fetching data</div>
                }
                {
                    this.state.city &&
                            <Weather
                            city={city} 
                            country_name={country_name}
                            handleError={this.handleError}
                            error={error}
                            />
                 }
            </div>
        );
    }
}

export default App;