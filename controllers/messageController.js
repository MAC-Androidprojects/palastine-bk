const Message = require("../models/Messages");

module.exports = {
  getPublishedMessages: async (req, res, next) => {
    const messages = await Message.find({ isPublished: true });
    res.status(200).body(messages);
  },
  getUnpublishedMessages: async (req, res, next) => {
    const messages = await Message.find({ isPublished: false });
    res.status(200).json(messages);
  },
  postMessage: async (req, res, next) => {
    const message = await Message.create({
      name: req.body.name,
      email: req.body.email,
      content: req.body.content,
    });
    res.status(200).json(message);
  },
  acceptMessage: async (req, res, next) => {
    const user = await Message.findByIdAndUpdate(req.body.id, {
      isPublished: true,
    });
    res.status(200).json(user);
  },
};
