import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        flex: 1,
    },
    resetButton: {
        height: 100,
        paddingTop: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#eeeeee',
        fontSize: 40,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
    toggleButton: {
        height: 100,
        paddingTop: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#eeeeee',
        fontSize: 40,
        fontFamily: 'avenir',
        fontWeight: 'bold',
    },
})

export default class Footer extends React.Component {
    get resetButtonColor () {
        return this.props.state.isRunning ? '#aaaaaa' : '#555555'
    }
    get toggleButtonColor () {
        return this.props.state.isReady
            ? this.props.state.isRunning ? '#ea5432' : '#5db7e8'
            : '#aaaaaa'
    }
    get toggleButtonText () {
        return this.props.state.isRunning ? 'Stop': 'Start'
    }

    render() {
        return (
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <TouchableHighlight onPress={this.props.onPressReset}>
                        <Text style={[styles.resetButton, {backgroundColor: this.resetButtonColor}]}>Reset</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.button}>
                    <TouchableHighlight onPress={this.props.onPressToggle}>
                        <Text style={[styles.toggleButton, {backgroundColor: this.toggleButtonColor}]}>{this.toggleButtonText}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
