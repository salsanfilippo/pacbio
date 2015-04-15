'use strict';

if (!Number.d2h) {
  Number.d2h = function(d) {
    return (+d).toString(16);
  }
}