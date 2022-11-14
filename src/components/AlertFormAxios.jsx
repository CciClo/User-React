import React from 'react';
import './AlertAxios.css'

const AlertFormAxios = () => {
  return (
    <section>

      <div className="alert-container">
        <div className="alert-success hidden">
          <i className="start-icon far fa-check-circle faa-tada animated"></i>
          <strong className="font__weight-semibold"> Well done!</strong> has been successfully completed
        </div>
      </div>

      <div className="alert-container">
        <div className="alert-warning hidden">
          <i className="start-icon fa fa-exclamation-triangle faa-flash animated"></i>
          <strong className="font__weight-semibold"> Warning!</strong> Check that everything is ok
        </div>
      </div>

      <div className="alert-container">
        <div className="alert-danger hidden">
          <i className="start-icon far fa-times-circle faa-pulse animated" ></i>
          <strong className="font__weight-semibold"> Oh snap!</strong> Something went wrong
        </div>
      </div>
   
    </section>
  );
};

export default AlertFormAxios;