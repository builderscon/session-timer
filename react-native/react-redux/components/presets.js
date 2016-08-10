import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { progressToHoursMinutes } from '../lib/util'

const styles = StyleSheet.create({
    container: {
        height: 428,
        width: 300,
        padding: 16,
        backgroundColor: '#eeeeee',
        borderRadius: 16,
        alignItems: 'center',
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        marginLeft: 8,
        color: '#626262',
        fontSize: 32,
        fontFamily: 'avenir',
    },
    button: {
        width: 280,
        height: 64,
        margin: 4,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#626262',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonTotal: {
        fontSize: 32,
        fontFamily: 'avenir',
        color: '#626262',
    },
    notificationTimningsIcon: {
        marginLeft: 16,
    },
    notificationTimnings: {
        marginLeft: 4,
        fontSize: 24,
        fontFamily: 'avenir',
    },
    notificationTimningsUnit: {
        fontSize: 16,
        fontFamily: 'avenir',
        top: 2,
    },
})

function floor(target, digit) {
    const power = Math.pow(10, digit)
    return Math.floor(target * power) / power
}

export default class Presets extends React.Component {
    onPressButton(index) {
        this.props.onPress(index)
    }

    renderNotifications(notifications) {
        return Object.keys(notifications).map(at => {
            const min = at / (60 * 1000)
            if (min < 1) {
                return floor(min, 1)
            }
            return min
        }).join(', ')
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
                    <Text style={styles.buttonTotal}>
                        {progressToHoursMinutes(0, preset.total)}
                    </Text>
                    <Text style={styles.notificationTimningsIcon}>
                        <Icon
                            name="bell"
                            size={24}
                            color="#626262"
                        />
                    </Text>
                    <Text style={styles.notificationTimnings}>
                        {this.renderNotifications(preset.notifications)}
                    </Text>
                    <Text style={styles.notificationTimningsUnit}> min</Text>
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
                    />
                    <Text style={styles.titleText}>
                        select preset
                    </Text>
                </View>
                {this.renderButtons()}
            </View>
        )
    }
}
