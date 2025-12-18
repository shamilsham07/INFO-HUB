import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Chat from "./components/chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import Domain from "./components/domain";
import Payment,{Paymentsuccess} from "./components/payment";
import Loader from "./components/loader";
import Login from "./components/login/login";
 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/domain" element={<Domain/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/payment/success" element={<Paymentsuccess/>}/>
        <Route path="/loader" element={<Loader/>}/>
        <Route path="/login" element={<Login/>}/>




      </Routes>
    </>
  );
}

export default App;
