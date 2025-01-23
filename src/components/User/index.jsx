import apiBook from 'api/book';
import apiUser from 'api/user';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';

export const User = () => {
  const [businessUsers, setBusinessUsers] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [seeBook, setSeeBook] = useState(false);
  const [Booking, setBooking] = useState(false);
  const [selBusines, setSelBusines] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      Notiflix.Notify.success('Book added');
      setBooking(false);
    } catch (error) {
      Notiflix.Notify.failure('Error adding book:', error);
    }
    e.target.reset();
  };

  async function fetchBusinessUsers() {
    setIsLoading(true);
    try {
      const response = await apiUser.fetchBusinessUsers();
      setBusinessUsers(response || []);
    } catch (error) {
      Notiflix.Notify.failure('Error fetching bussines users:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchUsers() {
    try {
      const users = await apiUser.getUsers();
      setListUser(users);
    } catch (error) {
      Notiflix.Notify.failure('Error fetching users:', error);
    }
  }

  async function deleteBook(id) {
    try {
      await apiBook.deleteBook(id);
      setListBooks(prevList => prevList.filter(user => user._id !== id));
    } catch (error) {
      Notiflix.Notify.failure('Error delete user:', error);
    }
  }

  // Состояние для хранения редактируемой даты
  const [editableDates, setEditableDates] = useState();

  const handleEdit = async id => {
    try {
      await apiBook.updateBook(id, { dateBook: editableDates });
      Notiflix.Notify.success('Date updated successfully!');
    } catch (error) {
      Notiflix.Notify.failure('Failed to update book date:', error);
    }
  };

  useEffect(() => {
    fetchBusinessUsers();
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User</h1>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
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
              }}
            >
              <option defaultValue=""></option>
              {listUser.length > 0 &&
                listUser.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
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
                  <option defaultValue=""></option>
                  {businessUsers.length > 0 &&
                    businessUsers.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
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
      )}
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
