import axios from "axios";
import React, { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { bake_cookie } from "sfcookies";
function Login() {
  const { API_URL, isLoggedIn, setIsLoggedIn } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(emailInput.current.value);
    console.log(passwordInput.current.value);

    const url = API_URL;
    const json = {
      phone: emailInput.current.value,
      password: passwordInput.current.value,
    };

    axios
      .post(url, json)
      .then((res) => {
        setLoading(false);
        console.log(res);
        setIsLoggedIn(true);
        bake_cookie("isLoggedIn", true);
        setErrMsg("You have login succesfully");
        navigate("/services");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setErrMsg("invalid Email or Password");
        navigate("/");
      });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-3">
              {" "}
              {loading ? (
                <BeatLoader
                  loading={loading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Sign up"
              )}
            </h2>

            <div className="card my-5 shadow">
              <form className="card-body cardbody-color p-lg-5">
                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-user me-3 fa-1x"></i>
                  <input
                    ref={usernameInput}
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    aria-describedby="numberHelp"
                    placeholder="Username"
                  />
                </div>

                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-envelope me-3 fa-1x"></i>
                  <input
                    ref={emailInput}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="numberHelp"
                    placeholder="Email"
                  />
                </div>

                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-lock me-3 fa-1x"></i>
                  <input
                    ref={passwordInput}
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="text-center mb-2">
                  <p className="text-center text-danger mt-3">{errMsg}</p>
                  <button
                    onClick={(e) => submit(e)}
                    type="submit"
                    className="btn btn-primary mb-2"
                  >
                    Create Account
                  </button>
                </div>
                <div
                  id="emailHelp"
                  className="form-text text-center mb-5 text-dark"
                >
                  Already have an Account?{" "}
                  <Link to="/" className="text-dark fw-bold">
                    {" "}
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
