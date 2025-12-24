import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Chat from "./components/chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import Domain from "./components/domain";
import Payment, { Paymentsuccess } from "./components/payment";
import Loader from "./components/loader";
import Login from "./components/login/login";
import Sidbar from "./components/sidbar";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "./components/redux/reducer";
import { logout } from "./components/redux/reducer";
import Popup from "./popup";
import Primarypaymentpage from "./components/primarypaymentpage";

function App() {
  const authenticates = useSelector((state) => state.auth.isAuthenticated);
  const islogout = useSelector((state) => state.auth.setlogout);
  const dispatch = useDispatch();

  useEffect(() => {
    async function refresh() {
      console.log("hello");
      const result = await fetch("http://localhost:8000/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (result.status === 200) {
        dispatch(authenticate(true));
        console.log(authenticates);
      } else {
        dispatch(authenticate(false));
        console.log(authenticates);
      }
    }
    refresh();
  }, []);
  useEffect(() => {
    async function getnotification() {
      try {
        console.log("check-notification");
        const result = await fetch("http://localhost:8000/getnotification", {
          method: "POST",
          credentials: "include",
        });
        const res = await result.json();
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    }
    getnotification()
  }, []);

  return (
    <>
      {islogout && <Popup />}

      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/domain" element={<Domain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<Paymentsuccess />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/paymentprimary" element={<Primarypaymentpage />} />
      </Routes>
    </>
  );
}

export default App;
