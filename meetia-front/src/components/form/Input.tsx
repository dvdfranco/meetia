import { InputText, InputTextProps } from 'primereact/inputtext';
import React from 'react';
import { Controller } from 'react-hook-form';

interface Props extends InputTextProps {
    label?: string;
    name: string;
    control?: any;
    className?: string;
    horizontal? : boolean;
}

const Input: React.FC<Props> = (props) => {
    return (
        <Controller
            control={props.control}
            {...props}
            render={({field}) => (
                <div className="field">
                    <label>{props.label} {props.className}:</label>
                    <InputText
                        {...props}
                        {...field}
                        className={`${props.className} text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary ${props.horizontal ? '' : 'w-full'}`}
                        onBlur={props.onBlur}
                    />
                </div>
            )}
        />
    );
}

export default Input;