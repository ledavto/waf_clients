// import { useState } from 'react';

export const User = ({ addUser }) => {
  //   const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    e.target.reset(); // Сброс формы
  };

  return (
    <div className="container">
      <h1>User</h1>
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
          />
        </div>

        <button className="btn btn-primary" type="submit">
          See task
        </button>
      </form>
    </div>
  );
};
