import { UserForm } from './UserForm';
import { UserList } from './UserList';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { User } from './User';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<User />} />
        <Route index path="/users" element={<UserList />} />
        <Route index path="/adduser" element={<UserForm />} />
        <Route path="*" element={<p>Not found</p>}></Route>
      </Route>
    </Routes>
  );
};
