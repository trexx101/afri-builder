import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  username: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
});

export const formValues = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  username: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  username: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  password: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  confirmPassword: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  firstname: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  lastname: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  email: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  username: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  confirmPassword: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  firstname: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  lastname: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  email: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
