import React from 'react';
import { Drawer, Divider, } from 'antd';
import { UserOutlined, TagsOutlined, PicCenterOutlined, CalendarOutlined, ReadOutlined } from '@ant-design/icons';

export const MusicDetails = ({ data, visible, close}) => {
    return (
        <Drawer
            width={330}
            placement="right"
            onClose={close}
            closable={false}
            open={visible}
        >
            <div className="text-center mt-3">
                <h3 className="mt-2 mb-0">{data?.title}</h3>
            </div>
            <Divider dashed />
            <div className="mt-5">
                <h6 className="text-muted text-uppercase mb-3">Details</h6>
                <p>
                    <UserOutlined /> 
                    <span className="ml-3 text-dark">{data?.artist}</span>
                </p>
                <p>
                    <TagsOutlined />
                    <span className="ml-3 text-dark">{data?.genre}</span>
                </p>
                <p>
                    <PicCenterOutlined />
                    <span className="ml-3 text-dark">{data?.title}</span>
                </p>
                <p>
                    <CalendarOutlined />
                    <span className="ml-3 text-dark">{data?.year}</span>
                </p>
                <p>
                    <ReadOutlined />
                    <span className="ml-3 text-dark">{data?.album}</span>
                </p>
            </div>
        </Drawer>
    )
}

export default MusicDetails