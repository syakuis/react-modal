(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Modal"] = factory(require("react"), require("react-dom"));
	else
		root["Modal"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_11__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
  module.exports = __webpack_require__(7)();
}


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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Modal = __webpack_require__(4);

var _Modal2 = _interopRequireDefault(_Modal);

var _Overlay = __webpack_require__(5);

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _propTypes2.default.node.isRequired,

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

    _this.ele = document.createElement('div');
    _this.onRequestClose = _this.onRequestClose.bind(_this);
    _this.onEscClose = _this.onEscClose.bind(_this);

    _this.beforeOpen = props.isOpen;
    _this.afterOpen = props.isOpen;
    _this.doneClose = !props.isOpen;
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.onEventBeforeOpen(this.props);
      this.onEventAfterOpen(this.props);
      this.onEventDoneClose(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      modal.appendChild(this.ele);
      this.ele.addEventListener('keydown', this.onEscClose);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
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
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.ele.removeEventListener('keydown', this.onEscClose);
      modal.removeChild(this.ele);
    }
  }, {
    key: 'onRequestClose',
    value: function onRequestClose() {
      if (typeof this.props.onRequestClose === 'function') this.props.onRequestClose();
    }
  }, {
    key: 'onEscClose',
    value: function onEscClose(e) {
      if (e.keyCode === 27) this.onRequestClose();
    }
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
        key: 'reactModalOverlay',
        zIndex: this.props.zIndex
      }) : null, this.props.isOpen ? _react2.default.createElement(
        _Modal2.default,
        _extends({}, this.props, {
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

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
  zIndex: _propTypes2.default.number,

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
  zIndex: null,

  id: null,
  onModalSelect: null
};

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.onClose = _this.onClose.bind(_this);
    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'onClose',
    value: function onClose() {
      this.props.onRequestClose();
    }
  }, {
    key: 'onSelect',
    value: function onSelect() {
      if (typeof this.props.onModalSelect === 'function') {
        this.props.onModalSelect(this.props.id);
      }
    }
  }, {
    key: 'render',
    value: function render() {
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
          style: _extends({}, style, { zIndex: this.props.zIndex }),
          role: 'button',
          tabIndex: 0,
          onClick: this.onSelect
        },
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styleModule = __webpack_require__(2);

var _styleModule2 = _interopRequireDefault(_styleModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  zIndex: _propTypes2.default.number
}; /**
    * Modal Component
    * @author: Seok Kyun. Choi. 최석균 (Syaku)
    * @site: http://syaku.tistory.com
    * @since: 2017. 8. 31.
    */


var defaultProps = {
  zIndex: null
};

var Overlay = function Overlay(props) {
  return _react2.default.createElement('div', { className: _styleModule2.default.overlay, style: { zIndex: props.zIndex } });
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

exports.default = Overlay;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__(3);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Modal2.default; /**
                                    * Modal Component
                                    * @author: Seok Kyun. Choi. 최석균 (Syaku)
                                    * @site: http://syaku.tistory.com
                                    * @since: 2017. 8. 31.
                                    */

/***/ }),
/* 7 */
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



var emptyFunction = __webpack_require__(9);
var invariant = __webpack_require__(10);
var ReactPropTypesSecret = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ })
/******/ ]);
});