import initialState from '../initialState';
import * as countriesTypes from '../actions-types/countriesTypes';


export default function usersReducer(state = initialState.countries, action = {}) {
    switch (action.type) {
        case countriesTypes.GET_COUNTRIES_SUCCESS:
            return action.countries;
        case countriesTypes.GET_COUNTRIES_FAIL:
            return state;
        default:
            return state;
    }
}
