/*!
 * just-debounce-it
 * Copyright (c) 2016 angus croll The MIT License (MIT)
 */

export default function debounce(fn, wait, callFirst) {
  var timeout;
  return function () {
    if (!wait) {
      return fn.apply(this, arguments);
    }
    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!callNow) {
        return fn.apply(context, args);
      }
    }, wait);

    if (callNow) {
      return fn.apply(this, arguments);
    }
  };
}
