var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as DateUtil from './date';
var defaultTime = new Date(1970, 1, 1);
var styles = function (theme) { return ({
    clockDigitalContainer: {
        padding: '16px 16px 8px',
        display: 'flex',
        justifyContent: 'stretch',
        userSelect: 'none'
    },
    clockDigitContainer: {
        flex: '1 1',
        display: 'flex'
    },
    hourDigitContainer: {
        justifyContent: 'flex-end'
    },
    miniteDigitContainer: {
        justifyContent: 'flex-start'
    },
    digitText: {
        width: '62px',
        cursor: 'pointer',
        '&:active': {
            opacity: 0.7
        }
    },
    hourDigitText: {
        textAlign: 'right'
    },
    colonDigit: {
        width: '18px',
        textAlign: 'left'
    },
    ampmButtons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    ampmButton: {
        minWidth: 'initial',
        minHeight: 'initial',
        padding: '4px 8px'
    },
    clockAnalogContainer: {
        padding: '16px 24px 24px'
    },
    clockBackground: {
        width: '230px',
        height: '230px',
        maxWidth: 'calc(100vw - 112px)',
        maxHeight: 'calc(100vw - 112px)',
        borderRadius: '115px',
        position: 'relative',
        background: theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    clockText: {
        position: 'absolute',
        userSelect: 'none',
        height: '16px',
        width: '16px',
        lineHeight: '16px',
        textAlign: 'center'
    },
    clockTextSelected: {
        color: theme.palette.primary.contrastText
    },
    clockTextFaded: {
        opacity: 0,
        pointerEvents: 'none'
    },
    minuteDot: {
        position: 'absolute',
        height: '6px',
        width: '6px',
        borderRadius: '3px'
    },
    minuteDotSelected: {
        backgroundColor: theme.palette.primary.contrastText
    },
    clockHandContainer: {
        position: 'absolute',
        width: '2px'
    },
    clockHand: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.primary.main
    },
    clockHandHead: {
        position: 'absolute',
        left: '-20px',
        top: '-21px',
        width: '42px',
        height: '42px',
        borderRadius: '21px',
        backgroundColor: theme.palette.primary.main
    },
    clockHandTail: {
        position: 'absolute',
        left: '-3px',
        bottom: '-4px',
        width: '8px',
        height: '8px',
        borderRadius: '4px',
        backgroundColor: theme.palette.primary.main
    },
    okToConfirmRow: {
        height: '48px',
        marginTop: '-8px',
        padding: '0 6px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}); };
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock(props) {
        var _this = _super.call(this, props) || this;
        _this.setClockRadius = function () {
            _this.setState({ clockRadius: _this.getClockRadius() });
        };
        _this.getClockRadius = function () {
            var background = _this.clockface ? _this.clockface.getBoundingClientRect().width : 230;
            return background / 2 - 28;
        };
        _this.getValue = function (options, target, origin) {
            var radian = Math.atan2(target.y - origin.y, target.x - origin.x);
            var angle = radian + (Math.PI / 6 * 3) < 0 ? radian + (Math.PI / 6 * 15) : radian + (Math.PI / 6 * 3);
            var select = Math.round(angle / 2 / Math.PI * options.length);
            return options[select > options.length - 1 ? 0 : select];
        };
        _this.getOriginPoint = function () {
            var clockface = _this.clockface.getBoundingClientRect();
            return { x: clockface.left + clockface.width / 2, y: clockface.top + clockface.height / 2 };
        };
        _this.getMouseTargetPoint = function (event) {
            var mouse = event.nativeEvent;
            return { x: mouse.pageX, y: mouse.pageY };
        };
        _this.getTouchTargetPoint = function (event) {
            var touch = event.nativeEvent.touches[event.nativeEvent.touches.length - 1];
            return { x: touch.pageX, y: touch.pageY };
        };
        _this.changeValue = function (label, selecting, event) {
            var _a = _this.props, value = _a.value, onChange = _a.onChange, okToConfirm = _a.okToConfirm;
            var selected = _this.state.selected;
            var date = new Date((okToConfirm ? selected : value) || defaultTime);
            if (selecting && label === 'hour') {
                date.setHours(selecting + ((value && value.getHours() >= 12) ? 12 : 0));
            }
            else if (selecting && label === 'minute') {
                date.setMinutes(selecting);
            }
            if (selecting && okToConfirm) {
                _this.setState({ selecting: true, selected: date });
            }
            else if (selecting) {
                _this.setState({ selecting: true }, function () { return onChange(date, event); });
            }
        };
        _this.mouseSelectClock = function (event, label, options) {
            event.preventDefault();
            var selected = _this.getValue(options, _this.getMouseTargetPoint(event), _this.getOriginPoint());
            _this.setState({ selecting: true }, function () { return _this.changeValue(label, selected, event); });
        };
        _this.touchSelectClock = function (event, label, options) {
            event.preventDefault();
            var selected = _this.getValue(options, _this.getTouchTargetPoint(event), _this.getOriginPoint());
            _this.setState({ selecting: true }, function () { return _this.changeValue(label, selected, event); });
        };
        _this.mouseHoverClock = function (event, label, options) {
            event.preventDefault();
            var selecting = _this.state.selecting;
            var selected = _this.getValue(options, _this.getMouseTargetPoint(event), _this.getOriginPoint());
            if (selecting && selected !== undefined) {
                _this.changeValue(label, selected, event);
            }
        };
        _this.touchHoverClock = function (event, label, options) {
            event.preventDefault();
            var touch = event.nativeEvent.touches[event.nativeEvent.touches.length - 1];
            var target = { x: touch.pageX, y: touch.pageY };
            var selected = _this.getValue(options, _this.getTouchTargetPoint(event), _this.getOriginPoint());
            if (selected !== undefined) {
                _this.changeValue(label, selected, event);
            }
        };
        _this.confirmClock = function (event, label) {
            var _a = _this.props, closeClock = _a.closeClock, okToConfirm = _a.okToConfirm;
            event.preventDefault();
            if (label === 'hour') {
                _this.setState({ mode: 'minute', selecting: false });
            }
            else {
                _this.setState({ selecting: false }, okToConfirm ? undefined : closeClock);
            }
        };
        _this.confirmTime = function (event) {
            var _a = _this.props, onChange = _a.onChange, closeClock = _a.closeClock, okToConfirm = _a.okToConfirm;
            if (okToConfirm) {
                closeClock();
                onChange(_this.state.selected, event);
            }
        };
        _this.clickSetMode = function (mode) {
            _this.setState({ mode: mode });
        };
        _this.clickAmPm = function (ampm, event) {
            var _a = _this.props, value = _a.value, onChange = _a.onChange, okToConfirm = _a.okToConfirm;
            var selected = _this.state.selected;
            var date = new Date((okToConfirm ? selected : value) || defaultTime);
            var hour = date.getHours();
            if (hour >= 12 && ampm === 'am') {
                date.setHours(hour - 12);
            }
            else if (hour < 12 && ampm === 'pm') {
                date.setHours(hour + 12);
            }
            if (okToConfirm) {
                _this.setState({ selected: date });
            }
            else {
                onChange(date, event);
            }
        };
        _this.getSelectedDate = function () {
            var _a = _this.props, value = _a.value, okToConfirm = _a.okToConfirm;
            var selected = _this.state.selected;
            var selecting = okToConfirm ? selected : value;
            return selecting ? {
                hour: selecting.getHours() >= 12 ? selecting.getHours() - 12 : selecting.getHours(),
                minute: selecting.getMinutes(),
                ampm: selecting.getHours() >= 12 ? 'pm' : 'am'
            } : {
                hour: 0,
                minute: 0,
                ampm: 'am'
            };
        };
        if (props.action) {
            props.action({
                resize: _this.setClockRadius
            });
        }
        _this.state = {
            mode: 'hour',
            selected: props.value,
            selecting: false,
            clockRadius: _this.getClockRadius()
        };
        return _this;
    }
    Clock.prototype.componentDidMount = function () {
        if (!this.props.action)
            this.setClockRadius();
        window.addEventListener('resize', this.setClockRadius);
    };
    Clock.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.setClockRadius);
    };
    Clock.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, value = _a.value, okToConfirm = _a.okToConfirm, closeClock = _a.closeClock, selectableMinutesInterval = _a.selectableMinutesInterval;
        var _b = this.state, mode = _b.mode, selecting = _b.selecting, clockRadius = _b.clockRadius;
        var hours = Array(12).fill(undefined).map(function (number, index) { return index === 0 ? 12 : index; });
        var minutes = Array(60).fill(undefined).map(function (number, index) { return !selectableMinutesInterval ?
            index :
            index % selectableMinutesInterval === 0 ?
                index :
                undefined; });
        var selected = this.getSelectedDate();
        var selectAngle = (mode === 'hour' ?
            selected.hour / hours.length :
            selected.minute / minutes.length) * 2 * Math.PI - (Math.PI / 6 * 3);
        return (React.createElement("div", { className: classes.root },
            React.createElement("div", { className: classnames(classes.clockDigitalContainer, classes.digitalContainer) },
                React.createElement("div", { className: classnames(classes.clockDigitContainer, classes.hourDigitContainer) },
                    React.createElement(Typography, { color: mode === 'hour' ? 'primary' : 'default', variant: 'display3', classes: { root: classnames(classes.digitText, classes.hourDigitText) }, onClick: function () { return _this.clickSetMode('hour'); } }, selected.hour === 0 ? 12 : selected.hour)),
                React.createElement("div", null,
                    React.createElement(Typography, { variant: 'display3', classes: { root: classes.colonDigit } }, ":")),
                React.createElement("div", { className: classnames(classes.clockDigitContainer, classes.miniteDigitContainer) },
                    React.createElement(Typography, { color: mode === 'minute' ? 'primary' : 'default', variant: 'display3', classes: { root: classes.digitText }, onClick: function () { return _this.clickSetMode('minute'); } }, DateUtil.fillInDigit(selected.minute, 2)),
                    React.createElement("div", { className: classes.ampmButtons },
                        React.createElement(Button, { color: selected.ampm === 'am' ? 'primary' : 'default', classes: { root: classes.ampmButton }, onClick: function (event) { return _this.clickAmPm('am', event); } }, "AM"),
                        React.createElement(Button, { color: selected.ampm === 'pm' ? 'primary' : 'default', classes: { root: classes.ampmButton }, onClick: function (event) { return _this.clickAmPm('pm', event); } }, "PM")))),
            React.createElement("div", { key: 'clock', className: classes.clockAnalogContainer, onMouseDown: function (event) { return _this.mouseSelectClock(event, mode, mode === 'hour' ? hours : minutes); }, onTouchStart: function (event) { return _this.touchSelectClock(event, mode, mode === 'hour' ? hours : minutes); }, onMouseMove: function (event) { return _this.mouseHoverClock(event, mode, mode === 'hour' ? hours : minutes); }, onTouchMove: function (event) { return _this.touchHoverClock(event, mode, mode === 'hour' ? hours : minutes); }, onMouseUp: function (event) { return _this.confirmClock(event, mode); }, onTouchEnd: function (event) { return _this.confirmClock(event, mode); } },
                React.createElement("div", { className: classes.clockBackground, ref: function (clockface) { return _this.clockface = clockface; } },
                    React.createElement("div", { className: classes.clockHandContainer, style: { height: clockRadius, paddingBottom: clockRadius,
                            transition: selecting ? '' : 'transform 600ms ease-in-out',
                            transform: "rotate(" + (selectAngle + (Math.PI / 6 * 3)) + "rad)"
                        } },
                        React.createElement("div", { className: classnames(classes.clockHand, classes.hand) },
                            React.createElement("div", { className: classes.clockHandHead }),
                            React.createElement("div", { className: classes.clockHandTail }))),
                    hours.map(function (hour, index) {
                        var angle = index / hours.length * 2 * Math.PI - (Math.PI / 6 * 3);
                        return React.createElement(Typography, { key: hour, className: classnames(classes.clockText, (_a = {}, _a[classes.clockTextSelected] = mode === 'hour' && selected.hour === index, _a), (_b = {}, _b[classes.clockTextFaded] = mode !== 'hour', _b)), style: {
                                transition: selecting ? 'opacity 600ms ease-in-out' : 'opacity 600ms ease-in-out, color 0ms 600ms',
                                transform: "translate(" + clockRadius * Math.cos(angle) + "px, " + clockRadius * Math.sin(angle) + "px)"
                            } }, hour);
                        var _a, _b;
                    }),
                    minutes.map(function (minute, index) {
                        var angle = index / minutes.length * 2 * Math.PI - (Math.PI / 6 * 3);
                        if (minute % 5 === 0) {
                            return React.createElement(Typography, { key: index, className: classnames(classes.clockText, (_a = {}, _a[classes.clockTextSelected + " " + classes.textSelected] = mode === 'minute' && selected.minute === index, _a), (_b = {}, _b[classes.clockTextFaded] = mode !== 'minute', _b)), style: {
                                    transition: selecting ? 'opacity 600ms ease-in-out' : 'opacity 600ms ease-in-out, color 0ms 600ms',
                                    transform: "translate(" + clockRadius * Math.cos(angle) + "px, " + clockRadius * Math.sin(angle) + "px)"
                                } }, minute);
                        }
                        else {
                            return React.createElement("div", { key: index, className: classnames(classes.minuteDot, (_c = {}, _c[classes.minuteDotSelected] = mode === 'minute' && selected.minute === minute, _c), (_d = {}, _d[classes.clockTextFaded] = mode !== 'minute', _d)), style: {
                                    transition: selecting ? 'opacity 600ms ease-in-out' : 'opacity 600ms ease-in-out, background 0ms 600ms',
                                    transform: "translate(" + clockRadius * Math.cos(angle) + "px, " + clockRadius * Math.sin(angle) + "px)"
                                } });
                        }
                        var _a, _b, _c, _d;
                    }))),
            okToConfirm && React.createElement("div", { className: classes.okToConfirmRow },
                React.createElement(Button, { onClick: closeClock }, "CANCEL"),
                React.createElement(Button, { onClick: function (event) { return _this.confirmTime(event); } }, "OK"))));
    };
    Clock = __decorate([
        withStyles(styles)
    ], Clock);
    return Clock;
}(React.Component));
export default Clock;
//# sourceMappingURL=clock.js.map