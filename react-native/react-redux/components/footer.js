import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
    text: {
        padding: 20,
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
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.props.onPressReset}
                    style={styles.button}
                >
                    <Text style={[styles.text, {backgroundColor: this.resetButtonColor}]}>
                        Reset
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.onPressToggle}
                    style={styles.button}
                >
                    <Text style={[styles.text, {backgroundColor: this.toggleButtonColor}]}>
                        {this.toggleButtonText}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
