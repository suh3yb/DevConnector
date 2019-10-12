import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getMessages from '../../redux/actions/messageAction';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageForm from './MessageForm';
import { Label, Card, Segment } from 'semantic-ui-react';

const Message = ({
  getMessages,
  message: { messages, loading },
  auth,
  match
}) => {
  useEffect(() => {
    auth.user && getMessages(auth.user._id, match.params.id);
  }, [getMessages, match.params.id, auth.user]);
  const receiver_id = match.params.id;
  const receiver_name = match.params.name;

  return loading ? (
    <Spinner />
  ) : (
    <Card fluid style={{ height: 'calc(100vh - 9rem)', marginBottom: '1rem' }}>
      <Card.Content>
        <Segment
          padded
          style={{
            overflowY: 'auto',
            scrollY: 'auto',
            height: 'calc(100vh - 16rem)'
          }}>
          {messages.map(message => {
            const isReceiver = message.receiver === receiver_id;
            return (
              <Label
                size="large"
                color={isReceiver ? 'teal' : 'grey'}
                style={
                  isReceiver
                    ? {
                        maxWidth: '80%',
                        width: 'max-content',
                        display: 'block',
                        padding: '1rem',
                        margin: '1rem 0 1rem auto'
                      }
                    : {
                        maxWidth: '70%',
                        width: 'max-content',
                        display: 'block',
                        padding: '1rem',
                        margin: '1rem 0'
                      }
                }
                pointing={message.receiver === receiver_id ? 'right' : 'left'}
                key={message._id}>
                {message.text}
              </Label>
            );
          })}
        </Segment>
        <MessageForm receiver_id={receiver_id} />
      </Card.Content>
    </Card>
  );
};

Message.propTypes = {
  getMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getMessages }
)(Message);
