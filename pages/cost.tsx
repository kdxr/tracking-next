import { Col, Row } from 'antd'
import React, { ReactElement } from 'react'
import Layout_Body from '../components/Layout'

interface Props {
    
}

export default function cost({}: Props): ReactElement {
    return (
        <Layout_Body>
            <Row gutter={16} justify={'center'} align={'middle'}>
                <Col span={24}>
                    Cost
                </Col>
            </Row>
        </Layout_Body>
    )
}
