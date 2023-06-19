import React from 'react';
import { Form, InputNumber } from "antd";

const EasyInputNumber = ({
    name,
    label,
    placeholder,
    value,
    defaultValue,
    minValue,
    rules, 
    style,
    size
}) => {

    return(
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            style={style}
        >
            <InputNumber style={style} placeholder={placeholder} name={name} size={size} min={minValue} value={value} defaultValue={defaultValue} />    
        </Form.Item>
    );
}

export default EasyInputNumber;