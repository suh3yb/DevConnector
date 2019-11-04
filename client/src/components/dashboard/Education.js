import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profileAction';

import { Table, Button } from 'semantic-ui-react';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <Table.Row key={edu._id}>
      <Table.Cell className="hide-sm">{edu.school}</Table.Cell>
      <Table.Cell className="hide-sm">{edu.degree}</Table.Cell>
      <Table.Cell>
        <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>}
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Button
          circular
          inverted
          size="tiny"
          color="red"
          icon="trash"
          onClick={() => deleteEducation(edu._id)}
        />
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled size="small" unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>School</Table.HeaderCell>
          <Table.HeaderCell className="hide-sm">Degree</Table.HeaderCell>
          <Table.HeaderCell className="hide-sm">Years</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>{educations}</Table.Body>
    </Table>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(
  null,
  { deleteEducation },
)(Education);
