export const adminLogin = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'admin', // dùng plain password, sau đó backend hash
  role: 'admin',
};

export const userLoginPass = [
  { email: 'k3@gmail.com', password: 'k3'},
  { email: 'k2@gmail.com', password: 'k2' },
];

export const userLoginFail = [
  { email: 'k5@gmail.com', password: 'k4' },
  { email: 'k6@gmail.com', password: 'k7'},
];
