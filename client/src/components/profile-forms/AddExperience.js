import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../redux/actions/profileAction';
import {
  Header,
  Divider,
  Button,
  Form,
  TextArea,
  Checkbox,
  Input
} from 'semantic-ui-react';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <Fragment>
      <Header
        as="h3"
        icon="suitcase"
        content="Add Your Experience"
        subheader="Add any developer/programming positions that you have
        had in the past"
      />
      <Button as={Link} to="/dashboard" icon="arrow left" content="Go Back" />
      <Divider />
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group widths="3">
          <Form.Field>
            <Input
              type="text"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={e => onChange(e)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="* Company"
              name="company"
              value={company}
              onChange={e => onChange(e)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
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
            <label>Current Job</label>
            <Checkbox
              toggle
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
          </Form.Field>
          <Form.Field>
            <label>To Date</label>
            <Input
              type="date"
              name="to"
              value={to}
              onChange={e => onChange(e)}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <TextArea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Button primary>Submit</Button>
      </Form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { addExperience }
)(withRouter(AddExperience));
