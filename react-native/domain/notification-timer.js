'use strict'

// unit is milliseconds
export default class NotificatableTimer {
    constructor ({
        total,
        terminaterCallback,
        notifications,
        animation
    }) {
        this.total = total
        this.terminater = {
            callback: terminaterCallback
        }
        this.notifications = notifications
        this.animation = animation

        this.reset()
    }

    reset () {
        if (this.on) {
            return
        }
        this.startable = true
        this.consumed = 0
        this.on = false
    }

    start () {
        if (!this.startable) {
            return
        }
        this.base = new Date()
        this.on = true
        this.setupTerminater()
        this.setupNotifications()
        this.setupAnimation()
    }

    setupTerminater () {
        this.terminater.timeoutId = setTimeout(() => {
            this.startable = false
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

    setupAnimation () {
        this.animation.intervalId = setInterval(() => {
            let duration = new Date() - this.base + this.consumed
            if (this.total < duration) {
                duration = this.total
            }
            this.animation.callback(duration, this.total)
        }, this.animation.interval)
    }

    stop () {
        this.consumed += (new Date() - this.base)
        this.on = false
        clearInterval(this.animation.intervalId)
        clearInterval(this.terminater.timeoutId)
        this.notifications.timeoutIds.forEach((timeoutId) => {
            if (timeoutId != null) {
                clearTimeout(timeoutId)
            }
        })
    }

    toggle () {
        if (!this.startable) {
            return
        }
        this.on ? this.stop() : this.start()
    }
}
