"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeByVal;

function removeByVal(arr, item) {
  var index = arr.indexOf(item);
  arr.splice(index, 1);
  return arr;
}