import { useState } from 'react';
import { UserForm } from './UserForm';
import { UserList } from './UserList';
import { nanoid } from 'nanoid';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { User } from './User';

export const App = () => {
  const [users, setUsers] = useState([
    { id: 'id-1', name: 'Rosie Simpson', typeUser: 'client' },
    { id: 'id-2', name: 'Hermione Kline', typeUser: 'client' },
    { id: 'id-3', name: 'Eden Clements', typeUser: 'bussines' },
    { id: 'id-4', name: 'Annie Copeland', typeUser: 'client' },
  ]);
  // const [filter, setFilter] = useState('');

  const deleteUser = id => {
    setUsers(users.filter(el => el.id !== id));
  };

  const addUser = newUser => {
    if (newUser.name) {
      const userObj = {
        id: nanoid(),
        ...newUser,
      };

      //Массив имен из объекта
      const arrName = [];
      for (const user of users) {
        arrName.push(user.name);
      }

      //Проверка на наличие уже такого имени
      const arrNameLowerCase = arrName.map(elem => elem.toLowerCase());
      if (arrNameLowerCase.includes(newUser.name.toLowerCase())) {
        alert(`${newUser.name} is already in contacts`);
        return;
      }

      setUsers([...users, userObj]);
      console.log(users);
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<User />} />
        <Route
          index
          path="/users"
          element={<UserList listUser={users} deleteUser={deleteUser} />}
        />
        <Route index path="/adduser" element={<UserForm addUser={addUser} />} />
        <Route path="*" element={<p>Not found</p>}></Route>
      </Route>
    </Routes>
  );
};
