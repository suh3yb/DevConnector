'use strict';

const Message = require('../../../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.sender_id, receiver: req.params.receiver_id },
        { sender: req.params.receiver_id, receiver: req.params.sender_id },
      ],
    }).sort({ date: 1 });

    if (!messages) {
      return res.status(404).json({ msg: 'No message found' });
    }

    res.json(messages);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.send('Server Error');
  }
};

module.exports = getMessages;
