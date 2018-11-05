import React, {PureComponent} from 'react';
import {ActivityIndicator, View} from 'react-native';
import sharedStyles from '../../styles/shared-styles';


class Loader extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={sharedStyles.activityIndicatorContainer}
            >
                <ActivityIndicator animating size={'large'}/>
            </View>
        )
    }
}

export default Loader;
