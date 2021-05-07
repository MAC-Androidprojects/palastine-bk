const express = require("express");
const logger = require("morgan");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
const errorHandlerModule = require("./Error-handler/error-handler");
const cors = require("cors");

//DB connection
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1/messages";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//MiddleWares
app.use(cors());
app.use(helmet()); //For security
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers: Content-Type");
  next();
});

//Routes
const messageRouter = require("./routes/messageRouter");
app.use("/api/v1/messages", messageRouter);

//Error handlers
app.use(errorHandlerModule.errorHandler);

//Listening on port
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server started its mission on port ${PORT}`);
});
