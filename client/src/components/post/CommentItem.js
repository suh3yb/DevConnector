import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../redux/actions/postAction';
import {
  Card,
  List,
  Image,
  Button,
  Menu,
  Dropdown,
  Icon
} from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <Card fluid>
    <Card.Content style={{ fontSize: '0.8em' }}>
      <Image floated="left" avatar src={avatar} size="medium" />
      {!auth.loading && user === auth.user._id && (
        <Button
          size="tiny"
          floated="right"
          basic
          color="red"
          onClick={() => deleteComment(postId, _id)}
          icon="trash"
          circular></Button>
      )}
      <Card.Header as={Link} to={`/profile/${user}`}>
        {name}
      </Card.Header>
      <Card.Meta>
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </Card.Meta>
    </Card.Content>
    <Card.Content>
      <Card.Description>{text}</Card.Description>
    </Card.Content>
  </Card>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
