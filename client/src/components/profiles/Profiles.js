import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import Search from './Search';
import { searchProfile } from '../../redux/actions/profileAction';
import { getCurrentProfile, getProfiles } from '../../redux/actions/profileAction';

const Profiles = ({
  getCurrentProfile,
  getProfiles,
  profile: { profiles, loading, search },
  searchProfile,
}) => {
  useEffect(() => {
    getProfiles();
    getCurrentProfile();
  }, [getProfiles, getCurrentProfile]);

  const searchResult = profiles => {
    const results = profiles.map(
      profile =>
        profile.user.name.toUpperCase().includes(search.name.toUpperCase()) && (
          <ProfileItem key={profile._id} profile={profile} />
        ),
    );

    return results.filter(item => typeof item === 'object').length ? (
      results
    ) : (
      <p>No profiles found...</p>
    );
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <div className="search-bar-container">
            <p className="lead">
              <i className="fab fa-connectdevelop" /> Browse and connect with developers
            </p>
            <Search profiles={profiles} />
          </div>
          {search && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                searchProfile(null);
              }}
            >
              Back To Profiles
            </button>
          )}
          <div className="profiles">
            {profiles.length > 0 && !search ? (
              profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
            ) : profiles.length > 0 && search ? (
              searchResult(profiles)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getProfiles, searchProfile },
)(Profiles);
