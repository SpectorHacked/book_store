import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../assets/logo.png'
import { centerObjectCSS, DARK_COLOR, LIGHT_COLOR } from '../constants';
import { setCookieLogin } from '../functions';
import axios from 'axios'
import RegisterScreen from './RegisterScreen';
import { Navigate } from 'react-router';
import { Button as RegisterButton } from '@mui/material';
import { Link } from 'react-router-dom';


function LoginScreen({setUser, moveToScreen}){
    // Todo: handle failed login
    const onFinish = async(values) => {
        try {
            const res = await axios.get('/login', {params: {user: values.username, pass: values.password}})
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
        alert(errorInfo);
    };
    return(
        <div style={{display:'flex', flexDirection:'row', height:'100vh'}}>
            <div style={{display:'flex', flex: 2, justifyContent:'center', alignItems:'center', height:'100vh', backgroundColor: DARK_COLOR}}>
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
                            <h1 style={{ flex: 1, textAlign: "center", fontSize: 75}}>Login</h1>
                            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!',}, ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{required: true,message: 'Please input your password!', }]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8,span: 16,}}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                                <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                            </Form.Item>
                    </Form>
                </div>
                <div>
                    <RegisterButton onClick={() => moveToScreen()}>
                        Register
                    </RegisterButton>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen