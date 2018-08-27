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
import AccessTime from '@material-ui/icons/AccessTime';
import * as DateUtil from './date';
import Clock from './clock';
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
var TimeFormatInput = /** @class */ (function (_super) {
    __extends(TimeFormatInput, _super);
    function TimeFormatInput(props) {
        var _this = _super.call(this, props) || this;
        _this.action = {};
        _this.onFocus = function (focus) {
            _this.setState({ focus: focus });
        };
        _this.toggleShowClock = function () {
            var clockShow = _this.state.clockShow;
            _this.setState({ clockShow: !clockShow });
        };
        _this.closeClock = function () {
            _this.setState({ clockShow: false });
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
            clockShow: false
        };
        return _this;
    }
    TimeFormatInput.prototype.componentDidMount = function () {
        var _this = this;
        window.addEventListener('click', function (event) {
            if ([_this.input, _this.clock].reduce(function (contain, next) { return contain && (!next || next.compareDocumentPosition(event.target) < 16); }, true)) {
                _this.closeClock();
            }
        });
    };
    TimeFormatInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, name = _a.name, label = _a.label, value = _a.value, onChange = _a.onChange, selectableMinutesInterval = _a.selectableMinutesInterval, anchorOrigin = _a.anchorOrigin, transformOrigin = _a.transformOrigin, disabled = _a.disabled, error = _a.error, fullWidth = _a.fullWidth, dialog = _a.dialog, okToConfirm = _a.okToConfirm, endIcon = _a.endIcon, className = _a.className, InputLabelProps = _a.InputLabelProps, InputProps = _a.InputProps, FormHelperTextProps = _a.FormHelperTextProps, ClockProps = _a.ClockProps, classes = _a.classes;
        var _b = this.state, focus = _b.focus, clockShow = _b.clockShow;
        return ([
            React.createElement("div", { key: 'date-input', className: className, ref: function (input) { return _this.input = ReactDOM.findDOMNode(input); } },
                React.createElement(FormControl, { className: classes.formControl, disabled: disabled, onClick: this.toggleShowClock, error: error !== undefined, fullWidth: true },
                    label && React.createElement(InputLabel, __assign({ shrink: focus || clockShow || value !== undefined, htmlFor: name }, __assign({}, InputLabelProps, { classes: InputLabelProps && InputLabelProps.classes ? __assign({ root: classes.label }, InputLabelProps.classes) : { root: classes.label } })), label),
                    React.createElement(Input, __assign({ name: name, value: value ? DateUtil.format(value, 'h:mm a').toUpperCase() : '\u00a0', onFocus: function () { return _this.onFocus(true); }, onBlur: function () { return _this.onFocus(false); }, inputComponent: function (_a) {
                            var value = _a.value;
                            return React.createElement("div", { className: classes.input }, value);
                        }, endAdornment: React.createElement(InputAdornment, { position: 'end' },
                            React.createElement(IconButton, { onMouseDown: function (event) { return event.preventDefault(); } }, endIcon ? endIcon : React.createElement(AccessTime, null))) }, InputProps)),
                    error && React.createElement(FormHelperText, __assign({ error: true }, FormHelperTextProps), error))),
            dialog ?
                React.createElement(Dialog, { key: 'date-dialog', open: clockShow, onClose: this.closeClock },
                    React.createElement(Clock, __assign({ ref: function (clock) { return _this.clock = ReactDOM.findDOMNode(clock); }, value: value, onChange: onChange, selectableMinutesInterval: selectableMinutesInterval, closeClock: this.closeClock, okToConfirm: okToConfirm }, ClockProps))) :
                React.createElement(Popover, { key: 'date-popover', open: clockShow, onEntered: function () { if (_this.action.resize)
                        _this.action.resize(); }, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, anchorEl: this.input },
                    React.createElement(Clock, __assign({ action: function (action) { return _this.action.resize = action.resize; }, ref: function (clock) { return _this.clock = ReactDOM.findDOMNode(clock); }, value: value, onChange: onChange, selectableMinutesInterval: selectableMinutesInterval, closeClock: this.closeClock, okToConfirm: okToConfirm }, ClockProps)))
        ]);
    };
    TimeFormatInput = __decorate([
        withStyles(styles)
    ], TimeFormatInput);
    return TimeFormatInput;
}(React.Component));
export default TimeFormatInput;
//# sourceMappingURL=timepicker.js.map