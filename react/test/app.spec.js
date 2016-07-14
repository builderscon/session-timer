
import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { PRESETS } from 'builderscon-session-timer-domain'
import App from '../src/js/app'

describe('App', () => {
  describe('#getDefaultState()', () => {
    it('must return total of first choice', () => {
      const expected = 300
      const choices = [
        { total: expected },
        { total: 5012351 },
      ]
      const app = new App({ choices })

      expect(app.getDefaultState().limit).toBe(expected)
    })
  })

  describe('#getRestTimeClass()', () => {
    it('must return empty string if not passed any timings', () => {
      const choices = [
        { total: 60, notifications: [50] }
      ]
      const app = renderIntoDocument(<App choices={choices} />)

      expect(app.getRestTimeClass(49)).toBe('')
      expect(app.getRestTimeClass(50)).toNotBe('')
    })

    it('must return empty|warning|danger if 2 timings', () => {
      const choices = [
        { total: 30, notifications: [10, 20] }
      ]
      const app = renderIntoDocument(<App choices={choices} />)

      expect(app.getRestTimeClass(0)).toBe('')
      expect(app.getRestTimeClass(10)).toBe('warning')
      expect(app.getRestTimeClass(20)).toBe('danger')
    })

    it('must return empty|notice|warning|danger if 3 timings', () => {
      const choices = [
        { total: 40, notifications: [10, 20, 30] }
      ]
      const app = renderIntoDocument(<App choices={choices} />)

      expect(app.getRestTimeClass(0)).toBe('')
      expect(app.getRestTimeClass(10)).toBe('notice')
      expect(app.getRestTimeClass(20)).toBe('warning')
      expect(app.getRestTimeClass(30)).toBe('danger')
    })
  })

  describe('#getRestTimeClasses()', () => {
    it('first element must be empty', () => {
      const notifications = []
      const choice = { notifications }
      const app = new App({ choices: [choice] })

      expect(app.getRestTimeClasses(choice)[0]).toBe('')
    })

    it('must return elements in reverse order', () => {
      const notifications = [1]
      const choice = { notifications }
      const app = new App({ choices: [choice] })

      expect(app.getRestTimeClasses(choice)).toEqual(['', 'danger'])
    })
  })

  describe('#getChoice()', () => {
    it('must return choice', () => {
      const notifications = [1]
      const total = 100
      const choice = { notifications, total }
      const app = new App({ choices: [choice] })

      expect(app.getChoice(total)).toBe(choice)
    })

    it('must throw Error if not matched', () => {
      const notifications = [1]
      const total = 100
      const choice = { notifications, total }
      const app = new App({ choices: [choice] })

      expect(() => app.getChoice(-321)).toThrow()
    })
  })

  describe('#getCurrentChoice()', () => {
    it('must return first choice', () => {
      const notifications = [1]
      const total = 100
      const choice = { notifications, total }
      const app = new App({ choices: [choice] })

      expect(app.getCurrentChoice()).toBe(choice)
    })
  })
})
