import React from 'react';
import zxcvbn from 'zxcvbn';

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
    <div>
      <progress
        value={testedResult.score}
        max="4"
        className={`password-strength-meter-progress strength-${createPasswordLabel(
          testedResult
        )}`}
      />
      <br />
      <div>
        {currentPassword && (
          <>
            <strong>Password strength:</strong>{' '}
            <label className="badge badge-primary">
              {createPasswordLabel(testedResult)}
            </label>
            <ul className="list">
              {testedResult.feedback.suggestions.map(suggestion => (
                <li className="list-item">{suggestion}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordCheck;
