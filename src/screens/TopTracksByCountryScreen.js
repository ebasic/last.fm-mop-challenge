import React from 'react';
import {bindActionCreators} from 'redux';
import connect from "react-redux/es/connect/connect";
import {FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import PureListItemComponent from '../components/shared/PureListItemComponent';

import * as Lastfm_API from '../api/last-fm-api';
import * as topTracksActions from '../redux/actions/topTracksActions';
import * as trackDetailsActions from '../redux/actions/trackDetailsActions';
import {configureScreenHeader, renderFooter, renderSeparator} from '../utils/shared-functions';
import {pageSize} from '../config';
import styles from '../styles/top-tracks-by-country-styles';


class TopTracksByCountryScreen extends React.Component {
    static navigationOptions = configureScreenHeader('TOP TRACKS', '#00264d', '#fff', 'bold', 'center');

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            tracks: [],
            page: 1,
            total: 0
        };
    }

    componentDidMount() {
        this.props.topTracksActions.getTopTracksByCountry(this.props.selectedCountry.name, this.state.page).then((response) => {
            this.setState({
                loading: false,
                tracks: this.props.topTracksByCountry,
                total: response.data.tracks['@attr'].total
            });
        }).catch(error => {
            this.setState({
                loading: false
            }, () => {
                Toast.show(error.response.data.message || 'Error occured on loading tracks');
            });
        });
    }

    goToTrackDetailsScreen = (item) => {
        this.props.trackDetailsActions.clearTrackDetails();
        this.props.navigation.push('TrackDetailsScreen', {track: item});
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder='Search tracks...'
                lightTheme
                onChangeText={text => this.searchTracks(text)}
                onClear={text => this.searchTracks(text)}
                cancelIcon={{type: 'font-awesome', name: 'chevron-left'}}
                autoCorrect={false}
            />
        );
    };

    renderItem = ({item}) => (
        <PureListItemComponent
            containerStyle={styles.itemContainer}
            title={'Track: ' + item.name}
            subtitle={'Artist: ' + item.artist.name}
            avatar={{uri: item.image[0]['#text']}}
            onPress={() => this.goToTrackDetailsScreen(item)}
            rightIcon={{name: 'heart', type: 'font-awesome', style: styles.rightIcon}}
            onPressRightIcon={() => this.likeTrack(item)}
        />
    );

    loadMore = (page) => {
        this.props.topTracksActions.getTopTracksByCountry(this.props.selectedCountry.name, page).then(() => {
            this.setState({
                loading: false,
                tracks: this.props.topTracksByCountry
            });
        }).catch(error => {
            this.setState({
                loading: false,
                tracks: []
            }, () => {
                Toast.show(error.response.data.message || 'Error occured on loading more tracks');
            });
        })
    };

    onScrollHandler = () => {
        this.setState({
            page: this.state.page + 1,
            loading: true
        }, () => {
            this.loadMore(this.state.page);
        });
    };

    searchTracks = (filter) => {
        let filtered = [];

        filter && filter !== '' ?
            this.props.topTracksByCountry.map((item, index) => {
                (item.name.toLowerCase().includes(filter.toLowerCase())) ? filtered.push(item) : null;
            }) : filtered = this.props.topTracksByCountry;


        this.setState({tracks: filtered});
    };

    likeTrack = (track) => {
        Lastfm_API.getMobileSession().then(response => {
            if(response && response.data && response.data.error)
                return Toast.show(response.data.message || 'Error occured on getting mobile session');

            let sessionKey = response.data.session.key;

            Lastfm_API.loveTrack(track.name, track.artist.name, sessionKey).then(response => {
                if(response && response.data && response.data.error)
                    return Toast.show(response.data.message || 'Error occured on track like');

                Toast.show('Track liked');
            }).catch(error => {
                Toast.show(error.response.data.message || 'Error occured on track like');
            });
        }).catch(error => {
            Toast.show(error.response.data.message || 'Error occured on getting mobile session');
        });
    };

    render() {
        if (this.state.tracks.length === 0)
            return null;

        return (
            <FlatList
                data={this.state.tracks}
                keyExtractor={(item, index) => 'item-' + index}
                renderItem={this.renderItem}
                shouldItemUpdate={(props, nextProps) => {
                    return props.item.name !== nextProps.item.name
                }}
                scrollEnabled={this.state.tracks.length < this.state.total}
                ItemSeparatorComponent={renderSeparator}
                onEndReached={this.onScrollHandler}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={renderFooter(this.state.loading)}
                removeClippedSubviews={true}
                onEndReachedThreshold={0.5}
                initialNumToRender={pageSize}
                maxToRenderPerBatch={2}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        topTracksByCountry: state.topTracksByCountry,
        selectedCountry: state.selectedCountry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        topTracksActions: bindActionCreators(topTracksActions, dispatch),
        trackDetailsActions: bindActionCreators(trackDetailsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTracksByCountryScreen);
