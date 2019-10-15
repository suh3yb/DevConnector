import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../redux/actions/profileAction';
import {
  Header,
  Form,
  Input,
  TextArea,
  Checkbox,
  Button,
  Divider
} from 'semantic-ui-react';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <Fragment>
      <Header
        as="h3"
        icon="graduation"
        content="Add Your Aducation"
        subheader="Add any school or bootcamp you have attended"
      />
      <Button as={Link} to="/dashboard" icon="arrow left" content="Go Back" />
      <Divider />
      <Form className="form" onSubmit={e => onSubmit(e)}>
        <Form.Group widths="3">
          <Form.Field>
            <Input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              value={school}
              onChange={e => onChange(e)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              value={degree}
              onChange={e => onChange(e)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="* Field of Study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={e => onChange(e)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="3">
          <Form.Field>
            <label>From Date</label>
            <Input
              type="date"
              name="from"
              value={from}
              onChange={e => onChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Current School</label>
            <Checkbox
              toggle
              name="current"
              checked={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>To Date</label>
            <Input
              type="date"
              name="to"
              value={to}
              onChange={e => onChange(e)}
              disabled={toDateDisabled ? true : false}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <TextArea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Button primary>Submit</Button>
      </Form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
