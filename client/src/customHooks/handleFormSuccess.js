const handleSuccess = (response) => {
  const token = response.headers['x-auth-token'];
  const user = response.data;
  localStorage.setItem('token', token);
  return user;
};

export default handleSuccess;
