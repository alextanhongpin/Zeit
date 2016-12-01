const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')

describe('Year', function () {
  let zeit = null
  const year = 2016
  const month = 0
  const date = 1
  let newdate = null
  let day = null
  beforeEach((done) => {
    newdate = new Date(year, month, date)
    zeit = new Zeit(newdate)
    day = newdate.getDay()
    done()
  })
  it ('should return the current year', function (done) {
    assert.equal(year, zeit.year)
    done()
  })
  it ('should return the year start', function (done) {
    assert.equal(newdate.getHours(), zeit.yearStart.getHours())
    done()
  })
  it ('should return the year end', function (done) {
    assert.equal(new Date(2016, 11, 31).setHours(23, 59, 59, 999), zeit.yearEnd.getTime())
    done()
  })
  it ('should return the year start offset', function (done) {
    assert.equal(zeit.yearStartOffset.getTime(), new Date(2015, 11, 28).getTime())
    done()
  })
  it ('should return the year end offset', function (done) {
    assert.equal(zeit.yearEndOffset.getTime(), new Date(2017, 0, 1).setHours(23, 59, 59, 999))
    done()
  })
})

// const zeit = new Zeit(2016, 0, 1)
// console.log('zeit.year', zeit.year)
// console.log('zeit.yearStart', zeit.yearStart)
// console.log('zeit.yearEnd', zeit.yearEnd)
// console.log('zeit.yearStartOffset', zeit.yearStartOffset)
// console.log('zeit.yearEndOffset', zeit.yearEndOffset)