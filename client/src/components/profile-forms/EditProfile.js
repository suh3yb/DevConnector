import React, { Fragment, useState, useEffect } from 'react';
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
  Form,
  Menu,
  Header,
  Button,
  Image,
  Card,
  Grid,
  Input,
  TextArea
} from 'semantic-ui-react';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
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

  useEffect(() => {
    if (!profile) {
      getCurrentProfile();
    } else {
      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        imageUrl: loading || !profile.imageUrl ? '' : profile.imageUrl,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills.join(','),
        githubusername:
          loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter: loading || !profile.social ? '' : profile.social.twitter || '',
        facebook:
          loading || !profile.social ? '' : profile.social.facebook || '',
        linkedin:
          loading || !profile.social ? '' : profile.social.linkedin || '',
        youtube: loading || !profile.social ? '' : profile.social.youtube || '',
        instagram:
          loading || !profile.social ? '' : profile.social.instagram || ''
      });
    }
  }, [loading, getCurrentProfile, profile]);

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

    createProfile(formData, history, true);
  };
  //Image Upload Functions
  const client = filestack.init(config.key);
  const onSuccess = result => {
    setFormData({ ...formData, imageUrl: result.filesUploaded[0].url });
  };

  const onError = error => {
    alert('Failed to upload. Please try again');
    console.error('error', error);
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
    <Redirect to="/create-profile" />
  ) : (
    <Fragment>
      <Menu secondary>
        <Menu.Item position="left">
          <Header
            color="blue"
            as="h3"
            icon="edit"
            content="Edit Your Profile"
            subheader="Make some changes from your profile"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            primary
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
            <Image
              fluid
              src={imageUrl || (profile && profile.user.avatar)}
              alt={profile && profile.user.name}
            />
            <Card.Content textAlign="center">
              Change your profile image
            </Card.Content>
            <Card.Content extra>
              <Button
                primary
                fluid
                icon="pencil alternate"
                onClick={() => client.picker(options).open()}
                content="Change"
              />
            </Card.Content>
          </Card>
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
                    <small>
                      Give us an idea of where you are at in your career
                    </small>
                  </Form.Field>
                  <Form.Field>
                    <label>Company</label>

                    <Input
                      placeholder="Company"
                      name="company"
                      value={company}
                      onChange={e => onChange(e)}
                    />
                    <small>Could be your own company or one you work for</small>
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
                    <small>Could be your own or a company website</small>
                  </Form.Field>

                  <Form.Field>
                    <label>Location</label>
                    <Input
                      placeholder="Location"
                      name="location"
                      value={location}
                      onChange={e => onChange(e)}
                    />
                    <small>City & state suggested (eg. Boston, MA)</small>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="2">
                  <Form.Field>
                    <label>Skills *</label>

                    <Input
                      type="text"
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
                      type="text"
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
                    onClick={() => toggleSocialInputs(!displaySocialInputs)}
                    type="button"
                    className="btn btn-light">
                    Add Social Network Links
                  </Button>
                  <small pointing="left">Optional</small>
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
  );
};

EditProfile.propTypes = {
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
)(withRouter(EditProfile));
