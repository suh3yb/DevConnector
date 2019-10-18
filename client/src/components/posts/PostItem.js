import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addLike,
  removeLike,
  deletePost
} from '../../redux/actions/postAction';
import { Card, Image, Button } from 'semantic-ui-react';
import PostContent from './PostContent';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => (
  <Card fluid>
    <Card.Content>
      <Image floated="left" size="big" avatar src={avatar} />
      {!auth.loading && user === auth.user._id && (
        <Button
          floated="right"
          basic
          color="red"
          onClick={() => deletePost(_id)}
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
      <Card.Description>
        <PostContent source={text} />
      </Card.Description>
    </Card.Content>

    <Card.Content extra>
      {showActions && (
        <Fragment>
          <Button
            onClick={() => addLike(_id)}
            icon="thumbs up"
            labelPosition="left"
            label={likes.length > 0 ? likes.length : 0}
          />
          <Button onClick={() => removeLike(_id)} icon="thumbs down" />

          <Button
            floated="right"
            as={Link}
            to={`/posts/${_id}`}
            labelPosition="left"
            label={comments.length > 0 ? comments.length : 0}
            content="Discussion"
          />
        </Fragment>
      )}
    </Card.Content>
  </Card>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
