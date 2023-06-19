import React from 'react';
import { Form, Select } from "antd";

const { Option } = Select;
const EasyInputNumber = ({
    name,
    label,
    placeholder,
    value,
    defaultValue,
    minValue,
    rules, 
    style,
    options,
    size
}) => {

    return(
        <Form.Item
            name={name}
            label={label}
            rules={rules}
        >
            <Select
                style={style} 
                showSearch
                name={name}
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    options.map( option => {
                        return <Option key={option.name} value={option.value}>{option.name}</Option>
                    })
                }
            </Select>
        </Form.Item>
    );
}

export default EasyInputNumber;