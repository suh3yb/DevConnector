import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Button, Icon, Grid } from 'semantic-ui-react';

const ProfileFollowing = ({ following }) => {
	const [ showAll, setShowAll ] = useState(false);

	const onClick = () => {
		setShowAll(!showAll);
	};

	const friendsToShow = showAll ? following : following.slice(0, 4);

	return (
		<Fragment>
			<List as={Grid} columns='2' verticalAlign='middle'>
				{friendsToShow.map((friendObj, index) => (
					<List.Item as={Grid.Column} key={index}>
						<Icon name='user circle' />
						<List.Content>
							<Link to={`/profile/${friendObj.user}`}>
								{friendObj.name && friendObj.name}
							</Link>
						</List.Content>
					</List.Item>
				))}

				{following.length > 4 && (
					<Button size='tiny' onClick={() => onClick()}>
						{showAll ? 'See less' : 'See all'}
					</Button>
				)}
			</List>
		</Fragment>
	);
};

ProfileFollowing.propTypes = {
	following: PropTypes.array.isRequired,
};

export default ProfileFollowing;
