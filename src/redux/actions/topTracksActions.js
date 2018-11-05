import axios from 'axios';
import {Lastfm_API_URL, Lastfm_API_KEY, pageSize} from '../../config';
import * as topTracksTypes from '../actions-types/topTracksTypes';


// Actions creators
function getTopTracksByCountrySuccess(tracks) {
    return {
        type: topTracksTypes.GET_TOP_TRACKS_SUCCESS,
        tracks
    }
}

function clearTopTracks() {
    return {
        type: topTracksTypes.TOP_TRACKS_CLEAR
    }
}


// Thunks
export function getTopTracksByCountry(countryName, page) {
    return function (dispatch) {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return axios.get(Lastfm_API_URL + `?method=geo.gettoptracks&page=${page}&limit=${pageSize}&country=${countryName}&api_key=${Lastfm_API_KEY}&format=json`, requestOptions)
            .then(response => {
                if(response && response.data && response.data.error)
                    throw response;

                dispatch(getTopTracksByCountrySuccess(response.data.tracks.track));
                return response;
            })
            .catch(err => {
                dispatch(clearTopTracks());
                throw err;
            });
    }
}

export function clearCountryTopTracks() {
    return function (dispatch) {
        dispatch(clearTopTracks());
    }
}
