// import { UserForm } from 'components/UserForm';

import apiUser from 'api/user';
import { useEffect, useState } from 'react';

export const UserList = () => {
  const [listUser, setListUser] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Хранит данные редактируемого пользователя

  async function fetchUsers() {
    try {
      const users = await apiUser.getUsers();
      // console.log('Fetched users:', users);
      setListUser(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function deleteUser(id) {
    try {
      await apiUser.deleteUser(id);
      // console.log('Fetched users:', users);
      // Удаляем пользователя из локального состояния
      setListUser(prevList => prevList.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error delete user:', error);
    }
  }

  async function updateUser(updatedUser) {
    try {
      await apiUser.updateUser(updatedUser._id, updatedUser); // Предполагается, что есть метод `updateUser` в API
      setListUser(prevList =>
        prevList.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setEditingUser(null); // Скрываем форму редактирования
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = id => {
    setEditingUser(id); // Устанавливаем редактируемого пользователя
  };

  const handleSave = e => {
    e.preventDefault();
    const updatedUser = {
      _id: editingUser._id,
      name: e.target.name.value,
      typeUser: e.target.typeUser.value,
    };
    updateUser(updatedUser);
  };

  return (
    <div className="container">
      <h1>User list</h1>
      <ul className="list-group">
        {listUser.length > 0 &&
          listUser
            // .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
            .map(elem => (
              <li
                className="list-group-item d-flex align-items-center justify-content-between"
                key={elem._id}
              >
                <div className="row flex-grow-1">
                  <div className="col-6 text-truncate">{elem.name}</div>
                  <div className="col-6 text-truncate text-center">
                    {elem.typeUser}
                  </div>
                </div>
                <div className="btn-group">
                  <button
                    className="btn btn-primary me-2"
                    type="button"
                    onClick={() => handleEdit(elem)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => deleteUser(elem._id)}
                  >
                    Del
                  </button>
                </div>
              </li>
            ))}
      </ul>
      {editingUser && (
        <form onSubmit={handleSave} className="mt-3">
          <h2>Edit User</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={editingUser.name}
              className="form-control"
              id="name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="typeUser" className="form-label">
              User Type
            </label>
            <select
              name="typeUser"
              defaultValue={editingUser.typeUser}
              className="form-control"
              id="typeUser"
              required
            >
              <option value="client">Client</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setEditingUser(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};
