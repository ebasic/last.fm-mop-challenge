import axios from 'axios';
import utf8 from 'utf8';
import qs from 'qs';
import {getLastfmApiSignature} from '../utils/shared-functions';
import {
    Lastfm_API_URL_HTTPS,
    Lastfm_username,
    Lastfm_password,
    Lastfm_API_KEY,
    Lastfm_API_SIGNATURE_METHOD,
    Lastfm_LOVE_TRACK_METHOD
} from '../config';


export function getMobileSession() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json'
        }
    };

    let body = {
        api_key: Lastfm_API_KEY,
        api_sig: getLastfmApiSignature(),
        format: 'json',
        method: Lastfm_API_SIGNATURE_METHOD,
        password: Lastfm_password,
        username: Lastfm_username
    };

    return axios.post(Lastfm_API_URL_HTTPS, qs.stringify(body), requestOptions)
        .then(response => {
            return response;
        })
        .catch(err => {
            throw err;
        });
}

export function loveTrack(trackName, artistName, sessionKey) {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    let body = {
        track: utf8.encode(trackName),
        artist: utf8.encode(artistName),
        api_key: Lastfm_API_KEY,
        api_sig: getLastfmApiSignature(),
        sk: sessionKey,
        method: Lastfm_LOVE_TRACK_METHOD,
        format: 'json'
    };

    return axios.post(Lastfm_API_URL_HTTPS, qs.stringify(body), requestOptions)
        .then(response => {
            return response;
        })
        .catch(err => {
            throw err;
        });
}
