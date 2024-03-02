const generateOTP = () => {
  return (
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  ).toString();
};

const errorHandler = (errorMsg) => {
  return {
    msg: errorMsg,
  };
};

module.exports = { generateOTP, errorHandler };
