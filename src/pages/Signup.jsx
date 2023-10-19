import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import logo from "../images/crypto-info-logo.svg";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    profile: "",
  });
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handlePhoto = (e) => {
    const { files } = e.target;
    convertImageToBase64(files[0])
      .then((result) => {
        setInputData({ ...inputData, profile: result });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const convertImageToBase64 = (files) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(files);
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleSubmit = async () => {
    await axios
      .post("http://localhost:4040/users/signup", inputData)
      .then((res) => {
        // setServerData(res.data);
        navigate("/login", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="form-box">
          <form
            className="form-container"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Link
              to="/"
              className="d-flex align-items-center justify-content-center mb-2"
            >
              <img src={logo} alt="Crypt Info" height={60} />
            </Link>
            <p className="title">Create New Account</p>
            <div className="form">
              <div className="input-group">
                <label htmlFor="username">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  name="profile"
                  id="profile"
                  placeholder=""
                  required
                  onChange={(e) => handlePhoto(e)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder=""
                  required
                  value={inputData.username}
                  onChange={handleOnchange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder=""
                  required
                  value={inputData.email}
                  onChange={handleOnchange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=""
                  required
                  value={inputData.password}
                  onChange={handleOnchange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder=""
                  required
                  value={inputData.cpassword}
                  onChange={handleOnchange}
                />
              </div>
              {/* <p>{errmsg}</p> */}
              <br />
              <button onClick={handleSubmit} className="sign">
                Sign Up
              </button>
            </div>
            <br />
            <p className="signup">
              Already have an account?
              <Link rel="noopener noreferrer" to="/login" className="">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
