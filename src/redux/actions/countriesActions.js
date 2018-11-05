import axios from 'axios';
import {setupCache} from 'axios-cache-adapter';
import {countries_API_URL} from '../../config';
import * as countriesTypes from '../actions-types/countriesTypes';


const cache = setupCache({
    maxAge: 15 * 60 * 1000
});

const api = axios.create({
    adapter: cache.adapter
});

// Actions creators
function getCountriesSuccess(countries) {
    return {
        type: countriesTypes.GET_COUNTRIES_SUCCESS,
        countries
    }
}

function getCountriesFail() {
    return {
        type: countriesTypes.GET_COUNTRIES_FAIL
    }
}


// Thunks
export function getCountries() {
    return function (dispatch) {
        return api({
            url: countries_API_URL,
            method: 'get'
        }).then(response => {
            dispatch(getCountriesSuccess(response.data));
            return response.data;
        }).catch(err => {
            dispatch(getCountriesFail());
            throw err;
        });
    }
}

