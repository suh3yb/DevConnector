import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Button, Icon, Grid } from 'semantic-ui-react';

const ProfileFriendship = ({ friendship }) => {
  const [showAll, setShowAll] = useState(false);

  const onClick = () => {
    setShowAll(!showAll);
  };

  const friendsToShow = showAll ? friendship : friendship.slice(0, 4);

  return (
    <Fragment>
      <List as={Grid} columns="2" verticalAlign="middle">
        {friendsToShow.map((friendObj, index) => (
          <List.Item as={Grid.Column} key={index}>
            <Icon name="user circle" />
            <List.Content>
              <Link to={`/profile/${friendObj._id}`}>{friendObj.name && friendObj.name}</Link>
            </List.Content>
          </List.Item>
        ))}
        {friendship.length > 4 && (
          <Button size="tiny" onClick={() => onClick()} style={{ margin: 'auto 10px' }}>
            {showAll ? 'See less' : 'See all'}
          </Button>
        )}
      </List>
    </Fragment>
  );
};

ProfileFriendship.propTypes = {
  friendship: PropTypes.array.isRequired,
};

export default ProfileFriendship;
