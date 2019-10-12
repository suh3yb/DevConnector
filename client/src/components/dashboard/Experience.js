import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/actions/profileAction';
import { Table, Header, Button, Responsive, Tab } from 'semantic-ui-react';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <Table.Row key={exp._id}>
      <Table.Cell>{exp.company}</Table.Cell>
      <Table.Cell>{exp.title}</Table.Cell>
      <Table.Cell>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </Table.Cell>
      <Table.Cell>
        <Button
          icon="trash"
          circular
          size="tiny"
          onClick={() => deleteExperience(exp._id)}
          color="red"
        />
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Fragment>
      <Header as="h2">Experience Credentials</Header>
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Years</Table.HeaderCell>
            <Table.HeaderCell collapsing />
          </Table.Row>
        </Table.Header>
        <Table.Body>{experiences}</Table.Body>
      </Table>
    </Fragment>
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
