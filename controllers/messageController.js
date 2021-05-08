const Message = require("../models/Messages");

module.exports = {
  getPublishedMessages: async (req, res, next) => {
    const messages = await Message.find({ isPublished: true });
    res.status(200).json(messages);
  },
  getUnpublishedMessages: async (req, res, next) => {
    const messages = await Message.find({ isPublished: false });
    res.status(200).json(messages);
  },
  postMessage: async (req, res, next) => {
    const message = await Message.create({
      name: req.body.name,
      content: req.body.content,
    });
    res.status(201).json(message);
  },
  acceptMessage: async (req, res, next) => {
    const user = await Message.findByIdAndUpdate(req.body.id, {
      isPublished: true,
    });
    res.status(200).json(user);
  },
  deleteOne: async (req, res, next) => {
    const id = req.body.id;
    const response = await Message.findByIdAndDelete(id);
    res.status(202).json(response);
  },
};
