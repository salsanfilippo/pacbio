'use strict';

if (!Date.diffDays) {
  Date.diffDays = function(end, start) {
    var _MS_PER_DAY = (1000 * (60 * (60 * 24)));

    // Discard the time and time-zone information.
    var utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    var utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

    return Math.floor((utcEnd - utcStart) / _MS_PER_DAY);
  };
}