import apiBook from 'api/book';
import apiUser from 'api/user';
import { useEffect, useState } from 'react';

export const User = () => {
  const [businessUsers, setBusinessUsers] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [seeBook, setSeeBook] = useState(false);
  const [Booking, setBooking] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    e.target.reset(); // Сброс формы
  };

  async function fetchBusinessUsers() {
    try {
      const response = await apiBook.fetchBusinessUsers();
      console.log('User - ', response);
      setBusinessUsers(response || []);
    } catch (error) {
      console.error('Error fetching bussines users:', error);
    }
  }

  async function fetchUsers() {
    try {
      const users = await apiUser.getUsers();
      // console.log('Fetched users:', users);
      setListUser(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  useEffect(() => {
    fetchBusinessUsers();
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="typeUser" className="form-label fw-bold">
            User name
          </label>
          <select
            name="typeUser"
            className="form-control"
            id="typeUser"
            required
          >
            {listUser.length > 0 &&
              listUser.map(user => (
                <option value={user._id}>{user.name}</option>
              ))}
          </select>
        </div>

        {Booking && (
          <>
            <div className="mb-3">
              <label htmlFor="typeUser" className="form-label fw-bold">
                Booking to bussines user
              </label>
              <select
                name="typeUser"
                className="form-control"
                id="typeUser"
                required
              >
                {businessUsers.length > 0 &&
                  businessUsers.map(user => (
                    <option value={user._id}>{user.name}</option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="dateInput" className="form-label fw-bold">
                Booking Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="form-control"
                id="dateInput"
              />
            </div>
            <button
              className="btn btn-primary me-2"
              type="submit"
              onClick={() => {
                setBooking(true);
              }}
            >
              Set book
            </button>
          </>
        )}

        {!seeBook && !Booking && (
          <div className="btn-group">
            <button
              className="btn btn-primary me-2"
              type="button"
              onClick={() => {
                setSeeBook(true);
              }}
            >
              See books
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                setBooking(true);
              }}
            >
              Booking
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
