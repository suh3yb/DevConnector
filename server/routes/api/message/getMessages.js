'use strict';

const Message = require('../../../models/Message');
const User = require('../../../models/User');

const getMessages = async (req, res) => {
  try {
    const sender = await User.findById(req.params.sender_id);
    const receiver = await User.findById(req.params.receiver_id);
    const currentConversation = sender.conversation.map(con => {
      if (receiver.conversation.includes(con)) return con;
    });

    const messages = await Message.findById(currentConversation);

    if (!messages) {
      return res.end();
    }

    res.json(messages.conversation);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.send('Server Error');
  }
};

module.exports = getMessages;
