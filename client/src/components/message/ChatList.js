import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../redux/actions/profileAction';
import Conversation from './Conversation';

const ChatList = ({ auth: { user }, profile: { profiles, loading }, getProfiles }) => {
  let conversationArray;
  if (user !== null && user.conversation[0]) {
    conversationArray = user.conversation
      .map(conversation =>
        conversation.conversation[0].sender === user._id
          ? [
              conversation.conversation[0].receiver,
              Date.parse(conversation.conversation[conversation.conversation.length - 1].date),
            ]
          : [
              conversation.conversation[0].sender,
              Date.parse(conversation.conversation[conversation.conversation.length - 1].date),
            ],
      )
      .sort((a, b) => b[1] - a[1])
      .map(conversation => profiles.find(profile => profile.user._id === conversation[0]));
  }
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return loading ? (
    <Spinner />
  ) : !conversationArray ? (
    <h1>You Have no Chats</h1>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Chat Room</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name} to your private chat room...
      </p>
      <ul>
        {conversationArray[0] &&
          conversationArray.map(conversation => {
            if (conversation !== undefined) {
              return <Conversation key={conversation._id} user={conversation.user} />;
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
