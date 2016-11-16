class Zeit {

  static ONE_DAY = 1000 * 60 * 60 * 24

  static DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  static DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  static DAYS_SHORT_ISO_8601 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  static DAYS_LONG_ISO_8601 = ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Monday']

  static MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  static MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  static ValidateDate (value) {
    if (Object.prototype.toString.call(value) === "[object Date]") {
      if (!isNaN(value.getTime())) return true
    }
    return false
  }
    // @Bool returns a boolean to validate if the current week is the first iso week
  static validateISOWeek (weekStart) {
    // check if the first day is monday
    const isMonday = new Date(weekStart).getDay() === 1
    if (!isMonday) return false
    // have 4 or more days in January
    const weekArray = Array(7).fill(0).map((_, index) => {
      return weekStart.setHours(0, 0, 0, 0) + Zeit.ONE_DAY * index
    })
    const numberOfDaysInJanuary = weekArray.filter((date) => {
      return new Date(date).getMonth() === 0
    })
    if (numberOfDaysInJanuary.length < 4) {
      return false
    }

    // map to date array
    const dateArray = weekArray.map((date) => {
      return new Date(date).getDate()
    })
    // has January 4 in it
    const hasJanuaryFour = dateArray.includes(4)
    if (!hasJanuaryFour) return false
    return true
  }

  constructor (date = new Date()) {
    if (date instanceof Date) {
      if (Zeit.ValidateDate(date)) {
        this._date = date
      } else {
        throw new Error('ZeitError: Invalid date')
      }
    } else {
      const timestampToDate = new Date(date)
      if (Zeit.ValidateDate(timestampToDate)) {
        this._date = timestampToDate
      } else {
        throw new Error('ZeitError: Invalid date')
      }
    }
  }

  // @Date getter for the date object
  get value () {
    return this._date
  }

  // @Date setter for the date object
  set value (date = new Date()) {
    if (date instanceof Date) {
      if (Zeit.ValidateDate(date)) {
        this._date = date
      } else {
        throw new Error('ZeitError: Invalid date')
      }
    } else {
      const timestampToDate = new Date(date)
      if (Zeit.ValidateDate(timestampToDate)) {
        this._date = timestampToDate
      } else {
        throw new Error('ZeitError: Invalid date')
      }
    }
  }

  // @Date returns the date of the month
  get date () {
    return this._date.getDate()
  }

  // @Int returns the current day of the week (0-6)
  get day () {
    return this._date.getDay()
  }

  // @String returns the short day string (Mon-Sat)
  get dayShort () {
    return Zeit.DAYS_SHORT[this.day]
  }

  // @String returns the long day string (Monday-Saturday)
  get dayLong () {
    return Zeit.DAYS_LONG[this.day]
  }

  // @Date returns the start of the day, with hours, minutes and seconds reset to 00:00:00
  get dayStart () {
    return new Date(this._date.setHours(0, 0, 0, 0))
  }

  // @Date returns the end of the day, with hours, minutes and seconds reset to 11:59:59 P.M.
  get dayEnd () {
    return new Date(this._date.setHours(23, 59, 59, 999))
  }

  // @Bool returns a boolean to indicate if it is today
  get isToday () {
    return this.dayStart.getTime() === new Date().setHours(0, 0, 0, 0)
  }

  // @Int returns the current day of the year (1-365)
  get dayOfTheYear () {
    const start = this.yearStart
    const now = this.dayStart
    const difference = (now - start) / Zeit.ONE_DAY
    return difference
  }

  // @Int returns the number of days in a month
  get daysInTheMonth () {
    return new Date(this.year, this.month + 1, 0).getDate()
  }

  /*
   * Week
  **/

  // @Int returns the current non-iso week of the year (1-52/53)
  get week () {
    const yearStart = this.yearStartOffset.getTime()
    const weekStart = this.weekStart.getTime()
    return (weekStart - yearStart) / (Zeit.ONE_DAY * 7)
  }


  // @Date returns the start of the current week 
  get weekStart () {
    const date = this._date.getDate()
    const dayElapsed = this._date.getDay() === 0 ? 6 : this._date.getDay() - 1
    return new Date(new Date(this._date.setDate(date - dayElapsed)).setHours(0, 0, 0, 0))
  }

  // @Date returns the end of the current week 
  get weekEnd () {
    return new Date(this.weekStart.getTime() + Zeit.ONE_DAY * 7 - 1)
  }

  // @Date get the first week of the year
  get weekStartOfTheYear () {
    let start = this.yearStartOffset
    while (!Zeit.validateISOWeek(start)) {
      start = new Zeit(new Date(start.getTime() + Zeit.ONE_DAY * 7)).weekStart
    }
    return start
  }

  // @Int returns ISO-8601 the number of iso weeks in a year (1-52)
  get weeksInAYear () {
    // ISO Week starts with Monday
    // First week:
    // have 4 or more days in January
    // Its first day is the Monday nearest to 1 January.
    // It has 4 January in it. Hence the earliest possible dates are 29 December through 4 January, the latest 4 through 10 January.
    // It has the year's first working day in it, if Saturdays, Sundays and 1 January are not working days.
    const start = this.weekStartOfTheYear
    const end = this.yearEndOffset.setHours(0, 0, 0, 0) + Zeit.ONE_DAY
    return (end - start) / (Zeit.ONE_DAY * 7)
  }



  // @Array[Date] returns an array of dates from the start to the end to the end of the week
  get weekArray () {
    const start = this.weekStart
    return Array(7).fill(0).map((_, index) => {
      return new Date(new Date(start).setDate(start.getDate() + index))
    })
  }

  // @Array[Date] returns an array of dates from the start to the end to the end of the week
  get weekOfTheMonth () {
    const rows = this.monthCalendar
    const start = this.weekStart
    const row = rows.findIndex((row) => {
      const output = row.findIndex((d) => {
        return d.getTime() === start.getTime()
      })
      return output !== -1
    })
    return row + 1
  }
  // Deprecated, use .week instead
  // // @Int returns the current week of the year
  // get weekOfTheYear () {
  //   const start = this.weekStartOfTheYear.getTime()
  //   const now = new Zeit().weekStart.getTime()
  //   const diff = now - start
  //   return diff / (Zeit.ONE_DAY * 7)
  // }

  // @Array[Date] returns the array for the week of the year
  get weekOfTheYearArray () {
    const weekStartOfTheYear = this.weekStartOfTheYear
    const weeksInAYear = this.weeksInAYear
    return Array(weeksInAYear).fill((0)).map((_, index) => {
      const zeit = new Zeit(weekStartOfTheYear.getTime() + 7 * index * Zeit.ONE_DAY)
      return {
        start: zeit.weekStart,
        end: zeit.weekEnd
      }
    })
  }

  // @Bool returns a boolean to indicate if it is this week
  get isThisWeek () {
    const zeit = new Zeit()
    return zeit.week === this.week
  }
  /*
   * Month
  **/
  // @Int returns the month of the year (0-11)
  get month () {
    return this._date.getMonth()
  }

  // @Int returns the month string of the year (Jan-Dec)
  get monthString () {
    return Zeit.MONTHS_SHORT[this.month]
  }

  // @Int returns the month string of the year (January-December)
  get monthStringLong () {
    return Zeit.MONTHS_LONG[this.month]
  }

  // @Date returns the start of the month, reset to 00:00:00 A.M.
  get monthStart () {
    return new Date(this.year, this.month, 1)
  }

  // @Date returns the end of the month, set to 11:59:59 P.M.
  get monthEnd () {
    return new Date(new Date(this.year, this.month, this.daysInTheMonth - 1).setHours(23, 59, 59, 999))
  }

  // @Date returns the first day of the first week of the month
  get monthStartOffset () {
    const zeit = new Zeit(this.monthStart)
    return zeit.weekStart
  }

  // @Date returns the last day of the last week of the month
  get monthEndOffset () {
    const zeit = new Zeit(this.monthEnd)
    return zeit.weekEnd
  }

  // @Int returns the number of days from the first monday of the first week until the end of the last week of the month
  get monthCountOffset () {
    return ((this.monthEndOffset.setHours(0, 0, 0, 0) + Zeit.ONE_DAY) - this.monthStartOffset) / Zeit.ONE_DAY
  }

  // @Date returns the middle date of the month
  get monthMid () {
    return new Date(this.year, this.month, Math.floor(this.daysInTheMonth / 2))
  }

  // @Array[Date] returns an array of the dates for this month
  get monthArray () {
    return Array(this.daysInTheMonth).fill(0).map((_, index) => {
      return new Date(this.year, this.month, 1 + index)
    })
  }
  // @Array[Date] returns an array of the dates for this month from
  // the first week of the month starting from monday to the last 
  // week of the month ending with Saturday
  get monthOffsetArray () {
    return Array(this.monthCountOffset).fill(0).map((_, index) => {
      return new Date(this.monthStartOffset.setDate(index + this.monthStartOffset.getDate()))
    })
  }

  // @Array[Date] returns an array of the date for this month
  get monthCalendar () {
    const monthData = this.monthOffsetArray
    const rows = monthData.length / 7
    return Array(rows).fill(0).map((_) => {
      return monthData.splice(0, 7)
    })
  }

  // @Array[Date] returns the calendar data for a particular month
  get calendar () {
    const data = this.monthCalendar
    const monthMid = this.monthMid
    const weekStart = this.weekStart
    return data.map((rows) => {
      const rowWeekStart = rows[0].getTime()
      const output = rows.map((column) => {
        const zeit = new Zeit(column)
        return {
          isToday: zeit.isToday,
          isThisMonth: zeit.isThisCalendarMonth(monthMid),
          data: column
        }
      })
      return {
        isThisWeek: rowWeekStart === this.weekStart.setHours(0, 0, 0, 0),
        data: output
      }
    })
  }

  get nextMonth () {
    return new Date(this.year, this.month + 1, 1)
  }

  get prevMonth () {
    return new Date(this.year, this.month - 1, 1)
  }
  // @Bool returns a boolean to indicate if it is this month
  get isThisMonth () {
    const zeit = new Zeit()
    return this.year === zeit.year && this.month === zeit.month
  }

  // @Bool isThisCalendarMonth() is a method to compare if the
  // date is this calendar month
  isThisCalendarMonth (midOfTheMonth = new Date()) {
    const zeit = new Zeit(midOfTheMonth)
    return this.year === zeit.year && this.month === zeit.month
  }

  /*
   * Year
  **/

  // @Int returns the current year
  get year () {
    return this._date.getFullYear()
  }

  // @Bool returns the state of this year
  get isThisYear () {
    return this.year === new Date().getFullYear()
  }

  // @Bool returns boolean to indicate if this year is a leap year
  get isLeapYear () {
    // A leap year has 366 days
    return this.yearCount === 366
  }

  // @Int returns the number of days in a year
  get yearCount () {
    const start = new Date(this.year, 0, 1)
    const end = new Date(this.year + 1, 0, 1)
    return (end - start) / Zeit.ONE_DAY
  }

  // @Date returns the start of this year
  get yearStart () {
    return new Date(this.year, 0, 1)
  }

  // @Date returns the end of the year
  get yearEnd () {
    return new Date(this.year, 11, 31)
  }

  // @Date returns the first day of the first iso week of the year
  get yearStartOffset () {
    const zeit = new Zeit(this.yearStart)
    return new Date(zeit.weekStart)
  }

  // @Date returns the last day of the last iso week of the year
  get yearEndOffset () {
    const zeit = new Zeit(this.yearEnd)
    return new Date(zeit.weekEnd)
  }

  // @Float returns the percentage of the current day of the year
  get progress () {
    return this.dayOfTheYear / this.yearCount * 100
  }
}

export default Zeit


// Deprecated yearProgress -> dayOfTheYear