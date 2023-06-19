import React, {useEffect, useState} from 'react';
import { Col, Row, Typography, Form, message, Button, Select, Popover} from 'antd';
import { UnorderedListOutlined, FormOutlined } from '@ant-design/icons';
import InputText from 'components/shared-components/Form/InputText';
import EasyInputSelectMultiple from 'components/shared-components/Form/EasyInputSelectMultiple';
import MusicService from 'services/MusicService';
import validations from 'utils/validations';
import { useNavigate } from 'react-router-dom';

export const ReproductionListForm = ({selectedReproductionList, setSelectedReproductionList, handleSubmit, handleCancel, loading, isEditReproductionList}) => {
    const [form] = Form.useForm();
    const [musics, setMusics] = useState();
    const [requiredMark, setRequiredMarkType] = useState('boolean');
    const { Title } = Typography;
    const navigate = useNavigate();

    const onRequiredTypeChange = ({ requiredMark }) => {
        setRequiredMarkType(requiredMark);
    };

    const getMusics = () => {
        MusicService.getAll().then((response) => {
            setMusics(response);
        }).catch(() => {
            message.error('There was an error, contact support');
        })
    }

    useEffect(() => {
        getMusics();
    }, []);

    useEffect(() => {
        var selectedMusics = [];
        if (isEditReproductionList === true) {
            selectedReproductionList.musics.map( (selectedMusic) => {
                selectedMusics.push(selectedMusic.id);
            })
        }

        if (isEditReproductionList === true) {
            form.setFieldValue('name', selectedReproductionList?.name);
            form.setFieldValue('description', selectedReproductionList?.description);
            form.setFieldValue('musicIds', selectedMusics )
        }
    }, [selectedReproductionList]);

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
                <Row className="w-100 mt-2 ">
                    <Popover content={"Name of Reproduction List"}>
                        <Col sm={12} xs={24}>
                            <InputText 
                                placeholder="Name"
                                name="name"
                                icon={< FormOutlined />}
                                rules={validations.required("Plase, type a name")}
                            />
                        </Col>
                    </Popover>
                    <Popover content={"Description"}>
                        <Col sm={12} xs={24}>
                            <InputText 
                                placeholder="Description"
                                name="description"
                                icon={<UnorderedListOutlined />}
                                // rules={validations.email().concat(validations.required("informare il email"))}
                            />
                        </Col>
                    </Popover>
                </Row>
                <Row className="w-100 mt-2 ">
                    <Col sm={24} xs={24}>
                        <EasyInputSelectMultiple 
                            style={{width:"100%"}} 
                            placeholder="Select musics"
                            options={musics}
                            name="musicIds"
                        />
                    </Col>
                    
                </Row>
              
                <Row className="w-100 mt-4">
                    <Col sm={24} >
                        <Button className="float-right ml-2"  htmlType="submit" type="primary" loading={loading}> { isEditReproductionList ? "Update" : "Create" }</Button>
                        <Button className="float-right" type="danger" onClick={handleCancel} loading={loading}> Cancel </Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    )
}

export default ReproductionListForm;