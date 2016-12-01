const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')

describe('Month', function () {
  let zeit = null
  const year = 2016
  const month = 0
  const date = 1
  let newdate = null
  let day = null
  const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Jul', 'August', 'September', 'October', 'November', 'December']
  const monthStart = new Date(2016, 0, 1) // Jan 1
  const monthEnd = new Date(2016, 0, 31) // Jan 31
  const monthStartOffset = new Date(2015, 11, 28) // Mon, Dec 28, 2015
  const monthEndOffset = new Date(2016, 0, 31) // Sat, Jan 31, 2016
  const daysInAMonthOffset = 35
  const daysInAMonth = 31
  beforeEach((done) => {
    newdate = new Date(year, month, date)
    zeit = new Zeit(newdate)
    day = newdate.getDay()
    done()
  })
  it ('should return the current month', function (done) {
    assert.equal(month, zeit.month)
    done()
  })
  it ('should return the correct month string short', function (done) {
    assert.equal(monthShort[month], zeit.monthStringShort)
    done()
  })
  it ('should return the correct month string long', function (done) {
    assert.equal(monthLong[month], zeit.monthStringLong)
    done()
  })
  it ('should return the month start', function (done) {
    assert.equal(monthStart.getTime(), zeit.monthStart.getTime())
    done()
  })
  it ('should return the month end', function (done) {
    assert.equal(monthEnd.setHours(23, 59, 59, 999), zeit.monthEnd.getTime())
    done()
  })
  it ('should return the month start offset', function (done) {
    assert.equal(monthStartOffset.getTime(), zeit.monthStartOffset.getTime())
    done()
  })
  it ('should return the month end offset', function (done) {
    assert.equal(monthEndOffset.setHours(23, 59, 59, 999), zeit.monthEndOffset.getTime())
    done()
  })
  it ('should return the correct days in a month offset', function (done) {
    assert.equal(daysInAMonthOffset, zeit.daysInAMonthOffset)
    done()
  })
  it ('should return the correct days in a month', function (done) {
    assert.equal(daysInAMonth, zeit.daysInAMonth)
    done()
  })
  it ('should return the correct month array')
  it ('should return the correct month offset array')
  it ('should return the first day of the prev month', function (done) {
    assert.equal(new Date(zeit.monthNext).getMonth(), newdate.getMonth() + 1)
    done()
  })
  it ('should return the first day of the next month', function (done) {
    assert.equal(new Date(zeit.monthPrev).getMonth(), 12 + newdate.getMonth() - 1)
    done()
  })
})

// const zeit = new Zeit(2016, 0, 1)
// console.log('zeit.month', zeit.month)
// console.log('zeit.monthStringShort', zeit.monthStringShort)
// console.log('zeit.monthStringLong', zeit.monthStringLong)
// console.log('zeit.monthStart', zeit.monthStart)
// console.log('zeit.monthEnd', zeit.monthEnd)
// console.log('zeit.monthStartOffset', zeit.monthStartOffset)
// console.log('zeit.monthEndOffset', zeit.monthEndOffset)
// console.log('zeit.monthPrev', zeit.monthPrev)
// console.log('zeit.monthNext', zeit.monthNext)
// console.log('zeit.daysInAMonth', zeit.daysInAMonth)
// console.log('zeit.monthMid', zeit.monthMid)
// console.log('zeit.daysInAMonthOffset', zeit.daysInAMonthOffset)
