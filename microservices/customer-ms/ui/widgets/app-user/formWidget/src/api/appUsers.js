import { getDefaultOptions, request } from 'api/helpers';

const resource = 'api/app-users';

export const apiAppUserGet = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'GET',
  };
  return request(url, options);
};

export const apiAppUserPost = async (serviceUrl, appUser) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'POST',
    body: appUser ? JSON.stringify(appUser) : null,
  };
  return request(url, options);
};

export const apiAppUserPut = async (serviceUrl, id, appUser) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'PUT',
    body: appUser ? JSON.stringify(appUser) : null,
  };
  return request(url, options);
};

export const apiAppUserDelete = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'DELETE',
  };
  return request(url, options);
};
