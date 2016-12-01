
# Zeit.js

`Zeit.js` (`Zeit` stands for time in German language) is a library for datetime calculation. It's not meant for a replacement for `moment.js`. Rather it's a toolkit that you'll appreciate when doing heavy datetime calculation, such as creating a custom calendar, working with timeseries data, or calculating range of dates.

### Initializing a new object

```javascript
// Innitialize without values, it is the same as `new Date()`
const zeit = new Zeit()

// Initialize with the date object
const zeit = new Zeit(new Date(2016, 0, 1)) 

// Initialize with year and month
const zeit = new Zeit(2016, 0)

// Initialize with year, month and date
const zeit = new Zeit(2016, 0, 31)

// Initialize with timestamp
const zeit = new Zeit(1480562888484)

// Setter, you can optionally set the date later
zeit.value = new Date()

// Getter, this is how you access back the original date object value
console.log(zeit.value) // Thu Dec 01 2016 11:16:27 GMT+0800 (MYT)
console.log(zeit.now) // 1480562166515, Timestamp 
```

### Comparison with the Date Object

```javascript
// This is how it will look like when you use the JavaScript date object
const date = new Date(2016, 0, 1)
const year = date.getFullYear() // 2016
const month = date.getMonth() // 0
// The reason I pick zeit is to avoid this conflict in naming :)
const date1 = date.getDate() // 1

// With Zeit.js
const zeit = new Zeit(2016, 0, 1)
const year = zeit.year // 2016
const month = zeit.month // 0
const date = zeit.date // 1
```

### Date

```javascript
const zeit = new Zeit(2016, 0, 1)
console.log(zeit.date) // prints 1 
```

### Day

A list of getters for day

```javascript
const zeit = new Zeit(2016, 0, 1)
console.log('zeit.day', zeit.day) // 5
console.log('zeit.dayStart', zeit.dayStart) // Fri Jan 01 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.dayEnd', zeit.dayEnd) // Fri Jan 01 2016 23:59:59 GMT+0800 (MYT)
console.log('zeit.dayStringShort', zeit.dayStringShort) // Fri
console.log('zeit.dayStringLong', zeit.dayStringLong) // Friday
console.log('zeit.daysInAMonth', zeit.daysInAMonth) // 31
console.log('zeit.daysInAMonthOffset', zeit.daysInAMonthOffset) // 35
```

### Week

```javascript
console.log('zeit.weekStart', zeit.weekStart) // Mon Nov 14 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.weekEnd', zeit.weekEnd) // Sun Nov 20 2016 23:59:59 GMT+0800 (MYT)
console.log('zeit.weekArray', zeit.weekArray)
console.log('zeit.weekOfTheYearArray', zeit.weekOfTheYearArray)
console.log('zeit.weekOfTheYear', zeit.weekOfTheYear) // 46
```

### Month

```javascript
const zeit = new Zeit (2016, 0, 1)

console.log('zeit.month', zeit.month) // 0
console.log('zeit.monthStringShort', zeit.monthStringShort) // Jan
console.log('zeit.monthStringLong', zeit.monthStringLong) // January
console.log('zeit.monthStart', zeit.monthStart) // 2015-12-31T16:00:00.000Z
console.log('zeit.monthEnd', zeit.monthEnd) // 2016-01-31T15:59:59.999Z
console.log('zeit.monthStartOffset', zeit.monthStartOffset) // 2015-12-27T16:00:00.000Z
console.log('zeit.monthEndOffset', zeit.monthEndOffset) // 2016-01-31T15:59:59.999Z
console.log('zeit.monthMid', zeit.monthMid) // 2016-01-14T16:00:00.000Z
console.log('zeit.nextMonth', zeit.nextMonth) // 2016-01-31T16:00:00.000Z
console.log('zeit.prevMonth', zeit.prevMonth) // 2015-11-30T16:00:00.000Z
console.log('zeit.calendar', zeit.calendar)
console.log('zeit.monthArray', zeit.monthArray)
console.log('zeit.monthOffsetArray', zeit.monthOffsetArray)
console.log('zeit.monthCalendar', zeit.monthCalendar)
```

### Year
```javascript
const zeit = new Zeit (2016, 0, 1)

console.log('zeit.year', zeit.year) // 2016
console.log('zeit.yearStart', zeit.yearStart) // 2015-12-31T16:00:00.000Z
console.log('zeit.yearEnd', zeit.yearEnd) // 2016-12-31T15:59:59.999Z
console.log('zeit.yearStartOffset', zeit.yearStartOffset) //  2015-12-27T16:00:00.000Z
console.log('zeit.yearEndOffset', zeit.yearEndOffset) // 2017-01-01T15:59:59.999Z
```

### Booleans

```javascript
const zeit = new Zeit (2016, 0, 1)

console.log('zeit.isToday', zeit.isToday) // false
console.log('zeit.isThisWeek', zeit.isThisWeek) // false
console.log('zeit.isThisMonth', zeit.isThisMonth) // false
console.log('zeit.isThisYear', zeit.isThisYear) // true
console.log('zeit.isLeapYear', zeit.isLeapYear) // true
```

### Counts 

```javascript
console.log('zeit.daysInAYear', zeit.daysInAYear) // 366
console.log('zeit.daysInAMonth', zeit.daysInTheMonth) // 30
console.log('zeit.daysInAMonthOffset', zeit.daysInAMonthOffset) // 30
console.log('zeit.dayOfTheYear', zeit.dayOfTheYear) // 320

console.log('zeit.weeksInAYear', zeit.weeksInAYear) // 52
console.log('zeit.weekOfTheYear', zeit.weekOfTheYear) 
console.log('zeit.weekOfTheMonth', zeit.weekOfTheMonth) // 3

console.log('zeit.progress', zeit.progress) // 86.88524590163934
```

## Use case
### Creating a calendar
```javascript
// This will return an array of dates for this month
const calendar = new Zeit(2016, 0, 1).calendar()
```
### Calculating range of time
When querying a database for a range of time
```javascript
// year
function queryBy (range) {
    const zeit = new Zeit()
    let start = null
    let end = null
    switch (range) {
        case 'year': start = zeit.yearStart; end = zeit.yearEnd; break;
        case 'month': start = zeit.monthStart; end = zeit.monthEnd; break;
        case 'week': start = zeit.weekStart; end = zeit.weekEnd; break;
        case 'day': start = zeit.dayStart; end = zeit.dayEnd; break;
        default: start = zeit.dayStart; end = zeit.dayEnd;
    }
    return db.collection.find({ 
        created_at: {
            '$gte': start,
            '$lte': end
        } 
    })
}
queryBy('date').then((results) => {
    // Do something with date results
})

```
