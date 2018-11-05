import initialState from '../initialState';
import * as selectedCountryTypes from '../actions-types/selectedCountryTypes';


export default function selectedCountryReducer(state = initialState.selectedCountry, action = {}) {
    switch (action.type) {
        case selectedCountryTypes.SET_SELECTED_COUNTRY:
            return action.selectedCountry;
        case selectedCountryTypes.CLEAR_SELECTED_COUNTRY:
            return null;
        default:
            return state;
    }
}
