import {isArray, isNumber, isString, pick} from 'underscore';
import { fromTo } from '@breUi/DateUntil';
import { log } from '@lib/debug';

/**
 *
 * @param {Number} s2
 * @param {Boolean} showDetail
 */
export function s2ToStr(input, showDetail = false) {
    let s2 = Number(input);
    if (!isNumber(s2)) return '';
    if (s2 < 60) return showDetail ? {s: s2, m: 0, h: 0, full: `${s2} giây`} : `${s2} giây`;
    let m = Math.floor(s2 / 60);
    let s = s2 - m * 60;
    if (m < 60) return showDetail ? {s, m, h: 0, full: `${m} phút ${s} giây`} : `${m} phút ${s} giây`;
    let h = Math.floor(m / 60);
    m = m - h * 60;
    if (h < 24) return showDetail ? {s, m, h, full: `${h} giờ ${m} phút ${s} giây`} : `${h} giờ ${m} phút ${s} giây`;
    let d = Math.floor(h / 24);
    h = h - d * 24;
    return showDetail ? {
        d,
        s,
        m,
        h,
        full: `${d} ngày ${h} giờ ${m} phút ${s} giây`
    } : `${d} ngày ${h} giờ ${m} phút ${s} giây`;
}

// 1-mon 2-tue 3-wed 4-thu 5-fri 6-sat 0-sun
/**
 *
 * @param {Array<String>} days
 */
export function daysToStr(days = []) {
  console.log(days);
  if (!isArray(days)) return '';
  if (days.length == 7) return 'Tất cả ngày trong tuần';
  let init = { 0: 'chủ nhật', 1: 'thứ 2', 2: 'thứ 3', 3: 'thứ 4', 4: 'thứ 5', 5: 'thứ 6', 6: 'thứ 7', };
  return Object.values(pick(init, ...days)).join(', ');
}

export const dateFormat = (function () {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function (val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) val = '0' + val;
      return val;
    };

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (
      arguments.length == 1 &&
      Object.prototype.toString.call(date) == '[object String]' &&
      !/\d/.test(date)
    ) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date();
    if (isNaN(date)) throw SyntaxError('invalid date');

    mask = String(dF.masks[mask] || mask || dF.masks['default']);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == 'UTC:') {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? 'getUTC' : 'get',
      d = date[_ + 'Date'](),
      D = date[_ + 'Day'](),
      m = date[_ + 'Month'](),
      y = date[_ + 'FullYear'](),
      H = date[_ + 'Hours'](),
      M = date[_ + 'Minutes'](),
      s = date[_ + 'Seconds'](),
      L = date[_ + 'Milliseconds'](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d: d,
        dd: pad(d),
        ddd: dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        M: M,
        MM: pad(M),
        s: s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(L > 99 ? Math.round(L / 10) : L),
        t: H < 12 ? 'a' : 'p',
        tt: H < 12 ? 'am' : 'pm',
        T: H < 12 ? 'A' : 'P',
        TT: H < 12 ? 'AM' : 'PM',
        Z: utc
          ? 'UTC'
          : (String(date).match(timezone) || [''])
            .pop()
            .replace(timezoneClip, ''),
        o:
          (o > 0 ? '-' : '+') +
          pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
        S: ['th', 'st', 'nd', 'rd'][
          d % 10 > 3 ? 0 : (((d % 100) - (d % 10) != 10) * d) % 10
        ],
      };

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
})();

// Some common format strings
dateFormat.masks = {
  default: 'ddd mmm dd yyyy HH:MM:ss',
  shortDate: 'm/d/yy',
  mediumDate: 'mmm d, yyyy',
  longDate: 'mmmm d, yyyy',
  fullDate: 'dddd, mmmm d, yyyy',
  shortTime: 'h:MM TT',
  mediumTime: 'h:MM:ss TT',
  longTime: 'h:MM:ss TT Z',
  isoDate: 'yyyy-mm-dd',
  isoTime: 'HH:MM:ss',
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',],
  monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
/**
 * 
 * @param {Number} value 
 */
const stringNumber = (value) => value < 10 ? `0${value}` : value;
/**
 *
 * @param {Date} data
 */
export function hashDate(data) {
  let date = new Date(data);
    if (isNaN(date.getFullYear())) {
        if (isString(data)) {
            let arr = data.split("/");
            date = new Date(arr[0],arr[1] - 1,arr[2]);
        }
    }
  return {
    d: stringNumber(date.getDate()),
    m: stringNumber(date.getMonth() + 1),
    y: stringNumber(date.getFullYear()),
    minute: stringNumber(date.getMinutes()),
    hour: stringNumber(date.getHours()),
    second: stringNumber(date.getSeconds()),
  }
}
/**
 *
 * @param {Function} convert
 */
export function getDateListFromToday(convert = (data) => data) {
  let today = new Date();
  let endDay = today.getTime() + 24 * 60 * 60 * 364 * 1000; // one year
  endDay = new Date(endDay);
  return convert(fromTo(today, endDay));
}
/**
 *
 * @param {Date} date
 */
export function startOfWeek(date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
}
/**
 *
 * @param {Date} date
 */
export function endOfWeek(date) {
    var lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));
}
/**
 *
 * @param {Date} date
 * @param {String} format
 */
export function convertFormat(date = new Date(), format = '/') {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return [year, month, day].join(format);
}
/**
 *
 * @param {Date} date
 */
export function endOfMonth(date) {
    log('endOfMonth', date);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
/**
 *
 * @param {Date} date
 */
export function startOfMonth(date) {
    log('startOfMonth', date);
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
/**
 *
 * @param {Date} date
 */
export  function yesterday(date){
    var dt = new Date(date);
    return new Date((dt.setDate(dt.getDate()-1)));
}
/**
 *
 * @param {Number} num
 */
export function subtractDateFromNow (num) {
    const current = new Date();
    const prior = new Date().setDate(current.getDate() - num);
    return new Date(prior);
}
/**
 *
 * @param {String} type
 */
export function getTimeHandler(type){
    let data = {
        thisMonth: [startOfMonth(new Date()), endOfMonth(new Date())],
        thisWeek:[startOfWeek(new Date()), endOfWeek(new Date())],
        sevenDaysAgo: [subtractDateFromNow(6), new Date()],
        thirtyDaysAgo: [subtractDateFromNow(29), new Date()],
    }
    return data[type];
}

/**
 *
 * @param {Date} date
 */
export function convertDateToString(date) {
    let {m, y, d} = hashDate(date);
    return `${y}/${m}/${d}`;
}