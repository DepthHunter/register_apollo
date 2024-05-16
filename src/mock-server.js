import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ variables: { name, email, password } });
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  return (
    <div>
      <h1>User Registration</h1>
      <RegisterForm />
      <h2>User List</h2>
      <UserList />
    </div>
  );
};

export default App;
