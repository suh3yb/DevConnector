import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile
} from '../../redux/actions/profileAction';
import {
  Header,
  Form,
  Select,
  Label,
  Input,
  TextArea,
  Divider,
  Button
} from 'semantic-ui-react';

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const statusList = [
    { key: 'Developer', value: 'Developer', text: 'Developer' },
    {
      key: 'Junior Developer',
      value: 'Junior Developer',
      text: 'Junior Developer'
    }
  ];

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    createProfile(formData, history);
  };

  return !loading && profile === null ? (
    <Fragment>
      <Header
        icon="user plus"
        as="h3"
        content="Create Your Profile"
        subheader="Let's get some information to make your profile stand out"
      />
      <Button as={Link} icon="arrow left" content="Go Back" to="/dashboard" />
      <Divider />
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group widths="3">
          <Form.Field>
            <Select
              fluid
              placeholder="* Select Professional Status"
              search
              name="status"
              value={status}
              onChange={e => onChange(e)}
              options={statusList}
            />

            <Label pointing="above">
              Give us an idea of where you are at in your career
            </Label>
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={e => onChange(e)}
            />
            <Label pointing="above">
              Could be your own company or one you work for
            </Label>
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={e => onChange(e)}
            />
            <Label pointing="above">
              Could be your own or a company website
            </Label>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="3">
          <Form.Field>
            <Input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
            <Label pointing="above">
              City & state suggested (eg. Boston, MA)
            </Label>
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={e => onChange(e)}
            />
            <Label pointing="above">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </Label>
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={e => onChange(e)}
            />
            <Label pointing="above">
              If you want your latest repos and a Github link, include your
              username
            </Label>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <TextArea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <Label pointing="above">Tell us a little about yourself</Label>
        </Form.Field>
        <Form.Field>
          <label>Optional</label>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="ui button secondary">
            Add Social Network Links
          </button>
        </Form.Field>

        {displaySocialInputs && (
          <Fragment>
            <Form.Group widths="3">
              <Form.Field>
                <Input
                  icon="twitter"
                  iconPosition="left"
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={e => onChange(e)}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  icon="facebook"
                  iconPosition="left"
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={e => onChange(e)}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  icon="youtube"
                  iconPosition="left"
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={e => onChange(e)}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="3">
              <Form.Field>
                <Input
                  icon="linkedin"
                  iconPosition="left"
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={e => onChange(e)}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  icon="instagram"
                  iconPosition="left"
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={e => onChange(e)}
                />
              </Form.Field>
            </Form.Group>
          </Fragment>
        )}

        <Button primary>Submit</Button>
      </Form>
    </Fragment>
  ) : (
    <Redirect to="/dashboard" />
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
