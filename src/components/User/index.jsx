import apiBook from 'api/book';
import apiUser from 'api/user';
import { useEffect, useState } from 'react';

export const User = () => {
  const [businessUsers, setBusinessUsers] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [seeBook, setSeeBook] = useState(false);
  const [Booking, setBooking] = useState(false);
  const [selBusines, setSelBusines] = useState('');

  const [listBooks, setListBooks] = useState([]);

  async function fetchListBooks(id) {
    try {
      const books = await apiBook.fetchBooks(id);
      // console.log('Fetched books:', books);
      setListBooks(books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newBook = {
        clientId: e.target.user.value,
        businessId: e.target.businessBook.value,
        dateBook: e.target.date.value,
      };
      await apiBook.createBook(newBook);
      // console.log('Book added:', addedBook);
      setBooking(false);
    } catch (error) {
      console.error('Error adding book:', error);
    }
    e.target.reset(); // Сброс формы
  };

  async function fetchBusinessUsers() {
    try {
      const response = await apiUser.fetchBusinessUsers();
      // console.log('Business - ', response);
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

  async function deleteBook(id) {
    try {
      await apiBook.deleteBook(id);
      setListBooks(prevList => prevList.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error delete user:', error);
    }
  }

  // Состояние для хранения редактируемой даты
  const [editableDates, setEditableDates] = useState();

  const handleEdit = async id => {
    try {
      await apiBook.updateBook(id, { dateBook: editableDates });
      // console.log('Date updated successfully!');
    } catch (error) {
      console.error('Failed to update book date:', error);
    }
  };

  useEffect(() => {
    fetchBusinessUsers();
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="user" className="form-label fw-bold">
            User name
          </label>
          <select
            name="user"
            className="form-control"
            id="user"
            required
            onChange={e => {
              setSeeBook(false);
              setBooking(false);
              setSelBusines(e.target.value);
              // console.log(e.target.value);
            }}
          >
            <option defaultValue=""></option>
            {listUser.length > 0 &&
              listUser.map(user => (
                <option value={user._id}>{user.name}</option>
              ))}
          </select>
        </div>

        {Booking && (
          <>
            <div className="mb-3">
              <label htmlFor="businessBook" className="form-label fw-bold">
                Booking to bussines user
              </label>
              <select
                name="businessBook"
                className="form-control"
                id="businessBook"
                required
              >
                <option value="" selected></option>
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
              onClick={e => {
                setSeeBook(true);
                fetchListBooks(selBusines);
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
      {seeBook && (
        <ul className="list-group">
          {listBooks.length > 0 &&
            listBooks.map(elem => {
              const formattedDate = new Date(elem.dateBook)
                .toISOString()
                .split('T')[0];

              //Ищем в списке бизнес клиентов для получения его имени по ID
              const currentBus = businessUsers.find(
                user => user._id === elem.businessId
              );

              return (
                <li
                  className="list-group-item d-flex align-items-center justify-content-between"
                  key={elem._id}
                >
                  <div className="row flex-grow-1">
                    <div className="col-6 text-truncate">
                      <input
                        type="date"
                        name="date"
                        className="form-control"
                        defaultValue={formattedDate}
                        onChange={e => setEditableDates(e.target.value)}
                      />
                    </div>
                    <div className="col-6 text-truncate text-center">
                      {currentBus.name}
                    </div>
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn btn-primary me-2"
                      type="button"
                      onClick={() => handleEdit(elem._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => deleteBook(elem._id)}
                    >
                      Del
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
