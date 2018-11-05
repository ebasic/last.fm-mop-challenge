import initialState from '../initialState';
import * as topTracksTypes from '../actions-types/topTracksTypes';


export default function topTracksReducer(state = initialState.topTracksByCountry, action = {}) {
    switch (action.type) {
        case topTracksTypes.GET_TOP_TRACKS_SUCCESS:
            return [...state, ...action.tracks];
        case topTracksTypes.TOP_TRACKS_CLEAR:
            return [];
        default:
            return [];
    }
}
