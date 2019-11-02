import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/actions/profileAction';
import { Table, Button } from 'semantic-ui-react';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <Table.Row key={exp._id}>
      <Table.Cell className="hide-sm">{exp.company}</Table.Cell>
      <Table.Cell className="hide-sm">{exp.title}</Table.Cell>
      <Table.Cell>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Button
          circular
          inverted
          size="tiny"
          color="red"
          icon="trash"
          onClick={() => deleteExperience(exp._id)}
        />
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled size="small" unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Company</Table.HeaderCell>
          <Table.HeaderCell className="hide-sm">Title</Table.HeaderCell>
          <Table.HeaderCell className="hide-sm">Years</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>{experiences}</Table.Body>
    </Table>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
