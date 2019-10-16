import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider, Header, List, Icon, Button } from 'semantic-ui-react';

const ProfileFriend = ({ friend }) => {
  const [showAll, setShowAll] = useState(false);

  const onClick = () => {
    setShowAll(!showAll);
  };

  const friendsToShow = showAll ? friend : friend.slice(0, 4);

  return (
    <Fragment>
      <Divider />
      <Header as="h2">{`${friend.length} Friend${
        friend.length > 1 ? 's' : ''
      }`}</Header>
      <List horizontal>
        {friendsToShow.map((friendObj, index) => (
          <List.Item key={index} className="p-1">
            <Link to={`/profile/${friendObj.user}`}>
              <Icon name="user circle" /> {friendObj.name.trim().split(' ')[0]}
            </Link>
          </List.Item>
        ))}
        {friend.length > 4 && (
          <Button onClick={() => onClick()}>
            {showAll ? 'See less...' : 'See all...'}
          </Button>
        )}
      </List>
    </Fragment>
  );
};

ProfileFriend.propTypes = {
  friend: PropTypes.array.isRequired
};

export default ProfileFriend;
