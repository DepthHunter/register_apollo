import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import RegisterForm from './RegisterForm';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div style={{ textAlign: 'center' }}>
        <h1>Registration form</h1>
        <RegisterForm />
      </div>
    </ApolloProvider>
  );
};


export default App;
