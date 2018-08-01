const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

global.XMLHttpRequest = undefined;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;