import { Button, Col, Form, Input, Row } from 'antd'
import React, { ReactElement, useEffect } from 'react'
import Layout_Body from '../components/Layout'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Content } from 'antd/lib/layout/layout';
import { useDispatch, useSelector } from 'react-redux'
import action from '../redux/actions'
import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';

interface Props {
    
}

export default function Login_pages({}: Props): ReactElement {
    const dispatch = useDispatch()
    const routers = useRouter()
    const onFinish = (values) => {
        Axios({
            url: `http://kdxr.xyz:7777/tracking_api/authen/login`,
            data: {Email : values.email, Mobile : values.password},
            method: "POST",
        })
        .then((res) => {
            console.log(res.data)
            if(res.data.message !== "done")
                alert("Denied")
            else{
                dispatch(action.login({
                    email: values.email, 
                    name: res.data.data.first_name + " " + res.data.data.last_name,
                    uid: res.data.data.id,
                    token: res.data.data.access_token
                }))
            }
                
        })
        .catch((err) => {
            console.log(err)
            if(err.response.status === 401)
                alert("Login Failed")
        });
    };

    return (
        <div style={{width: '100vw', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>  
            <div>
                <Form
                name="LOGINGIN"
                onFinish={onFinish}
                >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item >
                    <Button type="primary" htmlType="submit"  style={{marginLeft: '6vw',marginRight: '4vw'}}>
                        Login
                    </Button>
                    <Button type="danger" onClick={() => routers.push('/register')} htmlType="button">
                        Registarza
                    </Button>
                </Form.Item>
                </Form>
            </div>             
        </div>
        
    )
}
