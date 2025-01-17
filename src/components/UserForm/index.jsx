// import { useState } from 'react';

export const UserForm = ({ addUser }) => {
  // const [name, setName] = useState('');
  // const [typeUser, setTypeUser] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addUser({ name: e.target.name.value, typeUser: e.target.typeUser.value });

    // setName(''); // Очистка поля имени
    // setTypeUser(''); // Сброс типа пользователя
    e.target.reset(); // Сброс формы
  };

  // const handleChange = ({ target: { name, value } }) => {
  //   if (name === 'name') {
  //     setName(value);
  //   } else if (name === 'typeUser') {
  //     setTypeUser(value);
  //   }
  // };

  return (
    <div className="container">
      <h1>Add user</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="form-control"
            id="exampleFormControlInput1"
            // value={name}
            // onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            User type
          </label>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="typeUser"
              id="btnradio1"
              value="client"
              autoComplete="off"
              // onChange={handleChange}
              checked
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio1">
              Client
            </label>

            <input
              type="radio"
              className="btn-check"
              name="typeUser"
              id="btnradio2"
              value="business"
              autoComplete="off"
              // onChange={handleChange}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio2">
              Business
            </label>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Add user
        </button>
      </form>
    </div>
  );
};
