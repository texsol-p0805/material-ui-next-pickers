/// <reference types="react" />
import * as React from 'react';
import { StyledComponentProps } from '@material-ui/core/styles';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import { InputProps } from '@material-ui/core/Input';
import { InputLabelProps } from '@material-ui/core/InputLabel';
import { ClockProps } from './clock';
declare class TimeFormatInput extends React.Component<TimeFormatInputProps, TimeFormatInputState> {
    action: any;
    input: Element | Text;
    clock: Element | Text;
    constructor(props: any);
    componentDidMount(): void;
    onFocus: (focus: boolean) => void;
    toggleShowClock: () => void;
    closeClock: () => void;
    render(): JSX.Element[];
}
export interface TimeFormatInputProps extends React.Props<{}>, StyledComponentProps {
    name: string;
    label?: string;
    value: Date;
    onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
    selectableMinutesInterval?: number;
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
    fullWidth?: boolean;
    dialog?: boolean;
    okToConfirm?: boolean;
    endIcon?: Node;
    className?: string;
    InputLabelProps?: InputLabelProps;
    InputProps?: InputProps;
    FormHelperTextProps?: FormHelperTextProps;
    ClockProps?: ClockProps;
}
export interface TimeFormatInputState {
    focus: boolean;
    clockShow: boolean;
}
export default TimeFormatInput;
