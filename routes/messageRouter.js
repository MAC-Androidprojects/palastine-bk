const express = require("express");
const app = require("express-promise-router")(); //To enable us use async without catch
const messageController = require("../controllers/messageController");

app
  .route("/")
  .get(messageController.getPublishedMessages)
  .post(messageController.postMessage);

app
  .route("/unpublished")
  .get(messageController.getUnpublishedMessages)
  .patch(messageController.acceptMessage);
module.exports = app;
