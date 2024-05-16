import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from './mutations';
import './RegisterForm.css'; 

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
}).required();

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema)
  });
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await registerUser({ variables: { name, email, password } });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <input className="input-field" {...register("name")} placeholder="Name" />
      <p className="error-message">{errors.name?.message}</p>

      <input className="input-field" {...register("email")} placeholder="Email" />
      <p className="error-message">{errors.email?.message}</p>

      <input className="input-field" type="password" {...register("password")} placeholder="Password" />
      <p className="error-message">{errors.password?.message}</p>

      <input className="input-field" type="password" {...register("confirmPassword")} placeholder="Confirm Password" />
      {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
      {password.current !== "" && password.current !== watch("confirmPassword") && (
        <p className="error-message">Passwords must match</p>
      )}

      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
      {error && <p className="error-message">{error.message}</p>}
    </form>
  );
};

export default RegisterForm;
