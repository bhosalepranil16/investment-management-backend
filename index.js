require("dotenv").config();
const path = require("path");
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

const {
  User,
  IndianStock,
  MutualFund,
  Debt,
  Gold,
  Crypto,
  Liability,
} = require("./models/index");

const {
  UserAdminJSOptions,
  IndianStockAdminJSOptions,
  MutualFundAdminJSOptions,
  DebtAdminJSOptions,
  GoldAdminJSOptions,
  CryptoAdminJSOptions,
  LiabiltyAdminJSOptions,
} = require("./util/index");

const PORT = process.env.PORT;

Promise.all([
  import("adminjs"),
  import("@adminjs/express"),
  import("@adminjs/sequelize"),
]).then(
  ([
    { default: AdminJS },
    { default: AdminJSExpress },
    { default: AdminJSSequelize },
  ]) => {
    const app = express();

    AdminJS.registerAdapter({
      Resource: AdminJSSequelize.Resource,
      Database: AdminJSSequelize.Database,
    });

    const adminOptions = {
      resources: [
        {
          resource: User,
          options: UserAdminJSOptions,
        },
        {
          resource: IndianStock,
          options: IndianStockAdminJSOptions,
        },
        {
          resource: MutualFund,
          options: MutualFundAdminJSOptions,
        },
        {
          resource: Debt,
          options: DebtAdminJSOptions,
        },
        {
          resource: Gold,
          options: GoldAdminJSOptions,
        },
        {
          resource: Crypto,
          options: CryptoAdminJSOptions,
        },
        {
          resource: Liability,
          options: LiabiltyAdminJSOptions,
        },
      ],
    };

    const admin = new AdminJS(adminOptions);

    const adminRouter = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);

    if (process.env.NODE_ENV === "development") {
      admin.watch();
    }

    const publicDirectoryPath = path.join(__dirname, "./public");

    app.use(express.static(publicDirectoryPath));
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
      console.log(
        `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
      );
      console.log(`server is running on ${PORT}`);
    });
  }
);
