import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import getBlockchain from "./ethereum";
import "./App.css";
import Store from "./Store.js";

function App() {
  const [paymentProcess, setPaymentProcess] = useState(undefined);
  const [diaspora, setDiaspora] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { paymentProcess, diaspora } = await getBlockchain();
      setPaymentProcess(paymentProcess);
      setDiaspora(diaspora);
    };
  }, []);

  if (typeof window.ethereum === "undefined") {
    return (
      <div className="container">
        <div className="col-sm-12">
          <h1>IVOBS</h1>
          <p> you need metamask</p>
        </div>
      </div>
    );
  } 
    return (
      <div className="container">
        <div className="col-sm-12">
          <h1> iVOBS</h1>
          <Store paymentProcess={paymentProcess} diaspora={diaspora} />
        </div>
      </div>
    );
  
}
export default App;
