import React from 'react';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {View, ScrollView, Text, Linking} from 'react-native'
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

import Loader from "../components/shared/Loader";
import {configureScreenHeader} from '../utils/shared-functions';
import * as trackDetailsActions from '../redux/actions/trackDetailsActions';
import * as Lastfm_API from '../api/last-fm-api';
import styles from '../styles/track-details-styles';


class TrackDetailsScreen extends React.Component {
    static navigationOptions = configureScreenHeader('TRACK INFO', '#00264d', '#fff', 'bold', 'center');

    constructor(props) {
        super(props);
        let {navigation} = props;

        this.state = {
            loading: true,
            track: navigation.getParam('track')
        };
    }

    componentDidMount() {
        this.props.trackDetailsActions.getTrackDetails(this.state.track.name, this.state.track.artist.name).then((response) => {
            this.setState({
                loading: false
            }, () => {
                if (!this.props.trackDetails)
                    Toast.show('Error occured on loading track details');
            });
        }).catch(error => {
            this.setState({
                loading: false
            }, () => {
                Toast.show(error.response.data.message || 'Error occured on loading track details');
            });
        });
    }

    handleTagClick = (tag) => {
        Linking.canOpenURL(tag.url).then(supported => {
            if (supported) {
                Linking.openURL(tag.url);
            } else {
                Toast.show(`Cannot open ${tag.name} url`);
            }
        });
    };

    renderTags = (tags) => (
        <View style={styles.tagsContainer}>
            <View style={styles.tagsInnerContainer}>
                <Text style={styles.tagsLabel}>{'Tags: '}</Text>
                {
                    tags.map((tag, index) => {
                        return (
                            <View style={styles.tagBoxWrapper} key={index}>
                                <Text style={styles.tagBox}
                                      onPress={() => this.handleTagClick(tag)}>
                                    {tag.name}
                                </Text>
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );

    likeTrack = (track) => {
        Lastfm_API.getMobileSession().then(response => {
            if(response && response.data && response.data.error)
                return Toast.show(response.data.message || 'Error occured on getting mobile session');

            let sessionKey = response.data.session.key;

            console.log("Session key: ", sessionKey);

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
        if (this.state.loading)
            return <Loader/>;

        if (!this.props.trackDetails)
            return null;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.likeButtonContainer}>
                    <Text>
                        <Icon name='heart' size={38} color='red' onPress={() => this.likeTrack(this.state.track)}/>
                    </Text>
                </View>

                <View style={styles.heading}>
                    <Text style={styles.headingLabel}>
                        {'Track name:  '}
                        <Text
                            style={styles.headingText}>{this.props.trackDetails.name ? this.props.trackDetails.name : 'n/a'}</Text>
                    </Text>
                </View>

                <View style={styles.subSection}>
                    <Text style={styles.subLabel}>
                        {'Artist name:  '}
                        <Text
                            style={styles.subText}>{this.props.trackDetails.artist ? this.props.trackDetails.artist.name : 'n/a'}</Text>
                    </Text>
                    <Text style={styles.subLabel}>
                        {'Album title:  '}
                        <Text
                            style={styles.subText}>{this.props.trackDetails.album ? this.props.trackDetails.album.title : 'n/a'}</Text>
                    </Text>
                    <Text style={styles.subLabel}>
                        {'Playcount:  '}
                        <Text
                            style={styles.subText}>{this.props.trackDetails.playcount ? this.props.trackDetails.playcount : 'n/a'}</Text>
                    </Text>
                    <Text style={styles.subLabel}>
                        {'Published on:  '}
                        <Text
                            style={styles.subText}>{this.props.trackDetails.wiki ? this.props.trackDetails.wiki.published : 'n/a'}</Text>
                    </Text>
                </View>

                {this.renderTags(this.props.trackDetails.toptags ? this.props.trackDetails.toptags.tag : [])}

                <View style={styles.summarySection}>
                    <Text style={styles.summaryLabel}>
                        {'Summary: '}
                        <Text
                            style={styles.summaryText}>{this.props.trackDetails.wiki ? this.props.trackDetails.wiki.summary : 'n/a'}</Text>
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        trackDetails: state.trackDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
        trackDetailsActions: bindActionCreators(trackDetailsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetailsScreen);