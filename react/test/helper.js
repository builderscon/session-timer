
import expect from 'expect'
import expectJSX from 'expect-jsx'
import { jsdom } from 'jsdom'

before(() => {
  expect.extend(expectJSX)
})

beforeEach(() => {
  global.document = jsdom('<!DOCTYPE html><html><body></body></html>')
  global.window = document.defaultView
})

afterEach(() => {
  expect.restoreSpies()
})
