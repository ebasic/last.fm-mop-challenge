import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/redux/configureStore';
import AppNavigator from './src/navigation';

console.ignoredYellowBox = ['Remote debugger', 'Setting a timer'];

let store = configureStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}

export default App;