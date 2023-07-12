import React from 'react';
import { SpinnerCircularFixed } from 'spinners-react';

const Spinner = () => {
  return (
    <div className='spinner-wrapper'>
      <SpinnerCircularFixed
        size={50}
        thickness={150}
        speed={75}
        color='rgb(86,171,47)'
        secondaryColor='#adb5bd'
        margin='0 auto'
      />
    </div>
  );
};

export default Spinner;
