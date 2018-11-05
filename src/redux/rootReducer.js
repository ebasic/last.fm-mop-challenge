import {combineReducers} from 'redux';
import countries from './reducers/countriesReducer';
import topTracksByCountry from './reducers/topTracksReducer';
import trackDetails from './reducers/trackDetailsReducer';
import selectedCountry from './reducers/selectedCountryReducer';


const rootReducer = combineReducers({
    countries,
    selectedCountry,
    topTracksByCountry,
    trackDetails
});

export default rootReducer;