const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      version: "1.3.0",
      title: "Investment Management Backend API Documentation",
      description:
        "Investment Management Backend API developed using Express and Sequelize documentation.",
      contact: {
        name: "Pranil Bhosale",
        email: "bhosalepranil16@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          required: true,
        },
      },
      parameters: {
        id: {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "1",
          },
        },
      },
      schemas: {
        sendOTP: {
          properties: {
            phoneNumber: {
              type: "string",
              example: "+918605047073",
            },
          },
        },
        verifyOTP: {
          properties: {
            name: {
              type: "string",
              example: "Pranil Ram Bhosale",
            },
            email: {
              type: "string",
              example: "bhosalepranil16@gmail.com",
            },
            phoneNumber: {
              type: "string",
              example: "+918605047073",
            },
            dateOfBirth: {
              type: "date",
              example: "2024-01-27T10:15:02.618Z",
            },
            otp: {
              type: "string",
              example: "123456",
            },
          },
        },
        createOrUpdateLiability: {
          properties: {
            title: {
              type: "string",
              example: "Credit Card Bills",
            },
            value: {
              type: "float",
              example: "8976.65",
            },
          },
        },
        createOrUpdateGold: {
          properties: {
            title: {
              type: "string",
              example: "5g Gold Coin",
            },
            type: {
              type: "string",
              example: "PHYSICAL_GOLD",
            },
            value: {
              type: "float",
              example: "33122.87",
            },
          },
        },
        createOrUpdateCrypto: {
          properties: {
            title: {
              type: "string",
              example: "Bitcoin",
            },
            value: {
              type: "float",
              example: "4455.87",
            },
          },
        },
        createOrUpdateDebt: {
          properties: {
            title: {
              type: "string",
              example: "Quant Liquid Fund",
            },
            type: {
              type: "string",
              example: "DEBT_MF",
            },
            value: {
              type: "float",
              example: "180000",
            },
          },
        },
        createOrUpdateMutualFund: {
          properties: {
            title: {
              type: "string",
              example: "UTI Nifty 50 Index Fund Direct Growth",
            },
            nav: {
              type: "float",
              example: 150.29,
            },
            quantity: {
              type: "float",
              example: 194.616,
            },
            smallCapPercentage: {
              type: "integer",
              example: 5,
            },
            midCapPercentage: {
              type: "integer",
              example: 5,
            },
            largeCapPercentage: {
              type: "integer",
              example: 80,
            },
            cashPercentage: {
              type: "integer",
              example: 10,
            },
          },
        },
        createOrUpdateIndianStock: {
          properties: {
            title: {
              type: "string",
              example: "HDFC Bank Ltd",
            },
            type: {
              type: "string",
              example: "LARGE_CAP",
            },
            quantity: {
              type: "integer",
              example: 2,
            },
            price: {
              type: "float",
              example: 1417.4,
            },
          },
        },
      },
    },
    security: [
      {
        token: [],
      },
    ],
    paths: {
      "/api/dashboard/all": {
        get: {
          tags: ["Dashboard"],
          description: "Get all dashboard data.",
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/users/sendOTP": {
        post: {
          tags: ["Users"],
          description: "Send a 6 digit OTP to phone number.",
          produces: ["application/json"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/sendOTP",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Success",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/users/verifyOTP": {
        post: {
          tags: ["Users"],
          description: "Verify phone number using OTP provided by user.",
          produces: ["application/json"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/verifyOTP",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Success",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/liability": {
        post: {
          tags: ["Liabilities"],
          description: "Create a liability.",
          produces: ["application/json"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateLiability",
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "Created",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        get: {
          tags: ["Liabilities"],
          description: "Get all liabilities of a user.",
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/liability/{id}": {
        put: {
          tags: ["Liabilities"],
          description: "Update a liability.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateLiability",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        delete: {
          tags: ["Liabilities"],
          description: "Delete a liability.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/gold": {
        post: {
          tags: ["Gold"],
          description: "Add gold.",
          produces: ["application/json"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateGold",
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "Created",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        get: {
          tags: ["Gold"],
          description: "Get all gold of a user.",
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/gold/{id}": {
        put: {
          tags: ["Gold"],
          description: "Update a Gold.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateGold",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        delete: {
          tags: ["Gold"],
          description: "Delete a Gold.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/crypto": {
        post: {
          tags: ["Crypto"],
          description: "Add crypto.",
          produces: ["application/json"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateCrypto",
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "Created",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        get: {
          tags: ["Crypto"],
          description: "Get all cryptos of a user.",
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/crypto/{id}": {
        put: {
          tags: ["Crypto"],
          description: "Update a crypto.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateCrypto",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        delete: {
          tags: ["Crypto"],
          description: "Delete a crypto.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/debt": {
        post: {
          tags: ["Debt"],
          description: "Add Debt.",
          produces: ["application/json"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateDebt",
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "Created",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        get: {
          tags: ["Debt"],
          description: "Get all debt of a user.",
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/debt/{id}": {
        put: {
          tags: ["Debt"],
          description: "Update a Debt.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateDebt",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        delete: {
          tags: ["Debt"],
          description: "Delete a Debt.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/mutual-fund": {
        post: {
          tags: ["Mutual Fund"],
          description: "Add Mutual Fund.",
          produces: ["application/json"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateMutualFund",
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "Created",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        get: {
          tags: ["Mutual Fund"],
          description: "Get all Mutual Funds of a user.",
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/mutual-fund/{id}": {
        put: {
          tags: ["Mutual Fund"],
          description: "Update a Mutual Fund.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateMutualFund",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        delete: {
          tags: ["Mutual Fund"],
          description: "Delete a Mutual Fund.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/indian-stock": {
        post: {
          tags: ["Indian Stock"],
          description: "Add Stock.",
          produces: ["application/json"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateIndianStock",
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "Created",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        get: {
          tags: ["Indian Stock"],
          description: "Get all Indian Stocks of a user.",
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/indian-stock/{id}": {
        put: {
          tags: ["Indian Stock"],
          description: "Update a Stock.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createOrUpdateIndianStock",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        delete: {
          tags: ["Indian Stock"],
          description: "Delete a Indian Stock.",
          produces: ["application/json"],
          parameters: [
            {
              $ref: "#/components/parameters/id",
            },
          ],
          responses: {
            200: {
              description: "Success",
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
    },
  },
  apis: ["./router/*.js"],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpecs;
