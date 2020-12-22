import { Input, Modal, Row, Tooltip } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import Layout_Body from '../components/Layout'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router';
import Axios from 'axios';

interface Props {
    
}

export default function profile({}: Props): ReactElement {

    const authenReducer = useSelector(({authenReducer}) => authenReducer)
    const [isModalVisible, setIsModalVisible] = useState(true);
    const Fullname = authenReducer.user ? authenReducer.user.name.split(" ") : ""
    let FirstName = Fullname[0]
    let LastName = Fullname[1]
    let Email = authenReducer.user ? authenReducer.user.email : ""
    const dispatch = useDispatch()
    const routers = useRouter()

    
    const handleOk = async () => {
        const confirm_sure = await confirm('ต้องการบันทึก?')
        if(!confirm_sure)
            return
        const param = {
            Email : Email, 
            FirstName : FirstName,
            LastName : LastName,
            id : authenReducer.user ? authenReducer.user.uid : 0
        }
        console.log(param)
        Axios({
            url: `http://kdxr.xyz:7777/tracking_api/authen/update`,
            data: param,
            method: "PUT",
        })
        .then(async (res) => {
            console.log(res.data)
            if(res.data.message !== "done")
                alert("Denied")
            else{
                setIsModalVisible(false);
                const modal = Modal.success({
                    title: 'บันทึกข้อมูลแล้วเรียบร้อย',
                    content: `ขอบคุณที่สนใจเรานะจร๊า อุอิคุคิ มุมิ.`,
                })
                setTimeout(() => {
                    modal.destroy()
                    routers.push("/")
                }, 2000)
                
            }
                
        })
        .catch((err) => {
            console.log(err)
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChange = (val) => {
        const data = val.target
        if(data.name == "Email")
            Email = val.target.value
        else if(data.name == "FirstName")
            FirstName =  val.target.value
        else if(data.name == "LastName")
            LastName =  val.target.value
    }
    
    return (
        <Layout_Body>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input
                    placeholder="Enter your lastname"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    name="Email"
                    defaultValue={Email || ''}
                    onChange={onChange}
                    suffix={
                        <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />
                <Input
                    placeholder="Enter your username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    name="FirstName"
                    defaultValue={FirstName || ''}
                    onChange={onChange}
                    suffix={
                        <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />
                <Input
                    placeholder="Enter your lastname"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    name="LastName"
                    defaultValue={LastName || ''}
                    onChange={onChange}
                    suffix={
                        <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />
            </Modal>
        </Layout_Body>
    )
}
