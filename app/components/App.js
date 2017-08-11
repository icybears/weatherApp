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
            fetching:null,
            citySearch: null,
            searchTerm: '',
            error:null,
            errorMsg:null
        }
    }
    
    checkUserWeather = () => {
        this.setState({
            fetching: true,
            error: false,
            errorMsg: null,
            citySearch: false,
            searchTerm:'',
            error:null,
            errorMsg:null,
            country_name:null,


        },() => {
        api.fetchUserInfo()
            .then(data => {
                this.setState({
                    ip: data.ip,
                    country_name: data.country_name,
                    city: data.city,
                    fetching: null,
                    
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
        let city = this.state.searchTerm;
        e.preventDefault();
       this.setState({
           fetching: true,
       }, () => {
            api.getCountry(city)
            .then(data => {
                this.setState({
                    country_name: data.country_name,
                    city: data.city_name,
                    fetching: false,
                    error: false,
                    errorMsg:'',
                    searchTerm: '',
                },
                () => {
                    window.scrollTo(0, document.body.scrollHeight);
                }
            )

            })
            .catch( error => {
                console.warn(error);
                const msg = "Sorry, we couldn't find a match for the city name you entered.";
                this.handleError(msg);
            })

       });
        
    }
    handleError = (error) => {
        this.setState({
            error: true,
            errorMsg: error,
            fetching: null,
            ip: null,
            country_name: null,
            city: null,
            lat: null,
            lon: null,
            fetching:null,
            citySearch: null,
            searchTerm: '',
        })
    }
    checkCityWeather= () => {
        this.setState({
            citySearch:true,
        })
    }
    resetAll = () => {
        this.setState({
            fetching:null,
            citySearch: null,
            searchTerm: '',
            error:null,
            errorMsg:null
        })
    }
    render() {
        const {city, country_name, error} = this.state;
        /*const btnsPositionClass= (this.state.fetching === null) ? 'middle btns':'top btns';*/
        const btnsPositionClass= 'middle btns';

        
        return (
            <div>
               {
                   this.state.error && <div className="error-bar">{this.state.errorMsg}</div>
               }
                <h1 className="app-title">Weather App</h1><span className="subtitle">by <a href="https://github.com/icybears/">icybears</a></span>
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
                    this.state.fetching && <div className="fetching">Fetching data...</div>
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