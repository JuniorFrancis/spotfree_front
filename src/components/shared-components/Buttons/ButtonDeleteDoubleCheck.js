import { Button, Modal, Tooltip } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from "react";

const ButtonDeleteDoubleCheck = ({
    loading,
    title,
    onClick,
    icon,
    size,
    hiddenTitle,
    message,
    style
}) => {
    const [confirmOne, setConfirmOne] = useState(false);

    const onConfirmOne = () => {
        setConfirmOne(true);
    }

    return (
        <>
        <Modal
            title={"Do you want to delete?"}
            open={confirmOne}
            header={null}
            onOk={onClick}
            onCancel={() => { setConfirmOne(false) }}
            okText={"Delete"}
            cancelText={"Cancel"}
            style={{ fontSize: "16px" }}
        >
            <ExclamationCircleOutlined style={{ fontSize: "18px" }} /> { message !== undefined ? message : "Do you really want to delete?" }
        </Modal>
        <Tooltip title={title}>
            <Button 
                className="float-right" 
                type="danger"
                size={size}
                danger
                icon={icon}
                style={style}
                onClick={onConfirmOne} 
                loading={loading}>
                    { hiddenTitle !== true &&  title }
            </Button>
        </Tooltip>
        </>
    );
}

export default ButtonDeleteDoubleCheck;