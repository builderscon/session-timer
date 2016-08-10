import React from 'react'
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 300,
        padding: 16,
        backgroundColor: '#eeeeee',
        borderRadius: 16,
        alignItems: 'center',
    },
    button: {
        borderWidth: 1,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 8,
        color: '#626262',
        fontSize: 32,
        fontFamily: 'avenir',
    },
})

export default class Presets extends React.Component {
    onPressButton(index) {
        this.props.onPress(index)
    }

    renderButtons() {
        const { presets } = this.props
        const result = []
        console.log(this.props)
        for (let index = 0, length = presets.length; index < length; ++index) {
            const preset = presets[index]
            result.push(
                <TouchableOpacity
                    key={`preset-${index}`}
                    onPress={() => this.onPressButton(index)}
                    style={styles.button}
                >
                    <Text>{preset.total / (60 * 1000)}min</Text>
                </TouchableOpacity>
            )
        }
        return result
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Icon
                        name="clock-o"
                        size={32}
                        color="#626262"
                        style={styles.icon}
                    />
                    <Text style={styles.text}>
                        select preset
                    </Text>
                </View>
                {this.renderButtons()}
            </View>
        )
    }
}
