
import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { useFakeTimers } from 'sinon'
import Timer from '../src/js/timer'

describe('Timer', () => {
  describe('#humanizeTime()', () => {
    it('must return 00:00 if 0', () => {
      const timer = new Timer()
      expect(timer.humanizeTime(0)).toBe('00:00')
    })

    it('must floor minutes', () => {
      const timer = new Timer()
      expect(timer.humanizeTime(119)).toInclude('01:')
      expect(timer.humanizeTime(60)).toInclude('01:')
      expect(timer.humanizeTime(59)).toInclude('00:')
    })

    it('must round seconds', () => {
      const timer = new Timer()
      expect(timer.humanizeTime(119)).toInclude(':59')
      expect(timer.humanizeTime(60)).toInclude(':00')
    })
  })

  describe('#getRestTime()', () => {
    it('must return 0 if past = 0', () => {
      const timer = new Timer({ limit: 1 })
      timer.state.past = 0

      expect(timer.getRestTime()).toBe(0)
    })

    it('must return 1 if limit = past', () => {
      const time = 10
      const timer = new Timer({ limit: time })
      timer.state.past = time

      expect(timer.getRestTime()).toBe(1)
    })
  })

  describe('#tick()', () => {
    it('must call props.onTick', () => {
      const spy = expect.createSpy()
      const timer = renderIntoDocument(<Timer limit={1} onTick={spy} />)

      timer.tick()
      expect(spy).toHaveBeenCalled()
    })

    it('must call props.onLimit if past = limit', () => {
      const clock = useFakeTimers()
      const spy = expect.createSpy()
      const timer = renderIntoDocument(<Timer limit={1} onLimit={spy} />)

      timer.start()
      clock.tick(999)
      expect(spy).toNotHaveBeenCalled()
      clock.tick(1)
      expect(spy).toHaveBeenCalled()

      clock.restore()
    })
  })

  describe('#start()', () => {
    it('must change startAt', () => {
      const timer = renderIntoDocument(<Timer limit={1} />)

      timer.start()
      expect(timer.state.startAt).toBeA(Date)
    })

    it('must call tick every 1 seconds', () => {
      const clock = useFakeTimers()
      const timer = renderIntoDocument(<Timer limit={1} />)
      const spy = expect.spyOn(timer, 'tick')

      timer.start()

      expect(spy.calls.length).toBe(0)
      clock.tick(1000)
      expect(spy.calls.length).toBe(1)
      clock.tick(2999)
      expect(spy.calls.length).toBe(3)

      clock.restore()
    })

    it('must call setInterval()', () => {
      const id = 9999
      const spy = expect.spyOn(global, 'setInterval').andReturn(id)
      const timer = renderIntoDocument(<Timer limit={1} />)

      timer.start()
      expect(spy).toHaveBeenCalled()
      expect(timer.state.timeoutID).toBe(id)
    })
  })

  describe('#stop()', () => {
    it('must change past = 0', () => {
      const timer = renderIntoDocument(<Timer limit={1} />)
      timer.state.past = 1

      timer.stop()
      expect(timer.state.past).toBe(0)
    })

    it('must call clearInterval() with state.timeoutID', () => {
      const spy = expect.spyOn(global, 'clearInterval')
      const timer = renderIntoDocument(<Timer limit={1} />)
      const expected = 9999
      timer.state.timeoutID = expected

      timer.stop()
      expect(spy).toHaveBeenCalled()
      expect(spy.calls[0].arguments[0]).toBe(expected)
    })
  })
})
