import { useEffect, useState } from 'react';
import { UserForm } from './UserForm';
import { UserList } from './UserList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [users, setUsers] = useState([
    { id: 'id-1', name: 'Rosie Simpson', type: 'client' },
    { id: 'id-2', name: 'Hermione Kline', type: 'client' },
    { id: 'id-3', name: 'Eden Clements', type: 'bussines' },
    { id: 'id-4', name: 'Annie Copeland', type: 'client' },
  ]);
  // const [filter, setFilter] = useState('');

  //Один раз при монтировании
  useEffect(() => {}, []);

  // const filterContacts = e => {
  //   setFilter(e);
  // };

  const deleteUser = id => {
    setUsers(users.filter(el => el.id !== id));
  };

  return (
    <div className="container">
      <h1>User list</h1>
      <UserForm addUser={addUsers} />
      <h2>User</h2>
      {users.length > 0 && (
        <UserList listUser={users} deleteUser={deleteUser} />
      )}
    </div>
  );
};
