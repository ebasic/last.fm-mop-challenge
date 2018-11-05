import initialState from '../initialState';
import * as trackDetailsTypes from '../actions-types/trackDetailsTypes';


export default function trackDetailsReducer(state = initialState.trackDetails, action = {}) {
    switch (action.type) {
        case trackDetailsTypes.GET_TRACK_DETAILS_SUCCESS:
            return action.track;
        case trackDetailsTypes.TRACK_DETAILS_CLEAR:
            return null;
        default:
            return state;
    }
}
