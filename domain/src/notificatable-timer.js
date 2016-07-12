const DEFAULT_INTERVAL = 100

// unit is milliseconds
export default class NotificatableTimer {
    constructor ({
        total,
        terminateCallback,
        notifications,
        interval = DEFAULT_INTERVAL,
    }, context) {
        this.context = context
        this.total = total
        this.terminater = {
            callback: terminateCallback
        }
        this.notifications = notifications
        this.interval = interval

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
            if (this.terminater.callback != null) {
                this.terminater.callback(this.context)
            }
        }, this.total - this.consumed)
    }

    setupNotifications () {
        if (this.notifications == null) {
            this.notificationTimeoutIds = []
            return
        }

        this.notificationTimeoutIds = Object.keys(this.notifications).map((at) => {
            const remaining = parseInt(at, 10) - this.consumed
            if (remaining < 0) {
                return null
            }
            return setTimeout(() => {
                this.notifications[at](this.context)
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
        clearTimeout(this.terminater.timeoutId)
        this.notificationTimeoutIds.forEach((timeoutId) => {
            if (timeoutId != null) {
                clearTimeout(timeoutId)
            }
        })
    }
}
