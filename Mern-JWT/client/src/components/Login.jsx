import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalState } from "../hooks/useLocalStorage";

const LOGIN_URL = "/auth";
function Login() {
  const errRef = useRef();
  const [formValue, setFormValue] = useState({ user: "", password: "" });
  const [persist, setPresit] = useLocalState("persist");
  const { auth, handleAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname || "/";

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((preVal) => ({ ...preVal, [name]: value }));
  };

  const togglePersist = () => {
    setPresit((pre) => !pre);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, formValue);
      const { acessToken, roles } = response?.data;
      handleAuth({ ...formValue, roles, acessToken });
      setErrMsg("");
      navigate(from, { replace: true });
    } catch (error) {
      console.log("error: ", error);
      if (!error.response) {
        setErrMsg("NO server response");
      } else if (error.response.status === 400) {
        setErrMsg("username and password Missing");
      } else if (error.response.status === 402) {
        setErrMsg("UnAuthorized");
      } else {
        setErrMsg("Login Falied");
      }
    }
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">username:</label>
        <input
          type="text"
          name="user"
          id="username"
          autoComplete="off"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formValue.password}
          required
        />

        <button>Sign In</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Need a Create Account?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">Sign Up</a>
        </span>
      </p>
    </section>
  );
}

export default Login;
