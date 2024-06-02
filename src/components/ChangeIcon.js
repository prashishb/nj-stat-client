import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const ChangeIcon = ({ change }) => {
  if (change > 0) {
    return <FontAwesomeIcon icon={faPlus} />;
  } else if (change < 0) {
    return <FontAwesomeIcon icon={faMinus} className='fa-minus-decrease' />;
  } else {
    return <FontAwesomeIcon icon={faMinus} className='text-body-tertiary' />;
  }
};

export default ChangeIcon;
