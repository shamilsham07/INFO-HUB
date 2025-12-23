import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import Sidbar from "./sidbar";

export default function Chat() {
  const [senddata, setsenddata] = useState("");
  const chatref = useRef(null);
  const [response, setresponse] = useState([
    {
      question: "",
      response: "",
    },
  ]);

  async function StartChat() {
    console.log(senddata);
    console.log("hhhh");
    try {
      const formdata = new FormData();
      formdata.append("data", senddata);
      const result = await fetch("http://localhost:8000/chat", {
        method: "POST",
        body: formdata,
      });
      const res = await result.json();
      console.log(res.data);
      setresponse((prev) => [
        ...prev,
        { question: res.data.question, response: res.data.response },
      ]);
      setsenddata("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (chatref.current) {
      chatref.current.scrollTop = chatref.current.scrollHeight;
    }
  }, [response]);

  return (
    <>
      <Sidbar active={"home"} />
      <div className="container">
        <section className="chat-section bg-theme flex-column ">
          <div className="heading-chat pb-2">
            <h1 className="m-0 text-black">
              Hi there,Shamil <br />
              <span className="text-theme">what would you like to know?</span>
            </h1>
            <p className="pt-1 ">
              chat with just free Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>
          </div>
      
            <div className="chat-div ">
              <div>
                <div className="height-chat-div" ref={chatref}>
                  {response.length > 0 &&
                    response.map((item, index) => (
                      <div key={index}>
                        <h6 className="text-end">{item.question}</h6>
                        <p>{item.response}</p>
                      </div>
                    ))}
                </div>

                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Ask anything...."
                    className="chat-input"
                    onChange={(e) => setsenddata(e.target.value)}
                    required
                    value={senddata}
                  />
                </div>
                <div className="pt-4 d-flex justify-content-between align-items-center gallery-icons ">
                  <button>
                    <img src="/image-gallery.png" alt="" />
                  </button>
                  <button className="" onClick={StartChat} disabled={!senddata}>
                    <img src="/send (1).png" alt="" />
                  </button>
                </div>
                {/* <div className="pt-2"></div> */}
              </div>
              <div></div>
            </div>
       
        </section>
      </div>
    </>
  );
}
