import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
/////
import Title from '../Components/Title';


/*function RegisterScreen() {
    return(
        <div>
            RegisterScreen
        </div>
    )*/



function RegisterScreen({setUser}){
    const onFinish = (values) => {
        setUser({username: values.username, password: values.password})
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div style={{display:'flex', flexDirection:'row',backgroundColor: '#E9E2CF', height:'100vh'}}>
            <div style={{display:'flex', flex: 2, backgroundColor:'#5A7262', height:'100vh'}}>
                <Title />
            </div> 
            
                
            
            <div style={{display:'flex', flex: 1, justifyContent:'center',backgroundColor:'#E9E2CF', alignItems:'center'}}>
                <Form 
                    name="basic" 
                    labelCol={{span: 8,}} 
                    wrapperCol={{span: 16,}} 
                    initialValues={{remember: true,}} 
                    onFinish={onFinish} 
                    onFinishFailed={onFinishFailed} 
                    style={{justifyContent: 'center', color: "#5A7262",fontfamily: 'Times New Roman', fontSize: 22}}
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
        </div>
    )
}

export default RegisterScreen

