import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message, Icon, TransitionablePortal } from 'semantic-ui-react';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(({ id, alertType, msg }) => (
    <TransitionablePortal key={id} open={alerts.length > 0}>
      <Message
        size="big"
        style={{ position: 'fixed', bottom: '20px', left: '20px' }}
        warning={alertType === 'warning'}
        error={alertType === 'danger'}
        success={alertType === 'success'}>
        <Icon
          name={
            alertType === 'warning'
              ? 'warning sign'
              : alertType === 'success'
              ? 'check circle outline'
              : 'times circle outline'
          }
        />
        {msg}
      </Message>
    </TransitionablePortal>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
