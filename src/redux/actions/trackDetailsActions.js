import axios from 'axios';
import {Lastfm_API_URL, Lastfm_API_KEY} from '../../config';
import * as trackDetailsTypes from '../actions-types/trackDetailsTypes';


// Actions creators
function getTrackDetailsSuccess(track) {
    return {
        type: trackDetailsTypes.GET_TRACK_DETAILS_SUCCESS,
        track
    }
}

function clearTrackDetailsSuccess() {
    return {
        type: trackDetailsTypes.TRACK_DETAILS_CLEAR
    }
}


// Thunks
export function getTrackDetails(trackName, artistName) {
    return function (dispatch) {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return axios.get(Lastfm_API_URL + `?method=track.getInfo&api_key=${Lastfm_API_KEY}&artist=${artistName}&track=${trackName}&format=json`, requestOptions)
            .then(response => {
                if(response && response.data && response.data.error)
                    throw response;

                dispatch(getTrackDetailsSuccess(response.data.track));
                return response.data.track;
            })
            .catch(err => {
                dispatch(clearTrackDetailsSuccess());
                throw err;
            });
    }
}

export function clearTrackDetails() {
    return function (dispatch) {
        dispatch(clearTrackDetailsSuccess());
    }
}
