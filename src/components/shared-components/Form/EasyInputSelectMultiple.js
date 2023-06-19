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
    handleChange,
    size
}) => {

    return(
        <Form.Item
            name={name}
            label={label}
            rules={rules}
        >
            <Select
                name={name}
                mode="multiple"
                style={style}
                placeholder="Select musics to your playlist"
                defaultValue={defaultValue}
                allowClear
                showArrow
                notFoundContent={"Music not found"}
                onChange={handleChange}
                optionLabelProp="label"
            >
                 {
                    options?.map( option => {
                        return <Option key={option.id} value={option.id} label={option.title}> {option.title} - {option.album} </Option>
                    })
                }
            </Select>
        </Form.Item>
    );
}

export default EasyInputNumber;