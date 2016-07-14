
import expect from 'expect'
import { toSeconds, padd, humanize } from '../src/js/util'

describe('util', () => {
  describe('toSeconds()', () => {
    it('must return integer if multiple of 1000', () => {
      expect(toSeconds(1000)).toBe(1)
    })

    it('must return float if not multiple of 1000', () => {
      expect(toSeconds(1300)).toBe(1.3)
    })
  })

  describe('padd()', () => {
    it('must return original if str.length = padd digit', () => {
      const str = 'abc'
      expect(padd(str, 3)).toBe(str)
    })

    it('must return padded string if str too short', () => {
      const num = 10
      expect(padd(num, 4)).toBe('0010')
    })
  })

  describe('humanize()', () => {
    it('must return 00:00 if 0', () => {
      expect(humanize(0)).toBe('00:00')
    })

    it('must floor minutes', () => {
      expect(humanize(119)).toInclude('01:')
      expect(humanize(60)).toInclude('01:')
      expect(humanize(59)).toInclude('00:')
    })

    it('must round seconds', () => {
      expect(humanize(119)).toInclude(':59')
      expect(humanize(60)).toInclude(':00')
    })
  })
})
