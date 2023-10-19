import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import logo from "../images/crypto-info-logo.svg";
const Header = () => {
  const location = useLocation();
  const { currency, setcurrency,user } = CryptoState();
  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";
  const isProfile = location.pathname === "/profile";
  console.log();
  return (
    <>
      {!isLogin && !isSignup && !isProfile && (
        <nav className="navbar ">
          <div className="container d-flex justify-content-between align-content-center">
            <NavLink className="navbar-brand" to="/">
              <h4>
                <img src={logo} alt="Crypto Info" height={50} />
              </h4>
            </NavLink>
            <NavLink to="/comparecoins">Compare Coins</NavLink>
            <div className="right-head ">
              <select
                className="info"
                value={currency}
                onChange={(e) => setcurrency(e.target.value)}
              >
                <option value={"usd"}>USD</option>
                <option value={"inr"}>INR</option>
              </select>
              {
                (!user) ? (
                  <NavLink to="/login" className="btn login-btn">
                    Login
                  </NavLink>
                ) : (
                  <div class="dropdown">
                    <button
                      class="btn login-btn dropdown-toggle d-flex align-items-center justify-content-center gap-3"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex gap-2 align-items-center justify-content-center image-conatiner">
                          <img src={user.message.profile} height={40} alt="" />
                          <h4 className="text-light">{user.message.username}</h4>
                      </div>
                    </button>
                    <ul class="dropdown-menu p-4">
                      <li>
                        <NavLink class="dropdown-item"  to='profile'>
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink class="dropdown-item" to="#">
                          Another action
                        </NavLink>
                      </li>
                      <li>
                        <NavLink class="dropdown-item" to="#">
                          Something else here
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )
                // <NavLink className='ms-2' disabled><img height={30} className="client-image" src={location.state.message.profile} alt="" />{location.state.message.username}</NavLink>
              }
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
