import './index.css'
import {useState} from "react";
import {login, register} from '../../Api'

export function Authentication() {
    const [request, setRequest] = useState('LOGIN')
    const [authProps, setAuthProps] = useState({username: '', password: '', uname: '', contact: ''})

    function handleChange(e) {
        e.preventDefault()
        console.log(e.target.name, e.target.value)
        setAuthProps(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    function handleClick() {
        let data;
        if (request === "LOGIN") {
            login(authProps)
        } else {
            register(authProps)
        }
    }

    function toggleRequestState() {
        if (request === 'LOGIN') {
            setRequest('REGISTER')
        } else {
            setRequest('LOGIN')
        }
    }

    return (
        <div className="auth-wrapper">
            <div className={"wrapper box-shadow"}>
                {request === 'LOGIN' && <Login toggleRequestState={toggleRequestState} handleChange={handleChange}
                                               handleClick={handleClick}/>}
                {request === 'REGISTER' &&
                    <Register toggleRequestState={toggleRequestState} handleChange={handleChange}
                              handleClick={handleClick}/>}
            </div>
        </div>
    )
}


function Login({toggleRequestState, handleChange, handleClick}) {

    return (
        <div className={'login-wrapper'}>
            <div className="brand-logo"></div>
            <div className="brand-title">PADEL</div>
            <div><input type={"email"} placeholder={'john@email.com'} name={'username'} onInput={handleChange}/></div>
            <div><input type={'password'} placeholder={'*************'} name={'password'} onInput={handleChange}/></div>
            <div>
                <button className={'btn-filled'} onClick={handleClick}>LOGIN</button>
            </div>
            <div>
                <div className={'btn-naked'}>
                    <button onClick={toggleRequestState}>New user ?</button>
                </div>
            </div>
        </div>
    )
}

function Register({toggleRequestState, handleChange, handleClick}) {
    return (
        <div className={'register-wrapper '}>
            <div className="brand-logo"></div>
            <div className="brand-title">PADEL</div>
            <div className={'input'}><input type={"email"} placeholder={'john@email.com'} name={'username'}
                                            onInput={handleChange}/></div>
            <div className={'input'}><input type={'password'} placeholder={'***********'} name={'password'}
                                            onInput={handleChange}/></div>
            <div className={'input'}><input type={'text'} placeholder={'John Sphere'} name={'uname'} onInput={handleChange}/>
            </div>
            <div className={'input'}><input type={'tel'} placeholder={'989988198'} name={'contact'}
                                            onInput={handleChange}/></div>
            <div>
                <button className={'btn-filled'} onClick={handleClick}>REGISTER</button>
            </div>
            <div>
                <div className={'btn-naked'}>
                    <button onClick={toggleRequestState}>Already signed in ?</button>
                </div>
            </div>
        </div>
    )
}