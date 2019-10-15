import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const DashboardActions = () => {
  return (
    <>
      <Button
        as={Link}
        to="/edit-profile"
        color="grey"
        icon="user circle"
        content="Edit Profile"
      />

      <Button
        as={Link}
        to="/add-experience"
        icon="suitcase"
        content="Add Experience"
        color="grey"
      />
      <Button
        as={Link}
        to="/add-education"
        icon="graduation cap"
        content="Add Education"
        color="grey"
      />
      <Button
        as={Link}
        to="/change-password"
        icon="key"
        content="Change Password"
        color="grey"
      />
    </>
  );
};

export default DashboardActions;
