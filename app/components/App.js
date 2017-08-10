import React, { Component } from 'react';
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
                    fetching: false,
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
                    fetching: false
                })
            })
            .catch( error => {
                this.setState({
                    error: true,
                    errorMsg:"Sorry, the city you entered doesn/'t seem to exist - please check the spelling."
                })
            })

       });
        
    }
    checkCityWeather= () => {
        this.setState({
            citySearch:true,
        })
    }
    resetAll = () => {
        this.setState({
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
        })
    }
    render() {
        const {city, country_name, lat, lon} = this.state;
        const btnsPositionClass= (this.state.fetching === false) ? 'top btns' : 'middle btns';
        return (
            <div>
                <h1>Weather App</h1>
                <div className={btnsPositionClass}>
                    <div>
                        <button onClick={this.checkUserWeather}>View weather in your city</button>
                    </div>
                        {/* <span className="separator">OR</span> */}
                    <div>
                    { !this.state.citySearch ?
                        <button onClick={this.checkCityWeather}>Search other cities</button>
                        :
                        (<form onSubmit={this.submitCitySearch}>
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
                    this.state.fetching && <div>Fetching data</div>
                }
                {
                    this.state.fetching===false &&
                            <Weather 
                            city={city} 
                            country_name={country_name}
                            />
                 }
            </div>
        );
    }
}

export default App;