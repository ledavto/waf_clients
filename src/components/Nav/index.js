import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div className="d-flex justify-content-start">
      <NavLink className="nav-item nav-link" to="/">
        User
      </NavLink>
      <NavLink className="nav-item nav-link" to="/adduser">
        Add user
      </NavLink>
      <NavLink className="nav-item nav-link" to="/users">
        List of users
      </NavLink>
    </div>
  );
};
