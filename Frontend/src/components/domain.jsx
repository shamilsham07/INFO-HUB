import React, { useState,useEffect } from "react";
import Sidbar from "./sidbar";
import "./chat.css";
export default function Domain() {
  const [value, setvalue] = useState("");
  const [reveal, setreveal] = useState(false);
  const [colorofreveal, setcolor] = useState(false);
  const [domainvalue, setdomainvalue] = useState("");
  const  publishedkey="mk_1SbLbpE14I39MgoAXNdoxShx"
  const secretkey="mk_1SbLsbE14I39MgoAnK7zOLyZ"

  async function checkdomain() {
    try {
      setvalue("");
      setreveal(false)
      setcolor(false)

      const formdata = new FormData();
      formdata.append("domain", value);
      const result = await fetch("http://localhost:8000/checkdomain", {
        method: "POST",
        body: formdata,
      });
      const res = await result.json();
      console.log(res);
      if (res) {
        if (res.match) {
          setdomainvalue("this domain is available you can use it");
          setcolor(true);
        } else if (res.error) {
          setdomainvalue("please enter the correct input");
          setcolor(false);
        } else if (res.notavailable) {
          setdomainvalue("oops! domain already used");
          setcolor(false);
        }
        setreveal(true);
   setTimeout(() => {
   setreveal(false)
   }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

//   useEffect(()=>{
// setTimeout(()=>{
//   console.log("domanvlaue")
//   setdomainvalue("")

// },2000)

  // },[domainvalue])



  return (
    <>
      <Sidbar active={"domain"} />
      <section className="chat-section bg-theme flex-column ">
        {/* <div>
          <input type="text" onChange={(e) => setvalue(e.target.value)} />
          <button onClick={checkdomain}>submit</button>
        </div> */}
        <div className="domain-platform">
          <h1>
            Search the domain name <br />{" "}
            <span className="text-black">check is it available</span>{" "}
          </h1>
          <div className="pt-2 domain-search d-flex flex-row gap-2">
            <input
              type="text"
              onChange={(e) => setvalue(e.target.value)}
              value={value}
              required
            />
            <button onClick={checkdomain}>Search</button>
          </div>
          <div className="pt-2">
            <h6
              className={`${
                colorofreveal ? "text-success" : "text-danger"
              }  text-reveal ${reveal ? "fade-left" : ""}`}
            >
              {domainvalue}
            </h6>
          </div>
        </div>
      </section>
    </>
  );
}
