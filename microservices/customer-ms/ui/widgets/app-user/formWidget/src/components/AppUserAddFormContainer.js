import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import keycloakType from 'components/__types__/keycloak';
import withKeycloak from 'auth/withKeycloak';
import { AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakViews';
import { apiAppUserPost } from 'api/appUsers';
import Notification from 'components/common/Notification';
import AppUserForm from 'components/AppUserForm';
import AddUserSuccess from 'components/AddUserSuccess';
import Spinner from 'components/common/Spinner';

class AppUserAddFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notificationMessage: null,
      notificationStatus: null,
      showPassword: false,
      success: false,
      loading: false,
    };
    console.log("add props")

    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.buildObj = this.buildObj.bind(this);
    console.log("after bind...")
  }

  closeNotification() {
    this.setState({
      notificationMessage: null
    });
  }

  buildObj({ description, id }) {
    return {
      description,
      createdAt: new Date().toISOString().substring(0, 10),
      read: false,
      userId: id,
    };
  }

  async handleSubmit(appUser) {
    const { t, onCreate, keycloak, config } = this.props;
    this.setState({ loading: true });
    const serviceUrl =
      config &&
      config.systemParams &&
      config.systemParams.api &&
      config.systemParams.api['app-user-api'].url;
    //const authenticated = keycloak.initialized && keycloak.authenticated;

    //if (authenticated) {
      try {
        const createdAppUser = await apiAppUserPost(serviceUrl, appUser);
        onCreate(createdAppUser);
        this.setState({
          notificationMessage: t('common.dataSaved'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    //}
  }

  handleError(err) {
    const { onError, t } = this.props;
    onError(err);
    this.setState({
      notificationMessage: t('error.dataLoading'),
      notificationStatus: Notification.ERROR,
    });
  }

  handleClickShowPassword() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  render() {
    //const { keycloak, onCancelEditing, t } = this.props;
    const { notificationMessage, notificationStatus, showPassword, success, loading  } = this.state;
    const { onLogin } = this.props;

    const Page = success
      ? React.createElement(AddUserSuccess, {
        onLogin,
      })
      : React.createElement(AppUserForm, {
        onSubmit: this.handleSubmit,
        showPassword,
        handleClickShowPassword: this.handleClickShowPassword,
        handleMouseDownPassword: this.handleMouseDownPassword,
      });



    return (
      <Fragment style={{ position: 'relative' }}>
        {Page}
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
        {loading && <Spinner />}
      </Fragment>
    );
  }
}

AppUserAddFormContainer.propTypes = {
  onError: PropTypes.func,
  onCreate: PropTypes.func,
  t: PropTypes.func.isRequired,
  config: PropTypes.object,
  onLogin: PropTypes.func,
};

AppUserAddFormContainer.defaultProps = {
  onError: () => {},
  onCreate: () => {},
  config: {},
  onLogin: () => {},
};

export default withKeycloak(withTranslation()(AppUserAddFormContainer));
