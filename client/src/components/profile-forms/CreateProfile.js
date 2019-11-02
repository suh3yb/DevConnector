import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile
} from '../../redux/actions/profileAction';
import * as filestack from 'filestack-js';
import { config } from './config';
import {
  Header,
  Menu,
  Button,
  Grid,
  Card,
  Image,
  Form,
  Input,
  TextArea,
  Label
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
    instagram: '',
    imageUrl: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

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
    instagram,
    imageUrl
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    createProfile(formData, history);
  };

  //Image Upload Functions
  const client = filestack.init(config.key);
  const onSuccess = result => {
    setFormData({ ...formData, imageUrl: result.filesUploaded[0].url });
  };

  const onError = error => {
    console.error('error', error);
    alert('Failed to upload. Please try again');
  };

  const options = {
    accept: 'image/*',
    fromSources: ['local_file_system'],
    maxSize: 1024 * 1024,
    maxFiles: 1,
    onUploadDone: onSuccess,
    onFileUploadFailed: onError
  };

  return !loading && profile === null ? (
    <Fragment>
      <Menu secondary>
        <Menu.Item position="left">
          <Header
            as="h3"
            icon="user circle"
            content="Create Your Profile"
            subheader="Let's get some information to make your profile stand out"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            as={Link}
            icon="arrow left"
            to="/dashboard"
            content="Go Back"
          />
        </Menu.Item>
      </Menu>

      <Grid columns="2">
        <Grid.Column mobile="8" tablet="4" computer="4">
          <Card fluid raised>
            {!imageUrl ? (
              <Card.Content textAlign="center">
                No Picture Selected
              </Card.Content>
            ) : (
              <Image src={imageUrl} alt={profile.user.name} />
            )}
            <Card.Content extra>
              <Button
                primary
                fluid
                onClick={() => client.picker(options).open()}>
                Upload Image
              </Button>
            </Card.Content>
          </Card>

          <div className="addImage"></div>
        </Grid.Column>
        <Grid.Column mobile="16" tablet="12" computer="12">
          <Card fluid raised>
            <Card.Content>
              <Form onSubmit={e => onSubmit(e)}>
                <Form.Group widths="2">
                  <Form.Field>
                    <label>Status *</label>
                    <select
                      name="status"
                      value={status}
                      onChange={e => onChange(e)}>
                      <option value="0">* Select Professional Status</option>
                      <option value="Developer">Developer</option>
                      <option value="Junior Developer">Junior Developer</option>
                      <option value="Senior Developer">Senior Developer</option>
                      <option value="Manager">Manager</option>
                      <option value="Student or Learning">
                        Student or Learning
                      </option>
                      <option value="Instructor">Instructor or Teacher</option>
                      <option value="Intern">Intern</option>
                      <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                      Give us an idea of where you are at in your career
                    </small>
                  </Form.Field>
                  <Form.Field>
                    <label>Company</label>
                    <Input
                      type="text"
                      placeholder="Company"
                      name="company"
                      value={company}
                      onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                      Could be your own company or one you work for
                    </small>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="2">
                  <Form.Field>
                    <label>Website</label>
                    <Input
                      placeholder="Website"
                      name="website"
                      value={website}
                      onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                      Could be your own or a company website
                    </small>
                  </Form.Field>
                  <Form.Field>
                    <label>Location</label>
                    <Input
                      placeholder="Location"
                      name="location"
                      value={location}
                      onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                      City & state suggested (eg. Boston, MA)
                    </small>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="2">
                  <Form.Field>
                    <label>Skills *</label>
                    <Input
                      placeholder="* Skills"
                      name="skills"
                      value={skills}
                      onChange={e => onChange(e)}
                    />
                    <small>
                      Please use comma separated values (eg.
                      HTML,CSS,JavaScript,PHP)
                    </small>
                  </Form.Field>
                  <Form.Field>
                    <label>Github Username</label>
                    <Input
                      placeholder="Github Username"
                      name="githubusername"
                      value={githubusername}
                      onChange={e => onChange(e)}
                    />
                    <small>
                      If you want your latest repos and a Github link, include
                      your username
                    </small>
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>Bio</label>
                  <TextArea
                    placeholder="A short bio of yourself"
                    name="bio"
                    value={bio}
                    onChange={e => onChange(e)}
                  />
                  <small>Tell us a little about yourself</small>
                </Form.Field>
                <Form.Field>
                  <Button
                    type="button"
                    onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                    Add Social Network Links
                  </Button>
                  <Label pointing="left">Optional</Label>
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
                    </Form.Group>{' '}
                  </Fragment>
                )}
                <Button primary content="Submit" />
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
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
