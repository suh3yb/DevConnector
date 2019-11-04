import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../redux/actions/postAction';
import { Card, Grid, Dropdown, Segment } from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => (
  <Segment basic>
    <Card fluid raised style={{ width: '80%' }}>
      <Card.Content>
        <Grid columns="2">
          <Grid.Column width="12">
            <Card.Header>
              <Link to={`/profile/${user}`}>
                <h4>{name}</h4>
              </Link>
            </Card.Header>
            <Card.Meta>
              Commented on <Moment format="YYYY/MM/DD">{date}</Moment>
            </Card.Meta>
            <Card.Description>{text}</Card.Description>
          </Grid.Column>
          {!auth.loading && user === auth.user._id && (
            <Grid.Column width="4" floated="right" textAlign="right">
              <Dropdown floating icon="ellipsis vertical">
                <Dropdown.Menu style={{ right: 0, left: 'auto' }}>
                  <Dropdown.Item
                    icon="trash"
                    text="Delete Comment"
                    onClick={() => deleteComment(postId, _id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          )}
        </Grid>
      </Card.Content>
    </Card>
  </Segment>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { deleteComment },
)(CommentItem);
