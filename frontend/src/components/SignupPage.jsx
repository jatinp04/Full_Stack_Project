import { React, useState } from "react";
import axios from "../Api";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmPass, setConfirmPass] = useState();

  function Signup(e) {
    // console.log("Check!");

    if (password !== confirmPass) {
      alert("Password Not Matching");
    }
    e.preventDefault(); //Prevent Reloading
    axios
      .post(
        "/signup",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          //Redirect to login
          navigate("/login");
        }
      })
      .catch((Err) => {
        if (Err) {
          alert("Please Try Again!");
        }
      });
  }
  return (
    <>
      <div className="center">
        <h1>Signup</h1>
        <form method="post">
          <div className="txt_field">
            <input
              type="text"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <span></span>
            <label>Password</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            ></input>
            <span></span>
            <label>confirm Password?</label>
          </div>
          <button className="submit" onClick={Signup} >SignUp</button>
          <div className="login_link">
            Already signed up? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupPage;
