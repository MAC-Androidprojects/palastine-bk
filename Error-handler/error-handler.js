module.exports = {
  errorHandler: (err, req, res, next) => {
    let status, message;
    if (err.status) status = err.status;
    else status = 400;
    if (err.message) message = err.message;
    else message = "Bad request";
    res.status(status).json({ message: message, status: status });
    console.log(err);
  },
};
