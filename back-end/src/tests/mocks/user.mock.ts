import bcrypt from 'bcryptjs';

const user = {
  dataValues: {
    barberId: 2,
    name: 'Jonathan',
    email: 'jhonyramos46@gmail.com',
    password: '$2a$12$BvxtqyVoOyweXOTOrrlXk.YjFWKF/muoisTfQaD1jytWR882BPOIm',
  }
}

const validUser = {
  email: "jhonyramos46@gmail.com",
  password: "Salmos8318"
}
const token = {
  mensage: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impob255cmFtb3M0NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNhbG1vczgzMTgiLCJpYXQiOjE2OTk5NzExOTV9.ns1UIh0zBxn2y_tFAzmt6bKCfcHRVcbTncXbgfEwm5M"
}
export { user, validUser, token };