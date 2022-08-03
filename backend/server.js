const koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors"); //allows you to query different urls from the frontend
const ethers = require("ethers"); //communicate with the blockchain
const paymentProcess = require("../frontend/src/contracts/paymentProcess.json"); //compilation artifact from truffle, allows us to interact with our smart contract by providing ABI and address
const { payment } = require("./db");

const app = new koa();

const router = new Router();

const items = {
  1: { id: 1, name: "shoes" },
  2: { id: 2, name: "watch" },
};

// defining route, at the beginning of the purchase process after customer clicks on the purchase button we ask the backend to generate a payment id and we also specify the item id of the purchased item

router.get("/api/getPaymentId/:itemId", async (ctx) => {
  const paymentId = (Math.random() * 10000).toFixed(0); //generate a payment id
  //creating a payment entry in mongodb database, using our payment model we created before
  await payment.create({
    id: paymentId,
    itemId: ctx.params.itemId,
    paid: false,
  });
  ctx.body = {
    paymentId,
  };
});

//route to get the name of the purchased product

router.get("/api/getItem/:paymentId", async (ctx) => {
  //fetch payment id from mongodb
  const Payment = await payment.findOne({
    id: ctx.params.paymentId,
  });
  //check if the payment has been made
  if (Payment && Payment.paid === true) {
    ctx.body = {
      name: items[Payment.itemId].name,
    };
  } else {
    ctx.body = {
      name: "",
    };
  }
});

//configure app objects
app.use(cors()).use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("server is running on port 4000");
});

//listen to payment events from blockchain to update payment status in mongodb

const listenToEvents = () => {
  //url to ganache
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:9545"
  );

  const networkId = "5777";

  //contract object
  const PaymentProcess = new ethers.Contract(
    paymentProcess.networks[networkId].address,
    paymentProcess.abi,
    provider
  );

  PaymentProcess.on("Payment done", async (payer, amount, paymentId, date) => {
    console.log(`
    from ${payer}
    amount ${amount}
    paymentId ${paymentId}
    date ${new Date(date.toNumber() * 1000).toLocaleString()}`);

    const Payment = await payment.findOne({ id: paymentId });

    if (Payment) {
      payment.paid = true;
      await payment.save();
    }
  });
  listenToEvents();
};
