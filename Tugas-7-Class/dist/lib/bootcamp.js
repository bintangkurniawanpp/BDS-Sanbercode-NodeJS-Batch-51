"use strict";

var _kelas = _interopRequireDefault(require("./kelas"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Bootcamp = /*#__PURE__*/function () {
  function Bootcamp(name) {
    _classCallCheck(this, Bootcamp);
    this._name = name;
    this._classes = [];
  }
  _createClass(Bootcamp, [{
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "classes",
    get: function get() {
      return this._classes;
    }
  }, {
    key: "createClass",
    value: function createClass(name, level, instructor) {
      var newClass = new _kelas["default"](name, level, instructor);
      this._classes.push(newClass);
      return newClass;
    }
  }, {
    key: "register",
    value: function register(className, student) {
      var targetClass = this._classes.find(function (kelas) {
        return kelas.name === className;
      });
      if (targetClass) {
        targetClass.addStudent(student);
      } else {
        console.log("Kelas ".concat(className, " tidak ditemukan."));
      }
    }
  }]);
  return Bootcamp;
}();
module.exports = Bootcamp;