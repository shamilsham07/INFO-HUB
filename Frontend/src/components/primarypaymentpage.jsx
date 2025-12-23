import React from "react";
import Sidbar from "./sidbar";
import Payment from "./payment";
import { useState } from "react";

export default function Primarypaymentpage() {
  const [modal, setmodal] = useState(false);
  const [price, setprice] = useState("");

  function paymentfield(e) {
    console.log(e);
    setprice(e);
    setmodal(true);
  }

  return (
    <>
      <section>
        <Sidbar />
        <div className="container">
          <section className="payment-section flex-column">
            <div className="pt-5 payment-hading text-center">
              <h5 className="m-0">choose the best plan for you</h5>
              <p className="">you can update any time</p>
            </div>
            <div className="row pt-3 w-100">
              <div className="col-3 pt-3">
                <div className="card p-3">
                  <div className="plan-offer-heading">
                    <h6 className="m-0">Plan-1</h6>
                  </div>
                  <div className="pt-2 save-plan">
                    <p>
                      US$13.99 <span className="ml-3">save 64%</span>
                    </p>
                  </div>
                  <div className="pt-1">
                    <h2 className="m-0 dollar-plan">
                      US$ 4.99/<span>mo</span>
                    </h2>
                  </div>
                  <div className="pt-2 text-center">
                    <button
                      className="plan-btn"
                      onClick={() => paymentfield("4.99")}
                    >
                      select
                    </button>
                  </div>
                  <div className="pt-3 small-p-plan">
                    <p className="m-0"> US$9.99/mo when you renew</p>
                  </div>
                  <div className="pt-4">
                    <div className="line-plan"></div>
                  </div>
                  <div className="pt-3">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">Free domian check</span>
                    </h6>
                  </div>
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">Unlimted AI support</span>
                    </h6>
                  </div>{" "}
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">CV review</span>
                    </h6>
                  </div>{" "}
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">1 snapshot</span>
                    </h6>
                  </div>
                  <div className="pt-5 text-center">
                    <p className="m-0 text-primary all-features">
                      See all features{" "}
                      <span>
                        <i class="bi bi-caret-down"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* /......................................................../ */}
              <div className="col-3">
                <div className="card p-3 active-plan">
                  {" "}
                  <div></div>
                  <div className="plan-offer-heading">
                    <h6 className="m-0">Plan-2</h6>
                  </div>
                  <div className="pt-2 save-plan">
                    <p>
                      US$17.99 <span className="ml-3">save 67%</span>
                    </p>
                  </div>
                  <div className="pt-1">
                    <h2 className="m-0 dollar-plan">
                      US$ 5.99/<span>mo</span>
                    </h2>
                  </div>
                  <div className="pt-2 text-center">
                    <button
                      className="plan-btn btn-active"
                      onClick={() => paymentfield("5.99")}
                      type="button"
                    >
                      select
                    </button>
                  </div>
                  <div className="pt-3 small-p-plan">
                    <p className="m-0"> US$12.99/mo when you renew</p>
                  </div>
                  <div className="pt-4">
                    <div className="line-plan"></div>
                  </div>
                  <div className="pt-3">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">Free domian check</span>
                    </h6>
                  </div>
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">Unlimted AI support</span>
                    </h6>
                  </div>{" "}
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">CV review</span>
                    </h6>
                  </div>{" "}
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">1 snapshot</span>
                    </h6>
                  </div>
                  <div className="pt-5 text-center">
                    <p className="m-0 text-primary all-features">
                      See all features{" "}
                      <span>
                        <i class="bi bi-caret-down"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* ....................... .........................................................................*/}
              <div className="col-3 pt-3">
                <div className="card p-3">
                  <div className="plan-offer-heading">
                    <h6 className="m-0">Plan-3</h6>
                  </div>
                  <div className="pt-2 save-plan">
                    <p>
                      US$29.99 <span className="ml-3">save 67%</span>
                    </p>
                  </div>
                  <div className="pt-1">
                    <h2 className="m-0 dollar-plan">
                      US$ 9.99/<span>mo</span>
                    </h2>
                  </div>
                  <div className="pt-2 text-center">
                    <button
                      className="plan-btn"
                      onClick={() => paymentfield("9.99")}
                    >
                      select
                    </button>
                  </div>
                  <div className="pt-3 small-p-plan">
                    <p className="m-0"> US$24.99/mo when you renew</p>
                  </div>
                  <div className="pt-4">
                    <div className="line-plan"></div>
                  </div>
                  <div className="pt-3">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">Free domian check</span>
                    </h6>
                  </div>
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">Unlimted AI support</span>
                    </h6>
                  </div>{" "}
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">CV review</span>
                    </h6>
                  </div>{" "}
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">1 snapshot</span>
                    </h6>
                  </div>
                  <div className="pt-5 text-center">
                    <p className="m-0 text-primary all-features">
                      See all features{" "}
                      <span>
                        <i class="bi bi-caret-down"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* ................................................................................... */}
              <div className="col-3 pt-3">
                <div className="card p-3">
                  <div className="plan-offer-heading">
                    <h6 className="m-0">Plan-4</h6>
                  </div>
                  <div className="pt-2 save-plan">
                    <p>
                      US$59.99 <span className="ml-3">save 67%</span>
                    </p>
                  </div>
                  <div className="pt-1">
                    <h2 className="m-0 dollar-plan">
                      US$ 19.99/<span>mo</span>
                    </h2>
                  </div>
                  <div className="pt-2 text-center">
                    <button
                      className="plan-btn"
                      onClick={() => paymentfield("19.99")}
                    >
                      select
                    </button>
                  </div>
                  <div className="pt-3 small-p-plan">
                    <p className="m-0"> US$49.99/mo when you renew</p>
                  </div>
                  <div className="pt-4">
                    <div className="line-plan"></div>
                  </div>
                  <div className="pt-3">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">Free domian check</span>
                    </h6>
                  </div>
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">Unlimted AI support</span>
                    </h6>
                  </div>{" "}
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">CV review</span>
                    </h6>
                  </div>{" "}
                  <div className="pt-1">
                    <h6>
                      <i class="bi bi-check-circle text-success"></i>{" "}
                      <span className="ms-2">1 snapshot</span>
                    </h6>
                  </div>
                  <div className="pt-5 text-center">
                    <p className="m-0 text-primary all-features">
                      See all features{" "}
                      <span>
                        <i class="bi bi-caret-down"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {modal && (
          <section className="main-modal d-flex justify-content-center align-items-center">
            <div className="modals">
              <Payment price={price}  />
            </div>
          </section>
        )}
      </section>
    </>
  );
}
