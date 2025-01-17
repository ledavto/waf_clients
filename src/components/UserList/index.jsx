import { UserForm } from 'components/UserForm';

export const UserList = ({ listUser, deleteUser }) => {
  return (
    <div className="container">
      <h1>User list</h1>
      <ul className="list-group">
        {listUser.length > 0 &&
          listUser
            // .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
            .map(elem => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={elem.id}
              >
                <label>
                  {elem.name} - {elem.typeUser}
                </label>

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => deleteUser(elem.id)}
                >
                  Del
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};
