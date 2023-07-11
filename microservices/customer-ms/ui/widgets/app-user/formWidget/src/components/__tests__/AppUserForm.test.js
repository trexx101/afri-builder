import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import i18n from 'i18n/__mocks__/i18nMock';
import { appUserMockEdit as appUserMock } from 'components/__mocks__/appUserMocks';
import AppUserForm from 'components/AppUserForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('AppUser Form', () => {
  it('shows form', () => {
    const { getByLabelText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <AppUserForm appUser={appUserMock} />
      </ThemeProvider>
    );

        expect(getByTestId('appUser-id').value).toBe(appUserMock.id.toString());
    expect(getByLabelText('entities.appUser.username').value).toBe(
        appUserMock.username
    );
    expect(getByLabelText('entities.appUser.password').value).toBe(
        appUserMock.password
    );
    expect(getByLabelText('entities.appUser.firstname').value).toBe(
        appUserMock.firstname
    );
    expect(getByLabelText('entities.appUser.lastname').value).toBe(
        appUserMock.lastname
    );
    expect(getByLabelText('entities.appUser.email').value).toBe(
        appUserMock.email
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <AppUserForm appUser={appUserMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('appUser-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
