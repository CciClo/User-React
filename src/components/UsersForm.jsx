import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';

const UsersForm = ({ userSelected, getUsersList, deselectUser, showForm, changeShowForm }) => {

  const { handleSubmit, register, reset } = useForm();
  const [ animationForm ,setAnimationForm ] = useState('hidden')

  
  
  const [ isShowPassword, setIsShowPassword]  = useState(false)

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

    showForm && setAnimationForm('hidden-form-container')

    addEventListener('animationstart', e => {
      if(e.target.classList.contains("hidden-form-container")){
        setTimeout(() => setAnimationForm('hidden'), 1000);
        
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
        .then(() => {getUsersList(); deselectUser()  })
        .catch( error => console.log(error.response?.data));
    }else{
      axios.post('https://users-crud1.herokuapp.com/users/',data)
        .then(() => {getUsersList(); emptyForm() })
        .catch(error => console.log(error.response?.data));
    }

    changeShowForm();
    
  };

  return (
    <>
      <div className='add-or-edit-form' onClick={changeShowForm} >
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
              <input {...register('first_name')} type="text" id='first_name' placeholder='First Name' />
              <input {...register('last_name')} type="text"  id='last_name' placeholder='Last Name' />        
            </div>
          </div>

          <div className='input-from-container'>
            <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
            <input {...register('email')} type="text" id='email' placeholder='Email' />
          </div>

          <div className='input-from-container'>
            <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
            <input {...register('password')} type={ isShowPassword? "text" : "password" }  id="password" placeholder='Password' />
            { isShowPassword ?
              <i className="fa-solid fa-eye-slash eye" onClick={() => setIsShowPassword(!isShowPassword) }></i>:
              <i className="fa-solid fa-eye eye" onClick={() => setIsShowPassword(!isShowPassword) } ></i>
            }
          </div>

          <div className='input-from-container'>
            <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
            <input {...register('birthday')} type="date" id="birthday" />
          </div>

          <button> { userSelected? 'edit user': 'add new user' } </button>

          { userSelected &&

            <button type='button' onClick={deselectUser} >Cancel</button>

          }

        </form>
      
      </div>
    
    </>
  );
};

export default UsersForm;