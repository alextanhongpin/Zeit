const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')


describe('Conditionals', function () {
  it ('should return a boolean to indicate if it is today', function (done) {
    const zeit = new Zeit()
    assert.equal(zeit.isToday, true)
    done()
  })
  it ('should return a boolean to indicate if it is this week', function (done) {
    const zeit = new Zeit()
    assert.equal(zeit.isThisWeek, true)
    done()
  })
  it ('should return a boolean to indicate if it is this month', function (done) {
    const zeit = new Zeit()
    assert.equal(zeit.isThisMonth, true)
    done()
  })
  it ('should return a boolean to indicate if it is this year', function (done) {
    const zeit = new Zeit()
    assert.equal(zeit.isThisYear, true)
    done()
  })
})