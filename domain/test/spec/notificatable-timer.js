import assert from 'assert'

import NotificatableTimer from '../../src/notificatable-timer'

const TIMER_SETTINGS = {
    WITHOUT_CONTEXT: {
        total: 100,
        interval: 10,
    },
    WITH_CONTEXT: {
        total: 300,
        terminateCallback: context => {
            context.terminated = true
        },
        notifications: {
            [100]: context => { context.first = true },
            [200]: context => { context.second = true },
        },
    },
}

describe('NotificatableTimer', function () {
    it('can build instances', function () {
        const timer = new NotificatableTimer(TIMER_SETTINGS.WITHOUT_CONTEXT)
        assert(timer instanceof NotificatableTimer)
    })

    it('can start & stop', function (done) {
        const timer = new NotificatableTimer(TIMER_SETTINGS.WITHOUT_CONTEXT)
        timer.start()
        const timeoutId = setTimeout(() => {
            timer.stop()

            assert(50 <= timer.elapsed)

            clearTimeout(timeoutId)
            done()
        }, 60)
    })

    it('can notify', function (done) {
        const context = {
            first: false,
            second: false,
            terminated: false,
        }
        const timer = new NotificatableTimer(TIMER_SETTINGS.WITH_CONTEXT, context)
        timer.start()
        const timeoutId = setTimeout(() => {
            timer.stop()

            assert(context.first === true)
            assert(context.second === true)
            assert(context.terminated === true)

            clearTimeout(timeoutId)
            done()
        }, 310)
    })
})
