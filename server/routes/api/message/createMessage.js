'use strict';

const { validationResult } = require('express-validator');

const Message = require('../../../models/Message');
const User = require('../../../models/User');
var io = require('socket.io-client');
var socket = io.connect('http://localhost:5000');

const createMessage = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const sender = await User.findById(req.body.sender_id);
    const receiver = await User.findById(req.body.receiver_id);

    const current_conversation = sender.conversation.map(con => {
      if (receiver.conversation.includes(con)) return con._id;
    });
    const conversation = await Message.findById(current_conversation);

    const mesObj = {
      text: req.body.text,
      sender: req.body.sender_id,
      receiver: req.body.receiver_id,
    };
    socket.emit('message', req.body.receiver_id);
    if (!conversation) {
      const newConversation = new Message({ conversation: [mesObj] });
      //newMessage.unshift(mesObj);
      await newConversation.save();
      res.json(mesObj);
      sender.conversation.push(newConversation._id);
      receiver.conversation.push(newConversation._id);
      await sender.save();
      await receiver.save();
    } else {
      conversation.conversation.unshift(mesObj);
      await conversation.save();
      res.json(mesObj);
    }
  } catch (error) {
    console.error(error.message);
    res.send('Server Error');
  }
};

module.exports = createMessage;
