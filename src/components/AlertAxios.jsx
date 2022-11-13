import React from 'react';

const AlertAxios = ({ alertAxios }) => {


  return (
    <>
      {alertAxios==='error' ?
        <div className='error'></div>:
       alertAxios==='successful'?
        <div></div>:
        <></>

      }
    </>
  );
};

export default AlertAxios;