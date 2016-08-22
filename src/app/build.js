(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _timer = require("./components/timer/timer.jsx");

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_timer2.default, null), document.getElementById("app"));

},{"./components/timer/timer.jsx":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timer = function (_React$Component) {
    _inherits(Timer, _React$Component);

    function Timer(state) {
        _classCallCheck(this, Timer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Timer).call(this, state));

        _this.state = {
            minutes: 0,
            seconds: 0
        };

        // When using ES6 classes, React does not auto-bind so have to manually do it.
        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        return _this;
    }

    _createClass(Timer, [{
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
                    { className: "timer__inner" },
                    React.createElement(
                        "span",
                        { className: "timer__digit" },
                        this.state.minutes
                    ),
                    React.createElement(
                        "span",
                        { className: "timer__separator" },
                        ":"
                    ),
                    React.createElement(
                        "span",
                        { className: "timer__digit" },
                        this.state.seconds
                    )
                ),
                React.createElement(
                    "button",
                    { className: "btn timer__btn timer__btn--start", onClick: this.start },
                    "Start"
                ),
                React.createElement(
                    "button",
                    { className: "btn timer__btn timer__btn--stop", onClick: this.stop },
                    "Stop"
                )
            );
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            var timer = setInterval(function () {
                _this2.setState({
                    seconds: _this2.state.seconds + 1
                });
            }, 1000);

            this.setState({
                timer: timer
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.state.timer);
        }
    }]);

    return Timer;
}(React.Component);

exports.default = Timer;

},{}]},{},[1]);
