import React from 'react';
import { Form, Input } from "antd";

const InputText = ({
    name,
    label,
    placeholder,
    value,
    icon,
    rules, 
    style,
    readonly
}) => {

    return(
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            style={style}
        >
        {
            value !== undefined ?
                <Input prefix={icon} placeholder={placeholder} value={value} readOnly={readonly} />
            : 
                <Input prefix={icon} placeholder={placeholder} readOnly={readonly}  />
        }
        </Form.Item>
    );
}

export default InputText;