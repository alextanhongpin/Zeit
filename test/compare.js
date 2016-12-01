const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')

describe('Compare', function () {
  it ('should return true for correct comparison', function (done) {
    const zeit = new Zeit(2016, 0, 1)
    const date1 = new Date(2016, 0, 1)
    const date2 = new Date(2016, 0, 1)
    assert.equal(zeit.compareTo(date1), true)
    assert.equal(Zeit.compareWith(date1, date2), true)
    assert.equal(Zeit.compareWith(zeit, date2), true)
    done()
  })
  it ('should return false for incorrect comparison', function (done) {
    const zeit = new Zeit(2016, 0, 1)
    const date1 = new Date(2016, 0, 1)
    const date2 = new Date(2016, 1, 11)
    assert.equal(zeit.compareTo(date2), false)
    assert.equal(Zeit.compareWith(date1, date2), false)
    done()
  })
})
