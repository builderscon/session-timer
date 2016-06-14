'use strict'

const DEFAULT_INTERVAL = 100

// unit is milliseconds
export default class NotificatableTimer {
    constructor ({
        total,
        terminaterCallback,
        notifications,
        interval,
    }) {
        this.total = total
        this.terminater = {
            callback: terminaterCallback
        }
        this.notifications = notifications
        this.interval = interval || DEFAULT_INTERVAL

        this.reset()
    }

    reset () {
        if (this.on) {
            return
        }
        this.consumed = 0
        this.duration = 0
        this.on = false
    }

    start () {
        this.base = new Date()
        this.on = true
        this.setupTerminater()
        this.setupNotifications()
        this.setupInterval()
    }

    setupTerminater () {
        this.terminater.timeoutId = setTimeout(() => {
            this.stop()
            this.terminater.callback()
        }, this.total - this.consumed)
    }

    setupNotifications () {
        this.notifications.timeoutIds = this.notifications.map((settings) => {
            let remaining = this.total - settings.at - this.consumed
            if (remaining < 0) {
                return null
            }
            return setTimeout(() => {
                settings.callback()
            }, remaining)
        })
    }

    setupInterval () {
        this.intervalId = setInterval(() => {
            let duration = new Date() - this.base + this.consumed
            if (this.total < duration) {
                duration = this.total
            }
            this.duration = duration
        }, this.interval)
    }

    stop () {
        this.consumed += (new Date() - this.base)
        this.on = false
        clearInterval(this.intervalId)
        clearInterval(this.terminater.timeoutId)
        this.notifications.timeoutIds.forEach((timeoutId) => {
            if (timeoutId != null) {
                clearTimeout(timeoutId)
            }
        })
    }
}
