import React from 'react';
import RegisterForm from './RegisterForm'; 

const ExampleComponent = () => {
  
  const userData = {
    name: 'John',
    email: 'john@example.com',
    password: 'password123'
  };

  return (
    <div>
      <RegisterForm {...userData} />
    </div>
  );
};

export default ExampleComponent;
