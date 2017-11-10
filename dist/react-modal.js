(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Modal"] = factory(require("react"), require("react-dom"));
	else
		root["Modal"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_21__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(19);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"overlay":"src-resources-style-module__overlay--2Pmwh","close":"src-resources-style-module__close--Fdscr","container":"src-resources-style-module__container--2vhyS","center":"src-resources-style-module__center--349I1"};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(9)();
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(18);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(21);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = __webpack_require__(13);

var _shortid2 = _interopRequireDefault(_shortid);

var _Modal = __webpack_require__(6);

var _Modal2 = _interopRequireDefault(_Modal);

var _Overlay = __webpack_require__(7);

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var selectId = null;
var modalData = [];

var rootNode = document.getElementById('react-modal');

// 여러 모달중 마지막에 열린 모달 정보를 배열 첫번째에 담음.
// 만약 닫힌 모달이면 배열에서 제거한다.
var modalOpenTop = function modalOpenTop(isOpen, id) {
  if (isOpen && modalData.indexOf(id) === -1) {
    modalData.unshift(id);

    if (modalData.length === 0) {
      selectId = null;
    } else if (modalData[0] === id) {
      selectId = id;
    }
  }
};

var modalCloseTop = function modalCloseTop(isOpen, id) {
  if (!isOpen && modalData.indexOf(id) > -1) {
    modalData = modalData.filter(function (item) {
      return id !== item;
    });
    // selectId = modalData[0];
  }
};

// 모달을 선택한 데이터를 배열 첫번째로 이동되게 갱신한다.
var modalSelect = function modalSelect(id) {
  if (modalData.indexOf(id) > -1) {
    modalData = modalData.filter(function (item) {
      return id !== item;
    });
  }
  if (modalData.indexOf(id) === -1) modalData.unshift(id);
  selectId = id;
};

// selectId 정보를 이용하여 모든 모달의 zIndex 를 갱신한다.
var zIndexUpdate = function zIndexUpdate(zIndex) {
  var modalNode = Array.from(rootNode.querySelectorAll('[data-modal]'));
  var zIndexNew = zIndex === null ? 1 : zIndex + 1;

  modalNode.forEach(function (ele) {
    var node = rootNode.querySelector('[data-modal=' + ele.dataset.modal + ']');
    if (node) {
      node.style.zIndex = zIndex;
    }
    if (selectId === ele.dataset.modal) {
      node.style.zIndex = zIndexNew;
    }
  });
};

var propTypes = {
  children: _propTypes2.default.node.isRequired,
  id: _propTypes2.default.string,
  onModalSelect: _propTypes2.default.func,

  isOpen: _propTypes2.default.bool,
  onRequestClose: _propTypes2.default.func,
  isCloseButton: _propTypes2.default.bool,
  isOverlay: _propTypes2.default.bool,

  zIndex: _propTypes2.default.number,

  beforeOpen: _propTypes2.default.func,
  afterOpen: _propTypes2.default.func,
  doneClose: _propTypes2.default.func
};

var defaultProps = {
  id: null,
  onModalSelect: null,

  isOpen: false,
  onRequestClose: null,
  isCloseButton: true,
  isOverlay: true,

  zIndex: null,

  beforeOpen: null,
  afterOpen: null,
  doneClose: null
};

var modal = document.getElementById('react-modal');

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.id = props.id ? props.id : _shortid2.default.generate();
    _this.num = null;
    _this.ele = document.createElement('div');
    _this.ele.setAttribute('data-modal', _this.id);
    _this.ele.style.zIndex = props.zIndex;
    _this.ele.style.position = 'absolute';

    _this.beforeOpen = props.isOpen;
    _this.afterOpen = props.isOpen;
    _this.doneClose = !props.isOpen;

    _this.onModalSelect = _this.onModalSelect.bind(_this);
    _this.onRequestClose = _this.onRequestClose.bind(_this);
    // this.isEventListener = false;
    // this.onEscClose = this.onEscClose.bind(this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      modalOpenTop(this.props.isOpen, this.id);
      this.onEventBeforeOpen(this.props);
      this.onEventAfterOpen(this.props);
      this.onEventDoneClose(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      modal.appendChild(this.ele);

      // if (this.props.isOpen && !this.isEventListener) {
      //   window.addEventListener('keydown', this.onEscClose);
      //   this.isEventListener = true;
      // }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      modalOpenTop(newProps.isOpen, this.id);
      zIndexUpdate(newProps.zIndex);
      if (!newProps.isOpen) {
        this.beforeOpen = false;
        this.afterOpen = false;
      } else {
        this.doneClose = false;
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.onEventBeforeOpen(nextProps);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.onEventAfterOpen(this.props);
      this.onEventDoneClose(this.props);

      modalCloseTop(this.props.isOpen, this.id);

      // if (!this.props.isOpen && this.isEventListener) {
      //   // console.log('----------------------------------------------------evre', this.id);
      //   window.removeEventListener('keydown', this.onEscClose);
      //   this.isEventListener = false;
      // }
      // if (this.props.isOpen && !this.isEventListener) {
      //   // console.log('----------------------------------------------------ev', this.id);
      //   window.addEventListener('keydown', this.onEscClose);
      //   this.isEventListener = true;
      // }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // window.removeEventListener('keydown', this.onEscClose);
      modal.removeChild(this.ele);
    }
  }, {
    key: 'onModalSelect',
    value: function onModalSelect(id) {
      if (typeof this.props.onModalSelect === 'function') {
        this.props.onModalSelect(id);
      }
      modalSelect(id);
    }
  }, {
    key: 'onRequestClose',
    value: function onRequestClose() {
      if (typeof this.props.onRequestClose === 'function') this.props.onRequestClose();
    }

    // onEscClose(e) {
    //   // console.log('good-----------------------------------------------', e, this.id, selectId);
    //   if (e.keyCode === 27 && selectId === this.id) {
    //     this.onRequestClose();
    //     // console.log('----------------------------------------------------');
    //     // console.log('esc', this.props.isOpen, this.id, selectId, modalData);
    //   }
    // }

  }, {
    key: 'onEventBeforeOpen',
    value: function onEventBeforeOpen(props) {
      if (!props.isOpen || this.beforeOpen || typeof props.beforeOpen !== 'function') return;
      props.beforeOpen();
      this.beforeOpen = true;
    }
  }, {
    key: 'onEventAfterOpen',
    value: function onEventAfterOpen(props) {
      if (!props.isOpen || this.afterOpen || typeof props.afterOpen !== 'function') return;
      props.afterOpen();
      this.afterOpen = true;
    }
  }, {
    key: 'onEventDoneClose',
    value: function onEventDoneClose(props) {
      if (props.isOpen || this.doneClose || typeof props.doneClose !== 'function') return;
      props.doneClose();
      this.doneClose = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return _reactDom2.default.createPortal([this.props.isOverlay && this.props.isOpen ? _react2.default.createElement(_Overlay2.default, {
        key: 'reactModalOverlay'
      }) : null, this.props.isOpen ? _react2.default.createElement(
        _Modal2.default,
        _extends({}, this.props, {
          id: this.id,
          onModalSelect: this.onModalSelect,
          onRequestClose: this.onRequestClose,
          key: 'reactModal'
        }),
        this.props.children
      ) : null], this.ele);
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

exports.default = Modal;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styleModule = __webpack_require__(2);

var _styleModule2 = _interopRequireDefault(_styleModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Modal Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author: Seok Kyun. Choi. 최석균 (Syaku)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @site: http://syaku.tistory.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since: 2017. 8. 31.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  style: _propTypes2.default.shape(),
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  left: _propTypes2.default.string,
  top: _propTypes2.default.string,
  center: _propTypes2.default.bool,

  isCloseButton: _propTypes2.default.bool.isRequired,
  onRequestClose: _propTypes2.default.func.isRequired,

  id: _propTypes2.default.string,
  onModalSelect: _propTypes2.default.func
};

var defaultProps = {
  className: '',
  style: {},
  width: '50%',
  height: 'auto',
  left: null,
  top: null,
  center: true,

  id: null,
  onModalSelect: null
};

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.onClose = _this.onClose.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'onClose',
    value: function onClose() {
      this.props.onRequestClose();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var center = this.props.center;
      var style = _extends({}, this.props.style, { width: this.props.width, height: this.props.height });

      if (this.props.left !== null || this.props.top !== null) {
        center = false;
        style = _extends({}, style, { left: this.props.left, top: this.props.top });
      }

      return _react2.default.createElement(
        'div',
        {
          className: this.props.className + ' ' + _styleModule2.default.container + ' ' + (center ? _styleModule2.default.center : ''),
          style: style,
          role: 'button',
          tabIndex: 0,
          onClick: function onClick() {
            return _this2.props.onModalSelect(_this2.props.id);
          }
        },
        this.props.id,
        this.props.isCloseButton ? _react2.default.createElement('span', { className: _styleModule2.default.close, role: 'button', tabIndex: 0, onClick: this.onClose }) : null,
        this.props.children
      );
    }
  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

exports.default = Modal;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _styleModule = __webpack_require__(2);

var _styleModule2 = _interopRequireDefault(_styleModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const propTypes = {
//   zIndex: PropTypes.number,
// };

// const defaultProps = {
//   zIndex: null,
// };

/**
 * Modal Component
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 31.
 */
var Overlay = function Overlay() {
  return _react2.default.createElement('div', { className: _styleModule2.default.overlay });
};
// const Overlay = props => <div className={s.overlay} style={{ zIndex: props.zIndex }} />;

// Overlay.propTypes = propTypes;
// Overlay.defaultProps = defaultProps;

// import PropTypes from 'prop-types';
exports.default = Overlay;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__(5);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Modal2.default; /**
                                    * Modal Component
                                    * @author: Seok Kyun. Choi. 최석균 (Syaku)
                                    * @site: http://syaku.tistory.com
                                    * @since: 2017. 8. 31.
                                    */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(11);
var invariant = __webpack_require__(12);
var ReactPropTypesSecret = __webpack_require__(10);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(16);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(4);
var alphabet = __webpack_require__(0);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(0);
var encode = __webpack_require__(4);
var decode = __webpack_require__(15);
var build = __webpack_require__(14);
var isValid = __webpack_require__(17);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(20) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ })
/******/ ]);
});