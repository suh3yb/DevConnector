import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  Container,
  Header,
  Image,
  Icon,
  Button,
  Card
} from 'semantic-ui-react';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <Card
      as={Segment}
      raised
      fluid
      style={{ marginTop: '1rem', padding: '1vw', flexBasis: '100%' }}>
      <Card.Content>
        <Card.Header textAlign="center">
          <Image
            style={{ display: 'block', width: '100%', maxWidth: '300px' }}
            centered
            src={avatar}
            alt={name}
            circular
          />
          <Header as="h1">
            {name}
            <Header.Subheader>
              {status} {company && <span> at {company}</span>}
            </Header.Subheader>
            <Header.Subheader>{location && location}</Header.Subheader>
          </Header>
        </Card.Header>
        <Card.Description textAlign="center">
          {website && (
            <Button
              as="a"
              icon
              circular
              icon="globe"
              primary
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}

          {social && social.twitter && (
            <Button
              as="a"
              circular
              icon="twitter"
              color="twitter"
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}
          {social && social.facebook && (
            <Button
              as="a"
              circular
              icon="facebook"
              color="facebook"
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}
          {social && social.linkedin && (
            <Button
              as="a"
              circular
              icon="linkedin"
              color="linkedin"
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}
          {social && social.youtube && (
            <Button
              as="a"
              circular
              icon="youtube"
              color="youtube"
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}
          {social && social.instagram && (
            <Button
              as="a"
              circular
              icon="instagram"
              color="instagram"
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            />
          )}
        </Card.Description>
      </Card.Content>{' '}
    </Card>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
