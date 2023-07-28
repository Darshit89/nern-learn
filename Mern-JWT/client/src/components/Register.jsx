import React, { useRef, useState } from 'react'
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../api/axios';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register'
function Register() {
    const errRef = useRef()
    const [formValue, setFormValue] = useState({ user: '', password: '', matchPwd: '' })
    const [valid, setValid] = useState({
        user: false, password: false, matchPwd: false
    })
    const [focusUser, setFocusUser] = useState({
        user: false, password: false, matchPwd: false
    })

    const [errMsg, setErrMsg] = useState('')
    const [success, setsuccess] = useState(false)

    useEffect(() => {
        const userValid = USER_REGEX.test(formValue.user)
        const pwdValid = PWD_REGEX.test(formValue.password)
        const match = formValue.password === formValue.matchPwd
        setValid({ ...valid, user: userValid, password: pwdValid, matchPwd: match })
        setErrMsg('')
    }, [formValue])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(preVal => ({ ...preVal, [name]: value }))
    }
    const handleFocues = (e) => {
        const { name } = e.target
        setFocusUser(preVal => ({ ...preVal, [name]: true }))
    }
    const handleBlur = (e) => {
        const { name } = e.target
        setFocusUser(preVal => ({ ...preVal, [name]: false }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!USER_REGEX.test(formValue.user) || !PWD_REGEX.test(formValue.password)) {
            setErrMsg("Invalid Value")
            return
        }
        const { user, password } = formValue
        try {
            const response = await axios.post(REGISTER_URL, { user, password })
            console.log('response: ', response);
            setsuccess(true)
            setFormValue({})
        } catch (error) {
            console.log('error.response.status : ', error.response.status);
            if (error.response.status === 409) {
                setErrMsg("Alredy Registered ")
            } else {
                setErrMsg("Registation Faild")
            }
            errRef.current.focus()
        }
        console.log("submite", { user, password })
    }
    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="user">
                            username:<span className={valid.user ? "valid" : 'hide'}><FontAwesomeIcon icon={faCheck} /></span>
                            <span className={valid.user || !formValue.user ? "hide" : 'invalid'}><FontAwesomeIcon icon={faTimes} /></span>
                        </label>
                        <input
                            type="text"
                            name="user"
                            id="username"
                            autoComplete='off'
                            value={formValue.user}
                            aria-invalid={valid.user ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onChange={handleChange}
                            onFocus={handleFocues}
                            onBlur={handleBlur}
                            required />
                        <p id="uidnote" className={focusUser.user && formValue.user && !valid.user ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={valid.password ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={valid.password || !formValue.password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            onChange={handleChange}
                            value={formValue.password}
                            required
                            aria-invalid={valid.password ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={handleFocues}
                            onBlur={handleBlur}
                        />
                        <p id="pwdnote" className={focusUser.password && !valid.password ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={valid.matchPwd && formValue.matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={valid.matchPwd || !formValue.matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            name='matchPwd'
                            onChange={handleChange}
                            value={formValue.matchPwd}
                            required
                            aria-invalid={valid.matchPwd ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={handleFocues}
                            onBlur={handleBlur}
                        />
                        <p id="confirmnote" className={focusUser.matchPwd && !valid.matchPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!valid.user || !valid.password || !valid.matchPwd ? false : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>)}
        </>
    )
}

export default Register