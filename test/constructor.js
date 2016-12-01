const app = require('../zeit.js')
const Zeit = app.default
const assert = require('assert')

describe('Constructor', function () {
  it ('should be able to initialize with year and month and date', function (done) {
    const zeit = new Zeit(2016, 0, 1)
    assert.equal(zeit.year, 2016)
    assert.equal(zeit.month, 0)
    assert.equal(zeit.date, 1)
    done()
  })

  it ('should be able to initialize with year and month', function (done) {
    const zeit = new Zeit(2016, 0)
    assert.equal(zeit.year, 2016)
    assert.equal(zeit.month, 0)
    assert.equal(zeit.date, 1)
    done()
  })

  it('should be able to get value', function (done) {
    const date = new Date(2016, 0, 1)
    const zeit = new Zeit(date)
    assert.equal(zeit.value.getTime(), date.getTime())
    done()
  })

  it ('should be able to set value', function (done) {
    const zeit = new Zeit()
    const date = new Date(2016, 11, 1)
    zeit.value = date
    assert.equal(zeit.year, date.getFullYear())
    done()
  })

  it ('should be able to initialize with null value', function (done) {
    const zeit = new Zeit(null)
    assert.equal(typeof zeit.value.getTime(), 'number')
    zeit.value = null
    assert.equal(typeof zeit.value.getTime(), 'number')
    done()
  })

  it ('should be able to set null', function (done) {
    const zeit = new Zeit()
    zeit.value = null
    assert.equal(typeof zeit.value.getTime(), 'number')
    done()
  })

  it ('should be able to initialize with zeit', function (done) {
    const zeit = new Zeit()
    zeit.value = new Zeit()
    assert.equal(typeof zeit.value.getTime(), 'number')
    done()
  })
  it ('should be able to handle nested constructor', function (done) {
    const zeit = new Zeit (new Zeit(2016, 0, 1))
    assert.equal(zeit.year, 2016)
    assert.equal(zeit.month, 0)
    assert.equal(zeit.date, 1)
    done()
  })
})
