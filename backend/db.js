const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://wubac:Wubac123@cluster0.vuz84.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const paymentSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  paid: Boolean,
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = {
  payment,
};
