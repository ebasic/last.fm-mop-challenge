import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    likeButtonContainer: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tagsContainer: {
        marginTop: 20,
    },
    tagsInnerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tagsLabel: {
        color: 'grey',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tagBoxWrapper: {
        borderColor: 'grey',
        borderWidth: 1,
        margin: 3
    },
    tagBox: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'grey',
        backgroundColor : '#d0c0b4',
        paddingLeft : 3,
        paddingRight : 3,
        textAlign: 'center'
    },
    heading: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headingLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'left'
    },
    subSection: {
        marginTop: 10,
    },
    subLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'grey'
    },
    subText: {
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'left',
        color: 'grey'
    },
    summarySection: {
        marginTop: 40,
    },
    summaryLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    summaryText: {
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'justify'
    }
});

export default styles;
