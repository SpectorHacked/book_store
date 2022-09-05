import React, { useState } from 'react';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';


function AuthControl({setUser}){
    const [isRegisterPage, setIsRegisterPage] = useState(false)

    const moveToRegister = () => {
        setIsRegisterPage(true)
    }
    const moveToLogin = () => {
        setIsRegisterPage(false)
    }
    if(!isRegisterPage) {
        return <LoginScreen moveToScreen={moveToRegister} setUser={setUser}/>
    }
    return(
        <RegisterScreen moveToScreen={moveToLogin} setUser={setUser}/>
    )
}

export default AuthControl