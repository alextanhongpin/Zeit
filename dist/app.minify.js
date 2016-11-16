(function(global,factory){if(typeof define==='function'&&define.amd){define(['exports'],factory)}else if(typeof exports!=='undefined'){factory(exports)}else{var mod={exports:{}};factory(mod.exports);global.app=mod.exports}})(this,function(exports){'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError('Cannot call a class as a function')}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,'value'in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Zeit=function(){function Zeit(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:new Date;if(_classCallCheck(this,Zeit),!(a instanceof Date)){var b=new Date(a);if(Zeit.ValidateDate(b))this._date=b;else throw new Error('ZeitError: Invalid date')}else if(Zeit.ValidateDate(a))this._date=a;else throw new Error('ZeitError: Invalid date')}return _createClass(Zeit,null,[{key:'ValidateDate',value:function ValidateDate(a){return'[object Date]'!==Object.prototype.toString.call(a)||isNaN(a.getTime())?!1:!0}},{key:'validateISOWeek',value:function validateISOWeek(a){var b=1===new Date(a).getDay();if(!b)return!1;var c=Array(7).fill(0).map(function(h,i){return a.setHours(0,0,0,0)+Zeit.ONE_DAY*i}),e=c.filter(function(h){return 0===new Date(h).getMonth()});if(4>e.length)return!1;var f=c.map(function(h){return new Date(h).getDate()}),g=f.includes(4);return!!g}}]),_createClass(Zeit,[{key:'isThisCalendarMonth',value:function isThisCalendarMonth(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:new Date,b=new Zeit(a);return this.year===b.year&&this.month===b.month}},{key:'value',get:function get(){return this._date},set:function set(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:new Date;if(!(a instanceof Date)){var b=new Date(a);if(Zeit.ValidateDate(b))this._date=b;else throw new Error('ZeitError: Invalid date')}else if(Zeit.ValidateDate(a))this._date=a;else throw new Error('ZeitError: Invalid date')}},{key:'date',get:function get(){return this._date.getDate()}},{key:'day',get:function get(){return this._date.getDay()}},{key:'dayShort',get:function get(){return Zeit.DAYS_SHORT[this.day]}},{key:'dayLong',get:function get(){return Zeit.DAYS_LONG[this.day]}},{key:'dayStart',get:function get(){return new Date(this._date.setHours(0,0,0,0))}},{key:'dayEnd',get:function get(){return new Date(this._date.setHours(23,59,59,999))}},{key:'isToday',get:function get(){return this.dayStart.getTime()===new Date().setHours(0,0,0,0)}},{key:'dayOfTheYear',get:function get(){var a=this.yearStart,b=this.dayStart,c=(b-a)/Zeit.ONE_DAY;return c}},{key:'daysInTheMonth',get:function get(){return new Date(this.year,this.month+1,0).getDate()}},{key:'week',get:function get(){var a=this.yearStartOffset.getTime(),b=this.weekStart.getTime();return(b-a)/(7*Zeit.ONE_DAY)}},{key:'weekStart',get:function get(){var a=this._date.getDate(),b=0===this._date.getDay()?6:this._date.getDay()-1;return new Date(new Date(this._date.setDate(a-b)).setHours(0,0,0,0))}},{key:'weekEnd',get:function get(){return new Date(this.weekStart.getTime()+7*Zeit.ONE_DAY-1)}},{key:'weekStartOfTheYear',get:function get(){for(var a=this.yearStartOffset;!Zeit.validateISOWeek(a);)a=new Zeit(new Date(a.getTime()+7*Zeit.ONE_DAY)).weekStart;return a}},{key:'weeksInAYear',get:function get(){var a=this.weekStartOfTheYear,b=this.yearEndOffset.setHours(0,0,0,0)+Zeit.ONE_DAY;return(b-a)/(7*Zeit.ONE_DAY)}},{key:'weekArray',get:function get(){var a=this.weekStart;return Array(7).fill(0).map(function(b,c){return new Date(new Date(a).setDate(a.getDate()+c))})}},{key:'weekOfTheMonth',get:function get(){var a=this.monthCalendar,b=this.weekStart,c=a.findIndex(function(e){var f=e.findIndex(function(g){return g.getTime()===b.getTime()});return-1!==f});return c+1}},{key:'weekOfTheYearArray',get:function get(){var a=this.weekStartOfTheYear,b=this.weeksInAYear;return Array(b).fill(0).map(function(c,e){var f=new Zeit(a.getTime()+7*e*Zeit.ONE_DAY);return{start:f.weekStart,end:f.weekEnd}})}},{key:'isThisWeek',get:function get(){var a=new Zeit;return a.week===this.week}},{key:'month',get:function get(){return this._date.getMonth()}},{key:'monthString',get:function get(){return Zeit.MONTHS_SHORT[this.month]}},{key:'monthStringLong',get:function get(){return Zeit.MONTHS_LONG[this.month]}},{key:'monthStart',get:function get(){return new Date(this.year,this.month,1)}},{key:'monthEnd',get:function get(){return new Date(new Date(this.year,this.month,this.daysInTheMonth-1).setHours(23,59,59,999))}},{key:'monthStartOffset',get:function get(){var a=new Zeit(this.monthStart);return a.weekStart}},{key:'monthEndOffset',get:function get(){var a=new Zeit(this.monthEnd);return a.weekEnd}},{key:'monthCountOffset',get:function get(){return(this.monthEndOffset.setHours(0,0,0,0)+Zeit.ONE_DAY-this.monthStartOffset)/Zeit.ONE_DAY}},{key:'monthMid',get:function get(){return new Date(this.year,this.month,Math.floor(this.daysInTheMonth/2))}},{key:'monthArray',get:function get(){var _this=this;return Array(this.daysInTheMonth).fill(0).map(function(a,b){return new Date(_this.year,_this.month,1+b)})}},{key:'monthOffsetArray',get:function get(){var _this2=this;return Array(this.monthCountOffset).fill(0).map(function(a,b){return new Date(_this2.monthStartOffset.setDate(b+_this2.monthStartOffset.getDate()))})}},{key:'monthCalendar',get:function get(){var a=this.monthOffsetArray,b=a.length/7;return Array(b).fill(0).map(function(){return a.splice(0,7)})}},{key:'calendar',get:function get(){var _this3=this,a=this.monthCalendar,b=this.monthMid;return this.weekStart,a.map(function(c){var e=c[0].getTime(),f=c.map(function(g){var h=new Zeit(g);return{isToday:h.isToday,isThisMonth:h.isThisCalendarMonth(b),data:g}});return{isThisWeek:e===_this3.weekStart.setHours(0,0,0,0),data:f}})}},{key:'nextMonth',get:function get(){return new Date(this.year,this.month+1,1)}},{key:'prevMonth',get:function get(){return new Date(this.year,this.month-1,1)}},{key:'isThisMonth',get:function get(){var a=new Zeit;return this.year===a.year&&this.month===a.month}},{key:'year',get:function get(){return this._date.getFullYear()}},{key:'isThisYear',get:function get(){return this.year===new Date().getFullYear()}},{key:'yearCount',get:function get(){var a=new Date(this.year,0,1),b=new Date(this.year+1,0,1);return(b-a)/Zeit.ONE_DAY}},{key:'yearStart',get:function get(){return new Date(this.year,0,1)}},{key:'yearEnd',get:function get(){return new Date(this.year,11,31)}},{key:'yearStartOffset',get:function get(){var a=new Zeit(this.yearStart);return new Date(a.weekStart)}},{key:'yearEndOffset',get:function get(){var a=new Zeit(this.yearEnd);return new Date(a.weekEnd)}},{key:'daysInAYear',get:function get(){return 366===this.yearCount}},{key:'progress',get:function get(){return 100*(this.dayOfTheYear/this.yearCount)}}]),Zeit}();Zeit.ONE_DAY=86400000;Zeit.DAYS_SHORT=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];Zeit.DAYS_LONG=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];Zeit.DAYS_SHORT_ISO_8601=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];Zeit.DAYS_LONG_ISO_8601=['Monday','Tuesday','Wednesday','Friday','Saturday','Monday'];Zeit.MONTHS_SHORT=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];Zeit.MONTHS_LONG=['January','February','March','April','May','June','July','August','September','October','November','December'];exports.default=Zeit});
