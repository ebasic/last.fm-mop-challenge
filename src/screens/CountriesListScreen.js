import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Flag from 'react-native-flags';
import Toast from 'react-native-simple-toast';
import {FlatList} from 'react-native';
import {SearchBar, List} from 'react-native-elements'

import Loader from '../components/shared/Loader';
import PureListItemComponent from '../components/shared/PureListItemComponent';
import * as countriesActions from '../redux/actions/countriesActions';
import * as topTracksActions from '../redux/actions/topTracksActions';
import * as selectedCountryActions from '../redux/actions/selectedCountryActions';
import {
    configureScreenHeader,
    renderSeparator,
    renderFooter
} from '../utils/shared-functions';
import styles from '../styles/countries-list-styles';


class CountriesListScreen extends React.Component {
    static navigationOptions = configureScreenHeader('COUNTRIES', '#00264d', '#fff', 'bold', 'center');

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            countries: []
        };
    }

    componentDidMount() {
        this.props.countriesActions.getCountries().then((response) => {
            this.setState({
                loading: false,
                countries: this.props.countries
            }, () => {
                Toast.show('Countries loaded');
            });
        }).catch(error => {
            this.setState({
                loading: false
            }, () => {
                Toast.show(error.message || 'Error occured on loading countries');
            });
        });
    }

    renderHeader = () => {
        return (
            <SearchBar
                placeholder='Search country...'
                lightTheme
                onChangeText={text => this.searchCountries(text)}
                onClear={text => this.searchCountries(text)}
                cancelIcon={{type: 'font-awesome', name: 'chevron-left'}}
                autoCorrect={false}
            />
        );
    };

    goToCountryTopTracksScreen = (item) => {
        this.props.topTracksActions.clearCountryTopTracks();
        this.props.selectedCountryActions.clearSelectedCountry();
        this.props.selectedCountryActions.setSelectedCountry(item);

        this.props.navigation.push('TopTracksByCountryScreen');
    };

    renderItem = ({item}) => (
        <PureListItemComponent
            title={item.name}
            avatar={<Flag code={item.alpha2Code} size={32} type={'flat'}/>}
            onPress={() => this.goToCountryTopTracksScreen(item)}
            containerStyle={styles.itemContainer}
        />
    );

    searchCountries = (filter) => {
        let filtered = [];

        filter && filter !== '' ?
            this.props.countries.map((item, index) => {
                (item.name.toLowerCase().includes(filter.toLowerCase())) ? filtered.push(item) : null;
            }) : filtered = this.props.countries;

        this.setState({countries: filtered});
    };

    render() {
        if (this.state.loading)
            return <Loader/>;

        if (this.props.countries.length === 0)
            return null;

        return (
            <List containerStyle={styles.listContainer}>
                <FlatList
                    data={this.state.countries}
                    removeClippedSubviews={true}
                    shouldItemUpdate={(props, nextProps) => {
                        return props.item.name !== nextProps.item.name
                    }}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.alpha2Code}
                    ItemSeparatorComponent={renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={renderFooter(this.state.loading)}
                    initialNumToRender={8}
                    maxToRenderPerBatch={2}
                    onEndReachedThreshold={0.5}
                />
            </List>
        );
    }
}

function mapStateToProps(state) {
    return {
        countries: state.countries,
        selectedCountry: state.selectedCountry,
        topTracksByCountry: state.topTracksByCountry
    }
}


function mapDispatchToProps(dispatch) {
    return {
        countriesActions: bindActionCreators(countriesActions, dispatch),
        topTracksActions: bindActionCreators(topTracksActions, dispatch),
        selectedCountryActions: bindActionCreators(selectedCountryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountriesListScreen);