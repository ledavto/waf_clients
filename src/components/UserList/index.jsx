import apiUser from 'api/user';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';

export const UserList = () => {
  const [listUser, setListUser] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const users = await apiUser.getUsers();
      setListUser(users);
    } catch (error) {
      Notiflix.Notify.failure('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteUser(id) {
    try {
      await apiUser.deleteUser(id);

      // Удаляем пользователя из локального состояния
      setListUser(prevList => prevList.filter(user => user._id !== id));
      Notiflix.Notify.success('User deleted');
    } catch (error) {
      Notiflix.Notify.failure('Error delete user:', error);
    }
  }

  async function updateUser(updatedUser) {
    try {
      await apiUser.updateUser(updatedUser._id, updatedUser);
      setListUser(prevList =>
        prevList.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setEditingUser(null);
      Notiflix.Notify.success('User updated');
    } catch (error) {
      Notiflix.Notify.failure('Error updating user:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = user => {
    setEditingUser(user); // Устанавливаем редактируемого пользователя
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
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <ul className="list-group">
          {listUser.length > 0 &&
            listUser.map(elem => (
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
      )}

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
