import React from 'react';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';

const { Search } = Input;

const CustomTable = ({
    columns, 
    dataSource, 
    loading, 
    onChangeSearch,
    drawerOn, 
    onNewButton, 
    title, 
    expandable,
    showHeader,
    key,
    visible,
    pageSize,
    showHeaderPage
}) => {

	return (
        <div className={drawerOn ? "table-responsive w-50" : "table-responsive" } style={visible !== undefined && visible === false ? {display: 'none'} : {}}>
            { onChangeSearch ?
                <Row >
                    <Col span={14}><h3 className='mt-1'>{title}</h3></Col>
                    { onNewButton ? 
                        <>
                        <Col span={8}>
                            <Search
                                placeholder="Search"
                                enterButton="Search"
                                size={"middle"}
                                allowClear
                                prefix={<SearchOutlined className="site-form-item-icon" />}
                                onSearch={onChangeSearch}
                                className='mb-2'
                                loading={loading}
                            />
                        </Col>
                        <Col span={2}>
                            <Button block type="primary" className="ml-2" onClick={()=> { onNewButton() }}>
                                <PlusOutlined />
                                <span>New</span>
                            </Button>
                        </Col>
                        </>
                    : 
                        <Col span={10}>
                            <Search
                                placeholder="Search"
                                enterButton="Search"
                                size={"middle"}
                                rowKey={key !== undefined ? key : 'id'} 
                                prefix={<SearchOutlined className="site-form-item-icon" />}
                                onSearch={onChangeSearch}
                                className='mb-2'
                                loading={loading}
                            />
                        </Col>
                    }
                    
                        
                </Row>
            : 
                    showHeaderPage !== false ?
                        <Row >
                            <Col span={14}><h3 className='mt-1'>{title}</h3></Col>
                            { onNewButton ? 
                                <>
                                <Col span={8}>
                                
                                </Col>
                                <Col span={2}>
                                    <Button block type="primary" className="ml-2" onClick={()=> { onNewButton() }}>
                                        <PlusOutlined />
                                        <span>New</span>
                                    </Button>
                                </Col>
                                </>
                            : 
                                <Col span={10}>
                                    <Search
                                        placeholder="Search"
                                        enterButton="Search"
                                        size={"middle"}
                                        rowKey={key !== undefined ? key : 'id'} 
                                        prefix={<SearchOutlined className="site-form-item-icon" />}
                                        onSearch={onChangeSearch}
                                        className='mb-2'
                                        loading={loading}
                                    />
                                </Col>
                            }
                        </Row>
                    : null
            }
            
            <Row>
                <Col span={24} className="mt-3">
                    <Table
                        columns={columns} 
                        dataSource={dataSource}
                        loading={loading}
                        rowKey="id"
                        key={"id"}
                        pagination={{
                            pageSizeOptions: ['10', '20', '50', '100'],
                            showSizeChanger: true,
                            pageSize: pageSize
                        }}
                        expandable={expandable}
                        showHeader={showHeader}
                    />
                </Col>
            </Row>
        </div>
	)
}

export default CustomTable;