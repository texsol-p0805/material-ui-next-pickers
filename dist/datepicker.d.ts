/// <reference types="react" />
import * as React from 'react';
import { StyledComponentProps } from '@material-ui/core/styles';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import { InputProps } from '@material-ui/core/Input';
import { InputLabelProps } from '@material-ui/core/InputLabel';
import { CalendarProps } from './calendar';
declare class DateFormatInput extends React.Component<DateFormatInputProps, DateFormatInputState> {
    action: any;
    input: Element;
    calendar: Element;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentWillUnmount(): void;
    handleWindowClick: (event: any) => void;
    onFocus: (focus: boolean) => void;
    toggleShowCalendar: () => void;
    closeCalendar: () => void;
    dateValue: (date: Date) => string;
    render(): JSX.Element[];
}
export interface DateFormatInputProps extends React.Props<{}>, StyledComponentProps {
    name: string;
    label?: string;
    value: Date;
    onChange: (value: Date, event?: React.MouseEvent<HTMLElement>) => void;
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    disabled?: boolean;
    error?: string;
    min?: Date;
    max?: Date;
    dateFormat?: string | ((date: Date) => string);
    fullWidth?: boolean;
    dialog?: boolean;
    okToConfirm?: boolean;
    endIcon?: Node;
    className?: string;
    InputLabelProps?: InputLabelProps;
    InputProps?: InputProps;
    FormHelperTextProps?: FormHelperTextProps;
    CalendarProps?: CalendarProps;
}
export interface DateFormatInputState {
    focus: boolean;
    calendarShow: boolean;
}
export default DateFormatInput;
