import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiAppUserPost } from 'api/appUsers';
import AppUserAddFormContainer from 'components/AppUserAddFormContainer';
import 'i18n/__mocks__/i18nMock';
import { appUserMockAdd as appUserMock } from 'components/__mocks__/appUserMocks';

const configMock = {
  systemParams: {
    api: {
      'app-user-api': {
        url: '',
      },
    },
  },
};

jest.mock('api/appUsers');
jest.mock('@material-ui/pickers', () => {
  // eslint-disable-next-line react/prop-types
  const MockPicker = ({ id, value, name, label, onChange }) => {
    const handleChange = event => onChange(event.currentTarget.value);
    return (
      <span>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} value={value || ''} onChange={handleChange} />
      </span>
    );
  };
  return {
    ...jest.requireActual('@material-ui/pickers'),
    DateTimePicker: MockPicker,
    DatePicker: MockPicker,
  };
});

jest.mock('auth/withKeycloak', () => {
  const withKeycloak = Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        keycloak={{
          initialized: true,
          authenticated: true,
        }}
      />
    );
  };

  return withKeycloak;
});

describe('AppUserAddFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onCreateMock = jest.fn();

  it('saves data', async () => {
    apiAppUserPost.mockImplementation(data => Promise.resolve(data));

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <AppUserAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} config={configMock} />
    );

    const usernameField = await findByLabelText('entities.appUser.username');
    fireEvent.change(usernameField, { target: { value: appUserMock.username } });
    const passwordField = await findByLabelText('entities.appUser.password');
    fireEvent.change(passwordField, { target: { value: appUserMock.password } });
    const firstnameField = await findByLabelText('entities.appUser.firstname');
    fireEvent.change(firstnameField, { target: { value: appUserMock.firstname } });
    const lastnameField = await findByLabelText('entities.appUser.lastname');
    fireEvent.change(lastnameField, { target: { value: appUserMock.lastname } });
    const emailField = await findByLabelText('entities.appUser.email');
    fireEvent.change(emailField, { target: { value: appUserMock.email } });
    rerender(<AppUserAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} config={configMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiAppUserPost).toHaveBeenCalledTimes(1);
      expect(apiAppUserPost).toHaveBeenCalledWith('', appUserMock);

      expect(queryByText(successMessageKey)).toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiAppUserPost.mockImplementation(() => Promise.reject());

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <AppUserAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} config={configMock} />
    );

    const usernameField = await findByLabelText('entities.appUser.username');
    fireEvent.change(usernameField, { target: { value: appUserMock.username } });
    const passwordField = await findByLabelText('entities.appUser.password');
    fireEvent.change(passwordField, { target: { value: appUserMock.password } });
    const firstnameField = await findByLabelText('entities.appUser.firstname');
    fireEvent.change(firstnameField, { target: { value: appUserMock.firstname } });
    const lastnameField = await findByLabelText('entities.appUser.lastname');
    fireEvent.change(lastnameField, { target: { value: appUserMock.lastname } });
    const emailField = await findByLabelText('entities.appUser.email');
    fireEvent.change(emailField, { target: { value: appUserMock.email } });
    rerender(<AppUserAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} config={configMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiAppUserPost).toHaveBeenCalledTimes(1);
      expect(apiAppUserPost).toHaveBeenCalledWith('', appUserMock);

      expect(queryByText(successMessageKey)).not.toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
