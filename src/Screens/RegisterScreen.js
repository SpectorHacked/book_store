import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../assets/logo.png'
import { LIGHT_COLOR, DARK_COLOR, centerObjectCSS } from '../constants'
import {Button as LoginButton} from '@mui/material'
import axios from 'axios';
import { setCookieLogin } from '../functions';

function RegisterScreen({setUser, moveToScreen}){
    const onFinish = async(values) => {
        try {
            const res = await axios.get('/register', {params: {user: values.username, pass: values.password, fullname: values.fullname}})
            if(res.status == '200') {
                setCookieLogin(res.data.data, values.remember)
                setUser(res.data.data)
            } else {
                onFinishFailed(res.data.data)
            }
        } catch(res) {
            console.log(res)
            alert(res.response.data.data)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert(errorInfo)
    };
    return(
        <div style={{display:'flex', flexDirection:'row',backgroundColor: LIGHT_COLOR, height:'100vh'}}>
            <div style={{...centerObjectCSS, flex: 2, height:'100vh', backgroundColor: DARK_COLOR}}>
                <img src={Logo} alt="Logo" />
            </div>
            <div style={{...centerObjectCSS, flex: 1, backgroundColor: LIGHT_COLOR, flexDirection:'row'}}>
                <div>
                    <Form 
                        name="basic" 
                        labelCol={{span: 8,}} 
                        wrapperCol={{span: 16,}} 
                        initialValues={{remember: true,}} 
                        onFinish={onFinish} 
                        onFinishFailed={onFinishFailed} 
                        style={{justifyContent: 'center', color: DARK_COLOR,fontfamily: 'Times New Roman', fontSize: 22}}
                        autoComplete="off">
                            <h1 style={{ flex: 1, textAlign: "center", fontSize: 75}}>Register</h1>
                            <Form.Item label="Full name" name="fullname" rules={[{ required: true, message: 'Please input your full name!',}, ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="User name" name="username" rules={[{ required: true, message: 'Please input your username!',}, ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{required: true,message: 'Please input your password!', }]}>
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item label="Confirm Password" name="confirmpassword" rules={[{required: true,message: 'Please confirm your password!', }]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8,span: 16,}}>
                                <Checkbox style={{fontSize: 20}}>Remember me</Checkbox>
                            </Form.Item>
                                <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                                    <Button style={{textAlign: "center", backgroundColor:'#5A7262', fontSize: 22, color: "#E9E2CF"}} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                            </Form.Item>
                    </Form>
                </div>
                <div>
                    <LoginButton onClick={() => moveToScreen()}>
                        Back to login
                    </LoginButton>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen

