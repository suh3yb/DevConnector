import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, Divider, List, Icon } from 'semantic-ui-react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <Card fluid style={{ flexBasis: '100%' }}>
    <Card.Content textAlign="center">
      {bio && (
        <>
          <Header as="h2" className="text-primary">
            {name.trim().split(' ')[0]}'s Bio
          </Header>
          <p>{bio}</p>
          <Divider />
        </>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <List horizontal>
        {skills.map((skill, index) => (
          <List.Item key={index}>
            <Icon name="check circle" /> {skill}
          </List.Item>
        ))}
      </List>
    </Card.Content>
  </Card>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
