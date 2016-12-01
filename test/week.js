const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')
  describe('Week', function () {
    let zeit = null
    const year = 2016
    const month = 0
    const date = 4
    let newdate = null
    let day = null
    beforeEach((done) => {
      newdate = new Date(year, month, date)
      zeit = new Zeit(newdate)
      day = newdate.getDay()
      done()
    })
    it('should return the correct week', function (done) {
      assert.equal(zeit.weekOfTheYear, 2)
      done()
    })

    it ('should return the start of the week', function (done) {
      assert.equal(new Date(2016, 0, 4).getTime(), zeit.weekStart.getTime())
      done()
    })
    it ('should return the end of the week', function (done) {
      const endOfTheWeek = new Date(2016, 0, 10).setHours(23, 59, 59, 999)
      assert.equal(endOfTheWeek, zeit.weekEnd.getTime())
      done()
    })
    it ('should return the week array', function (done) {
      const array = zeit.weekArray
      assert.equal(array.length, 7)
      assert.equal(array[0].getTime(), zeit.weekStart.getTime())
      assert.equal(array[array.length - 1].getTime(), new Date(zeit.weekEnd.getTime()).setHours(0, 0, 0, 0))
      done()
    })
  })