const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')

describe('Count', function () {
  let zeit = null
  const year = 2016
  const month = 0
  const date = 1
  let newdate = null
  let day = null

  const sampleData = [
    {
      date: new Date(2016, 0, 1),
      daysInAYear: 366,
      daysInAMonth: 31,
      daysInAMonthOffset: 35,
      dayOfTheYear: 1,
      weeksInAYear: 52,
      weekOfTheYear: 1,
      weekOfTheMonth: 1
    },
    {
      date: new Date(2016, 1, 1),
      daysInAYear: 366,
      daysInAMonth: 29,
      daysInAMonthOffset: 35,
      dayOfTheYear: 32,
      weeksInAYear: 52,
      weekOfTheYear: 6,
      weekOfTheMonth: 1
    },
    {
      date: new Date(2017, 0, 1),
      daysInAYear: 365,
      daysInAMonth: 31,
      daysInAMonthOffset: 42,
      dayOfTheYear: 1,
      weeksInAYear: 52,
      weekOfTheYear: 1,
      weekOfTheMonth: 1
    }
  ]

  it ('should return the number of days in a year', (done) => {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.daysInAYear, data.daysInAYear)
    })
    done()
  })
  it ('should return the number of days in this month', (done) => {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.daysInAMonth, data.daysInAMonth)
    })
    done()
  })
  it ('should return the correct days in a month offset', (done) => {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.daysInAMonthOffset, data.daysInAMonthOffset)
    })
    done()
  })
  it ('should return the correct day of the year', (done) => {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.dayOfTheYear, data.dayOfTheYear)
    })
    done()
  })
  it ('should return the weeks in a year', (done) => {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.weeksInAYear, data.weeksInAYear)
    })
    done()
  })
  it ('should return the week of the year', (done) => {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.weekOfTheYear, data.weekOfTheYear)
    })
    done()
  })
  it ('should return the week of the month', (done) => {
    sampleData.forEach((data) => {
      const zeit = new Zeit(data.date)
      assert.equal(zeit.weekOfTheMonth, data.weekOfTheMonth)
    })
    done()
  })
})