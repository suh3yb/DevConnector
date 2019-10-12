import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { List, Icon } from 'semantic-ui-react';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, from, to, description }
}) => (
  <List.Item>
    <Icon name="graduation cap" />
    <List.Content>
      <List.Header as="h4">{school}</List.Header>
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
          <strong>Degree: </strong>
          {degree}
        </List.Item>
        <List.Item>
          <strong>Field of Study: </strong>
          {fieldofstudy}
        </List.Item>
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

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
