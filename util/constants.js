const CONSTANTS = {
  GOLD_TYPES: {
    SGB: "SGB",
    PHYSICAL_GOLD: "PHYSICAL_GOLD",
    MF_OR_ETF: "MF_OR_ETF",
  },
  DEBT_TYPES: {
    SAVING_ACCOUNT_BALANCE: "SAVING_ACCOUNT_BALANCE",
    BONDS: "BONDS",
    GOVERNMENT_SECURITIES: "GOVERNMENT_SECURITIES",
    FD: "FD",
    DEBT_MF: "DEBT_MF",
  },
  INDIAN_STOCK_TYPES: {
    LARGE_CAP: "LARGE_CAP",
    MID_CAP: "MID_CAP",
    SMALL_CAP: "SMALL_CAP",
  },
  REGULAR_EXPRESSIONS: {
    PHONE_NUMBER: /^((\+91?)|\+)?[7-9][0-9]{9}$/,
  },
  MODEL_PROPERTIES: {
    ID: "id",
    NAME: "name",
    EMAIL: "email",
    MOBILE_NUMBER: "mobileNumber",
    DATE_OF_BIRTH: "dateOfBirth",
    CREATED_AT: "createdAt",
    UPDATED_AT: "updatedAt",
    TITLE: "title",
    QUANTITY: "quantity",
    PRICE: "price",
    VALUE: "value",
    TYPE: "type",
    USER_ID: "userId",
    NAV: "nav",
    SMALL_CAP_PERCENTAGE: "smallCapPercentage",
    MID_CAP_PERCENTAGE: "midCapPercentage",
    LARGE_CAP_PERCENTAGE: "largeCapPercentage",
    CASH_PERCENTAGE: "cashPercentage",
    DESC: "desc",
  },
};

module.exports = CONSTANTS;
