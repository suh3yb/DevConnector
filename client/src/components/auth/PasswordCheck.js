import React from 'react';
import zxcvbn from 'zxcvbn';
import { Label, List, Transition } from 'semantic-ui-react';

import './PasswordCheck.css';

const PasswordCheck = ({ currentPassword }) => {
  const testedResult = zxcvbn(currentPassword);
  const createPasswordLabel = result => {
    switch (result.score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  };
  return (
    <div pointing="above" className="password-strength-meter">
      <progress
        value={testedResult.score}
        max="4"
        className={`password-strength-meter-progress strength-${createPasswordLabel(
          testedResult
        )}`}
      />
      <div>
        {currentPassword && (
          <>
            <strong>Password strength:</strong>{' '}
            <Label>{createPasswordLabel(testedResult)}</Label>
            <List className="list">
              <Transition.Group animation="scale" duration={500}>
                {testedResult.feedback.suggestions.map(suggestion => (
                  <List.Item key={suggestion}>{suggestion}</List.Item>
                ))}
              </Transition.Group>
            </List>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordCheck;
