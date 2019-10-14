import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { follow } from '../../redux/actions/profileAction';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
  follow,
}) => {
  const onClick = () => {
    follow(_id);
  };

  return (
    <div className="profile bg-light">
      <img src={avatar} alt={name} className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        <button onClick={() => onClick()} className="btn btn-primary">
          Follow
        </button>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
};

export default connect(
  null,
  { follow },
)(ProfileItem);
