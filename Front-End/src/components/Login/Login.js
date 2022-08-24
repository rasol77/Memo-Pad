import { useState } from 'react';

const Login = () => {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={(e) => e.target.value} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={(e) => e.target.value} />
      <button></button>
    </form>
  );
};

export default Login;
