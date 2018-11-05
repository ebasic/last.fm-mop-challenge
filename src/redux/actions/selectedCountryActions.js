import * as selectedCountryTypes from '../actions-types/selectedCountryTypes';


// Actions creators
function setSelectedCountrySuccess(selectedCountry) {
    return {
        type: selectedCountryTypes.SET_SELECTED_COUNTRY,
        selectedCountry
    }
}

function clearSelectedCountrySuccess() {
    return {
        type: selectedCountryTypes.CLEAR_SELECTED_COUNTRY
    }
}


// Thunks
export function setSelectedCountry(selectedCountry) {
    return function (dispatch) {
        dispatch(setSelectedCountrySuccess(selectedCountry));
    }
}

export function clearSelectedCountry() {
    return function (dispatch) {
        dispatch(clearSelectedCountrySuccess());
    }
}
