import Immutable from 'seamless-immutable';


const initialState = Immutable({
    countries: [],
    selectedCountry: null,
    topTracksByCountry: [],
    trackDetails: null
});

export default initialState;