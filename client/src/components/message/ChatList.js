import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import openSocket from 'socket.io-client';
import { getProfiles } from '../../redux/actions/profileAction';
import ConversationItem from './ConversationItem';

const socket = openSocket('http://localhost:5000');

const ChatList = ({ auth, profiles, loading }) => {
  let conversations;
  let conversationArray;
  if (auth.user !== null) {
    conversations = auth.user.conversation;

    conversationArray = conversations.map(conversation =>
      conversation.conversation[0].sender === auth.user._id
        ? conversation.conversation[0].receiver
        : conversation.conversation[0].sender,
    );
  }
  useEffect(() => {
    getProfiles();
    let currentUser;
    if (auth.user !== null) {
      currentUser = auth.user._id;
    }
    socket.on('incoming', receiverId => {
      if (receiverId === currentUser) {
        console.log('your code Hamza :)');
      }
    });
  }, [auth.user]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='chat-list '>
        {profiles &&
          profiles.map(profile => {
            if (-1 !== conversationArray.indexOf(profile.user._id)) {
              return <ConversationItem key={profile._id} user={profile.user} />;
            } else {
              return null;
            }
          })}
      </div>
    </Fragment>
  );
};

ChatList.propTypes = {
  auth: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  profiles: state.profile.profiles,
  loading: state.profile.loading,
});
export default connect(
  mapStateToProps,
  { getProfiles },
)(ChatList);
