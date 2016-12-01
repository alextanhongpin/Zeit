const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')

describe('Day methods', function () {
  // Take January 1 as a baseline
  // Day: Friday
  // DAy Int = 5
  const sampleData = [
    {
      label: 'January 1, 2016, Friday',
      date: new Date(2016, 0, 1),
      dayInt: 5,
      dayStart: new Date(2016, 0, 1).setHours(0, 0, 0, 0),
      dayEnd: new Date(2016, 0, 1).setHours(23, 59, 59, 999),
      dayStringShort: 'Fri',
      dayStringLong: 'Friday',
      isToday: false
    },
    {
      label: 'February 1, 2016, Monday',
      date: new Date(2016, 1, 1),
      dayInt: 1,
      dayStart: new Date(2016, 1, 1).setHours(0, 0, 0, 0),
      dayEnd: new Date(2016, 1, 1).setHours(23, 59, 59, 999),
      dayStringShort: 'Mon',
      dayStringLong: 'Monday',
      isToday: false
    }
  ]

  it ('should return the day in int (0 - 6)', function (done) {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.day, data.dayInt)
    })
    done()
  })

  it ('should return 12 A.M. as the start of the day', function (done) {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.dayStart.getTime(), data.dayStart)
    })
    done()
  })
  it ('should return 11:59 P.M. as the end of the day', function (done) {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.dayEnd.getTime(), data.dayEnd)
    })
    done()
  })

  it ('should return the short day string', function (done) {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.dayStringShort, data.dayStringShort)
    })
    done()
  })
  it ('should return the long day string', function (done) {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.dayStringLong, data.dayStringLong)
    })
    done()
  })

  it ('should return the current day of the year')
  it ('should return the number of days in a month, starting from the 1st of the month')
  it ('should return the number of days in a month, starting from the 1st monday of the week')
  it ('should return the number of days in a year')
})