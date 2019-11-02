import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Responsive, Icon } from 'semantic-ui-react';

const DashboardActions = () => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Button primary icon as={Link} to="/edit-profile">
        <Icon name="edit" />{' '}
        <Responsive as="span" minWidth={768}>
          Edit Profile
        </Responsive>
      </Button>
      <Button primary icon as={Link} to="/change-password">
        <Icon name="key" />{' '}
        <Responsive as="span" minWidth={768}>
          Change Password
        </Responsive>
      </Button>
    </div>
  );
};

export default DashboardActions;
