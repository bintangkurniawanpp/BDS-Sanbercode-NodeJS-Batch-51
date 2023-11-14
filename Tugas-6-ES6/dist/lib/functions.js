"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sapa = exports.convert = exports.checkScore = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// Soal 1
var sapa = exports.sapa = function sapa(nama) {
  return "halo selamat pagi, ".concat(nama);
};

// Soal 2
var convert = exports.convert = function convert(nama, domisili, umur) {
  return {
    nama: nama,
    domisili: domisili,
    umur: umur
  };
};

// Soal 3
var checkScore = exports.checkScore = function checkScore(stringData) {
  var _stringData$split$map = stringData.split(',').map(function (item) {
      return item.split(':');
    }),
    _stringData$split$map2 = _slicedToArray(_stringData$split$map, 3),
    name = _stringData$split$map2[0],
    kelas = _stringData$split$map2[1],
    score = _stringData$split$map2[2];
  return {
    name: name[1],
    kelas: kelas[1],
    score: parseInt(score[1])
  };
};