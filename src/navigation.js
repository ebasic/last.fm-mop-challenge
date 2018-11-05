import React from 'react';
import {createStackNavigator} from 'react-navigation';

import CountriesListScreen from './screens/CountriesListScreen';
import TopTracksByCountryScreen from './screens/TopTracksByCountryScreen';
import TrackDetailsScreen from './screens/TrackDetailsScreen';


const AppNavigator = createStackNavigator({
    CountriesListScreen: {screen: CountriesListScreen},
    TopTracksByCountryScreen: {screen: TopTracksByCountryScreen},
    TrackDetailsScreen: {screen: TrackDetailsScreen}
});

export default AppNavigator;
