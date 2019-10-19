import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { List, Icon } from 'semantic-ui-react';

const ProfileExperience = ({
  experience: { company, title, location, current, from, to, description }
}) => (
  <List.Item>
    <Icon name="suitcase" />
    <List.Content>
      <List.Header as="h4">{company}</List.Header>
      <List.Description as={List}>
        <List.Item>
          <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
          {current ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>
          )}
        </List.Item>
        <List.Item>
          <strong>Position: </strong>
          {title}
        </List.Item>
        {location && (
          <List.Item>
            <strong>Location: </strong>
            {location}
          </List.Item>
        )}
        {description && (
          <List.Item>
            <strong>Description: </strong>
            {description}
          </List.Item>
        )}
      </List.Description>
    </List.Content>
  </List.Item>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
