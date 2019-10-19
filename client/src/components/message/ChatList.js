import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import openSocket from 'socket.io-client';
import { getProfiles } from '../../redux/actions/profileAction';
import Conversation from './Conversation';

const socket = openSocket('http://localhost:5000');

const ChatList = ({ auth: { user }, profile: { profiles, loading }, getProfiles }) => {
  let conversationArray;
  if (user !== null) {
    conversationArray = user.conversation.map(conversation =>
      conversation.conversation[0].sender === user._id
        ? conversation.conversation[0].receiver
        : conversation.conversation[0].sender,
    );
  }

  useEffect(() => {
    getProfiles();
    let currentUser;
    if (user !== null) {
      currentUser = user._id;
    }
    socket.on('incoming', receiverId => {
      if (receiverId === currentUser) {
        console.log('your code Hamza :)');
      }
    });
  }, [user]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <ul>
        {profiles &&
          profiles.map(profile => {
            if (-1 !== conversationArray.indexOf(profile.user._id)) {
              return <Conversation key={profile._id} user={profile.user} />;
            } else {
              return null;
            }
          })}
      </ul>
    </Fragment>
  );
};
ChatList.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(
  mapStateToProps,
  { getProfiles },
)(ChatList);
