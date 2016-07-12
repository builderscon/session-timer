domain logics for Builderscon session timer
===========================================

This package contains domain logics that be used in public session timer for [Builderscon](http://builderscon.io/).

Usage
-----

```sh
npm install builderscon-session-timer-domain --save
```

```js
import {
    NotificatableTimer,
    PRESETS,
} from 'builderscon-session-timer-domain'

// Properties of second argument are all required.
const timer = new NotificatableTimer(PRESETS[0], {
    sound: {
        play: () => {
            // codes to play sound
        }
        playTwice: () => {
            // codes to play sound twice
        }
    },
    onTerminate: {
        // clean-ups
    }
})

timer.start()
```

NotificatableTimer
------------------

Timer that notifies by calling arbitrary callback functions at arbitrary timings.

### constructor

```js
new NotificatableTimer(<settings>, <context>)
```

#### &lt;settings>

An Object for timer settings. Time unit is millisecond.

- total
    - number
    - required
    - total time to count down
- terminateCallback
    - Function
    - optional
    - an callback function at terminating
    - &lt;context is passed
- notifications
    - Object
    - optional
    - keys must be timing to notify
    - values must be Function, &lt;context is passed
- interval
    - number
    - optional
    - default is 100
    - interval to update internal state

#### &lt;context>

An object to capsule context informations.
Properties below are required.

- sound
    - must be Object that has methods "play", "playTwice"
- onTerminate
    - must be Function

### methods

- start
    - starts timer
- stop
    - stops timer
- reset
    - resets timer to initial state

### property

- elapsed
    - read only
    - shows elapsed time from starting timer

PRESETS
-------

General presets for timer by Builderscon.
And it's a sample to use this package.


Builderscon session timer
-------------------------

- [web](http://web.timer.builderscon.io/)
- [Android](https://play.google.com/store/apps/details?id=io.builderscon.sessiontimer)
- iOS is in preparation to publish...
