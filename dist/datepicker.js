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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Today from '@material-ui/icons/Today';
import * as DateUtil from './date';
import Calendar from './calendar';
var styles = function (theme) { return ({
    label: {
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    formControl: {
        cursor: 'pointer'
    },
    input: {
        width: '180px',
        maxWidth: '100%',
        height: '19px',
        padding: '6px 0 7px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}); };
var DateFormatInput = /** @class */ (function (_super) {
    __extends(DateFormatInput, _super);
    function DateFormatInput(props) {
        var _this = _super.call(this, props) || this;
        _this.action = {};
        _this.handleWindowClick = function (event) {
            if ([_this.input, _this.calendar].reduce(function (contain, next) { return contain && (!next || next.compareDocumentPosition(event.target) < 16); }, true)) {
                _this.closeCalendar();
            }
        };
        _this.onFocus = function (focus) {
            _this.setState({ focus: focus });
        };
        _this.toggleShowCalendar = function () {
            var calendarShow = _this.state.calendarShow;
            _this.setState({ calendarShow: !calendarShow });
        };
        _this.closeCalendar = function () {
            _this.setState({ calendarShow: false });
        };
        _this.dateValue = function (date) {
            var dateFormat = _this.props.dateFormat;
            if (typeof dateFormat === 'string') {
                return DateUtil.format(date, dateFormat);
            }
            else if (typeof dateFormat === 'function') {
                return dateFormat(date);
            }
            else {
                return DateUtil.format(date, 'EEE, MMMM d, yyyy');
            }
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
        _this.state = {
            focus: false,
            calendarShow: false
        };
        return _this;
    }
    DateFormatInput.prototype.componentDidMount = function () {
        window.addEventListener('click', this.handleWindowClick);
    };
    DateFormatInput.prototype.componentDidUpdate = function (prevProps, prevState) {
        if ((prevProps.value && prevProps.value.getTime()) !== (this.props.value && this.props.value.getTime()) && prevState.calendarShow) {
            this.closeCalendar();
        }
    };
    DateFormatInput.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.handleWindowClick);
    };
    DateFormatInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, name = _a.name, label = _a.label, value = _a.value, onChange = _a.onChange, anchorOrigin = _a.anchorOrigin, transformOrigin = _a.transformOrigin, disabled = _a.disabled, error = _a.error, fullWidth = _a.fullWidth, min = _a.min, max = _a.max, dialog = _a.dialog, okToConfirm = _a.okToConfirm, endIcon = _a.endIcon, className = _a.className, InputLabelProps = _a.InputLabelProps, InputProps = _a.InputProps, FormHelperTextProps = _a.FormHelperTextProps, CalendarProps = _a.CalendarProps, classes = _a.classes;
        var _b = this.state, focus = _b.focus, calendarShow = _b.calendarShow;
        return ([
            React.createElement("div", { key: 'date-input', className: className, ref: function (input) { return _this.input = input; } },
                React.createElement(FormControl, { className: classes.formControl, disabled: disabled, onClick: this.toggleShowCalendar, error: error !== undefined, fullWidth: true },
                    label && React.createElement(InputLabel, __assign({ shrink: focus || calendarShow || value !== undefined, htmlFor: name }, __assign({}, InputLabelProps, { classes: InputLabelProps && InputLabelProps.classes ? __assign({ root: classes.label }, InputLabelProps.classes) : { root: classes.label } })), label),
                    React.createElement(Input, __assign({ name: name, value: value ? this.dateValue(value) : '\u00a0', onFocus: function () { return _this.onFocus(true); }, onBlur: function () { return _this.onFocus(false); }, inputComponent: function (_a) {
                            var value = _a.value;
                            return React.createElement("div", { className: classes.input }, value);
                        }, endAdornment: React.createElement(InputAdornment, { position: 'end' },
                            React.createElement(IconButton, { onMouseDown: function (event) { return event.preventDefault(); } }, endIcon ? endIcon : React.createElement(Today, null))) }, InputProps)),
                    error && React.createElement(FormHelperText, __assign({ error: true }, FormHelperTextProps), error))),
            dialog ?
                React.createElement(Dialog, { key: 'date-dialog', open: calendarShow, onClose: this.closeCalendar },
                    React.createElement(Calendar, __assign({ ref: function (calendar) { return _this.calendar = ReactDOM.findDOMNode(calendar); }, value: value, onChange: onChange, min: min, max: max, closeCalendar: this.closeCalendar, okToConfirm: okToConfirm }, CalendarProps))) :
                React.createElement(Popover, { key: 'date-popover', onEntered: function () { if (_this.action.resize)
                        _this.action.resize(); }, open: calendarShow, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, anchorEl: this.input },
                    React.createElement(Calendar, __assign({ action: function (action) { return _this.action.resize = action.resize; }, ref: function (calendar) { return _this.calendar = ReactDOM.findDOMNode(calendar); }, value: value, onChange: onChange, min: min, max: max, closeCalendar: this.closeCalendar, okToConfirm: okToConfirm }, CalendarProps)))
        ]);
    };
    DateFormatInput = __decorate([
        withStyles(styles)
    ], DateFormatInput);
    return DateFormatInput;
}(React.Component));
export default DateFormatInput;
//# sourceMappingURL=datepicker.js.map