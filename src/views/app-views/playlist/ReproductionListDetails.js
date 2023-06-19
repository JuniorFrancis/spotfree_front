import React from 'react';
import { Drawer, Divider, } from 'antd';
import { UserOutlined, TagsOutlined, PicCenterOutlined, CalendarOutlined, ReadOutlined } from '@ant-design/icons';

export const ReproductionListDetails = ({ data, visible, close}) => {
    return (
        <Drawer
            width={330}
            placement="right"
            onClose={close}
            closable={false}
            open={visible}
        >
            <div className="text-center mt-3">
                <h3 className="mt-2 mb-0">{data?.name}</h3>
            </div>
            <Divider dashed />
            <div className="mt-5">
                <h5 className="text-muted text-uppercase mb-3">Details</h5>
                <p>
                    Description <br></br>
                    <span className="ml-3 text-dark">{data?.description}</span>
                </p>
                <h6 className="text-muted text-uppercase mb-3">Musics</h6>
                {
                    data?.musics?.map( (music, index) => {
                        return <div key={index}>
                        <p >
                            <strong >Music name: </strong>
                            <span>{music?.title} - {music?.album}</span>
                        </p>
                    </div>
                    })
                }
            </div>
        </Drawer>
    )
}

export default ReproductionListDetails