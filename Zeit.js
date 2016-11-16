class Zeit {

  static ONE_DAY = 1000 * 60 * 60 * 24

  static DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  static DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']

  static DAYS_SHORT_ISO_8601 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  static DAYS_LONG_ISO_8601 = ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Monday']

  static MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  static MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  constructor (timestamp = new Date().getTime()) {
    this.date = new Date(timestamp)
  }

  get value () {
    return this.date
  }

  get day () {
    return this.date.getDay()
  }
  get dayShort () {
    return Zeit.DAYS_SHORT[this.day]
  }
  get dayLong () {
    return Zeit.DAYS_LONG[this.day]
  }
  // Day Methods
  get dayStart () {
    return new Date(this.date.setHours(0, 0, 0, 0))
  }
  get dayEnd () {
    return new Date(this.date.setHours(23, 59, 59, 999))
  }
  get isToday () {
    return this.dayStart === new Date().setHours(0, 0, 0, 0)
  }

  // Get the current week of the year
  get week () {
    const yearStart = this.yearStartOffset.getTime()
    const weekStart = this.weekStart.getTime()
    return (weekStart - yearStart) / (Zeit.ONE_DAY * 7)
  }
  // Week methods
  get weekStart () {
    const date = this.date.getDate()
    const dayElapsed = this.date.getDay() === 0 ? 6 : this.date.getDay() - 1
    return new Date(new Date(this.date.setDate(date - dayElapsed)).setHours(0, 0, 0, 0))
  }

  get weekEnd () {
    return new Date(this.weekStart.getTime() + Zeit.ONE_DAY * 7 - 1)
  }

  get weekCount () {
    return 7
  }

  get weekArray () {
    const start = this.weekStart
    return Array(7).fill(0).map((_, index) => {
      return new Date(new Date(start).setDate(start.getDate() + index))
    })
  }

  get isThisWeek () {
    const zeit = new Zeit()
    return zeit.week === this.week
  }

  get month () {
    return this.date.getMonth()
  }
  get monthString () {
    return Zeit.MONTHS_SHORT[this.month]
  }
  get monthStringLong () {
    return Zeit.MONTHS_LONG[this.month]
  }

  get monthStart () {
    return new Date(this.year, this.month, 1)
  }

  get monthEnd () {
    return new Date(new Date(this.year, this.month, this.monthCount - 1).setHours(23, 59, 59, 999))
  }

  get monthStartOffset () {
    const zeit = new Zeit(this.monthStart)
    return zeit.weekStart
  }

  get monthEndOffset () {
    const zeit = new Zeit(this.monthEnd)
    return zeit.weekEnd
  }

  get monthCount () {
    return new Date(this.year, this.month + 1, 0).getDate()
  }

  get monthCountOffset () {
    return ((this.monthEndOffset.setHours(0, 0, 0, 0) + Zeit.ONE_DAY) - this.monthStartOffset) / Zeit.ONE_DAY
  }

  get monthArray () {
    console.log(this.monthCount)
    return Array(this.monthCount).fill(0).map((_, index) => {
      return new Date(this.year, this.month, 1 + index)
    })
  }

  get monthOffsetArray () {
    return Array(this.monthCountOffset).fill(0).map((_, index) => {
      return new Date(this.monthStartOffset.setDate(index + this.monthStartOffset.getDate()))
    })
  }

  get isThisMonth () {
    const zeit = new Zeit()
    return this.year === zeit.year && this.month === zeit.month && this.getDate() === zeit.getDate()
  }

  get year () {
    return this.date.getFullYear()
  }

  get isThisYear () {
    const zeit = new Zeit()
    return this.year === zeit.year
  }

  get isLeapYear () {
    return this.yearCount === 366
  }

  get yearCount () {
    const start = new Date(this.year, 0, 1)
    const end = new Date(this.year + 1, 0, 1)
    return (end - start) / Zeit.ONE_DAY
  }
  get yearStart () {
    return new Date(this.year, 0, 1)
  }

  get yearEnd () {
    return new Date(this.year, 11, 31)
  }

  get yearStartOffset () {
    const zeit = new Zeit(this.yearStart)
    return zeit.weekStart
  }

  get yearEndOffset () {

  }
  get yearArray () {
  }
}
export default Zeit
