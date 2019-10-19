import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profileAction';
import { Table, Header, Button } from 'semantic-ui-react';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <Table.Row key={edu._id}>
      <Table.Cell className="hide-sm">{edu.school}</Table.Cell>
      <Table.Cell className="hide-sm">{edu.degree}</Table.Cell>
      <Table.Cell>
        <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
        )}
      </Table.Cell>
      <Table.Cell>
        <Button
          icon="trash"
          circular
          size="tiny"
          onClick={() => deleteEducation(edu._id)}
          color="red"
        />
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Fragment>
      <Header as="h2">Education Credentials</Header>
      <Table celled compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>School</Table.HeaderCell>
            <Table.HeaderCell className="hide-sm">Degree</Table.HeaderCell>
            <Table.HeaderCell className="hide-sm">Years</Table.HeaderCell>
            <Table.HeaderCell collapsing />
          </Table.Row>
        </Table.Header>
        <Table.Body>{educations}</Table.Body>
      </Table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
