import React from "react"
import App from "next/app"
import { AppProps } from "next/app"
import Head from "next/head"
import 'antd/dist/antd.css';
import './styles.css';
import { wrapper } from '../redux'

interface Props{
}

function CMApp( {Component, pageProps }: AppProps){
    return(
        <>
        <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(CMApp)