import React from 'react';

const UsersList = ({ usersList, selectedUser, deleteUser }) => {

  return (
    <ul className='user-container'>
      {
        usersList.map( user => (
          <li key={user.id} className='user' >

            <div className='user-description'>
              <h3>{user.first_name} {user.last_name}</h3>
              <div> {user.email} </div>
              <div> {user.birthday} </div>
            </div>

            <div className='user-button'>
              <i className="fa-solid fa-trash-can" onClick={ () => deleteUser(user.id) } ></i>
              <i className="fa-solid fa-pen" onClick={() => selectedUser(user)}></i>
            </div>

          </li>
        ))
      }
    </ul>
  );
};

export default UsersList;