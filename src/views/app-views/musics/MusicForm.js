import React, {useEffect, useState} from 'react';
import { Col, Row, Typography, Form, Input, Button, Select, Spin, Popover} from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import InputText from 'components/shared-components/Form/InputText';
import EasyInputNumber from 'components/shared-components/Form/EasyInputNumber';
import EasyInputSelect from 'components/shared-components/Form/EasyInputSelect';
import validations from 'utils/validations';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export const MusicForm = ({selectedMusic, setSelectedMusic, handleSubmit, handleCancel, loading, isEditMusic}) => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('boolean');
    const { Title } = Typography;
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const options = [
        {
            "name": "Samba",
            "value": "SAMBA"
        },
        {
            "name": "Pagode",
            "value": "PAGODE"
        },
        {
            "name": "Pop",
            "value": "POP"
        },
        {
            "name": "Funk",
            "value": "FUNK"
        },
        {
            "name": "Rap",
            "value": "RAP"
        },
        {
            "name": "Classic",
            "value": "CLASSIC"
        }
        ,
        {
            "name": "Rock",
            "value": "ROCK"
        },
        {
            "name": "Indie",
            "value": "INDIE"
        }

    ]

    const onRequiredTypeChange = ({ requiredMark }) => {
        setRequiredMarkType(requiredMark);
    };

    const handleChangeYear = (event) => {
      
        setSelectedMusic({
          ...selectedMusic,
           "year": event,
        });
    };

    useEffect(() => {
        if (isEditMusic === true) {
            form.setFieldValue('title', selectedMusic?.title);
            form.setFieldValue('artist', selectedMusic?.artist);
            form.setFieldValue('album', selectedMusic?.album);
            form.setFieldValue('year', selectedMusic?.year);
            form.setFieldValue('genre', selectedMusic?.genre);

        }
    }, [selectedMusic]);

    return (
        <Row>
            <Form
                form={form}
                layout="inline"
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Row style={{width:"100%"}}>
                    <Col span={24}>
                        <Title level={4}>New Music</Title>
                    </Col>
                </Row>
                <Row className="w-100 mt-2 ">
                    <Popover content={"Album name"}>
                        <Col sm={12} xs={24}>
                            <InputText 
                                placeholder="Album"
                                name="album"
                                rules={validations.required("Plase, type album name")}
                            />
                        </Col>
                    </Popover>
                    <Popover content={"Artist"}>
                        <Col sm={12} xs={24}>
                            <InputText 
                                placeholder="Artist"
                                name="artist"
                                icon={<UserOutlined />}
                                rules={validations.required("Please, report an artist")}
                            />
                        </Col>
                    </Popover>
                </Row>
                
                <Row className="w-100 mt-2">
                    <Popover content={"Title"}>
                        <Col sm={8} xs={8}>
                            <InputText 
                                placeholder="Title"
                                name="title"
                                rules={validations.required("Plase, type album name")}
                            />
                        </Col>
                    </Popover>
                    <Popover content={"Year"}>
                        <Col sm={8} xs={8}>
                            <EasyInputNumber
                                style={{width:"95%"}}
                                name="year" 
                                size='medium'
                                min={1900} 
                                placeholder={currentYear}
                                rules={validations.required("Please, type a year")}
                                onChange={handleChangeYear} 
                            />
                        </Col>
                    </Popover>
                    <Popover content={"Genre of music"}>
                        <Col sm={8} xs={8}>
                            <EasyInputSelect
                                style={{width:"95%"}} 
                                name="genre"
                                placeholder="Select the music genre"
                                rules={validations.required("Please, chose a genre")}
                                options={options}
                            />
                        </Col>
                    </Popover>
                </Row>
                <Row className="w-100 mt-4">
                    <Col sm={24} >
                        <Button className="float-right ml-2"  htmlType="submit" type="primary" loading={loading}>{ isEditMusic ? "Update" : "Create" }</Button>
                        <Button className="float-right" type="danger" onClick={handleCancel} loading={loading}> Cancel </Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    )
}

export default MusicForm;