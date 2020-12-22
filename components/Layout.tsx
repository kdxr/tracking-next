import { Row } from 'antd'
import Layout, { Content } from 'antd/lib/layout/layout'
import React, { ReactElement, ReactNode } from 'react'
import Footers from './Footers'
import Header from './header'
import LeftMenu from './LeftMenu'
import { useDispatch, useSelector } from 'react-redux'
import Login_pages from '../pages/login'

interface Props {
    children: ReactNode
}


export default function Layout_Body({children}: Props): ReactElement {
    const authenReducer = useSelector(({authenReducer}) => authenReducer)
    const isLogin = authenReducer.user ? true : false
    return (
        <> 
            <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
            <Layout style={{ width: "100vw", height: "100vh" }}>
                {
                    isLogin ? (
                    <>
                        
                        <LeftMenu/>
                        <Layout className="site-layout">
                            <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280
                            }}
                            >
                                {children}
                            </Content>
                            <Footers/>
                        </Layout>
                    </>
                    ):(
                        <>
                        <Login_pages/>
                        <Footers/>
                        </>
                    )
                }
                
               
            </Layout>
        </>
    )
}
