import apiUser from 'api/user';

export const UserForm = () => {
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const newUser = {
        name: e.target.name.value,
        typeUser: e.target.typeUser.value,
      };
      await apiUser.addUser(newUser);
      // console.log('User added:', addedUser);
    } catch (error) {
      console.error('Error adding user:', error);
    }
    e.target.reset();
  };

  return (
    <div className="container">
      <h1 className="text-center">Add user</h1>
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
          />
        </div>
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="typeUser" className="form-label">
              User Type
            </label>
            <select
              name="typeUser"
              className="form-control"
              id="typeUser"
              required
            >
              <option value="client">Client</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Add user
        </button>
      </form>
    </div>
  );
};
