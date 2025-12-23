import React, { useState } from "react";
import "./chat.css";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "./redux/reducer";

export default function Sidbar({ active, logged }) {
  const authenticate=useSelector((state)=>state.auth.isAuthenticated)
  console.log(authenticate)
  console.log(active)
  console.log(logged)
  const dispatch=useDispatch()
  const navigate = useNavigate("");
  const [Showopacity, setShowopacity] = useState(false);
  function opensidebar() {
    setShowopacity(!Showopacity);
    console.log(active);
  }
  function callhover() {
    const ul = document.querySelectorAll("ul");
    console.log(ul);
  }
  function activelogout(){
      
    dispatch(logout(true))

 
  }
 
  return (
    <>
      <button className="sidebar-btn" onClick={opensidebar}>
        <img src="./categories-removebg-preview.png" alt="" />
      </button>
      <section className={`sidebar ${Showopacity ? "showsidebar" : ""}`}>
        <div className="py-3">
          <div className="main-logo">
            <div className="logo">
              <img src="./two-leaves.png" alt="" />
            </div>
            <div>
              <p className="m-0">AI INFO</p>
            </div>
          </div>
          <div className="pt-3">
            <div className="search-sidebar">
              <i class="bi bi-search text-white"></i>
              <input type="text" />
            </div>
          </div>
          <div className="menu-sidebar pt-3">
            <p className="text-white">menu</p>
          </div>
          <div className="pt-2">
            <ul
              className="d-flex flex-column gap-3 p-0"
              onMouseOver={callhover}
            >
              <li
                className={`text-white d-flex gap-3 justify-content-start p-2 ${
                  active == "home" ? "search-sidebar" : ""
                }`}
                onClick={() => navigate("/")}
              >
                <i class="bi bi-house-door"></i>
                <p className="m-0">Home</p>
              </li>
              <li className="text-white d-flex gap-3 justify-content-start p-2">
                <i class="bi bi-bar-chart"></i>
                <p className="m-0">Activity</p>
              </li>{" "}
              <li
                className={`text-white d-flex gap-3 justify-content-start p-2 ${
                  active == "payment" ? "search-sidebar" : ""
                }`}
                onClick={() => navigate("/payment")}
              >
                <i class="bi bi-credit-card-2-front"></i>
                <p className="m-0">Payment</p>
              </li>{" "}
              <li
                className={`text-white d-flex gap-3 justify-content-start p-2 ${
                  active == "domain" ? "search-sidebar" : ""
                }`}
                onClick={() => navigate("/domain")}
              >
                <i class="bi bi-globe"></i>
                <p className="m-0">Domain</p>
              </li>
              <li className="text-white d-flex gap-3 justify-content-start p-2">
                <i class="bi bi-person-fill"></i>
                <p className="m-0">Profile</p>
              </li>
              {authenticate ? (
                <li className="text-white d-flex gap-3 justify-content-start p-2">
                  <i class="bi bi-door-open"></i>
                  <p className="m-0" onClick={activelogout}>
                    logout
                  </p>
                </li>
              ) : (
                <li className="text-white d-flex gap-3 justify-content-start p-2">
                  <i class="bi bi-door-open"></i>
                  <p className="m-0" onClick={()=>navigate("/login")}>
                    login
                  </p>
                </li>
              )}
            </ul>
          </div>
          <div>
            <ul></ul>
          </div>
        </div>
      </section>
    </>
  );
}
