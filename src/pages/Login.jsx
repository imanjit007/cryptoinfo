import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../images/crypto-info-logo.svg";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
const Login = () => {
  const { setUser } = CryptoState();

  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleSubmit = async (event) => {
    await axios
      .post("http://localhost:4040/users/login", inputData)
      .then((res) => {
        if (res.data.success === true) {
          // localStorage.setItem('userprofile',JSON.stringify(res.data.message));
          localStorage.setItem('token',res.data.token);
          navigate("/", { state: "Successfully Login" });
          setUser(res.data);
        }
        else{
          alert(`Invalid Email or Password`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="form-box">
          <div className="form-container">
            <Link
              to="/"
              className="d-flex align-items-center justify-content-center mb-2"
            >
              <img src={logo} alt="Crypt Info" height={60} />
            </Link>
            <p className="title">Login</p>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="input-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@domain.in"
                  value={inputData.email}
                  onChange={handleOnchange}
                />
              </div>
              <div className="input-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password.."
                  value={inputData.password}
                  onChange={handleOnchange}
                />
                <div className="forgot">
                  <Link rel="noopener noreferrer">Forgot Password ?</Link>
                </div>
              </div>
              <button onClick={handleSubmit} className="sign">
                Login
              </button>
            </form>
            <br />
            <p className="signup">
              Don't have an account?
              <Link rel="noopener noreferrer" to="/signup" className="">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
