import React, { PureComponent } from 'react';
import {ListItem} from 'react-native-elements';


class PureListItemComponent extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <ListItem {...this.props}/>;
    }
}

export default PureListItemComponent;
