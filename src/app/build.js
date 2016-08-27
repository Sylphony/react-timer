(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
"use strict";

var _Timer = require("./components/timer/Timer.jsx");

var _Timer2 = _interopRequireDefault(_Timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_Timer2.default, null), document.getElementById("app"));

},{"./components/timer/Timer.jsx":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TimerCtrlBtn = require("./TimerCtrlBtn.jsx");

var _TimerCtrlBtn2 = _interopRequireDefault(_TimerCtrlBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timer = function (_React$Component) {
    _inherits(Timer, _React$Component);

    function Timer(state) {
        _classCallCheck(this, Timer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Timer).call(this, state));

        _this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        return _this;
    }

    _createClass(Timer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({
                startDisabled: false
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.stop();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "timer" },
                React.createElement(
                    "div",
                    { className: "timer__wrapper" },
                    React.createElement(
                        "span",
                        { className: "timer__digit" },
                        this.addLeadingZeroes(this.state.hours)
                    ),
                    React.createElement(
                        "span",
                        { className: "timer__separator" },
                        ":"
                    ),
                    React.createElement(
                        "span",
                        { className: "timer__digit" },
                        this.addLeadingZeroes(this.state.minutes)
                    ),
                    React.createElement(
                        "span",
                        { className: "timer__separator" },
                        ":"
                    ),
                    React.createElement(
                        "span",
                        { className: "timer__digit" },
                        this.addLeadingZeroes(this.state.seconds)
                    )
                ),
                React.createElement(
                    "div",
                    { className: "timer__controls" },
                    React.createElement(_TimerCtrlBtn2.default, { type: "start", icon: "play", click: this.start.bind(this), disabled: this.state.startDisabled }),
                    React.createElement(_TimerCtrlBtn2.default, { type: "stop", icon: "stop", click: this.stop.bind(this) }),
                    React.createElement(_TimerCtrlBtn2.default, { type: "reset", icon: "refresh", click: this.reset.bind(this) })
                )
            );
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            var secsPerMin = 60;
            var minsPerHour = 60;

            var timer = setInterval(function () {
                _this2.setState({
                    seconds: _this2.state.seconds + 1
                });

                if (_this2.state.seconds === secsPerMin) {
                    _this2.setState({
                        minutes: _this2.state.minutes + 1,
                        seconds: 0
                    });
                }

                if (_this2.state.minutes === minsPerHour) {
                    _this2.setState({
                        hours: _this2.state.hours + 1,
                        minutes: 0,
                        seconds: 0
                    });
                }
            }, 1000);

            this.setState({
                timer: timer,
                startDisabled: true
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.state.timer);

            this.setState({
                startDisabled: false
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            this.stop();

            this.setState({
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        }
    }, {
        key: "addLeadingZeroes",
        value: function addLeadingZeroes(num) {
            var numZeroes = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
            var numDigits = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];

            var numStr = num.toString();

            if (num >= 0) {
                for (var count = 0; count < numZeroes; count++) {
                    numStr = "0" + numStr;
                }
            }

            // Format to number of digits wanted
            numStr = numStr.slice(-1 * numDigits);

            return numStr;
        }
    }]);

    return Timer;
}(React.Component);

exports.default = Timer;

},{"./TimerCtrlBtn.jsx":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classNames = require("classnames");

var TimerCtrlBtn = function (_React$Component) {
    _inherits(TimerCtrlBtn, _React$Component);

    function TimerCtrlBtn() {
        _classCallCheck(this, TimerCtrlBtn);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TimerCtrlBtn).apply(this, arguments));
    }

    _createClass(TimerCtrlBtn, [{
        key: "render",
        value: function render() {
            var classPrefix = "timer__btn";

            var btnProp = {
                type: this.props.type,
                icon: this.props.icon,
                click: this.props.click,
                className: classNames([classPrefix, classPrefix + "--" + this.props.type]),
                iconClassName: classNames([classPrefix + "-icon", "fa", "fa-" + this.props.icon]),
                disabled: this.props.disabled || false
            };

            return React.createElement(
                "button",
                { className: btnProp.className, onClick: btnProp.click, disabled: btnProp.disabled },
                React.createElement("span", { className: btnProp.iconClassName }),
                React.createElement(
                    "span",
                    { className: "timer__btn-text" },
                    btnProp.type
                )
            );
        }
    }]);

    return TimerCtrlBtn;
}(React.Component);

exports.default = TimerCtrlBtn;

},{"classnames":1}]},{},[2]);
