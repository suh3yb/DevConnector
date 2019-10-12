import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Image, List, Button } from 'semantic-ui-react';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <Card raised>
      <Image src={avatar} alt={name} wrapped ui={false} />
      <Card.Content>
        <Card.Header textAlign="center" as="h2">
          {name}
        </Card.Header>
        <Card.Meta textAlign="center">
          {status} {company && <span> at {company}</span>}
        </Card.Meta>
        <Card.Meta textAlign="center">
          {location && <span>{location}</span>}
        </Card.Meta>
        <List>
          {skills.slice(0, 4).map((skill, index) => (
            <List.Item key={index} icon="check" content={skill} />
          ))}
        </List>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <Button as={Link} as={Link} to={`/profile/${_id}`} inverted primary>
          View Profile
        </Button>
        <Button
          as={Link}
          icon="envelope"
          to={`/messages/${_id}/${name.trim().split(' ')[0]}`}
          className="btn btn-primary"
          inverted
          secondary
        />
      </Card.Content>
    </Card>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
