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
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import * as classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import * as DateUtil from './date';
var VirtualizedSwipeableViews = virtualize(SwipeableViews);
var styles = function (theme) { return ({
    calendarContainer: {
        position: 'relative',
        maxWidth: '100%',
        width: (48 * 7) + 'px',
        overflow: 'hidden'
    },
    calendarControl: {
        position: 'absolute',
        width: '100%',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
    },
    calendarControlButton: {
        pointerEvents: 'all'
    },
    calendarControlMonth: {
        display: 'flex',
        height: '48px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendarMonthTitle: {
        fontSize: '1rem',
        fontWeight: 500,
        textTransform: 'none'
    },
    years: {
        height: '48px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    invalidInput: {
        color: theme.palette.text.disabled
    },
    week: {
        display: 'flex'
    },
    labelWeekDay: {
        height: '48px',
        width: '48px',
        color: theme.palette.text.hint,
        fontWeight: 300,
        lineHeight: '48px',
        textAlign: 'center'
    },
    weekDay: {
        flex: '1 1 auto',
        width: '38px',
        margin: '5px'
    },
    weekDayResponse: {
        maxHeight: 'calc(((100vw - 64px) / 7) - 10px)'
    },
    selectedDay: {
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    selectedDayText: {
        color: theme.palette.primary.contrastText
    },
    okToConfirmRow: {
        height: '48px',
        padding: '0 6px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}); };
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        var _this = _super.call(this, props) || this;
        _this.updateHeight = {
            month: undefined,
            year: undefined
        };
        _this.getButtonHeight = function () {
            var view = _this.container ? _this.container.getBoundingClientRect().width : 336;
            return view / 7;
        };
        _this.resize = function () {
            if (_this.updateHeight.month) {
                _this.setState({ buttonHeight: _this.getButtonHeight() }, _this.updateHeight.month);
            }
            if (_this.updateHeight.year) {
                _this.setState({ buttonHeight: _this.getButtonHeight() }, _this.updateHeight.year);
            }
        };
        _this.selectDate = function (date, event) {
            var _a = _this.props, onChange = _a.onChange, closeCalendar = _a.closeCalendar, okToConfirm = _a.okToConfirm;
            if (okToConfirm) {
                _this.setState({ selected: date });
            }
            else {
                closeCalendar();
                onChange(date, event);
            }
        };
        _this.confirmDate = function (event) {
            var _a = _this.props, onChange = _a.onChange, closeCalendar = _a.closeCalendar, okToConfirm = _a.okToConfirm;
            if (okToConfirm) {
                closeCalendar();
                onChange(_this.state.selected, event);
            }
        };
        _this.showYearsCalendar = function () {
            var year = _this.state.year;
            _this.setState({
                mode: 'year',
                yearIndex: Math.floor(year / 18)
            });
        };
        _this.selectCalendarYear = function (year) {
            var _a = _this.props, min = _a.min, max = _a.max;
            var month = _this.state.month;
            if (year) {
                _this.setState({
                    mode: 'month',
                    year: year,
                    month: min && month < min.getMonth() && year === min.getFullYear() ? min.getMonth() : (max && month > max.getMonth() && year === max.getFullYear() ? max.getMonth() : month)
                });
            }
            else {
                _this.setState({
                    mode: 'month'
                });
            }
        };
        _this.previousYearsValid = function () {
            var min = _this.props.min;
            var yearIndex = _this.state.yearIndex;
            return yearIndex >= 1 && (min === undefined || yearIndex >= Math.ceil(min.getFullYear() / 18));
        };
        _this.previousYears = function () {
            var min = _this.props.min;
            var yearIndex = _this.state.yearIndex;
            _this.setState({
                yearIndex: yearIndex - 1
            });
        };
        _this.nextYearsValid = function () {
            var max = _this.props.max;
            var yearIndex = _this.state.yearIndex;
            return max === undefined || yearIndex < Math.floor(max.getFullYear() / 18);
        };
        _this.nextYears = function () {
            var yearIndex = _this.state.yearIndex;
            _this.setState({
                yearIndex: yearIndex + 1
            });
        };
        _this.changeYears = function (index) {
            _this.setState({
                yearIndex: index
            });
        };
        _this.yearInvalid = function (currentYear) {
            var _a = _this.props, min = _a.min, max = _a.max;
            var _b = _this.state, month = _b.month, year = _b.year;
            return (min && currentYear < min.getFullYear()) || (max && currentYear > max.getFullYear()) || year === currentYear;
        };
        _this.previousMonthValid = function () {
            var min = _this.props.min;
            var _a = _this.state, month = _a.month, year = _a.year;
            return min === undefined || (month > min.getMonth() || year > min.getFullYear());
        };
        _this.previousMonth = function () {
            var _a = _this.state, month = _a.month, year = _a.year;
            _this.setState({
                year: year - (month <= 0 ? 1 : 0),
                month: month <= 0 ? 11 : month - 1
            });
        };
        _this.nextMonthValid = function () {
            var max = _this.props.max;
            var _a = _this.state, month = _a.month, year = _a.year;
            return max === undefined || (month < max.getMonth() || year < max.getFullYear());
        };
        _this.nextMonth = function () {
            var _a = _this.state, month = _a.month, year = _a.year;
            _this.setState({
                year: year + (month >= 11 ? 1 : 0),
                month: month >= 11 ? 0 : month + 1
            });
        };
        _this.changeMonth = function (index) {
            _this.setState({
                year: Math.floor(index / 12),
                month: index % 12
            });
        };
        _this.dayInvalid = function (date) {
            var _a = _this.props, value = _a.value, min = _a.min, max = _a.max;
            return (value && DateUtil.sameDay(date, value)) || (min && date.getTime() < min.setHours(0, 0, 0, 0) || (max && date.getTime() > max.setHours(0, 0, 0, 0)));
        };
        _this.yearIndexValid = function (index) {
            var yearIndex = _this.state.yearIndex;
            return index <= yearIndex + 2 && index >= yearIndex - 2;
        };
        _this.monthIndexValid = function (index) {
            var _a = _this.state, month = _a.month, year = _a.year;
            var currentIndex = year * 12 + month;
            return index <= currentIndex + 2 && index >= currentIndex - 2;
        };
        _this.generateYearCalendar = function (index) {
            var years = [];
            var counter = 0;
            for (var year = index * 18; year < (index + 1) * 18; year++) {
                if (!years[Math.floor(counter / 3)]) {
                    years[Math.floor(counter / 3)] = [year];
                }
                else {
                    years[Math.floor(counter / 3)] = years[Math.floor(counter / 3)].concat([year]);
                }
                counter++;
            }
            return years;
        };
        _this.generateMonthCalendar = function (index) {
            var calendarFocus = {
                year: Math.floor(index / 12),
                month: index % 12
            };
            var firstDay = new Date(calendarFocus.year, calendarFocus.month, 1);
            var daysInWeekInMonth = [Array(firstDay.getDay()).fill(undefined)];
            var counter = firstDay.getDay();
            for (var day = firstDay; day.getMonth() === calendarFocus.month; day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)) {
                if (!daysInWeekInMonth[Math.floor(counter / 7)]) {
                    daysInWeekInMonth[Math.floor(counter / 7)] = [new Date(day.getFullYear(), day.getMonth(), day.getDate())];
                }
                else {
                    daysInWeekInMonth[Math.floor(counter / 7)] = daysInWeekInMonth[Math.floor(counter / 7)].concat([new Date(day.getFullYear(), day.getMonth(), day.getDate())]);
                }
                counter++;
            }
            for (var day = 6; !daysInWeekInMonth[daysInWeekInMonth.length - 1][day]; day--) {
                daysInWeekInMonth[daysInWeekInMonth.length - 1][day] = undefined;
            }
            return daysInWeekInMonth;
        };
        var now = new Date();
        var date = new Date(now.getTime());
        var min = props.min, max = props.max;
        if (max && now.getTime() > max.getTime()) {
            date = new Date(max.getTime());
        }
        else if (min && now.getTime() < min.getTime()) {
            date = new Date(min.getTime());
        }
        if (props.action) {
            props.action({
                resize: _this.resize
            });
        }
        _this.state = {
            mode: 'month',
            selected: props.value,
            month: date.getMonth(),
            year: date.getFullYear(),
            yearIndex: Math.floor(date.getFullYear() / 18),
            buttonHeight: _this.getButtonHeight()
        };
        return _this;
    }
    Calendar.prototype.componentDidMount = function () {
        if (!this.props.action)
            this.resize();
        window.addEventListener('resize', this.resize);
        var value = this.props.value;
        if (value) {
            this.setState({
                month: value.getMonth(),
                year: value.getFullYear()
            });
        }
    };
    Calendar.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.resize);
    };
    Calendar.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, value = _a.value, closeCalendar = _a.closeCalendar, okToConfirm = _a.okToConfirm;
        var _b = this.state, mode = _b.mode, buttonHeight = _b.buttonHeight, selected = _b.selected, year = _b.year, month = _b.month, yearIndex = _b.yearIndex;
        var active = okToConfirm ? selected : value;
        return (React.createElement("div", { ref: function (container) { return _this.container = container; }, className: classes.root }, mode === 'month' ? [
            React.createElement("div", { className: classes.calendarControl, key: 'calendar-month-control' },
                React.createElement(IconButton, { classes: { root: classes.calendarControlButton }, disabled: !this.previousMonthValid(), onClick: this.previousMonth },
                    React.createElement(ChevronLeft, null)),
                React.createElement(IconButton, { classes: { root: classes.calendarControlButton }, disabled: !this.nextMonthValid(), onClick: this.nextMonth },
                    React.createElement(ChevronRight, null))),
            React.createElement(VirtualizedSwipeableViews, { key: 'calendar-month-swipeable', action: function (actions) { return _this.updateHeight.year = actions.updateHeight; }, className: classes.calendarContainer, index: year * 12 + month, animateHeight: true, onChangeIndex: this.changeMonth, slideRenderer: function (_a) {
                    var index = _a.index;
                    return _this.monthIndexValid(index) ?
                        React.createElement("div", { key: index, className: classes.calendarContainer },
                            React.createElement("div", { className: classes.calendarControlMonth },
                                React.createElement(Button, { onClick: _this.showYearsCalendar, classes: { root: classes.calendarMonthTitle } }, DateUtil.month[index % 12].long + ', ' + Math.floor(index / 12))),
                            React.createElement("div", { className: classes.week }, ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (day, index) {
                                return React.createElement(Typography, { key: 'weeklabel-' + index, className: classes.labelWeekDay, variant: 'body1', style: { height: buttonHeight, lineHeight: buttonHeight + "px" } }, day);
                            })),
                            _this.generateMonthCalendar(index).map(function (week, index) {
                                return React.createElement("div", { className: classes.week, key: 'week-' + index }, week.map(function (date, index) {
                                    return date ? React.createElement(IconButton, { classes: { root: classnames((_a = {}, _a[classes.selectedDay] = active && DateUtil.sameDay(date, active), _a), classes.weekDay) }, disabled: _this.dayInvalid(date), onClick: function (event) { return _this.selectDate(date, event); }, key: 'day-' + index, style: { height: buttonHeight - 10 } },
                                        React.createElement(Typography, { classes: { root: classnames((_b = {},
                                                    _b[classes.selectedDayText] = active && DateUtil.sameDay(date, active),
                                                    _b[classes.invalidInput] = _this.dayInvalid(date),
                                                    _b)) }, variant: 'body1', style: { height: buttonHeight - 10, lineHeight: buttonHeight - 10 + "px" } }, date.getDate())) :
                                        React.createElement("div", { className: classes.weekDay, style: { height: buttonHeight - 10 }, key: 'day-' + index });
                                    var _a, _b;
                                }));
                            })) :
                        React.createElement("div", { key: index });
                } }),
            okToConfirm && React.createElement("div", { className: classes.okToConfirmRow, key: 'calendar-confirm-button' },
                React.createElement(Button, { onClick: closeCalendar }, "CANCEL"),
                React.createElement(Button, { onClick: function (event) { return _this.confirmDate(event); } }, "OK"))
        ] :
            mode === 'year' ? [
                React.createElement("div", { className: classes.calendarControl, key: 'calendar-year-control' },
                    React.createElement(IconButton, { classes: { root: classes.calendarControlButton }, disabled: !this.previousYearsValid(), onClick: this.previousYears },
                        React.createElement(ChevronLeft, null)),
                    React.createElement(IconButton, { classes: { root: classes.calendarControlButton }, disabled: !this.nextYearsValid(), onClick: this.nextYears },
                        React.createElement(ChevronRight, null))),
                React.createElement(VirtualizedSwipeableViews, { key: 'calendar-year-swipeable', action: function (actions) { return _this.updateHeight.year = actions.updateHeight; }, className: classes.calendarContainer, index: yearIndex, animateHeight: true, onChangeIndex: this.changeYears, slideRenderer: function (_a) {
                        var index = _a.index;
                        return _this.yearIndexValid(index) ?
                            React.createElement("div", { key: index },
                                React.createElement("div", { className: classes.calendarControlMonth },
                                    React.createElement(Button, { onClick: function () { return _this.selectCalendarYear(); }, classes: { root: classes.calendarMonthTitle } }, (index * 18) + ' - ' + (index * 18 + 17))),
                                React.createElement("div", { className: classes.calendarContainer }, _this.generateYearCalendar(index).map(function (years, index) {
                                    return React.createElement("div", { className: classes.years, key: 'years-' + index }, years.map(function (currentYear, index) {
                                        return React.createElement(Button, { className: classnames((_a = {}, _a[classes.selectedYear] = year === currentYear, _a)), variant: year === currentYear ? 'raised' : 'flat', disabled: _this.yearInvalid(currentYear), onClick: function () { return _this.selectCalendarYear(currentYear); }, key: 'year-' + index },
                                            React.createElement(Typography, { className: classnames((_b = {},
                                                    _b[classes.invalidInput] = _this.yearInvalid(currentYear),
                                                    _b[classes.selectedYearText] = year === currentYear,
                                                    _b)), variant: 'body1' }, currentYear));
                                        var _a, _b;
                                    }));
                                }))) :
                            React.createElement("div", { key: index });
                    } })
            ] : []));
    };
    Calendar = __decorate([
        withStyles(styles)
    ], Calendar);
    return Calendar;
}(React.Component));
export default Calendar;
//# sourceMappingURL=calendar.js.map