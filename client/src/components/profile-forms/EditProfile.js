import React, { Fragment, useState, useEffect } from 'react';
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
  Button,
  Label,
  Dropdown,
  Select,
  Input,
  TextArea,
  Icon,
  Divider
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
    instagram: ''
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

    createProfile(formData, history, true);
  };

  return !loading && profile === null ? (
    <Redirect to="/create-profile" />
  ) : (
    <Fragment>
      <Header
        icon="edit"
        as="h3"
        content="Edit Your Profile"
        subheader="Make some changes from your profile"
      />
      <Button as={Link} icon="arrow left" content="Go Back" to="/dashboard" />
      <Divider />
      <Form className="form" onSubmit={e => onSubmit(e)}>
        <Form.Group widths="3">
          <Form.Field>
            <Select
              fluid
              placeholder="Select Professional Status"
              search
              name="status"
              value={status}
              onChange={e => onChange(e)}
              options={statusList}>
              {/* <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option> */}
            </Select>
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
            className="ui button secondary"
            type="button"
            onClick={() => {
              toggleSocialInputs(!displaySocialInputs);
              return false;
            }}
            return>
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
            </Form.Group>{' '}
          </Fragment>
        )}
        <Button primary>Submit</Button>
      </Form>
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
