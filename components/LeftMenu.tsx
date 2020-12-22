import { Menu } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import React, { ReactElement, useState } from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux'
import action from '../redux/actions'

interface Props {
    
}

export default function LeftMenu({}: Props): ReactElement {
    const [state, setstate] = useState(false)
    const Routers = useRouter()
    const dispatch = useDispatch()
    const Goto = (pages) => {
        Routers.push(pages)
    }

    const Logout_FN = async () => {
        const confirm_sure = await confirm('ต้องการออกจากระบบ?')
        if(confirm_sure)
        {
            dispatch(action.clear())
            alert("Log out")
        }
    }

    return (
        <Sider breakpoint={"xxl"} trigger={false} collapsible collapsed={state}>
            <div className="logo" >
                TRACKING SYSTEMs
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={() => Goto("tracking")} icon={<UserOutlined />}>
                    Tracking
                </Menu.Item>
                <Menu.Item key="2" onClick={() => Goto("cost")} icon={<VideoCameraOutlined />}>
                   Cost
                </Menu.Item>
                <Menu.Item key="3" onClick={(e) => Logout_FN()} icon={<UploadOutlined />}>
                    Logout
                </Menu.Item>
                <Menu.Item key="4" onClick={(e) => Goto("profile")} icon={<UploadOutlined />}>
                    Edit Profile
                </Menu.Item>
            </Menu>
        </Sider>
      
    )
}
