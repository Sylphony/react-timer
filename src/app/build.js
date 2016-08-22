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
            hours: 0,
            minutes: 0,
            seconds: 0
        };
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
                    React.createElement(
                        "button",
                        { className: "timer__btn timer__btn--start", onClick: this.start.bind(this) },
                        React.createElement("span", { className: "timer__btn-icon fa fa-play" }),
                        React.createElement(
                            "span",
                            { className: "timer__btn-text" },
                            "Start"
                        )
                    ),
                    React.createElement(
                        "button",
                        { className: "timer__btn timer__btn--stop", onClick: this.stop.bind(this) },
                        React.createElement("span", { className: "timer__btn-icon fa fa-stop" }),
                        React.createElement(
                            "span",
                            { className: "timer__btn-text" },
                            "Stop"
                        )
                    ),
                    React.createElement(
                        "button",
                        { className: "timer__btn timer__btn--reset", onClick: this.reset.bind(this) },
                        React.createElement("span", { className: "timer__btn-icon fa fa-refresh" }),
                        React.createElement(
                            "span",
                            { className: "timer__btn-text" },
                            "Reset"
                        )
                    )
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
                timer: timer
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.state.timer);
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
            var numStr = num.toString();

            if (num >= 0 && num < 10) {
                numStr = "0" + numStr;
            }

            return numStr;
        }
    }]);

    return Timer;
}(React.Component);

exports.default = Timer;

},{}]},{},[1]);
