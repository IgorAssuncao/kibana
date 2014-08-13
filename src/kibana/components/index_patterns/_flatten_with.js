define(function (require) {
  var _ = require('lodash');
  return function (delimiter, nestedObj) {
    var key; // original key
    var stack = []; // track key stack
    var flatObj = {};
    var self = this;
    (function flattenObj(obj) {
      _.keys(obj).forEach(function (key) {
        stack.push(key);
        var flattenKey = stack.join(delimiter);

        if (self.fieldsByName[flattenKey]) {
          flatObj[flattenKey] = obj[key];
        } else if (_.isObject(obj[key])) {
          flattenObj(obj[key]);
        }

        stack.pop();
      });
    }(nestedObj));
    return flatObj;
  };
});
