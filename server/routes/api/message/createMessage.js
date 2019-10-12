'use strict';

const { validationResult } = require('express-validator');

const Message = require('../../../models/Message');

const createMessage = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newMessage = new Message({
      text: req.body.text,
      sender: req.body.sender_id,
      receiver: req.body.receiver_id,
    });

    const message = await newMessage.save();

    res.json(message);
  } catch (error) {
    console.error(error.message);
    res.send('Server Error');
  }
};

module.exports = createMessage;
