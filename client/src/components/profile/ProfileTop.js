import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Header, Button, Icon, List } from 'semantic-ui-react';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    imageUrl,
    skills,
    user: { name, avatar }
  }
}) => {
  return (
    <Card fluid raised style={{ maxWidth: '500px' }}>
      <Card.Content style={{ paddingLeft: '30%', paddingRight: '30%' }}>
        <Image circular fluid src={imageUrl || avatar} alt={name} />
      </Card.Content>
      <Card.Content>
        <Header textAlign="center" as="h1">
          {name}
        </Header>
        <Card.Meta textAlign="center">
          <p>
            <Icon name="suitcase" /> {status}{' '}
            {company && <span> at {company}</span>}
          </p>
          <p>
            <Icon name="location arrow" /> {location && <span>{location}</span>}
          </p>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <List size="mini" horizontal>
          {skills.map((skill, index) => (
            <List.Item key={index}>
              <List.Icon color="teal" name="check" /> {skill}
            </List.Item>
          ))}
        </List>
      </Card.Content>
      <Card.Content extra>
        <Card.Description textAlign="center">
          {website && (
            <Button
              as="a"
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
      </Card.Content>
    </Card>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
