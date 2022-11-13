import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Alert.css'
import { set, useForm } from 'react-hook-form';

const UsersForm = ({ userSelected, getUsersList, deselectUser, showForm, changeShowForm }) => {

  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [ animationForm ,setAnimationForm ] = useState('hidden')
  const [ isShowPassword, setIsShowPassword]  = useState(false)

  const valid = (e,clas) => {
    const elementInput = document.querySelector(`.${clas}`)
    if (e.keyCode == 13 ) {
      elementInput.classList.add("input-fails");
      setTimeout(function() {
        //remove the class so animation can occur as many times as user triggers event, delay must be longer than the animation duration and any delay.
        elementInput.classList.remove("input-fails");
      }, 1000); 
    }
  };

  const emptyForm = () => {
    reset( 
      {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
      }
    )
  }

  useEffect(() => {
    
    addEventListener('animationstart', e => {
      if(e.target.classList.contains("hidden-form-container")){
        setTimeout(() => setAnimationForm('hidden'), 1000);
        
      }else if (e.target.classList.contains("form-container")){
        setTimeout(() => setAnimationForm('hidden-form-container'), 500);
      }
    })
    
  },[showForm])

  useEffect(() => {
    if(userSelected) {
      reset( userSelected )
    }else{
      emptyForm()
    }
  }, [userSelected]);

  const submit = ( data ) => {
    
    if( userSelected ) {
      axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`,data)
        .then(() => {getUsersList(); deselectUser() ; changeShowForm(); })
        .catch( error => console.log(error.response?.data));
    }else{
      axios.post('https://users-crud1.herokuapp.com/users/',data)
        .then(() => {getUsersList(); emptyForm(); changeShowForm() })
        .catch(error => console.log(error.response?.data));
    }
    
  };

  return (
    <>
      <div className='add-or-edit-form fa' onClick={changeShowForm} >
        { userSelected ?
          <i className="fa-solid fa-user-pen"  ></i>:
          <i className="fa-solid fa-user-plus"  ></i>
        }
      </div>

    
      <div className={ showForm ? 'form-container' : animationForm }>

        <div className='hide-form' onClick={changeShowForm }></div>

        <form action="" onSubmit={handleSubmit(submit)} className='form'>

          <i className="fa-solid fa-xmark" onClick={() => (deselectUser(), emptyForm()) }></i>

          <div className='input-from-container'>
            <label htmlFor="first_name">
              { userSelected ?
                <i className="fa-solid fa-user-pen"></i>:
                <i className="fa-solid fa-user-plus"></i>
              }
            </label>
            <div className='user-input'>
              <input 
                {...register('first_name', {required: true, maxLength: 80})} 
                type="text" 
                id='first_name'
                className='first_name' 
                placeholder='First Name' 
                onKeyUp={e => valid(e,'first_name' )}
              />
              <input 
                {...register('last_name', {required: true, maxLength: 80})} 
                type="text"  
                id='last_name' 
                placeholder='Last Name' 
                className='last_name'
                onKeyUp={e => valid(e, 'last_name' )}
              />        
            </div>
          </div>

          <div className='input-from-container'>
            <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
            <input 
              {...register('email', {required: true, maxLength: 80})} 
              type="email" id='email' 
              placeholder='Email'
              className='email'
              onKeyUp={e => valid(e,'email' )} 
            />
          </div>

          <div className='input-from-container'>
            <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
            <input 
              {...register('password', {required: true, maxLength: 80})} 
              type={ isShowPassword? "text" : "password" }  
              id="password" placeholder='Password'
              className='password'
              onKeyUp={e => valid(e,'password' )} 
            />
            { isShowPassword ?
              <i className="fa-solid fa-eye-slash eye" onClick={() => setIsShowPassword(!isShowPassword) }></i>:
              <i className="fa-solid fa-eye eye" onClick={() => setIsShowPassword(!isShowPassword) } ></i>
            }
          </div>

          <div className='input-from-container'>
            <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
            <input 
              {...register('birthday', {required: true, maxLength: 80})} 
              type="date" 
              id="birthday" 
            />
          </div>

          <div className='button-container-form'>

            <button> { userSelected? 'edit user': 'add new user' }  </button>

            { userSelected &&

              <button type='button' onClick={deselectUser} >Cancel</button>

            }

          </div>


        </form>
      
      </div>
    
    </>
  );
};

export default UsersForm;