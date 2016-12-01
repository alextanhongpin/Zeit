const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')


describe('Date methods', function () {

  it ('should return the correct date', function (done) {
    const zeit = new Zeit(2016, 0, 1)
    assert.equal(zeit.date, 1)
    done()
  })
})