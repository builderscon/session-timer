import assert from 'assert'
import PRESETS from '../../src/presets'

describe('PRESETS', function () {
    it('is array', function () {
        assert(PRESETS instanceof Array)
        assert(0 < PRESETS.length)
    })

    it('does not allow change', function () {
        assert.throws(() => {
            PRESETS[0] = 0
        })
    })

    it('has objects that have properties "total", "terminateCallback", "notifications"', function () {
        PRESETS.forEach(PRESET => {
            assert(PRESET instanceof Object)
            assert('total' in PRESET)
            assert('terminateCallback' in PRESET)
            assert('notifications' in PRESET)
        })
    })
})
