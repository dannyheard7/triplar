"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hashCode;

function hashCode(s) {
  var hash = 0,
      i,
      char;
  var l = s.length;
  if (l === 0) return hash;

  for (i = 0; i < l; i++) {
    char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}