const express = require("express");
const app = express();
const main = require("./server");
const Zoho = require("./classes/zoho");

const zoho = new Zoho();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/indiamart", async (req, res) => {
  try {
    console.log(`zoho.accessToken, ${JSON.stringify(zoho.accessToken)}`);
    console.log("req.body", req.body);
    const leads = [req.body.RESPONSE];
    console.log("leads", leads);
    const code = await main(leads, zoho.accessToken);
    console.log("code", code);
    res.status(200).send({ code: code, status: "Success" });
  } catch (err) {
    console.log("error in server", err);
    res.status(500).send({
      error: err,
      Success,
    });
  }
});

app.get("/indiamart", async (req, res) => {
  await zoho.setAccessToken();
  res.status(200).send({ accessToken: zoho.accessToken });
});

app.listen(port, async () => {
  // await zoho.init();
  console.log(`Server is running on port ${port}`);
});
