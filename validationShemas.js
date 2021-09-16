const yup = require('yup');

const loginValidationObject = {
  email: yup
    .string()
    .typeError('E-mail should be a string')
    .email('Wrong email')
    .required('E-mail is required'),
  password: yup
    .string()
    .typeError('Password should be a string')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Weak password')
    .required('Password is required'),
};

const loginValidationSchema = yup.object().shape(loginValidationObject);
const registerValidationSchema = yup.object().shape({
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords doesn't match")
    .required('Confirm password is required'),
  ...loginValidationObject,
});

module.exports = {
  loginValidationSchema,
  registerValidationSchema,
};