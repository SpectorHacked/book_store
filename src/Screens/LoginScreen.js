import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../assets/logo.png'
import { DARK_COLOR, LIGHT_COLOR } from '../constants';

function LoginScreen({setUser}){
    // Todo: handle failed login
    const onFinish = async(values) => {
        const res = await getDataFromServer('/login', {username: values.username, password: values.password})
        if(res.status === '200') {
            if(values.remember) {
                await AsyncStorage.setItem('user', res.data)
            }
            setUser(res.data)
        } else {
            onFinishFailed(res.data)
        }
    };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div style={{display:'flex', flexDirection:'row', height:'100vh'}}>
            <div style={{display:'flex', flex: 2, justifyContent:'center', alignItems:'center', height:'100vh', backgroundColor: DARK_COLOR}}>
                <img src={Logo} alt="Logo" />
            </div>
            <div style={{display:'flex', flex: 1, justifyContent:'center', alignItems:'center', height:'100vh'}}>
                <Form 
                    name="basic" 
                    labelCol={{span: 8,}} 
                    wrapperCol={{span: 16,}} 
                    initialValues={{remember: true,}} 
                    onFinish={onFinish} 
                    onFinishFailed={onFinishFailed} 
                    style={{justifyContent: 'center', color: DARK_COLOR,fontfamily: 'Times New Roman', fontSize: 22}}
                    autoComplete="off">
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
        </div>
    )
}

export default LoginScreen