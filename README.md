
# module-boilerplate
Boilerplate to create js library


### Usage

```javascript
const zeit = new Zeit()

// Extend the date object
const zeit = new Zeit(new Date(2016, 0, 1))

// Setter 
zeit.value = new Date()

// Getter
console.log(zeit.value)
// Wed Nov 16 2016 16:08:50 GMT+0800 (MYT)
```


### Day

```javascript
console.log('zeit.date', zeit.date) // 16
console.log('zeit.day', zeit.day) // 3
console.log('zeit.dayShort', zeit.dayShort) // Wed
console.log('zeit.dayLong', zeit.dayLong) // Wednesday
console.log('zeit.dayStart', zeit.dayStart) // Wed Nov 16 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.dayEnd', zeit.dayEnd) // Wed Nov 16 2016 23:59:59 GMT+0800 (MYT)
```

### Week
```javascript
console.log('zeit.week', zeit.week) // 46
console.log('zeit.weekStart', zeit.weekStart) // Mon Nov 14 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.weekEnd', zeit.weekEnd) // Sun Nov 20 2016 23:59:59 GMT+0800 (MYT)
console.log('zeit.weekArray', zeit.weekArray)
console.log('zeit.weekOfTheYearArray', zeit.weekOfTheYearArray)
```

### Month
```javascript
console.log('zeit.month', zeit.month) // 10
console.log('zeit.monthString', zeit.monthString) // Nov
console.log('zeit.monthStringLong', zeit.monthStringLong) // November
console.log('zeit.monthStart', zeit.monthStart) // Tue Nov 01 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.monthEnd', zeit.monthEnd) // Tue Nov 29 2016 23:59:59 GMT+0800 (MYT)
console.log('zeit.monthStartOffset', zeit.monthStartOffset) // Mon Oct 31 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.monthEndOffset', zeit.monthEndOffset) // Sun Dec 04 2016 23:59:59 GMT+0800 (MYT)
console.log('zeit.monthCountOffset', zeit.monthCountOffset) // 35
console.log('zeit.monthMid', zeit.monthMid) // Tue Nov 15 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.monthArray', zeit.monthArray)
console.log('zeit.monthOffsetArray', zeit.monthOffsetArray)
console.log('zeit.monthCalendar', zeit.monthCalendar)
console.log('zeit.nextMonth', zeit.nextMonth) // Thu Dec 01 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.prevMonth', zeit.prevMonth) // Sat Oct 01 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.calendar', zeit.calendar)
```

### Year
```javascript
console.log('zeit.year', zeit.year) // 2016
console.log('zeit.yearStart', zeit.yearStart) // Fri Jan 01 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.yearEnd', zeit.yearEnd) // Sat Dec 31 2016 00:00:00 GMT+0800 (MYT)
console.log('zeit.yearStartOffset', zeit.yearStartOffset) //  Mon Dec 28 2015 00:00:00 GMT+0800 (MYT)
console.log('zeit.yearEndOffset', zeit.yearEndOffset) // Sun Jan 01 2017 23:59:59 GMT+0800 (MYT)
```

### Booleans

```javascript
console.log('zeit.isToday', zeit.isToday) // true
console.log('zeit.isThisWeek', zeit.isThisWeek) // true
console.log('zeit.isThisMonth', zeit.isThisMonth) // true
console.log('zeit.isThisYear', zeit.isThisYear) // true
console.log('zeit.isLeapYear', zeit.isLeapYear) // true
```

### Counts 
```javascript
console.log('zeit.daysInAYear', zeit.daysInAYear) // 366
console.log('zeit.daysInTheMonth', zeit.daysInTheMonth) // 30
console.log('zeit.dayOfTheYear', zeit.dayOfTheYear) // 320

console.log('zeit.weeksInAYear', zeit.weeksInAYear) // 52
console.log('zeit.weekOfTheYear', zeit.weekOfTheYear) 
console.log('zeit.weekOfTheMonth', zeit.weekOfTheMonth) // 3

console.log('zeit.progress', zeit.progress) // 86.88524590163934
```

