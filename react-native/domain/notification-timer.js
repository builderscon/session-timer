const DEFAULT_INTERVAL = 100

// unit is milliseconds
export default class NotificatableTimer {
    constructor ({
        total,
        terminateCallback,
        notifications,
        interval,
    }) {
        this.total = total
        this.terminater = {
            callback: terminateCallback
        }
        this.notifications = notifications
        this.interval = interval || DEFAULT_INTERVAL

        this.reset()
    }

    reset () {
        this.consumed = 0
        this.elapsed = 0
    }

    start () {
        this.base = new Date()
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
        this.notificationTimeoutIds = Object.keys(this.notifications).map((at) => {
            let remaining = parseInt(at, 10) - this.consumed
            if (remaining < 0) {
                return null
            }
            return setTimeout(() => {
                this.notifications[at]()
            }, remaining)
        })
    }

    setupInterval () {
        this.intervalId = setInterval(() => {
            let elapsed = new Date() - this.base + this.consumed
            if (this.total < elapsed) {
                elapsed = this.total
            }
            this.elapsed = elapsed
        }, this.interval)
    }

    stop () {
        this.consumed += (new Date() - this.base)
        clearInterval(this.intervalId)
        clearInterval(this.terminater.timeoutId)
        this.notificationTimeoutIds.forEach((timeoutId) => {
            if (timeoutId != null) {
                clearTimeout(timeoutId)
            }
        })
    }
}
