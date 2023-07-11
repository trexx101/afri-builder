import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiAppUserGet, apiAppUserPut } from 'api/appUsers';
import AppUserEditFormContainer from 'components/AppUserEditFormContainer';
import 'i18n/__mocks__/i18nMock';
import { appUserMockEdit as appUserMock } from 'components/__mocks__/appUserMocks';

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

describe('AppUserEditFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onUpdateMock = jest.fn();

  it('loads data', async () => {
    apiAppUserGet.mockImplementation(() => Promise.resolve(appUserMock));
    const { queryByText } = render(
      <AppUserEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} config={configMock} />
    );

    await wait(() => {
      expect(apiAppUserGet).toHaveBeenCalledTimes(1);
      expect(apiAppUserGet).toHaveBeenCalledWith('', '1');
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
    });
  }, 7000);

  it('saves data', async () => {
    apiAppUserGet.mockImplementation(() => Promise.resolve(appUserMock));
    apiAppUserPut.mockImplementation(() => Promise.resolve(appUserMock));

    const { findByTestId, queryByText } = render(
      <AppUserEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} config={configMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiAppUserPut).toHaveBeenCalledTimes(1);
      expect(apiAppUserPut).toHaveBeenCalledWith('', appUserMock.id, appUserMock);
      expect(queryByText(successMessageKey)).toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully loaded', async () => {
    apiAppUserGet.mockImplementation(() => Promise.reject());
    const { queryByText } = render(
      <AppUserEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} config={configMock} />
    );

    await wait(() => {
      expect(apiAppUserGet).toHaveBeenCalledTimes(1);
      expect(apiAppUserGet).toHaveBeenCalledWith('', '1');
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
      expect(queryByText(successMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiAppUserGet.mockImplementation(() => Promise.resolve(appUserMock));
    apiAppUserPut.mockImplementation(() => Promise.reject());
    const { findByTestId, getByText } = render(
      <AppUserEditFormContainer id="1" onError={onErrorMock} config={configMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiAppUserGet).toHaveBeenCalledTimes(1);
      expect(apiAppUserGet).toHaveBeenCalledWith('', '1');

      expect(apiAppUserPut).toHaveBeenCalledTimes(1);
      expect(apiAppUserPut).toHaveBeenCalledWith('', appUserMock.id, appUserMock);

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
