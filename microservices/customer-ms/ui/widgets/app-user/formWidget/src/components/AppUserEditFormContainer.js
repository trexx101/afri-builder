import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import keycloakType from 'components/__types__/keycloak';
import withKeycloak from 'auth/withKeycloak';
import { AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakViews';
import { apiAppUserGet, apiAppUserDelete, apiAppUserPut } from 'api/appUsers';
import Notification from 'components/common/Notification';
import AppUserForm from 'components/AppUserForm';

class AppUserEditFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notificationMessage: null,
      notificationStatus: null,
    };
    console.log("container")

    this.closeNotification = this.closeNotification.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { keycloak } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    const { keycloak, id } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    const changedAuth = prevProps.keycloak.authenticated !== authenticated;
    const changedId = id && id !== prevProps.id;

    if (authenticated && (changedId || changedAuth)) {
      this.fetchData();
    }
  }

  async fetchData() {
    const { keycloak, id, config } = this.props;
    const serviceUrl =
      config &&
      config.systemParams &&
      config.systemParams.api &&
      config.systemParams.api['app-user-api'].url;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated && id) {
      try {
        const appUser = await apiAppUserGet(serviceUrl, id);
        this.setState(() => ({
          appUser,
        }));
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  closeNotification() {
    this.setState(() => ({
      notificationMessage: null
    }));
  }

  async handleSubmit(appUser) {
    const { t, onUpdate, keycloak, config } = this.props;
    const serviceUrl =
      config &&
      config.systemParams &&
      config.systemParams.api &&
      config.systemParams.api['app-user-api'].url;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        const updatedAppUser = await apiAppUserPut(serviceUrl, appUser.id, appUser);
        onUpdate(updatedAppUser);

        this.setState({
          appUser: updatedAppUser,
          notificationMessage: t('common.dataSaved'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  async handleDelete(appUser) {
    const { t, onDelete, keycloak, config } = this.props;
    const serviceUrl =
      config &&
      config.systemParams &&
      config.systemParams.api &&
      config.systemParams.api['app-user-api'].url;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        await apiAppUserDelete(serviceUrl, appUser.id);
        onDelete(appUser);
        this.setState({
          appUser: null,
          notificationMessage: t('common.dataDeleted'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  handleError(err) {
    const { t, onError } = this.props;
    onError(err);
    this.setState(() => ({
      notificationMessage: t('error.dataLoading'),
      notificationStatus: Notification.ERROR,
    }));
  }

  render() {
    const { keycloak, onCancelEditing, t } = this.props;
    const { notificationMessage, notificationStatus, appUser } = this.state;

    let form;
    if (typeof appUser === 'undefined') {
     form = t('entities.appUser.notFound');
    } else if (appUser === null) {
      form = t('entities.appUser.deleted');
    } else {
      form = (
        <AppUserForm
          appUser={appUser}
          onSubmit={this.handleSubmit}
          onCancelEditing={onCancelEditing}
          onDelete={this.handleDelete}
        />
      );
    }
    return (
      <>
        <UnauthenticatedView keycloak={keycloak}>
          {t('common.notAuthenticated')}
        </UnauthenticatedView>
        <AuthenticatedView keycloak={keycloak}>
         {form}
        </AuthenticatedView>
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

AppUserEditFormContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onCancelEditing: PropTypes.func,
  onError: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  t: PropTypes.func.isRequired,
  keycloak: keycloakType.isRequired,
  config: PropTypes.object,
};

AppUserEditFormContainer.defaultProps = {
  onCancelEditing: () => {},
  onDelete: () => {},
  onUpdate: () => {},
  onError: () => {},
  config: {},
};

export default withKeycloak(withTranslation()(AppUserEditFormContainer));
