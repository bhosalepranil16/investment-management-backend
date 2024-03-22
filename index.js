require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const swaggerSpecs = require("./docs");
const userRouter = require("./router/user");
const liabilityRouter = require("./router/liability");
const goldRouter = require("./router/gold");
const cryptoRouter = require("./router/crypto");
const debtRouter = require("./router/debt");
const mutualFundRouter = require("./router/mutualfund");
const indianStockRouter = require("./router/indianstock");
const dashboardRouter = require("./router/dashboard");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api/users", userRouter);
app.use("/api/liability", liabilityRouter);
app.use("/api/gold", goldRouter);
app.use("/api/crypto", cryptoRouter);
app.use("/api/debt", debtRouter);
app.use("/api/mutual-fund", mutualFundRouter);
app.use("/api/indian-stock", indianStockRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

module.exports = app;
