import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';

const Conversation = ({ user: { _id, name, avatar }, imageUrl }) => {
  return (
    <List.Item
      relaxed="very"
      size="large"
      as={Link}
      to={`/messages/${_id}/${name.trim().split(' ')[0]}`}>
      <Image
        floated="left"
        avatar
        src={imageUrl ? imageUrl : avatar}
        alt={name}
      />
      <List.Content>
        <List.Header>{name}</List.Header>
      </List.Content>
    </List.Item>
  );
};

Conversation.propTypes = {
  user: PropTypes.object.isRequired
};

export default Conversation;
