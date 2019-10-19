import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Conversation = ({ profiles }) => {
  return (
    <ul>
      {profiles.map(profile => (
        <li key={profile._id} >
          <Link to={`/messages/${profile.user._id}/${profile.user.name.trim().split(' ')[0]}`} className='btn profile bg-light '>
            <img src={profile.user.avatar} alt={profile.user.name} className='round-img ' />
            <h2>{profile.user.name}</h2>
            <h3>Send Message</h3>
          </Link>

        </li>
      ))}

    </ul>

  );
};

Conversation.propTypes = {
  user: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,


};
const mapStateToProps = state => ({
  profiles: state.profile.profiles,
});

export default connect(
  mapStateToProps,
)(Conversation);
