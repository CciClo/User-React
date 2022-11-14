import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import UsersList from './components/UsersList';
import UsersForm from './components/UsersForm';
import Font from './components/Font';
import AlertFormAxios from './components/AlertFormAxios';
import useAlertForm from './hooks/useAlertForm';

function App() {

  const [ usersList, setUsersList ] = useState([]);
  const [ userSelected, setUserSelected ] = useState(null);

  const [ approvalBullet, setApprovalBullet ] = useState(false)
  const [ showForm , setShowForm ] = useState(false);
  const { alertAxiosForm } = useAlertForm();
  const [ alerAxios, setAlertAxios ] = useState('hidden')

  const deselectUser = () => {
    setUserSelected(null);
    changeShowForm();
  };

  const getUsersList = () => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then( res => { setUsersList(res.data) })
      .catch(() => {alertAxiosForm('alert-danger')});
  };

  const deleteUser = (id) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}`)
      .then( () => {getUsersList() ; alertAxiosForm('alert-success') } )
      .catch(() => {alertAxiosForm('alert-danger')});
  };

  const selectedUser = ( user ) => {
    setUserSelected(user);
    changeShowForm();
  };

  const changeShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className="App">

      <div className='container'>

        <AlertFormAxios />
        
        <h1>Users</h1>
        
        <UsersForm 
          userSelected={userSelected} 
          getUsersList={getUsersList} 
          deselectUser={deselectUser} 
          showForm={showForm} 
          changeShowForm={changeShowForm} 
        />
        
        
        <UsersList usersList={usersList} selectedUser={selectedUser} deleteUser={deleteUser} />


      </div>
          
      <Font/>

    </div>
  )
}

export default App
