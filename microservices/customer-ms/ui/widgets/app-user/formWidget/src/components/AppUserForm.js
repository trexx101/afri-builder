import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formValues, formTouched, formErrors } from 'components/__types__/appUser';
import { withFormik } from 'formik';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Grid, TextField, InputAdornment, IconButton, Divider } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import ConfirmationDialogTrigger from 'components/common/ConfirmationDialogTrigger';


const styles = theme => ({
  root: {
    margin: theme.spacing(0),
  },
  UserForm: {
    background: '#D8EAA0',
    margin: '-0.5rem',
  },
  UserForm__title: {
    color: '#0E6837',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '2rem',
  },
  UserForm__social: {
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: '1.375rem',
    color: '#000',
    '& a': {
      color: '#0E6837',
      fontSize: '0.625rem',
      margin: '0 .625rem',
    },
    '@media (max-width: 1024px ) and (min-width: 320px) and (orientation: portrait )': {
      fontSize: '1.5rem',
    },
    '@media (min-width: 320px) and (max-width: 1024px)  and (orientation: landscape )': {
      fontSize: '1.5rem',
    },
  },
  UserForm__login: {
    backgroung: '#184437',
  },
  UserForm__signup: {
    background: '#0E6837',
    fontSize: '1rem',
    textTransform: 'uppercase',
    color: '#fff',
    padding: '.84rem 2.14rem',
    width: '100%',
    borderRadius: '0',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
    border: 'none',
    cursor: 'pointer',
    '& :hover': {
      background: '#0E6837',
      color: '#fff',
      padding: '.84rem 2.14rem',
      width: '100%',
      borderRadius: '0',
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
      border: 'none',
      cursor: 'pointer',
    },
  },
  UserForm__row: {
    width: '100%',
  },
  UserForm__wrapper: {
    background: '#fff',
    padding: '1% 4% ',
    margin: '8% 31%',
    '@media (max-width: 1024px ) and (min-width: 320px) and (orientation: portrait )': {
      background: '#fff',
      padding: '0',
      margin: '8% 5%',
    },
    '@media (min-width: 320px) and (max-width: 1024px)  and (orientation: landscape )': {
      background: '#fff',
      padding: '0',
      margin: '8%',
    },
  },
  UserForm__textField: {
    width: '100%',
    background: '#fff',

    '& label': {
      fontSize: '1rem',
    },
  },
  input: {
    fontSize: '3rem!Important',
  },
  UserForm__agree: {
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: '1.375rem',
    color: '#000',
    '& a': {
      color: '#0E6837',
    },
    '@media (max-width: 1024px ) and (min-width: 320px) and (orientation: portrait )': {
      fontSize: '1.2rem',
    },
    '@media (min-width: 320px) and (max-width: 1024px)  and (orientation: landscape )': {
      fontSize: '1.2rem',
    },
  },
  UserForm__underlabel: {
    textAlign: 'center',
    fontSize: '0.875rem',
    marginTop: '-1.375rem',
    color: '#6c757d',
    '@media (max-width: 1024px ) and (min-width: 320px) and (orientation: portrait )': {
      fontSize: '1.1rem',
      marginTop: '-.375rem',
    },
    '@media (min-width: 320px) and (max-width: 1024px)  and (orientation: landscape )': {
      fontSize: '1.2rem',
    },
  },
  UserForm__divider: {
    margin: '1.25rem',
    padding: '0',
  },

  UserForm__input: {
    fontSize: '1rem',
    '@media (max-width: 1024px ) and (min-width: 320px) and (orientation: portrait )': {
      fontSize: '1.5rem',
    },
    '@media (min-width: 320px) and (max-width: 1024px)  and (orientation: landscape )': {
      fontSize: '1.5rem',
    },
  },
});
class AppUserForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleConfirmationDialogAction = this.handleConfirmationDialogAction.bind(this);
    console.log("add const")
  }

  handleConfirmationDialogAction(action) {
    const { onDelete, values } = this.props;
    switch (action) {
      case ConfirmationDialogTrigger.CONFIRM: {
        onDelete(values);
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {
      classes,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit: formikHandleSubmit,
      isSubmitting,
      showPassword,
      handleClickShowPassword,
      handleMouseDownPassword,
      t,
    } = this.props;


    const getHelperText = field => (errors[field] && touched[field] ? errors[field] : '');


    const handleSubmit = e => {
      e.stopPropagation(); // avoids double submission caused by react-shadow-dom-retarget-events
      formikHandleSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} className={classes.UserForm} data-testid="appUser-form">
          <Grid container justify="center" alignItems="center">
            <Grid container spacing={4} className={classes.UserForm__wrapper}>
            <Grid item xs={12} sm={12} className={classes.UserForm__title}>
              Registration
            </Grid>
            <input type="hidden"
                id="appUser-id"
                data-testid="appUser-id"
                value={values.id}
              />
            <Grid item xs={12} sm={6} className={classes.UserForm__row}>
              <TextField
                id="appUser-firstname"
                error={errors.firstname && touched.firstname}
                helperText={getHelperText('firstname')}
                className={classes.UserForm__textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
                type="firstname"
                name="firstname"
                label={t('entities.appUser.firstname')}
                InputProps={{
                  className: classes.UserForm__input
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.UserForm__row}>
              <TextField
                id="appUser-lastname"
                error={errors.lastname && touched.lastname}
                helperText={getHelperText('lastname')}
                className={classes.UserForm__textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
                name="lastname"
                type="lastname"
                label={t('entities.appUser.lastname')}
                InputProps={{
                  className: classes.UserForm__input
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} className={classes.UserForm__row}>
              <TextField
                id="appUser-email"
                error={errors.email && touched.email}
                helperText={getHelperText('email')}
                className={classes.UserForm__textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                type="email"
                label={t('entities.appUser.email')}
                InputProps={{
                  className: classes.UserForm__input
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.UserForm__row}>
              <TextField
                id="appUser-username"
                error={errors.username && touched.username}
                helperText={getHelperText('username')}
                className={classes.UserForm__textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                name="username"
                type="username"
                label={t('entities.appUser.username')}
                InputProps={{
                  className: classes.UserForm__input
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.UserForm__row}>
              <TextField
                id="appUser-password"
                error={errors.password && touched.password}
                helperText={getHelperText('password')}
                className={classes.UserForm__textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
                label={t('entities.appUser.password')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  className: classes.UserForm__input,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} className={classes.UserForm__row}>
              <TextField
                id="confirm-appUser-password"
                error={errors.confirmPassword && touched.confirmPassword}
                helperText={getHelperText('confirmPassword')}
                className={classes.UserForm__textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                name="password"
                label={t('entities.appUser.confirmPassword')}
                type="password"
                InputProps={{
                  className: classes.UserForm__input
                }}
              />
            </Grid>
              <Grid item xs={12} className={classes.UserForm__underlabel}>
                At least 8 characters and 1 digit
              </Grid>

              <Grid item xs={12} md={12}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="submit-btn"
                  className={classes.UserForm__signup}
                >
                  Sign up
                </button>
              </Grid>
            </Grid>
          </Grid>

        </form>
    );
  }
}

AppUserForm.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    textField: PropTypes.string,
    submitButton: PropTypes.string,
    button: PropTypes.string,
    downloadAnchor: PropTypes.string,
    UserForm: PropTypes.string,
    UserForm__title: PropTypes.string,
    UserForm__submit: PropTypes.string,
    UserForm__row: PropTypes.string,
    UserForm__signin: PropTypes.string,
    UserForm__login: PropTypes.string,
    UserForm__agree: PropTypes.string,
    UserForm__textfield: PropTypes.string,
    UserForm__social: PropTypes.string,
    UserForm__underlabel: PropTypes.string,
    UserForm__textField: PropTypes.string,
    UserForm__wrapper: PropTypes.string,
    UserForm__signup: PropTypes.string,
    UserForm__icons: PropTypes.string,
    UserForm__input: PropTypes.string,
    UserForm__divider: PropTypes.string,
  }),
  values: formValues,
  touched: formTouched,
  errors: formErrors,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onCancelEditing: PropTypes.func,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
};

AppUserForm.defaultProps = {
  classes: {},
  values: {},
  touched: {},
  errors: {},
  onDelete: null,
};

const emptyAppUser = {
  id: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  email: '',
};

const validationSchema = Yup.object().shape({
  id: Yup.number(),
  username: Yup.string(),
  firstname: Yup.string(),
  lastname: Yup.string(),
  email: Yup.string(),
  password: Yup.string()
    .required()
    .min(8)
    .max(16),
  confirmPassword: Yup.string()
    .required()
    .when('password', {
      is: val => !!(val && val.length > 0),
      then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
    }),
});

const formikBag = {
  mapPropsToValues: ({ appUser }) => appUser || emptyAppUser,

  enableReinitialize: true,

  validationSchema,

  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values);
    setSubmitting(false);
  },

  displayName: 'AppUserForm',
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withTranslation(),
  withFormik(formikBag)
)(AppUserForm);
