import md5 from 'md5';
import utf8 from 'utf8';
import React from 'react';
import {View} from 'react-native';
import Loader from '../components/shared/Loader';
import sharedStyles from '../styles/shared-styles';
import {
    Lastfm_username,
    Lastfm_password,
    Lastfm_API_KEY,
    Lastfm_API_SIGNATURE_METHOD,
    Lastfm_SHARED_SECRET
} from '../config';


export function configureScreenHeader(title, headerBackgroundColor, headerTintColor, fontWeight, textAlign) {
    return {
        title: title,
        headerStyle: {
            backgroundColor: headerBackgroundColor,
        },
        headerTintColor: headerTintColor,
        headerTitleStyle: {
            fontWeight: fontWeight,
            textAlign: textAlign,
            flex: 1
        }
    };
}

export function renderFooter(isLoading) {
    if (!isLoading)
        return null;

    return <Loader/>;
}

export function renderSeparator() {
    return (
        <View
            style={sharedStyles.separator}
        />
    );
}

export function getLastfmApiSignature() {
    let raw_string = `api_key${utf8.encode(Lastfm_API_KEY)}method${utf8.encode(Lastfm_API_SIGNATURE_METHOD)}password${utf8.encode(Lastfm_password)}username${utf8.encode(Lastfm_username)}${Lastfm_SHARED_SECRET}`;

    return md5(raw_string);
}