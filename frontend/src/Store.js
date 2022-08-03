import React from "react";
import { ethers } from "ethers";
import axios from "axios";

const API_URL = "http://localhost:4000";

const ITEMS = [
  {
    id: 1,
    price: ethers.utils.parseEther("100"),
    id: 2,
    price: ethers.utils.parseEther("200"),
  },
];

function Store({ paymentProcess, diaspora }) {
  const buy = async (item) => {
    const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`);
    const tx1 = await diaspora.approve(paymentProcess.address, item.price);
    await tx1.wait();

    const tx2 = await paymentProcess.pay(item.price, response1.data.paymentId);
    await tx2.wait();

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response2 = await axios.get(
      `${API_URL}/api/getItemName/${response1.data.paymentId}`
    );
    console.log(response2);
  };

  return (
    <ul className="list-group">
      <li className="list-group-item">
        But item1 = <span className="front-weight-bold">100 DSPO</span>
        <button
          type="button"
          className="btn btn-primary float-right"
          onClick={() => buy(ITEMS[0])}
        >
          Buy
        </button>
      </li>
      <li className="list-group-item">
        But item2 = <span className="front-weight-bold">200 DSPO</span>
        <button
          type="button"
          className="btn btn-primary float-right"
          onClick={() => buy(ITEMS[1])}
        >
          Buy
        </button>
      </li>
    </ul>
  );
}
export default Store;
