import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchProfile } from '../../redux/actions/profileAction';

const Search = ({ searchProfile }) => {
	const [ input, setInput ] = useState('');

	return (
		<Fragment>
			<div className='search-container'>
				<form
					className='search-label'
					onSubmit={(e) => {
						e.preventDefault();
						searchProfile({ name: input });
						setInput('');
					}}
				>
					<input
						type='text'
						placeholder=' Search...'
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<i className='fa fa-search search-icon' />
				</form>
			</div>
		</Fragment>
	);
};

Search.propTypes = {
	searchProfile: PropTypes.func.isRequired,
};

export default connect(null, { searchProfile })(Search);
