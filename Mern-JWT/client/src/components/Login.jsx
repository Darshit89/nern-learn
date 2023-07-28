import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from './context/AuthProvider'
import axios from './api/axios'


const LOGIN_URL = '/auth'
function Login() {
    const errRef = useRef()
    const [formValue, setFormValue] = useState({ user: '', password: '' })
    // const [valid, setValid] = useState({
    //     user: false, password: false
    // })
    // const [focusUser, setFocusUser] = useState({
    //     user: false, password: false
    // })
    const { auth, handleAuth } = useContext(AuthContext)
    console.log('auth: ', auth, handleAuth);

    const [errMsg, setErrMsg] = useState('')
    const [success, setsuccess] = useState(false)


    useEffect(() => {
        setErrMsg('')
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(preVal => ({ ...preVal, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(LOGIN_URL, formValue)
            const { acessToken, roles } = response?.data
            handleAuth({ ...formValue, roles, acessToken })
            setErrMsg('')
            // setsuccess(true)
        } catch (error) {
            console.log('error: ', error);
            if (!error.response) {
                setErrMsg('NO server response')
            } else if (error.response.status === 400) {
                setErrMsg('username and password Missing')
            } else if (error.response.status === 402) {
                setErrMsg('UnAuthorized')
            } else {
                setErrMsg("Login Falied")
            }

        }
    }
    return (
        <>
            {
                success ? (
                    <section>
                        <h1>You are Logged in!</h1>
                        <br />
                        <p>
                            <a href="#">Go to Home</a>
                        </p>
                    </section >) : (<section>
                        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit} >
                            <label htmlFor="user">
                                username:
                            </label>
                            <input
                                type="text"
                                name="user"
                                id="username"
                                autoComplete='off'
                                onChange={handleChange}
                                required />

                            <label htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                onChange={handleChange}
                                value={formValue.password}
                                required

                            />

                            <button >Sign In</button>
                        </form>
                        <p>
                            Need a Create Account?<br />
                            <span className="line">
                                {/*put router link here*/}
                                <a href="#">Sign Up</a>
                            </span>
                        </p>
                    </section>)
            }
        </>

    )
}

export default Login