import React, { useRef, useState } from "react";
import "./login.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector,useDispatch } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { authenticate } from "../redux/reducer";

export default function Login() {
  
  const [Name, setname] = useState("");
  const [Email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confimpassword, setconfirmpassword] = useState("");
  const [hidelog, sethidelog] = useState(false);
  const [signuplog, setsignuplog] = useState(false);
  const [error, seterror] = useState(false);
  const [mailerror, setmailerror] = useState(false);
  const [signloader, setsignloader] = useState(false);
  const [referenceerror, setreferenceerror] = useState(false);
  const [Logemail, SetLogmail] = useState("");
  const [Logpass, SetLogpass] = useState("");
  const navigate = useNavigate("");

  const passwordref = useRef("");
  const mailref = useRef("");
const authenticates=useSelector((state)=>state.auth.isAuthenticated)
const dispatch=useDispatch()



  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        console.log(credentialResponse.access_token);
        console.log("success");
        const result = await fetch("http://localhost:8000/googlelogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: credentialResponse.access_token }),
        });
        const res = await result.json();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => {
      console.log("something went fishy");
    },
  });

  const handlesignupclick = () => {
    console.log("heeeeeeeeee");
    setsignuplog(true);
    setTimeout(() => {
      sethidelog(true);
    }, 900);
  };
  const handleloginclick = () => {
    setsignuplog(false);
    console.log("h");
    setTimeout(() => {
      sethidelog(false);
    }, 900);
  };

  function checkpassword(e) {
    setreferenceerror(false);
    console.log(password);
    if (e.target.value === password) {
      seterror(false);

      console.log("hi");
    } else {
      console.log("hhhhhhh");
      seterror(true);
    }
  }

  async function onSignup(e) {
    setsignloader(true);
    e.preventDefault();
    console.log(error);
    if (error) {
      console.log("sollll");
      setreferenceerror(true);
      passwordref.current.focus();
    } else {
      try {
        const formdata = new FormData();
        formdata.append("name", Name);
        formdata.append("email", Email);
        formdata.append("password", password);
        const result = await fetch("http://localhost:8000/signup", {
          method: "POST",
          body: formdata,
        });
        const res = await result.json();
        console.log(res);
        if (res.mailerror) {
          setsignloader(false);
          mailref.current.focus();
          setmailerror(true);
          console.log("mail is already used");
        } else if (res.signup) {
          setsignloader(false);
          setsignuplog(false);
          console.log("h");
          setTimeout(() => {
            sethidelog(false);
          }, 900);
          console.log("everyhting seems good");
        } else if (res.error) {
          setsignloader(false);
          console.log("somrhting went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function loguser(e) {
    setsignloader(true);
    e.preventDefault();
    console.log();
    const formdata = new FormData();
    formdata.append("email", Logemail);
    formdata.append("password", Logpass);
    const result = await fetch("http://localhost:8000/loginuser", {
      method: "POST",
      credentials: "include", 
      body: formdata,
    });
    const res = await result.json();
    console.log(res);
    setsignloader(false);

    if (res.message) {
      console.log(res.message);
      dispatch(authenticate(true))
      navigate("/")
    } else {
      toast.error("something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  return (
    <section className="login-section">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container h-100">
        <div className="d-padding h-100">
          <div className="row justify-content-center m-0 align-items-center h-100 row-shadow">
            <div className="col-12 col-lg-5 col-md-5  shadows m-0 right-login left-login d-flex justify-content-center align-items-center flex-column">
              <div className="login-logo">
                <img
                  src="./two-leaves.png"
                  className="make-white login-img"
                  alt="kkk"
                />
              </div>
              <div>
                <h1 className="ai-info">AI INFO</h1>
              </div>
            </div>
            {hidelog ? (
              // createsignup........................................................................................

              <div
                className={`col-12 col-lg-5 col-md-5 shadows m-0 h-100 right-login d-flex justify-content-center align-items-center flex-column ${
                  signuplog ? "" : "make-rotation"
                }`}
              >
                <div>
                  <h3 className="login-heading">
                    Signup for an <span>Account</span>
                  </h3>
                </div>
                <div>
                  <p className=" login-sub-heading text-center">
                    let's get setup so you can create your own <br /> account
                  </p>
                </div>
                <div className="w-100">
                  <form
                    onSubmit={onSignup}
                    className="w-100 d-flex justify-content-center align-items-center flex-column"
                  >
                    <div className="d-flex flex-column gap-1 signup-form">
                      <label htmlFor="" className="label-login">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={Name}
                        placeholder="Enter your name"
                        onChange={(e) => setname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column gap-1 signup-form">
                      <label htmlFor="" className="label-login">
                        Email
                      </label>
                      <input
                        type="email"
                        value={Email}
                        placeholder="Enter your email"
                        name="email"
                        onChange={(e) => {
                          setemail(e.target.value);
                          if (mailerror) {
                            setmailerror(false);
                          }
                        }}
                        ref={mailref}
                        className={`${
                          mailerror ? "referenceerror" : "referenceerrord"
                        }`}
                      />
                      <p
                        className={`seterror ${
                          mailerror ? "d-block" : "d-none"
                        }`}
                      >
                        Email already used!
                      </p>
                    </div>
                    <div className="d-flex flex-column gap-1 pt-1 signup-form">
                      <label htmlFor="">password</label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        className={`${
                          referenceerror ? "referenceerror" : "referenceerrord"
                        }`}
                        required
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-column gap-1 pt-2 signup-form">
                      <label htmlFor="">confirm password</label>
                      <input
                        type="password"
                        placeholder="re enter password"
                        value={confimpassword}
                        className={`${
                          referenceerror ? "referenceerror" : "referenceerrord"
                        }`}
                        ref={passwordref}
                        onChange={(e) => {
                          setconfirmpassword(e.target.value);
                          checkpassword(e);
                        }}
                      />
                      <p
                        className={`seterror  ${
                          error ? "opacity-1" : "opacity-0"
                        } `}
                      >
                        your password doesnt match
                      </p>
                    </div>
                    <div className="pt-4 div-log-btn">
                      <button
                        className="w-100 login-btn d-flex justify-content-center align-items-center"
                        type="submit"
                        disabled={signloader}
                      >
                        {signloader ? (
                          <span className="signloader"></span>
                        ) : (
                          "signup"
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="pt-3">
                    <p className="signup-tag">
                      Already have an account?
                      <a href="#" onClick={() => handleloginclick()}>
                        login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // ..................................................................................................

              <div
                className={`col-12 col-lg-5 col-md-5 shadows m-0 h-100 right-login d-flex justify-content-center align-items-center flex-column ${
                  signuplog ? "make-rotation" : ""
                }`}
              >
                <div>
                  <h3 className=" login-heading">Welcome back</h3>
                </div>
                <div>
                  <p className=" login-sub-heading text-start">
                    welcome back! please enter your details
                  </p>
                </div>
                <form action="" className="form" onSubmit={loguser}>
                  <div className="d-flex flex-column gap-1 email-form">
                    <label htmlFor="" className="label-login">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      required
                      value={Logemail}
                      onChange={(e) => SetLogmail(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-column gap-1 pt-2 email-form">
                    <label htmlFor="">password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      onChange={(e) => SetLogpass(e.target.value)}
                      value={Logpass}
                      name="password"
                    />
                  </div>
                  <div className="pt-2 div-log-btn">
                    <button
                      className="w-100 login-btn"
                      type="submit"
                      disabled={signloader}
                    >
                      {signloader ? (
                        <span className="signloader"></span>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                </form>
                <div className="pt-2 div-google">
                  <button className="google-btn" onClick={() => login()}>
                    <img src="./google.png" alt="not" />
                    Sign in with google
                  </button>
                  <div className="pt-3">
                    <p className="signup-tag">
                      don't have an account?
                      <a href="#" onClick={() => handlesignupclick()}>
                        Signup
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
