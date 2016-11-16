(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.app = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Zeit = function () {
    _createClass(Zeit, null, [{
      key: 'ValidateDate',
      value: function ValidateDate(value) {
        if (Object.prototype.toString.call(value) === "[object Date]") {
          if (!isNaN(value.getTime())) return true;
        }
        return false;
      }
    }, {
      key: 'validateISOWeek',
      value: function validateISOWeek(weekStart) {
        var isMonday = new Date(weekStart).getDay() === 1;
        if (!isMonday) return false;

        var weekArray = Array(7).fill(0).map(function (_, index) {
          return weekStart.setHours(0, 0, 0, 0) + Zeit.ONE_DAY * index;
        });
        var numberOfDaysInJanuary = weekArray.filter(function (date) {
          return new Date(date).getMonth() === 0;
        });
        if (numberOfDaysInJanuary.length < 4) {
          return false;
        }

        var dateArray = weekArray.map(function (date) {
          return new Date(date).getDate();
        });

        var hasJanuaryFour = dateArray.includes(4);
        if (!hasJanuaryFour) return false;
        return true;
      }
    }]);

    function Zeit() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      _classCallCheck(this, Zeit);

      if (date instanceof Date) {
        if (Zeit.ValidateDate(date)) {
          this._date = date;
        } else {
          throw new Error('ZeitError: Invalid date');
        }
      } else {
        var timestampToDate = new Date(date);
        if (Zeit.ValidateDate(timestampToDate)) {
          this._date = timestampToDate;
        } else {
          throw new Error('ZeitError: Invalid date');
        }
      }
    }

    _createClass(Zeit, [{
      key: 'isThisCalendarMonth',
      value: function isThisCalendarMonth() {
        var midOfTheMonth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

        var zeit = new Zeit(midOfTheMonth);
        return this.year === zeit.year && this.month === zeit.month;
      }
    }, {
      key: 'value',
      get: function get() {
        return this._date;
      },
      set: function set() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

        if (date instanceof Date) {
          if (Zeit.ValidateDate(date)) {
            this._date = date;
          } else {
            throw new Error('ZeitError: Invalid date');
          }
        } else {
          var timestampToDate = new Date(date);
          if (Zeit.ValidateDate(timestampToDate)) {
            this._date = timestampToDate;
          } else {
            throw new Error('ZeitError: Invalid date');
          }
        }
      }
    }, {
      key: 'date',
      get: function get() {
        return this._date.getDate();
      }
    }, {
      key: 'day',
      get: function get() {
        return this._date.getDay();
      }
    }, {
      key: 'dayShort',
      get: function get() {
        return Zeit.DAYS_SHORT[this.day];
      }
    }, {
      key: 'dayLong',
      get: function get() {
        return Zeit.DAYS_LONG[this.day];
      }
    }, {
      key: 'dayStart',
      get: function get() {
        return new Date(this._date.setHours(0, 0, 0, 0));
      }
    }, {
      key: 'dayEnd',
      get: function get() {
        return new Date(this._date.setHours(23, 59, 59, 999));
      }
    }, {
      key: 'isToday',
      get: function get() {
        return this.dayStart.getTime() === new Date().setHours(0, 0, 0, 0);
      }
    }, {
      key: 'dayOfTheYear',
      get: function get() {
        var start = this.yearStart;
        var now = this.dayStart;
        var difference = (now - start) / Zeit.ONE_DAY;
        return difference;
      }
    }, {
      key: 'daysInTheMonth',
      get: function get() {
        return new Date(this.year, this.month + 1, 0).getDate();
      }
    }, {
      key: 'week',
      get: function get() {
        var yearStart = this.yearStartOffset.getTime();
        var weekStart = this.weekStart.getTime();
        return (weekStart - yearStart) / (Zeit.ONE_DAY * 7);
      }
    }, {
      key: 'weekStart',
      get: function get() {
        var date = this._date.getDate();
        var dayElapsed = this._date.getDay() === 0 ? 6 : this._date.getDay() - 1;
        return new Date(new Date(this._date.setDate(date - dayElapsed)).setHours(0, 0, 0, 0));
      }
    }, {
      key: 'weekEnd',
      get: function get() {
        return new Date(this.weekStart.getTime() + Zeit.ONE_DAY * 7 - 1);
      }
    }, {
      key: 'weekStartOfTheYear',
      get: function get() {
        var start = this.yearStartOffset;
        while (!Zeit.validateISOWeek(start)) {
          start = new Zeit(new Date(start.getTime() + Zeit.ONE_DAY * 7)).weekStart;
        }
        return start;
      }
    }, {
      key: 'weeksInAYear',
      get: function get() {
        var start = this.weekStartOfTheYear;
        var end = this.yearEndOffset.setHours(0, 0, 0, 0) + Zeit.ONE_DAY;
        return (end - start) / (Zeit.ONE_DAY * 7);
      }
    }, {
      key: 'weekArray',
      get: function get() {
        var start = this.weekStart;
        return Array(7).fill(0).map(function (_, index) {
          return new Date(new Date(start).setDate(start.getDate() + index));
        });
      }
    }, {
      key: 'weekOfTheMonth',
      get: function get() {
        var rows = this.monthCalendar;
        var start = this.weekStart;
        var row = rows.findIndex(function (row) {
          var output = row.findIndex(function (d) {
            return d.getTime() === start.getTime();
          });
          return output !== -1;
        });
        return row + 1;
      }
    }, {
      key: 'weekOfTheYearArray',
      get: function get() {
        var weekStartOfTheYear = this.weekStartOfTheYear;
        var weeksInAYear = this.weeksInAYear;
        return Array(weeksInAYear).fill(0).map(function (_, index) {
          var zeit = new Zeit(weekStartOfTheYear.getTime() + 7 * index * Zeit.ONE_DAY);
          return {
            start: zeit.weekStart,
            end: zeit.weekEnd
          };
        });
      }
    }, {
      key: 'isThisWeek',
      get: function get() {
        var zeit = new Zeit();
        return zeit.week === this.week;
      }
    }, {
      key: 'month',
      get: function get() {
        return this._date.getMonth();
      }
    }, {
      key: 'monthString',
      get: function get() {
        return Zeit.MONTHS_SHORT[this.month];
      }
    }, {
      key: 'monthStringLong',
      get: function get() {
        return Zeit.MONTHS_LONG[this.month];
      }
    }, {
      key: 'monthStart',
      get: function get() {
        return new Date(this.year, this.month, 1);
      }
    }, {
      key: 'monthEnd',
      get: function get() {
        return new Date(new Date(this.year, this.month, this.daysInTheMonth - 1).setHours(23, 59, 59, 999));
      }
    }, {
      key: 'monthStartOffset',
      get: function get() {
        var zeit = new Zeit(this.monthStart);
        return zeit.weekStart;
      }
    }, {
      key: 'monthEndOffset',
      get: function get() {
        var zeit = new Zeit(this.monthEnd);
        return zeit.weekEnd;
      }
    }, {
      key: 'monthCountOffset',
      get: function get() {
        return (this.monthEndOffset.setHours(0, 0, 0, 0) + Zeit.ONE_DAY - this.monthStartOffset) / Zeit.ONE_DAY;
      }
    }, {
      key: 'monthMid',
      get: function get() {
        return new Date(this.year, this.month, Math.floor(this.daysInTheMonth / 2));
      }
    }, {
      key: 'monthArray',
      get: function get() {
        var _this = this;

        return Array(this.daysInTheMonth).fill(0).map(function (_, index) {
          return new Date(_this.year, _this.month, 1 + index);
        });
      }
    }, {
      key: 'monthOffsetArray',
      get: function get() {
        var _this2 = this;

        return Array(this.monthCountOffset).fill(0).map(function (_, index) {
          return new Date(_this2.monthStartOffset.setDate(index + _this2.monthStartOffset.getDate()));
        });
      }
    }, {
      key: 'monthCalendar',
      get: function get() {
        var monthData = this.monthOffsetArray;
        var rows = monthData.length / 7;
        return Array(rows).fill(0).map(function (_) {
          return monthData.splice(0, 7);
        });
      }
    }, {
      key: 'calendar',
      get: function get() {
        var _this3 = this;

        var data = this.monthCalendar;
        var monthMid = this.monthMid;
        var weekStart = this.weekStart;
        return data.map(function (rows) {
          var rowWeekStart = rows[0].getTime();
          var output = rows.map(function (column) {
            var zeit = new Zeit(column);
            return {
              isToday: zeit.isToday,
              isThisMonth: zeit.isThisCalendarMonth(monthMid),
              data: column
            };
          });
          return {
            isThisWeek: rowWeekStart === _this3.weekStart.setHours(0, 0, 0, 0),
            data: output
          };
        });
      }
    }, {
      key: 'nextMonth',
      get: function get() {
        return new Date(this.year, this.month + 1, 1);
      }
    }, {
      key: 'prevMonth',
      get: function get() {
        return new Date(this.year, this.month - 1, 1);
      }
    }, {
      key: 'isThisMonth',
      get: function get() {
        var zeit = new Zeit();
        return this.year === zeit.year && this.month === zeit.month;
      }
    }, {
      key: 'year',
      get: function get() {
        return this._date.getFullYear();
      }
    }, {
      key: 'isThisYear',
      get: function get() {
        return this.year === new Date().getFullYear();
      }
    }, {
      key: 'isLeapYear',
      get: function get() {
        return this.yearCount === 366;
      }
    }, {
      key: 'yearCount',
      get: function get() {
        var start = new Date(this.year, 0, 1);
        var end = new Date(this.year + 1, 0, 1);
        return (end - start) / Zeit.ONE_DAY;
      }
    }, {
      key: 'yearStart',
      get: function get() {
        return new Date(this.year, 0, 1);
      }
    }, {
      key: 'yearEnd',
      get: function get() {
        return new Date(this.year, 11, 31);
      }
    }, {
      key: 'yearStartOffset',
      get: function get() {
        var zeit = new Zeit(this.yearStart);
        return new Date(zeit.weekStart);
      }
    }, {
      key: 'yearEndOffset',
      get: function get() {
        var zeit = new Zeit(this.yearEnd);
        return new Date(zeit.weekEnd);
      }
    }, {
      key: 'progress',
      get: function get() {
        return this.dayOfTheYear / this.yearCount * 100;
      }
    }]);

    return Zeit;
  }();

  Zeit.ONE_DAY = 1000 * 60 * 60 * 24;
  Zeit.DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  Zeit.DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  Zeit.DAYS_SHORT_ISO_8601 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  Zeit.DAYS_LONG_ISO_8601 = ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Monday'];
  Zeit.MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  Zeit.MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  exports.default = Zeit;
});
