import React, { useEffect, useState } from 'react';

const useAlertInputEmpy = () => {

  const [ animationForm ,setAnimationForm ] = useState('hidden')

  const valid = (event, clas) => {
    const elementInput = document.querySelector(`.${clas}`)
    if (event.keyCode == 13 ) {
      elementInput.classList.add("input-fails");
      alertAxiosForm('alert-warning')
      setTimeout(function() {

        elementInput.classList.remove("input-fails");
      }, 1000); 
    }
  };

  const changeAnimationForm = (changeClas) => {
    setAnimationForm(changeClas)
    
  }


  const alertAxiosForm = ( naClas ) => {
    const clas = document.querySelector(`.${naClas}`)
    
    clas.classList.remove("hidden");
    clas.classList.add('alertInit')
    

    setTimeout(function() {

      clas.classList.remove("alertInit");
      clas.classList.add('alertEnd')


    }, 4000);

    setTimeout(function() {

      clas.classList.remove("alertEnd");
      clas.classList.add('hidden')
    }, 8000);
  };

  

  return { valid , changeAnimationForm, animationForm, alertAxiosForm }

};

export default useAlertInputEmpy;